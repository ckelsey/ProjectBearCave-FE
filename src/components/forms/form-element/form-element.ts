import { Component, Vue, Prop } from 'vue-property-decorator'
import { FormCompare } from '@/services/user/user-forms';

@Component({
    components: {}
})
export default class FormElement extends Vue {
    @Prop()
    public model: any

    public get leftButtons() {
        if (!this.model || !this.model.buttons) {
            return []
        }

        return this.model.buttons.filter((button: any) => {
            return button.position === `left`
        })
    }

    public get rightButtons() {
        if (!this.model || !this.model.buttons) {
            return []
        }

        return this.model.buttons.filter((button: any) => {
            return button.position === `right`
        })
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

    public addFile(item: any, e: Event) {
        item.value = (e.target as any).files[0]
        this.checkDirty()
    }

    public checkDirty() {
        // const formState = FormCompare(this.model)
        // console.log(formState)
    }
}
