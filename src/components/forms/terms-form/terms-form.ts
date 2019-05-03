import { Component, Vue } from 'vue-property-decorator'
import user from '@/services/user/user'
import { UserForm } from '@/services/user/user-forms'
import FormElement from '../form-element/form-element'

@Component({
    components: {
        'form-element': FormElement
    }
})
export default class TermsForm extends Vue {
    public formData: any = {
        existingForms: [],
        newForm: []
    }

    public mounted() {
        this.formData = UserForm(`terms`, user.model$.value)
    }
}
