import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import user from '@/services/user'
import ProfileAddress from '../profile-address/profile-address';
import ProfileEmail from '../profile-email/profile-email';
import ProfileEmployment from '../profile-employment/profile-employment';
import ProfilePhone from '../profile-phone/profile-phone';
import ProfileVehicle from '../profile-vehicle/profile-vehicle';

@Component({
    components: {
        'profile-address': ProfileAddress,
        'profile-employment': ProfileEmployment,
        'profile-vehicle': ProfileVehicle,
        'profile-phone': ProfilePhone,
        'profile-email': ProfileEmail
    }
})
export default class ProfileDashboard extends Vue {
    public state = state
    public user = user

    public get userFirstName() {
        try {
            return this.user.model.fname
        } catch (error) {
            return ``
        }
    }
}
