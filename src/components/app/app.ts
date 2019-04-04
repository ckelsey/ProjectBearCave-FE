import { Component, Vue } from 'vue-property-decorator'
import NavBar from '../nav-bar/nav-bar.vue'
import HeroElement from '../hero-element/hero-element.vue'
import LoginSignup from '../login-signup/login-signup.vue'
import LoginForm from '../login-form/login-form.vue'
import state from '@/services/state';

@Component({
    components: {
        'nav-bar': NavBar,
        'hero-element': HeroElement,
        'login-signup': LoginSignup,
        'login-form': LoginForm
    }
})
export default class App extends Vue {
    public state = state

    public get classes() {
        let classes = ``

        if (this.state.blur) {
            classes = `darken`
        }

        return classes
    }

    public mounted() {
        console.log('app')
    }
}
