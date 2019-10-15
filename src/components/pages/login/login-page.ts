import { Component, Vue } from 'vue-property-decorator'
import FormElement from '@/components/forms/form-element/form-element'
import { Account } from '@/services/account/internal'

@Component({
    components: {
        'form-element': FormElement
    }
})
export default class LoginPage extends Vue {
    public formData: any = {}
    public timer: any

    public createForm() {
        clearTimeout(this.timer)

        this.timer = setTimeout(() => {
            this.formData = Account.form(`login`)
        }, 33)
    }

    public mounted() {
        Account.model$.subscribe((val) => {
            if (val && val.id) { return }
            this.createForm()
        })
    }
}
