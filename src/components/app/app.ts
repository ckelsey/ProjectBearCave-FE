import { Component, Vue } from 'vue-property-decorator'
import { UserModel } from '@/types'
import state from '@/services/state'
import user from '@/services/user'
import Subject from '@/utils/subject'
import Observable from '@/utils/observable'

import NavBar from '../nav-bar/nav-bar'
import LoginForm from '../login-form/login-form'
import AboutUs from '../about-us/about-us'
import SupportSection from '../support-section/support-section'
import ProfileDashboard from '../profile-dashboard/profile-dashboard'
import TermsService from '../terms-service/terms-service'
import AlertMessage from '../alert-message/modal-content'
import ContentSection from '../content-section/content-section'
import ModalContent from '../modal-content/modal-content'
import TermsConditions from '../terms-conditions/terms-conditions'
import UserAgreement from '../user-agreement/user-agreement'
import PrivacyPolicy from '../privacy-policy/privacy-policy'

@Component({
    components: {
        'nav-bar': NavBar,
        'login-form': LoginForm,
        'about-us': AboutUs,
        'content-section': ContentSection,
        'support-section': SupportSection,
        'profile-dashboard': ProfileDashboard,
        'terms-service': TermsService,
        'alert-message': AlertMessage,
        'modal-content': ModalContent,
        'terms-conditions': TermsConditions,
        'user-agreement': UserAgreement,
        'privacy-policy': PrivacyPolicy
    }
})

export default class App extends Vue {
    public state = state
    public user = user

    public uploader = 0

    public routes: { [key: string]: Subject } = {
        home$: new Subject(false),
        about$: new Subject(false),
        support$: new Subject(false),
        login$: new Subject(false),
        profile$: new Subject(false),
        terms$: new Subject(false),
        privacy$: new Subject(false),
        agreement$: new Subject(false),
        termsModal$: new Subject(false),
    }

    public get uploadProgress() {
        return this.$refs.uploadProgress as any
    }

    public mounted() {

        const set = (val: string) => {
            if (val === ``) { val = `home` }
            if (val === `register`) { val = `login` }

            const isShowing = !!this.routes[`${val}$`].value

            if (isShowing) { return }

            Object.keys(this.routes).forEach((key) => {
                if (key !== `${val}$` && key !== `termsModal$`) {
                    this.routes[key].next(false)
                }
            })

            this.routes[`${val}$`].next(true)
        }

        this.state.stateObserver$.subscribe((val) => {
            set(val)
        })

        if (this.state.stateObserver$ && this.state.stateObserver$.value) {
            set(this.state.stateObserver$.value)
        }

        const setTerms = (val: UserModel, initital?: boolean) => {
            const isShowing = !!this.routes.termsModal$.value
            const shouldShow = !!val && !!val.token && val.clientYN === 0

            if (!isShowing && shouldShow) {
                this.routes.termsModal$.next(true)
            } else if (isShowing && !shouldShow) {
                this.routes.termsModal$.next(true)
            } else if (initital) {
                this.routes.termsModal$.next(shouldShow)
            }
        }

        this.user.model$.subscribe((val) => {
            setTerms(val)
        })

        if (this.user.model$) {
            setTerms(this.user.model$.value)
        }


        this.user.uploader$.subscribe((upload: Observable) => {
            this.uploader = 0
            this.uploadProgress.show()

            const uploader = upload.subscribe(
                (val: number) => {
                    this.uploader = val
                },
                (err: any) => {
                    /** TODO HANDLE ERROR */
                    this.uploadProgress.close()

                    this.state.alert = {
                        msg: err,
                        active: true,
                        status: `alert-danger`
                    }

                    uploader()
                },
                () => {
                    this.uploadProgress.close()

                    this.state.alert = {
                        msg: `Upload success`,
                        active: true,
                        status: `alert-success`,
                        closeIn: 2000
                    }

                    uploader()
                }
            )
        })
    }
}
