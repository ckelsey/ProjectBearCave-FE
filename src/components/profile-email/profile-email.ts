import { Component, Vue } from 'vue-property-decorator'
import user from '@/services/user'

@Component({
    components: {}
})
export default class ProfileEmail extends Vue {
    public user = user
}
