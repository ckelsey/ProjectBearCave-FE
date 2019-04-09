import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import ContentSection from '../content-section/content-section'
import TicketForm from '../ticket-form/ticket-form'

@Component({
    components: {
        'content-section': ContentSection,
        'ticket-form': TicketForm
    }
})
export default class ContactSection extends Vue {
    public state = state

    public street = `2777 Alvarado Street, Suite E`
    public city = `San Leandro`
    public addressState = `California`
    public zip = 94577
    public email = `support@classactioninc.com`
    public emailLink = `mailto:${this.email}`

    public mounted() {
        const supportButton = this.$refs.supportButton as any

        supportButton.addEventListener(`click`, () => {
            this.state.state = `support`
        })
    }
}
