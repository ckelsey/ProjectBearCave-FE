import { Component, Vue, Prop } from 'vue-property-decorator'
import user from '@/services/user/user'
import ProfileStats from '../profile-stats/profile-stats'
import translate from '@/services/translate/translate'
import Subject from '@/utils/subject'

@Component({
    components: {
        'profile-stats': ProfileStats
    }
})
export default class ProfileHeader extends Vue {
    @Prop()
    public profileState$!: Subject

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
