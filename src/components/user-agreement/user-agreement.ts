import { Component, Vue } from 'vue-property-decorator'
import constants from '@/services/constants'

@Component({ components: {} })
export default class UserAgreement extends Vue {
    public constants = constants
}
