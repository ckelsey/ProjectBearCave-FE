import { Component, Vue, Prop } from 'vue-property-decorator'
import claims from '@/services/claims'
import CollapseContent from '@/components/containers/collapse-content/collapse-content'

@Component({
    components: {
        'collapse-content': CollapseContent
    }
})

export default class ClaimContent extends Vue {
    @Prop()
    public claim: any

    public fileClaim() {
        return claims.file(this.claim)
    }
}
