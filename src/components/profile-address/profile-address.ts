import { Component, Vue } from 'vue-property-decorator'
import user from '@/services/user'

@Component({
    components: {}
})
export default class ProfileAddress extends Vue {
    public user = user
}
