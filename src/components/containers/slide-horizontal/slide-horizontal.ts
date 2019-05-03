import { Component, Vue, Prop } from 'vue-property-decorator'
import anime from 'animejs'

@Component({ components: {} })

export default class SlideHorizontal extends Vue {

    @Prop()
    public show$: any

    @Prop()
    public equals: any

    @Prop()
    public isempty: any

    public showing = false
    public timer: any

    public get Equals() {
        return this.equals !== undefined ? this.equals : true
    }

    public mounted() {
        const duration = 300
        const el = this.$el as HTMLElement
        const inner = this.$refs.inner as HTMLElement
        const id = `${new Date().getTime()}_${el.innerHTML.length}_${Math.round(Math.random() * 1000)}`
        const Body = document.body as any

        if (!Body.SlideHorizontalAnimating) {
            Body.SlideHorizontalAnimating = []
        }

        const base = {
            targets: el,
            duration,
            easing: `easeInOutQuad`,
            complete: () => {
                Body.SlideHorizontalAnimating.pop()

                if (this.showing) {
                    el.style.removeProperty(`position`)
                }

                this.$el.dispatchEvent(new Event(`doneanimating`))

                if (Body.SlideHorizontalAnimating.length === 0) {
                    requestAnimationFrame(() => {
                        if (el.parentElement) {
                            el.parentElement.style.removeProperty(`height`)
                            el.parentElement.style.removeProperty(`overflow`)
                        }
                    })
                }
            }
        }
        const elIn = Object.assign({}, base, { scaleX: [0, 1] })
        const elOut = Object.assign({}, base, { scaleX: [1, 0] })
        const animation = () => this.showing ? elIn : elOut

        const run = () => {
            clearTimeout(this.timer)

            this.timer = setTimeout(() => {
                Body.SlideHorizontalAnimating.push(id)

                if (el.parentElement) {
                    if (!el.parentElement.style.height) {
                        el.parentElement.style.height = `${el.parentElement.offsetHeight}px`
                    }

                    const height = el.parentElement.offsetHeight

                    if (height < inner.offsetHeight) {
                        el.parentElement.style.height = `${inner.offsetHeight}px`
                    }

                    el.parentElement.style.overflow = `hidden`
                }

                el.style.position = `absolute`

                this.$el.dispatchEvent(new Event(`startanimating`))

                el.style.transformOrigin = this.showing ? `0% 50%` : `100% 50%`
                anime.timeline({ autoplay: false })
                    .add(animation(), 0)
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

        this.show$.subscribe((val: any) => {
            val = getVal(val)

            if (val === this.showing) { return }

            this.showing = val
            run()
        })

        el.style.position = `absolute`
        el.style.transformOrigin = `100% 50%`
        el.style.transform = `scaleX(0)`
    }
}
