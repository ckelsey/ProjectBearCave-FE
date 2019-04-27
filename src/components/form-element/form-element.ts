import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class FormElement extends Vue {
    @Prop()
    public model: any

    public get leftButtons() {
        return this.model.buttons.filter((button: any) => {
            return button.position === `left`
        })
    }

    public get rightButtons() {
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
        item.value = (e.target as any).files
    }
}
