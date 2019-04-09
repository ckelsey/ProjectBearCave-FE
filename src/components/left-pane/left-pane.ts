import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class LeftPane extends Vue {
    public open() {
        const pane = this.$refs.pane as HTMLElement

        pane.classList.add(`open`)
    }

    public close() {
        const pane = this.$refs.pane as HTMLElement

        pane.classList.remove(`open`)
    }

    public toggle() {
        const pane = this.$refs.pane as HTMLElement

        pane.classList.toggle(`open`)
    }
}
