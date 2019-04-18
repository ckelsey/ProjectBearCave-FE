import { Component, Vue } from 'vue-property-decorator'
import NavBar from '../nav-bar/nav-bar.vue'
import LoginForm from '../login-form/login-form.vue'
import state from '@/services/state'
import AboutUs from '../about-us/about-us'
import ContactSection from '../contact-section/contact-section'
import SupportSection from '../support-section/support-section'
import ProfileDashboard from '../profile-dashboard/profile-dashboard'
import user from '@/services/user'

@Component({
    components: {
        'nav-bar': NavBar,
        'login-form': LoginForm,
        'about-us': AboutUs,
        'contact-section': ContactSection,
        'support-section': SupportSection,
        'profile-dashboard': ProfileDashboard
    }
})
export default class App extends Vue {
    public state = state
    public user = user
    public get hasUser() {
        return !!this.user.model
    }
}
