import { Component, Vue, Prop } from 'vue-property-decorator'
import constants from '@/services/constants'
import state from '@/services/state';

@Component({})
export default class BrandElement extends Vue {
    @Prop({ default: true })
    public text: boolean | undefined

    @Prop({ default: true })
    public icon: boolean | undefined

    public state = state

    public get brandSrc() {
        if (!this.icon) {
            return ``
        }

        return `assets/icons/cai_256.png`
    }


    public get brandText() {
        if (!this.text) {
            return ``
        }

        return `${this.icon ? ` ` : ``}${constants.siteName}`
    }

    public mounted() {
        const brand = this.$refs.brand as HTMLElement

        brand.addEventListener(`click`, () => {
            this.state.state = `home`
        })

    }
}
