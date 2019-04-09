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
export default class SupportSection extends Vue {
    public state = state
}
