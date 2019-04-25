import Subject from '@/utils/subject'
import routes from './routes'

class State {
    public timer: any
    public alert$ = new Subject({ msg: ``, active: false, status: ``, closeIn: 0 })

    public get alert() {
        return this.alert$.value
    }

    public set alert(val) {
        this.alert$.next(val)
    }

    public stateObserver$ = new Subject(undefined)

    public profileObserver$ = new Subject(undefined)

    public Profile: any = undefined
    public get profile() {
        return this.Profile
    }

    public set profile(val) {
        this.Profile = val
        this.profileObserver$.next(val)
    }

    private State: any = undefined
    public get state() {
        return this.State
    }

    public set state(val) {

        if (val === undefined) { return }

        clearTimeout(this.timer)

        this.timer = setTimeout(() => {

            this.setState(val)
                .then((route) => {

                    this.State = route
                    this.stateObserver$.next(route)
                    this.pushHistory(route)
                })
                .catch((err) => {
                    /* TODO */
                    console.log(`STATE ERROR`, err)
                })
        }, 33)
    }

    constructor() {
        this.closeAlert = this.closeAlert.bind(this)

        routes
            .route()
            .then((route) => { this.state = route })

        window.addEventListener('popstate', (e) => {
            routes
                .route(e.state)
                .then((route) => { this.state = route })
        })
    }

    public closeAlert() {
        this.alert = Object.assign({}, {
            msg: ``,
            active: false,
            status: ``,
            closeIn: 0
        })
    }

    public newUrl(path: string) {
        return `${location.origin}/${path}`
    }

    public pushHistory(route: string) {
        window.history.pushState(
            route,
            routes.title(route),
            `${location.origin}/${route}`
        )
    }

    public setState(val: string): Promise<string> {

        if (val === undefined) {
            return Promise.reject(`state is undefined`)
        }

        return routes
            .route(val)
            .then((route) => {
                if (route === this.state && this.state === routes.path()) {
                    throw new Error(`state is already set to ${val}`)
                }

                return route
            })
    }
}

export default new State()
