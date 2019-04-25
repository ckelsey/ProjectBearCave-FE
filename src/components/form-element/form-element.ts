import { Component, Vue, Prop } from 'vue-property-decorator'
import { DataFromForm } from '@/services/user-forms'
import state from '@/services/state';

@Component({
    components: {}
})
export default class FormElement extends Vue {
    @Prop()
    public model: any

    @Prop()
    public confirmed: boolean | undefined

    @Prop()
    public existing: boolean | undefined

    @Prop()
    public submission: any

    @Prop()
    public verification: any

    @Prop()
    public deletion: any

    @Prop()
    public updateOnly!: boolean;

    public proxy: any = []

    public get canSMSVerify() {
        return this.model.key === `phoneNumbers` && this.model.form
            .filter((row: any) =>
                row.filter((i: any) =>
                    i.key === `type` && i.value === `mobile`
                ).length
            ).length
    }

    public toggleCheckbox(key: string) {
        let ref = this.$refs[key] as HTMLInputElement

        if (!ref) { return }

        if (Array.isArray(ref)) {
            ref = ref[0] as HTMLInputElement
        }

        if (ref) {
            ref.click()
        }
    }

    public submit(e: Event) {
        if (e) {
            e.preventDefault()
        }

        const data: any = DataFromForm(this.model.form)

        if (!data.valid) {
            state.alert = {
                msg: `Invalid data`,
                active: true,
                status: `alert-error`,
                closeIn: 2000
            }
            return
        }

        return this.submission(Object.assign({}, this.model.model, data.results))
    }

    public del(e: Event) {
        if (e) {
            e.preventDefault()
        }

        const data: any = DataFromForm(this.model.form)

        return this.deletion(Object.assign({}, this.model.model, data.results))
    }

    public verify(e: Event) {
        if (e) {
            e.preventDefault()
        }

        const data: any = DataFromForm(this.model.form)

        return this.verification(Object.assign({}, this.model.model, data.results))
    }

    public addFile(item: any, e: Event) {
        item.value = (e.target as any).files
    }
}
