import { Component, Vue } from 'vue-property-decorator'
import constants from '@/services/constants'
import routes from '@/services/routes/routes'

@Component({})
export default class BrandElement extends Vue {

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
        routes.route(``)
    }
}
