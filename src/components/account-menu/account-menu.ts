import { Component, Vue } from 'vue-property-decorator'
import user from '@/services/user'
import state from '@/services/state'

@Component({
    components: {}
})
export default class AccountMenu extends Vue {
    public state = state
    public user = user

    public get hasUser() {
        return !!this.user.model && this.user.model.email_current
    }
}
