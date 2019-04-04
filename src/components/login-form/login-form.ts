import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import InputLabel from '../input-label/input-label.vue'

@Component({
    components: {
        'input-label': InputLabel
    }
})
export default class LoginForm extends Vue {

    public state = state

    public register = {
        firstName: ``,
        lastName: ``,
        email: ``,
        password: ``,
        confirmPassword: ``
    }

    public get classes() {
        let classes = `login-form`

        if (this.state.state !== `login`) {
            classes = `${classes} out`
        }

        return classes
    }

    public get registerClasses() {
        let classes = `register-form`

        if (this.state.state !== `login`) {
            classes = `${classes} out`
        }

        return classes
    }

    public mounted() {
        console.log(`sdfas`)
    }
}
