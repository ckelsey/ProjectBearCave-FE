import requests from './requests';
import { UserCredentials } from '@/types'

class User {
    public Model: any = {}

    public get model() {
        return this.Model
    }
    public set model(val) {
        this.Model = Object.assign({}, val)
    }

    constructor() {
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.logout = this.logout.bind(this)

        let existing = localStorage.getItem(`CAI-USER`)

        try {
            existing = JSON.parse(localStorage.getItem(`CAI-USER`) as string)
            // tslint:disable-next-line:no-empty
        } catch (error) { }

        if (!existing) {
            return
        }

        this.modelUser(existing)

        if (!this.model) {
            return
        }
    }

    public validateUser(data: any) {
        return requests.post(`user/validate`, this.model)
            .then((response) => {
                if (!response) {
                    this.logout()
                }
            })
            .catch(() => {
                this.logout()
            })
    }

    public modelUser(data: any) {
        this.model = Object.assign({}, data)

        localStorage.setItem(`CAI-USER`, JSON.stringify(this.model))
    }

    public logout() {
        localStorage.removeItem(`CAI-USER`)
        window.location.reload()
    }

    public login(credentials: UserCredentials) {
        return requests.post(`/user/login`, credentials)
            .then((response) => {
                return this.modelUser(response)
            })
            .catch((error) => {
                return error
            })
    }

    public register(credentials: UserCredentials) {
        return requests.post(`/user`, credentials)
            .then((response) => {
                return this.modelUser(response)
            })
            .catch((error) => {
                return error
            })
    }
}

export default new User()
