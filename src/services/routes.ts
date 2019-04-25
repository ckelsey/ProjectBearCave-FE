import user from './user'
import Subject from '@/utils/subject'

const routes: any = {
    about: {
        title: `About Class Action`,
    },
    support: {
        title: `Need help?`
    },
    profile: {
        title: `Profile`,
        isUser: true
    },
    login: {
        title: `Sign in`,
        isUser: false
    },
    register: {
        title: `Sign up`,
        isUser: false
    },
    claims: {
        title: `Claims`,
        isUser: true
    },
    wallet: {
        title: `Wallet`,
        isUser: true
    },
}

const defaultTitle = `Class Action`

const path = (): string => window.location.pathname.split(`/`).filter((p) => p.trim() !== ``).join(`/`)

const isLoggedIn = new Subject(undefined)

let current: string | undefined

class Routes {

    public get current() {
        return current
    }

    public set current(val) {
        current = val
    }

    constructor() {
        user.loggedIn$.subscribe((val) => {
            isLoggedIn.next(val)
        })

        if (user.loggedIn$.value !== undefined) {
            isLoggedIn.next(user.loggedIn$.value)
        }

        this.route()
            .then((val: string) => {
                this.current = val
            })
    }

    public path() {
        return path()
    }

    public isLoggedIn(): Promise<boolean> {
        return new Promise((resolve, reject) => {

            const res = (is: boolean) => {
                if (is) { return resolve(true) }
                return reject(false)
            }

            if (isLoggedIn.value !== undefined) {
                return res(isLoggedIn.value)
            }

            const waitFor = isLoggedIn.subscribe((val) => {
                waitFor()
                res(val)
            })
        })
    }

    public title(key: string): string {
        return Object.keys(routes).indexOf(key) === -1 ? defaultTitle : routes[key].title
    }

    public route(pathArg?: string): Promise<string> {
        let p = pathArg

        return new Promise((resolve) => {
            if (p === undefined) { p = path() }
            if (!p) { return resolve(``) }

            while (p[0] === `/`) {
                p = p.substring(1)
            }

            if (Object.keys(routes).indexOf(p) === -1) { return resolve(``) }

            if (!routes[p].hasOwnProperty(`isUser`)) { return resolve(p) }

            const toMatch = routes[p].isUser

            return this.isLoggedIn()
                .then(() => {
                    return resolve(toMatch === true ? p : ``)
                })
                .catch(() => {
                    return resolve(toMatch === false ? p : ``)
                })
        })
    }
}

export default new Routes()
