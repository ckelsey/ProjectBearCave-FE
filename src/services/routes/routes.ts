import constants from '../constants'
import { routesData } from './routes-data'
import { Account } from '../account/internal'
import Subject from '@/utils/subject'

const defaultTitle = constants.companyName
const path = (): string => window.location.pathname.split(`/`).filter((p) => p.trim() !== ``).join(`/`)
const routeSubjects: { [key: string]: Subject } = {}

Object.keys(routesData).forEach(key => {
    routeSubjects[key] = new Subject(false)
})

class Routes {

    public route$ = new Subject(``)

    constructor() {
        window.addEventListener('popstate', (e) => {
            console.log(e)
            this.route(e.state)
        })

        this.route().then(val => this.route$.next(val))
    }

    public pushHistory(route: string) {
        window.history.pushState(
            route,
            this.title(route),
            `${location.origin}/${route}`
        )
    }

    public replaceHistory(route: string) {
        window.history.replaceState(
            route,
            this.title(route),
            `${location.origin}/${route}`
        )
    }

    public title(key: string): string {
        return Object.keys(routesData).indexOf(key) === -1 ? defaultTitle : routesData[key].title
    }

    public route(pathArg?: string): Promise<string> {
        return new Promise((resolve) => {

            const finish = (result: string) => {
                if (this.route$.value !== result) {
                    this.pushHistory(result)
                } else {
                    this.replaceHistory(result)
                }

                this.route$.next(result)

                return resolve(result)
            }

            if (pathArg === undefined) { pathArg = path() }
            if (!pathArg) { return finish(``) }

            while (pathArg[0] === `/`) {
                pathArg = pathArg.substring(1)
            }

            if (Object.keys(routesData).indexOf(pathArg) === -1) { return finish(``) }
            if (!routesData[pathArg].hasOwnProperty(`isUser`)) { return finish(pathArg) }

            const p: string = pathArg

            const loggedInSubscription = Account.loggedIn$.subscribe(val => {
                if (val === undefined) { return }

                requestAnimationFrame(() => { loggedInSubscription() })

                const requiresUser = routesData[p].isUser
                const matches = (val && requiresUser) || (!val && !requiresUser)

                return finish(matches ? p : ``)
            })
        })
    }
}

export default new Routes()
