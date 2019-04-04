import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import InputLabel from '../input-label/input-label.vue'
import requests from '@/services/requests';

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

    public get formState() {
        if (this.state.login === `login`) {
            return `login`
        }
        return `register`
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

    public loginRegister() {
        switch (this.state.login) {
            case `login`:
                requests.post(`/user/login`, {
                    email: this.register.email,
                    password: this.register.password
                })
                break

            case `register`:
                requests.post(`/user`, {
                    fname: this.register.firstName,
                    lname: this.register.lastName,
                    email_current: this.register.email,
                    email_original: this.register.email,
                    password: this.register.password
                })
                break
        }
    }

    public formUpdate(e: any) {
        (this.register as any)[e.name] = e.value
    }

    public mounted() {
        console.log(`sdfas`)
    }
}
