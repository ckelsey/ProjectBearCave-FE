import { Component, Vue } from 'vue-property-decorator'
import { UserForm } from '@/services/user/user-forms'
import FormElement from '@/components/forms/form-element/form-element'

@Component({
    components: {
        'form-element': FormElement
    }
})
export default class RegisterPage extends Vue {
    public formData: any = {
        existingForms: [],
        newForm: []
    }

    public mounted() {
        this.formData = UserForm(`register`, {})
    }
}
