import { Component, Vue, Prop } from 'vue-property-decorator'
import anime from 'animejs'

@Component({
    components: {}
})

export default class ContentSection extends Vue {

    @Prop()
    public show: any

    @Prop()
    public full: any

    @Prop()
    public equals: any

    @Prop()
    public isempty: any

    @Prop()
    public direction: string | undefined

    @Prop()
    public setmax: any

    public showing = false
    public timer: any

    public get Classes() {
        return {
            showing: this.showing,
            max: this.setmax && this.setmax !== `false`,
            full: this.Full,
            notfull: !this.Full
        }
    }

    public get Full() {
        return this.full !== undefined ? this.full === `false` ? false : true : true
    }

    public get Direction() {
        return this.direction !== undefined ? this.direction : 'left'
    }

    public get Equals() {
        return this.equals !== undefined ? this.equals : true
    }

    public mounted() {
        const duration = 500
        const maxHeight = () => window.innerHeight

        const el = this.$el as HTMLElement

        const doneAnimating = () => el.classList.add(`done-animating`)
        const startAnimating = () => el.classList.remove(`done-animating`)

        const elBase = {
            targets: el,
            duration,
            easing: `linear`,
            begin: startAnimating
        }
        const elFullIn = Object.assign({}, elBase, { opacity: 1 })
        const elFullOut = Object.assign({}, elBase, { opacity: 0 })
        const elAnimation = () => !this.showing ? elFullOut : elFullIn

        const inner = this.$refs.inner as HTMLElement
        const innerRemoveMaxHeight = () => inner.style.maxHeight = `unset`
        const innerBase = {
            targets: inner,
            duration: duration * 0.58,
            easing: `easeInOutQuad`,
            begin: startAnimating
        }
        const innerFullIn = Object.assign({}, innerBase, { top: [-maxHeight(), 0] })
        const innerFullOut = Object.assign({}, innerBase, { top: [0, maxHeight()] })

        const innerSectionIn = Object.assign({}, innerBase, {
            maxHeight: [`0px`, `${maxHeight()}px`],
            complete() {
                innerRemoveMaxHeight()
                doneAnimating()
            }
        })

        const innerSectionOut = Object.assign({}, innerBase, {
            maxHeight: [`${maxHeight()}px`, `0px`],
        })

        const innerAnimationType = () =>
            this.Full
                ? [innerFullIn, innerFullOut]
                : [innerSectionIn, innerSectionOut]

        const innerAnimation = () =>
            this.showing
                ? innerAnimationType()[0]
                : innerAnimationType()[1]

        const run = () => {
            clearTimeout(this.timer)

            this.timer = setTimeout(() => {
                anime.timeline({ autoplay: false })
                    .add(elAnimation(), 0)
                    .add(innerAnimation(), 0)
                    .play()
            }, 33)
        }

        const getVal = (val: any) => {
            let proposed = val === this.Equals

            if (this.isempty) {
                proposed = !val || val === ``
            }

            return proposed
        }

        this.show.subscribe((val: any) => {
            val = getVal(val)

            if (val === this.showing) { return }

            this.showing = val
            run()
        })

        this.showing = getVal(this.show.value)

        run()
    }
}
