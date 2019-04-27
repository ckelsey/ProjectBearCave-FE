import { Component, Vue, Prop } from 'vue-property-decorator'
import state from '@/services/state'

@Component({
    components: {}
})
export default class AlertMessage extends Vue {
    @Prop()
    public active: boolean | undefined

    @Prop()
    public msg: string | undefined

    @Prop()
    public status: string | undefined

    @Prop()
    // tslint:disable-next-line:ban-types
    public close: Function | undefined

    public mounted() {
        state.alert$.subscribe((val) => {
            if (!!val && val.closeIn > 0) {
                setTimeout(() => {
                    state.closeAlert()
                }, val.closeIn)
            }
        })
    }
}
