import { Component, Vue } from 'vue-property-decorator'
import LeftPane from '../left-pane/left-pane.vue'
import state from '@/services/state'

@Component({
    components: {
        'left-pane': LeftPane
    }
})
export default class CompanyMenu extends Vue {
    public state = state
    public toggled: boolean = false

    public get classes() {
        if (this.toggled) {
            return `company-menu toggled`
        }

        return `company-menu`
    }

    public mounted() {
        const button = this.$refs.button as HTMLElement
        const aboutUs = this.$refs.aboutUs as HTMLElement
        const contact = this.$refs.contact as HTMLElement
        const support = this.$refs.support as HTMLElement
        const menu = this.$refs.menu as any
        let linkClicked = false

        button.addEventListener(`click`, () => {
            if (!linkClicked) {
                this.state.blur = !this.state.blur
                this.toggled = !this.toggled
                menu.toggle()
            }
            linkClicked = false
        })

        aboutUs.addEventListener(`click`, (e) => {
            e.preventDefault()
            linkClicked = true
            this.state.blur = false
            this.toggled = false
            menu.close()
            this.state.state = `about`
        })

        contact.addEventListener(`click`, (e) => {
            e.preventDefault()
            linkClicked = true
            this.state.blur = false
            this.toggled = false
            menu.close()
            this.state.state = `contact`
        })

        support.addEventListener(`click`, (e) => {
            e.preventDefault()
            linkClicked = true
            this.state.blur = false
            this.toggled = false
            menu.close()
            this.state.state = `support`
        })
    }
}
