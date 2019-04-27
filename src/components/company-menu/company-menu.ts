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

    public goTo(e: Event, val: string) {
        e.preventDefault()
        this.state.state = val
        this.$panel.toggle()
    }

    public togglePanel(e: Event) {
        e.preventDefault()
    }
}
