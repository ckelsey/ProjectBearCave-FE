import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state';

@Component({})
export default class HeroElement extends Vue {
    public state = state
    public ready = false
    public frame = 0
    // public width: number = window.innerWidth
    // public height: number = window.innerHeight

    // public get frameStyle() {
    //     const videoWidth = 560
    //     const videoHeight = 315
    //     const videoRatio = videoHeight / videoWidth
    //     const dimensions = {}
    //     let width = 0
    //     let height = 0


    //     if (this.height > videoHeight / videoRatio) {
    //         height = this.height
    //         width = this.height / videoRatio
    //     } else {
    //         height = this.width / videoRatio
    //         width = this.width
    //     }

    //     if (this.width > width) {
    //         height = height / (width / this.width)
    //         width = this.width
    //     }

    //     return {
    //         minWidth: `${width}px`,
    //         minHeight: `${height}px`
    //     }

    // }

    public get classes() {
        let classes = `hero-element`

        if (this.state.state !== `home`) {
            classes = `${classes} out`
        }

        if (this.state.blur) {
            classes = `${classes} blur shift-left`
        }

        if (!this.ready) {
            classes = `${classes} not-ready`
        }

        classes = `${classes} frame${this.frame}`

        return classes
    }

    public mounted() {
        const hero = this.$refs.hero as HTMLElement
        const signin = this.$refs.signin as HTMLElement

        setTimeout(() => {
            this.ready = true
            this.frame = 1

            setTimeout(() => {
                this.frame = 2
            }, 3500)
        }, 380)

        signin.addEventListener(`click`, () => {
            this.state.state = `login`
        })
    }
}
