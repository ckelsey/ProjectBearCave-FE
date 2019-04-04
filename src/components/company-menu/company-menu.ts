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
        const menu = this.$refs.menu as any

        button.addEventListener(`click`, () => {
            this.state.blur = !this.state.blur
            this.toggled = !this.toggled
            menu.toggle()
        })
    }
}
