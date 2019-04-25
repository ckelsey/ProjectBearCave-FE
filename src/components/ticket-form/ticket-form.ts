import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import requests from '@/services/requests'

@Component({
    components: {}
})
export default class TicketForm extends Vue {

    public state = state

    public ticket = {
        name: ``,
        email: ``,
        message: ``
    }

    public submit() {
        requests.post(`/support/ticket`, this.ticket)
    }

    public formUpdate(e: any) {
        (this.ticket as any)[e.name] = e.value
    }

    public mounted() {
        this.submit = this.submit.bind(this)
        const submitButton = this.$refs.submit as any

        submitButton.addEventListener(`click`, this.submit)
    }
}
