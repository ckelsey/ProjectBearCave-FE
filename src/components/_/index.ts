import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class ElementName extends Vue {
    @Prop()
    public prop: string = ``

    public mounted() {
        console.log(this.prop)
    }
}
