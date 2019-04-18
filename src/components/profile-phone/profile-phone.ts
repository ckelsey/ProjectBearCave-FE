import { Component, Vue } from 'vue-property-decorator'
import user from '@/services/user'

@Component({
    components: {}
})
export default class ProfilePhone extends Vue {
    public user = user
}
