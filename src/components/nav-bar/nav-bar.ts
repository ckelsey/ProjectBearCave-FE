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
        const menu = this.$refs.menu as any
        const account = this.$refs.account as any
        const brand = this.$refs.brand as any
        const closeMenu = () => {
            const openMenu = this.$el.querySelector(`.company-menu.toggled`)

            if (openMenu) { menu.$refs.button.click() }
        }

        account.$el.addEventListener(`click`, closeMenu)
        brand.$el.addEventListener(`click`, closeMenu)
    }
}
