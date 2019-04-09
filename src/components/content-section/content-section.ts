import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    components: {}
})

export default class ContentSection extends Vue {
    @Prop()
    public show: boolean | undefined

    public get classes() {
        if (!!this.show) {
            return `content-section`
        }

        return `content-section out`
    }
}
