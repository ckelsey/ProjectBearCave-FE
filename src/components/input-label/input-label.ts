import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

const isValidType = (type: string | undefined) => type && [`text`, `email`, `password`].indexOf(type) > -1

@Component({
    components: {}
})
export default class InputLabel extends Vue {
    @Prop()
    public label: string | undefined

    @Prop()
    public value: any

    @Prop()
    public type: string | undefined

    public inputClass: string = ``

    public get getLabel() {
        return this.label ? this.label : ``
    }

    public get inputType() {
        return isValidType(this.type) ? this.type : ``
    }

    @Emit(`onInput`)
    public onInput() {
        const input = this.$refs.input as HTMLInputElement
        return {
            value: input.value,
            name: this.$el.getAttribute(`name`)
        }
    }

    public mounted() {
        const input = this.$refs.input as HTMLInputElement

        input.addEventListener(`input`, () => {

            if (
                input.value ||
                input.value !== ``
            ) {
                this.inputClass = `has-value`

                return
            }

            this.inputClass = ``

            this.onInput()
        })
    }
}
