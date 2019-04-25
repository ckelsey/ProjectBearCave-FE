import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import user from '@/services/user'
import Subject from '@/utils/subject'
import Observable from '@/utils/observable'

import NavBar from '../nav-bar/nav-bar.vue'
import LoginForm from '../login-form/login-form.vue'
import AboutUs from '../about-us/about-us'
import SupportSection from '../support-section/support-section'
import ProfileDashboard from '../profile-dashboard/profile-dashboard'
import TermsService from '../terms-service/terms-service'
import AlertMessage from '../alert-message'
import ContentSection from '../content-section/content-section'
import ModalContent from '../modal-content'

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
        'modal-content': ModalContent
    }
})
export default class App extends Vue {
    public state = state
    public user = user

    public uploader = 0

    public showLoginRegister$ = new Subject(false)
    public showProfile$ = new Subject(false)
    public showTerms$ = new Subject(false)
    public showHome$ = new Subject(false)

    public get uploadProgress() {
        return this.$refs.uploadProgress as any
    }

    public mounted() {
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

        const setHome = (val: any, initital?: boolean) => {
            const isHome = val === ``
            const isShowing = !!this.showHome$.value

            if (isHome && !isShowing) {
                this.showHome$.next(true)
            } else if (!isHome && isShowing) {
                this.showHome$.next(false)
            } else if (initital) {
                this.showHome$.next(isHome)
            }
        }

        const setProfile = (val: any, initital?: boolean) => {
            const isProfile = val === `profile`
            const isShowing = !!this.showProfile$.value

            if (isProfile && !isShowing) {
                this.showProfile$.next(true)
            } else if (!isProfile && isShowing) {
                this.showProfile$.next(false)
            } else if (initital) {
                this.showProfile$.next(isProfile)
            }
        }

        const setLoginRegister = (val: any, initital?: boolean) => {
            const isLoginRegister = ['login', 'register'].indexOf(val) > -1
            const isShowing = !!this.showLoginRegister$.value

            if (isLoginRegister && !isShowing) {
                this.showLoginRegister$.next(true)
            } else if (!isLoginRegister && isShowing) {
                this.showLoginRegister$.next(false)
            } else if (initital) {
                this.showLoginRegister$.next(isLoginRegister)
            }
        }

        const setTerms = (val: any, initital?: boolean) => {
            const isShowing = !!this.showTerms$.value
            const shouldShow = !!val && !!val.token && val.clientYN === 0

            if (!isShowing && shouldShow) {
                this.showTerms$.next(true)
            } else if (isShowing && !shouldShow) {
                this.showTerms$.next(true)
            } else if (initital) {
                this.showTerms$.next(shouldShow)
            }
        }

        this.state.stateObserver$.subscribe((val) => {
            setLoginRegister(val)
            setProfile(val)
            setHome(val)
        })

        user.model$.subscribe((val) => {
            setTerms(val)
        })

        setLoginRegister(this.state.stateObserver$.value, true)
        setProfile(this.state.stateObserver$.value, true)
        setHome(this.state.stateObserver$.value, true)
        setTerms(this.user.model$.value, true)
    }
}
