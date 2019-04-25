import { Component, Vue } from 'vue-property-decorator'
import constants from '@/services/constants'
import state from '@/services/state'

@Component({})
export default class BrandElement extends Vue {

    public state = state

    public get brandSrc() {
        if (!constants.icon) {
            return ``
        }

        return constants.icon
    }

    public get brandText() {
        if (!constants.siteName) {
            return ``
        }

        return `${constants.icon ? ` ` : ``}${constants.siteName}`
    }

    public goHome(e: any) {
        e.preventDefault()
        this.state.state = ``
    }
}
