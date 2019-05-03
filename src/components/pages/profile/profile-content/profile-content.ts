import { Component, Vue, Prop } from 'vue-property-decorator'
import user from '@/services/user/user'
import state from '@/services/state'
import { UserForm } from '@/services/user/user-forms'
import translate from '@/services/translate/translate'
import FormElement from '@/components/forms/form-element/form-element'
import CollapseContent from '@/components/containers/collapse-content/collapse-content'
import Subject from '@/utils/subject'
import Get from '@/utils/get';
import BreadCrumbs from '@/components/navigation/bread-crumb/bread-crumb'
import SlideHorizontal from '@/components/containers/slide-horizontal/slide-horizontal'

@Component({
    components: {
        'form-element': FormElement,
        'collapse-content': CollapseContent,
        'bread-crumbs': BreadCrumbs,
        'slide-horizontal': SlideHorizontal
    }
})
export default class ProfileContent extends Vue {
    @Prop()
    public title!: string

    @Prop()
    public newFormText!: string

    @Prop()
    public modelkey: any

    @Prop()
    public profileState$!: Subject

    public formState$ = new Subject(false)
    public breadCrumbs$ = new Subject([])
    public user = user
    public state = state
    public translate = translate
    public currentForm: any = {}

    public formData: any = {
        existingForms: [],
        newForm: []
    }

    public updateBreadCrumbs(target: any) {
        let formState = false
        let currentForm = this.formData.newForm[0]
        const id = Get(target, `model.id`, false)
        const isModelKey = target === this.modelkey
        const crumbs: any = [{
            label: `<h4 class="m-0 profile-breadcrumb-text">${this.title}</h4>`,
            // click: this.modelkey === `account` ? undefined : () => this.updateBreadCrumbs(this.modelkey)
            click: undefined
        }]

        if (id) {
            const possibleForm = this.formData.existingForms
                .filter((f: any) => f.model.id === id)[0]

            if (possibleForm) {
                crumbs.push({ label: possibleForm.heading, click: undefined })
                crumbs[0].click = () => this.updateBreadCrumbs(this.modelkey)
                currentForm = possibleForm
                formState = true
            }
        }

        if (isModelKey) {
            if (this.profileState$.value !== this.modelkey) {
                this.profileState$.next(this.modelkey)
            }
        }

        if (!id && !isModelKey && this.formData.newForm[0]) {
            crumbs.push({ label: this.newFormText, click: undefined })
            crumbs[0].click = () => this.updateBreadCrumbs(this.modelkey)
            formState = true
        }

        this.breadCrumbs$.next(crumbs)
        this.currentForm = currentForm
        this.formState$.next(formState)
    }

    public mounted() {
        user.model$.subscribe((val) => {
            this.formData = UserForm(this.modelkey, val)
        })

        this.updateBreadCrumbs(this.modelkey)
    }
}
