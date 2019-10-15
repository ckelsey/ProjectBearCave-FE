import { Component, Vue } from 'vue-property-decorator'
import routes from '@/services/routes/routes'

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
import UploadTest from '../pages/upload-test/upload-test'

import AlertMessage from '../containers/alert-message/alert-message'
import ModalContent from '../containers/modal-content/modal-content'
import PageContent from '../containers/page-content/page-content'

import NavBar from '../navigation/nav-bar/nav-bar'

import TermsForm from '../forms/terms-form/terms-form'
import { FileUpload$ } from '@/services/file-upload'
import alert from '@/services/alert'
import { Account } from '@/services/account/internal'


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
    'upload-test': UploadTest
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
    public alert = alert

    public ready = false

    public uploadProgressAmount = 0

    public route$ = routes.route$

    public get uploadProgress() {
        return this.$refs.uploadProgress as any
    }

    public cancelUpload() {
        FileUpload$.next({ cancel: true })
    }

    public mounted() {

        const loggedIn = Account.loggedIn$.subscribe(val => {
            if (val === undefined) { return }
            this.ready = true

            requestAnimationFrame(() => loggedIn())
        })

        // FileUpload$.subscribe((val: any) => {
        //     if (val.cancel) {
        //         return this.uploadProgress.close()
        //     }

        //     this.uploadProgressAmount = val.progress

        //     if (val.error) {
        //         alert.alert = {
        //             msg: val.error,
        //             active: true,
        //             status: `alert-danger`
        //         }
        //         return this.uploadProgress.close()
        //     }

        //     if (val.url) {
        //         alert.alert = {
        //             msg: `Upload successful`,
        //             active: true,
        //             status: `alert-success`,
        //             closeIn: 3000
        //         }
        //         return this.uploadProgress.close()
        //     }

        //     if (val.progress === 0) {
        //         this.uploadProgress.show()
        //     }
        // })
    }
}

