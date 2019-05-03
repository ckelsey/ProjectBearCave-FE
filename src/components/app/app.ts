import { Component, Vue } from 'vue-property-decorator'
import { UserModel } from '@/types'
import state from '@/services/state'
import user from '@/services/user/user'
import Subject from '@/utils/subject'
import Observable from '@/utils/observable'

import HomePage from '../pages/home/home-page'
import AboutPage from '../pages/about/about-page'
import SupportPage from '../pages/support/support-page'
import LoginPage from '../pages/login/login-page'
import RegisterPage from '../pages/register/register-page'
import TermsPage from '../pages/terms/terms-page'
import PrivacyPage from '../pages/privacy/privacy-page'
import AgreementPage from '../pages/agreement/agreement-page'
import ProfilePage from '../pages/profile/profile-page/profile-page'
import WalletPage from '../pages/wallet/wallet-page'
import DiscoveryPage from '../pages/discovery/discovery-page'
import ClaimsPage from '../pages/claims/claims-page/claims-page'

import AlertMessage from '../containers/alert-message/alert-message'
import ModalContent from '../containers/modal-content/modal-content'
import PageContent from '../containers/page-content/page-content'

import NavBar from '../navigation/nav-bar/nav-bar'

import TermsForm from '../forms/terms-form/terms-form'
import { FileUpload$ } from '@/services/file-upload';

const pages = {
    'home-page': HomePage,
    'about-page': AboutPage,
    'support-page': SupportPage,
    'login-page': LoginPage,
    'register-page': RegisterPage,
    'terms-page': TermsPage,
    'privacy-page': PrivacyPage,
    'agreement-page': AgreementPage,
    'profile-page': ProfilePage,
    'wallet-page': WalletPage,
    'claims-page': ClaimsPage,
    'discovery-page': DiscoveryPage,
}

const menus = {
    'nav-bar': NavBar,
}

const containers = {
    'page-content': PageContent,
    'alert-message': AlertMessage,
    'modal-content': ModalContent,
}

const forms = {
    'terms-form': TermsForm
}

@Component({ components: Object.assign({}, pages, menus, containers, forms) })
export default class App extends Vue {
    public state = state
    public user = user

    public uploadProgressAmount = 0

    public routes: { [key: string]: Subject } = {
        home$: new Subject(false),
        about$: new Subject(false),
        support$: new Subject(false),
        login$: new Subject(false),
        register$: new Subject(false),
        profile$: new Subject(false),
        terms$: new Subject(false),
        privacy$: new Subject(false),
        agreement$: new Subject(false),
        wallet$: new Subject(false),
        claims$: new Subject(false),
        discovery$: new Subject(false),
        termsModal$: new Subject(false),
    }

    public get uploadProgress() {
        return this.$refs.uploadProgress as any
    }

    public cancelUpload() {
        FileUpload$.next({ cancel: true })
    }

    public mounted() {

        const set = (val: string) => {
            if (val === undefined) { return }
            if (val === ``) { val = `home` }

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

        FileUpload$.subscribe((val: any) => {
            if (val.cancel) {
                return this.uploadProgress.close()
            }

            this.uploadProgressAmount = val.progress

            if (val.error) {
                this.state.alert = {
                    msg: val.error,
                    active: true,
                    status: `alert-danger`
                }
                return this.uploadProgress.close()
            }

            if (val.url) {
                this.state.alert = {
                    msg: `Upload successful`,
                    active: true,
                    status: `alert-success`,
                    closeIn: 3000
                }
                return this.uploadProgress.close()
            }

            if (val.progress === 0) {
                this.uploadProgress.show()
            }
        })
    }
}
