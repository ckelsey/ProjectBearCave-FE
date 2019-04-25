import { Component, Vue } from 'vue-property-decorator'
import user from '@/services/user'
import ProfileStats from '../profile-stats/profile-stats'
import translate from '@/services/translate'

@Component({
    components: {
        'profile-stats': ProfileStats
    }
})
export default class ProfileHeader extends Vue {
    public user = user
    public t = translate

    public get userFirstName() {
        try {
            return this.user.model$.value.fname
        } catch (error) {
            return ``
        }
    }
}
