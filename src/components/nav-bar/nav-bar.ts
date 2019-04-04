import { Component, Vue } from 'vue-property-decorator'
import BrandElement from '../brand-element/brand-element'
import CompanyMenu from '../company-menu/company-menu'
import AccountMenu from '../account-menu/account-menu'

@Component({
    components: {
        'brand-element': BrandElement,
        'company-menu': CompanyMenu,
        'account-menu': AccountMenu
    }
})
export default class NavBar extends Vue {
    public mounted() {
        console.log('navbar')
    }
}
