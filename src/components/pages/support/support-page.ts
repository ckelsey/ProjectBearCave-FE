import { Component, Vue } from 'vue-property-decorator'
import SupportTicket from '@/components/forms/support-ticket/support-ticket'

@Component({ components: { 'support-ticket': SupportTicket } })

export default class SupportPage extends Vue {}
