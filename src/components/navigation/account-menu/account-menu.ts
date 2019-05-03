import { Component, Vue } from 'vue-property-decorator'
import user from '@/services/user/user'
import state from '@/services/state'
import claims from '@/services/claims'
import SidePanel from '@/components/containers/side-panel/side-panel'

@Component({
    components: {
        'side-panel': SidePanel
    }
})
export default class AccountMenu extends Vue {
    public state = state
    public user = user
    public loggedIn = false
    public userReady = false
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
        this.state.state = key
        this.state.profile = ``
        this.$panel.toggle()
    }

    public logout(e: Event) {
        e.preventDefault()
        this.user.logout()
        this.state.state = ``
        this.$panel.toggle()
    }

    public mounted() {
        this.user.loggedIn$.subscribe((val) => {
            this.loggedIn = val
        })

        this.user.ready$.subscribe((val) => {
            this.userReady = val
        })

        claims.claim$.subscribe((val: any) => {
            this.claimCount = val && val.length ? val.filter((c: any) => c.fileDeadline >= new Date().getTime()).length : ``
        })
    }
}
