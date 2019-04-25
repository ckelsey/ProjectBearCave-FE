import { Component, Vue, Prop } from 'vue-property-decorator'
import user from '@/services/user'
import FormElement from '../form-element/form-element'
import ContentSection from '../content-section/content-section'
import state from '@/services/state';
import { UserForm } from '@/services/user-forms'
import translate from '@/services/translate';

@Component({
    components: {
        'form-element': FormElement,
        'content-section': ContentSection
    }
})
export default class ProfileContent extends Vue {
    @Prop()
    public title!: string

    @Prop()
    public modelkey: any

    public user = user
    public state = state
    public translate = translate

    public formData: any = {
        existingForms: [],
        newForm: [],
    }

    public formUpdateSuccess() {
        this.state.alert = {
            msg: `Successfully saved`,
            active: true,
            status: `alert-success`,
            closeIn: 2000
        }
    }

    public formUpdateError(err: string) {
        this.state.alert = {
            msg: err,
            active: true,
            status: `alert-danger`
        }
    }

    public formDelete(data: any) {

        return this.user.deleteData(data, this.modelkey)
            .then(this.formUpdateSuccess)
            .catch(this.formUpdateError)
    }

    public formVerify(data: any) {
        return this.user.verifyPhone(data)
    }

    public formSubmit(data: any) {
        if (this.modelkey === `account`) {
            return this.user.update(data)
                .then(this.formUpdateSuccess)
                .catch(this.formUpdateError)
        }

        return this.user.updateData(data, this.modelkey)
            .then(this.formUpdateSuccess)
            .catch(this.formUpdateError)
    }

    public mounted() {
        user.model$.subscribe((val) => {
            this.formData = UserForm(this.modelkey, val)
        })

        const model = user.model$.value

        if (model && Object.keys(model).length) {
            this.formData = UserForm(this.modelkey, user.model$.value)
        }
    }
}
