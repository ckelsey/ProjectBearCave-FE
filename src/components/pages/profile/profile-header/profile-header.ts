import { Component, Vue, Prop } from 'vue-property-decorator'
import ProfileStats from '../profile-stats/profile-stats'
import translate from '@/services/translate/translate'
import Subject from '@/utils/subject'
import { Account } from '@/services/account/internal'
import Get from '@/utils/get'

@Component({
    components: {
        'profile-stats': ProfileStats
    }
})
export default class ProfileHeader extends Vue {
    @Prop()
    public profileState$!: Subject

    public t = translate
    public account = Account

    public get userFirstName() {
        return Get(this.account, `model$.value.fname`, ``)
    }
}
