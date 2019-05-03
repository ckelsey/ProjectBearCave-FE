import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import SupportTicket from '@/components/forms/support-ticket/support-ticket'

@Component({ components: { 'support-ticket': SupportTicket } })

export default class SupportPage extends Vue {
    public state = state
}
