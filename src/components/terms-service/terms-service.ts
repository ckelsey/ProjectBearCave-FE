import { Component, Vue } from 'vue-property-decorator'
import user from '@/services/user'

@Component({
    components: {}
})
export default class TermsService extends Vue {
    public user = user
    public consent = {
        agent: {
            value: false,
            error: ``
        },
        assignee: {
            value: false,
            error: ``
        }
    }

    public accept() {
        let valid = true
        if (!this.consent.agent.value) {
            this.consent.agent.error = `required`
            valid = false
        } else {
            this.consent.agent.error = ``
        }

        if (!this.consent.assignee.value) {
            this.consent.assignee.error = `required`
            valid = false
        } else {
            this.consent.assignee.error = ``
        }

        if (!valid) {
            return
        }

        this.user.update({ clientYN: 1 })
    }

    public clickLabel(key: string) {
        const obj = this.consent as any
        obj[key].value = !obj[key].value
    }

    public goToTerms(e: any) {
        /** TODO */
        e.preventDefault()
    }

    public goToPrivacy(e: any) {
        /** TODO */
        e.preventDefault()
    }

    public goToUserAgreement(e: any) {
        /** TODO */
        e.preventDefault()
    }
}
