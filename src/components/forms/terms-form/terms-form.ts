import { Component, Vue } from 'vue-property-decorator'
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
        // this.formData = UserForm(`terms`, user.model$.value)
    }
}
