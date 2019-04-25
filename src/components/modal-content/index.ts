import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class ModalContent extends Vue {
    public active: boolean = false

    public get isActive() {
        return this.active
    }

    public close() {
        this.active = false
    }

    public show() {
        this.active = true
    }

    public mounted() {
        this.close = this.close.bind(this)
        this.show = this.show.bind(this)
    }
}
