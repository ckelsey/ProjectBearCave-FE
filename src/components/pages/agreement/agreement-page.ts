import { Component, Vue } from 'vue-property-decorator'
import constants from '@/services/constants'

@Component({ components: {} })
export default class AgreementPage extends Vue {
    public constants = constants
}
