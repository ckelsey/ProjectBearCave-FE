import { Component, Vue } from 'vue-property-decorator'
import SidePanel from '@/components/containers/side-panel/side-panel'
import routes from '@/services/routes/routes'

@Component({
    components: {
        'side-panel': SidePanel
    }
})
export default class CompanyMenu extends Vue {
    public route = ``

    public get $panel() {
        return this.$refs.panel as any
    }

    public getPanelToggler() {
        return this.$refs.panelToggler
    }

    public goTo(e: Event, val: string) {
        e.preventDefault()
        routes.route(val)
        this.$panel.toggle()
    }

    public togglePanel(e: Event) {
        e.preventDefault()
    }

    public mounted() {
        routes.route$.subscribe(val => this.route = val)
    }
}
