import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import PanelContent from '../panel-content/panel-content'

@Component({
    components: {
        'panel-content': PanelContent
    }
})
export default class CompanyMenu extends Vue {
    public state = state

    public get $panel() {
        return this.$refs.panel as any
    }

    public getPanelToggler() {
        return this.$refs.panelToggler
    }

    public goToAbout(e: Event) {
        e.preventDefault()
        this.state.state = `about`
        this.$panel.toggle()
    }

    public goToSupport(e: Event) {
        e.preventDefault()
        this.state.state = `support`
        this.$panel.toggle()
    }

    public togglePanel(e: Event) {
        e.preventDefault()
    }
}
