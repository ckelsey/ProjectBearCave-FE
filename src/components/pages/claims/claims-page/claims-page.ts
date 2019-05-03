import { Component, Vue } from 'vue-property-decorator'
import claims from '@/services/claims'
import ClaimContent from '../claim-content/claim-content'
import CollapseContent from '@/components/containers/collapse-content/collapse-content'

@Component({
    components: {
        'collapse-content': CollapseContent,
        'claim-content': ClaimContent
    }
})

export default class ClaimsPage extends Vue {
    public claims = claims
}
