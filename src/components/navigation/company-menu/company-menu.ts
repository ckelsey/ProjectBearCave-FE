import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import SidePanel from '@/components/containers/side-panel/side-panel'

@Component({
    components: {
        'side-panel': SidePanel
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
