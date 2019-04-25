import { Component, Vue } from 'vue-property-decorator'
import user from '@/services/user'
import state from '@/services/state'
import PanelContent from '../panel-content/panel-content'

@Component({
    components: {
        'panel-content': PanelContent
    }
})
export default class AccountMenu extends Vue {
    public state = state
    public user = user
    public loggedIn = false
    public userReady = false

    public get $panel() {
        return this.$refs.panel as any
    }


    public getPanelToggler() {
        return this.$refs.panelToggler as HTMLElement
    }

    public togglePanel(e: Event) {
        e.preventDefault()
        this.$panel.toggle()
    }

    public goToProfile(e: Event) {
        e.preventDefault()
        this.state.state = `profile`
        this.state.profile = ``
        this.$panel.toggle()
    }

    public goToClaims(e: Event) {
        e.preventDefault()
        this.state.state = `claims`
        this.$panel.toggle()
    }

    public goToWallet(e: Event) {
        e.preventDefault()
        this.state.state = `wallet`
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

        this.loggedIn = this.user.loggedIn$.value
        this.userReady = this.user.ready$.value
    }
}
