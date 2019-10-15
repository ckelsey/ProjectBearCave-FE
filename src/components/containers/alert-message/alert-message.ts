import { Component, Vue, Prop } from 'vue-property-decorator'
import alert from '@/services/alert'

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
        alert.alert$.subscribe((val) => {
            if (!!val && val.closeIn > 0) {
                setTimeout(() => {
                    alert.closeAlert()
                }, val.closeIn)
            }
        })
    }
}
