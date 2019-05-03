import { Component, Vue, Prop } from 'vue-property-decorator'
import anime from 'animejs'

@Component({})

export default class PageContent extends Vue {

    @Prop()
    public show: any

    @Prop()
    public equals: any

    @Prop()
    public isempty: any

    public showing = false
    public timer: any

    public get Classes() {
        return {
            showing: this.showing
        }
    }

    public get Equals() {
        return this.equals !== undefined ? this.equals : true
    }

    public mounted() {
        const el = this.$el as HTMLElement
        const inner = this.$refs.inner as HTMLElement

        const duration = 500
        const maxHeight = () => window.innerHeight

        const elBase = { targets: el, duration, easing: `linear` }
        const elIn = Object.assign({}, elBase, { opacity: 1 })
        const elOut = Object.assign({}, elBase, { opacity: 0 })
        const elAnimation = () => !this.showing ? elOut : elIn

        const innerBase = { targets: inner, duration: duration * 0.58, easing: `spring(1.8,80,25,8)` }
        const innerIn = Object.assign({}, innerBase, { top: [-maxHeight(), 0] })
        const innerOut = Object.assign({}, innerBase, { top: [0, maxHeight()] })
        const innerAnimation = () => this.showing ? innerIn : innerOut

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

        el.style.opacity = `0`
        inner.style.top = `${window.innerHeight}px`
    }
}
