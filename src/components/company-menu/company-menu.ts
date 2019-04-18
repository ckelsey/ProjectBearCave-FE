import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'

@Component({
    components: {
    }
})
export default class CompanyMenu extends Vue {
    public state = state

    public mounted() {
        const aboutUs = this.$refs.aboutUs as HTMLElement
        const support = this.$refs.support as HTMLElement

        aboutUs.addEventListener(`click`, (e) => {
            e.preventDefault()
            this.state.state = `about`
        })

        support.addEventListener(`click`, (e) => {
            e.preventDefault()
            this.state.state = `support`
        })
    }
}
