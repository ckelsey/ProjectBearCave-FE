import { Component, Vue } from 'vue-property-decorator'
import user from '@/services/user';
import state from '@/services/state';

@Component({
    components: {}
})
export default class AccountMenu extends Vue {

    public state = state

    public get isLoggedIn() {
        return !!user.model
    }

    public mounted() {
        const signin = this.$refs.signin as HTMLElement

        signin.addEventListener(`click`, () => {
            this.state.state = `login`
        })
    }
}
