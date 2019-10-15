import { Component, Vue, Prop } from 'vue-property-decorator'
import translate from '@/services/translate/translate'
import FormElement from '@/components/forms/form-element/form-element'
import CollapseContent from '@/components/containers/collapse-content/collapse-content'
import Subject from '@/utils/subject'
import Get from '@/utils/get'
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
    public model: any

    @Prop()
    public profileState$!: Subject

    public breadCrumbs$ = new Subject([])
    public formData: any = {}


    // @Prop()
    // public title!: string

    // @Prop()
    // public newFormText!: string

    // @Prop()
    // public noContentMarkup!: HTMLElement



    // public get List() {
    //     return this.$refs.list as any
    // }

    // public existingFormsTemplate$ = new Subject(document.createElement(`div`))
    // public formState$ = new Subject(false)

    // public translate = translate
    // public currentForm: any = {}

    // public formData: any = {
    //     existingForms: [],
    //     newForm: []
    // }


    // public updateBreadCrumbs(target: any) {
    //     let formState = false
    //     let currentForm = this.formData.newForm[0]
    //     const id = Get(target, `model.id`, false)
    //     const isModelKey = target === this.modelkey
    //     const crumbs: any = [{
    //         label: `<h4 class="m-0 profile-breadcrumb-text">${this.title}</h4>`,
    //         // click: this.modelkey === `account` ? undefined : () => this.updateBreadCrumbs(this.modelkey)
    //         click: undefined
    //     }]

    //     if (id) {
    //         const possibleForm = this.formData.existingForms
    //             .filter((f: any) => f.model.id === id)[0]

    //         if (possibleForm) {
    //             crumbs.push({ label: possibleForm.heading, click: undefined })
    //             crumbs[0].click = () => this.updateBreadCrumbs(this.modelkey)
    //             currentForm = possibleForm
    //             formState = true
    //         }
    //     }

    //     if (isModelKey) {
    //         if (this.profileState$.value !== this.modelkey) {
    //             this.profileState$.next(this.modelkey)
    //         }
    //     }

    //     if (!id && !isModelKey && this.formData.newForm[0]) {
    //         crumbs.push({ label: this.newFormText, click: undefined })
    //         crumbs[0].click = () => this.updateBreadCrumbs(this.modelkey)
    //         formState = true
    //     }

    //     this.breadCrumbs$.next(crumbs)
    //     this.currentForm = currentForm
    //     this.formState$.next(formState)
    // }

    // public mounted() {
    // user.model$.subscribe(val => {
    //     this.formData = UserForm(this.modelkey, val)

    //     const existingFormContainer = document.createElement(`div`)

    //     if (this.formData.existingForms.length) {
    //         this.formData.existingForms.forEach((form: any) => {
    //             const div = document.createElement(`div`)
    //             div.className = `profile-content-list-item d-flex align-items-center justify-content-between`
    //             div.addEventListener(`click`, () => {
    //                 this.updateBreadCrumbs(form)
    //             })

    //             const span = document.createElement(`span`)
    //             span.innerHTML = form.heading

    //             const icon = document.createElement(`span`)
    //             icon.className = `chevron right`

    //             div.appendChild(span)
    //             div.appendChild(icon)
    //             existingFormContainer.appendChild(div)
    //         })
    //     } else if (this.noContentMarkup) {
    //         existingFormContainer.appendChild(this.noContentMarkup)
    //     }

    //     this.existingFormsTemplate$.next(existingFormContainer)
    // })

    // this.profileState$.subscribe((val: any) => {
    //     if (val && val === this.modelkey) {
    //         this.updateBreadCrumbs(this.modelkey)
    //     }
    // })

    // this.updateBreadCrumbs(this.modelkey)
    // }
}
