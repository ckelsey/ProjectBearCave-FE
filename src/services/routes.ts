import user from './user'
import Subject from '@/utils/subject'
import { routesData } from './routes-data'
import constants from './constants'

const defaultTitle = constants.companyName

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
        return Object.keys(routesData).indexOf(key) === -1 ? defaultTitle : routesData[key].title
    }

    public route(pathArg?: string): Promise<string> {
        let p = pathArg

        return new Promise((resolve) => {
            if (p === undefined) { p = path() }
            if (!p) { return resolve(``) }

            while (p[0] === `/`) {
                p = p.substring(1)
            }

            if (Object.keys(routesData).indexOf(p) === -1) { return resolve(``) }

            if (!routesData[p].isUser) { return resolve(p) }

            const toMatch = routesData[p].isUser

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
