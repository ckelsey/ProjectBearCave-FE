import { Component, Vue } from 'vue-property-decorator'
import claims from '@/services/claims'
import SidePanel from '@/components/containers/side-panel/side-panel'
import { Account } from '@/services/account/internal'
import routes from '@/services/routes/routes'

@Component({
    components: {
        'side-panel': SidePanel
    }
})
export default class AccountMenu extends Vue {
    public route = ``
    public loggedIn: boolean = false
    public claimCount = ``

    public get $panel() {
        return this.$refs.panel as any
    }

    public menu = [`profile`, `claims`, `wallet`, `discovery`]

    public getPanelToggler() {
        return this.$refs.panelToggler as HTMLElement
    }

    public togglePanel(e: Event) {
        e.preventDefault()
        this.$panel.toggle()
    }

    public goTo(e: Event, key: string) {
        e.preventDefault()
        routes.route(key)

        if (this.$panel) {
            this.$panel.toggle()
        }
    }

    public logout(e: Event) {
        e.preventDefault()
        Account.logout()
        routes.route(``)
        this.$panel.toggle()
    }

    public mounted() {
        Account.loggedIn$.subscribe(val => {
            this.loggedIn = val
        })

        routes.route$.subscribe(val => {
            this.route = val
        })

        claims.claim$.subscribe((val: any) => {
            this.claimCount = val && val.length ? val.filter((c: any) => c.fileDeadline >= new Date().getTime()).length : ``
        })
    }
}
