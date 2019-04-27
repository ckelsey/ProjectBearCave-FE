import { Component, Vue } from 'vue-property-decorator'
import anime from 'animejs'

@Component({
    components: {}
})
export default class CollapseElement extends Vue {
    public toggled: boolean = false
    public timer: any = undefined

    public runAnimation() {
        clearTimeout(this.timer)

        const duration = 300
        const el = this.$refs.inner as HTMLElement
        const maxHeight = () => window.innerHeight
        const innerRemoveMaxHeight = () => el.style.maxHeight = `unset`
        const elBase = { targets: el, duration, easing: `easeInOutQuad`, }
        const elAnimation = () => !this.toggled ? elOut : elIn

        const elIn = Object.assign({}, elBase, {
            opacity: 1,
            maxHeight: [`0px`, `${maxHeight()}px`],
            complete() { innerRemoveMaxHeight() }
        })

        const elOut = Object.assign({}, elBase, {
            opacity: 0,
            maxHeight: [`${maxHeight()}px`, `0px`],
        })

        this.timer = setTimeout(() => {
            anime.timeline({ autoplay: false })
                .add(elAnimation(), 0)
                .play()
        }, 33)
    }

    public toggle() {
        this.toggled = !this.toggled
        this.runAnimation()
    }

    public mounted() {
        this.runAnimation()
    }
}
