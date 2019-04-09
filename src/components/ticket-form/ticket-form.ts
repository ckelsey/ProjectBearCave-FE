import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import InputLabel from '../input-label/input-label.vue'
import requests from '@/services/requests'

@Component({
    components: {
        'input-label': InputLabel
    }
})
export default class TicketForm extends Vue {

    public state = state

    public ticket = {
        name: ``,
        email: ``,
        message: ``
    }

    public submit() {
        const ticket = JSON.parse(JSON.stringify(this.ticket))
        console.log(ticket)
        // requests.post(`/support/ticket`, this.ticket)
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
