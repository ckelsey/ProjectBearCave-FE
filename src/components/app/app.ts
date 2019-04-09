import { Component, Vue } from 'vue-property-decorator'
import NavBar from '../nav-bar/nav-bar.vue'
import HeroElement from '../hero-element/hero-element.vue'
import LoginSignup from '../login-signup/login-signup.vue'
import LoginForm from '../login-form/login-form.vue'
import state from '@/services/state'
import AboutUs from '../about-us/about-us'
import ContactSection from '../contact-section/contact-section'
import SupportSection from '../support-section/support-section'

@Component({
    components: {
        'nav-bar': NavBar,
        'hero-element': HeroElement,
        'login-signup': LoginSignup,
        'login-form': LoginForm,
        'about-us': AboutUs,
        'contact-section': ContactSection,
        'support-section': SupportSection
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
}
