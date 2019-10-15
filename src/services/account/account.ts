import Subject from '@/utils/subject'
import { Convert } from '@/utils/convert'
import { FormObject } from '@/types'
import requests from '../requests'
import constants from '../constants'
import alert from '../alert'
import routes from '../routes/routes'
import { ApiUser, ValidateAccount, AccountForm, ValidateAccountForm } from './internal'

const errorAlert = { active: true, status: `alert-danger`, closeIn: 3000 }
const generalError = Object.assign({}, errorAlert, { msg: `There was an error getting your data, please try again` })
const loginError = Object.assign({}, errorAlert, { msg: `Invalid login credentials, please check and try again` })
const registerError = Object.assign({}, errorAlert, { msg: `There were some errors found, please check and try again` })

class AccountClass {
    public model$ = new Subject({})
    public loggedIn$ = new Subject(undefined)

    constructor() {
        const accountInStorage: ApiUser =
            Convert(localStorage.getItem(`CAI-USER`))
                .jsonParse()
                .ifInvalid({})
                .value

        this.get(accountInStorage)

        if (constants.isDev) {
            (window as any).Account = this
        }
    }

    public activate() {
        /** TODO */
    }

    public deactivate() {
        /** TODO */
    }

    public form(page?: string) {
        return new AccountForm(this.model$.value, page)
    }

    public get(user: ApiUser) {
        if (!user || !user.id || !user.token) {
            return Promise.resolve(this.model(undefined))
        }

        if (!navigator.onLine) {
            return Promise.resolve(this.model(user))
        }

        return requests.get(`/user/${user.id}`, {}, user.token)
            .then((response: ApiUser) => {
                if (!response.id) { throw new Error() }

                return this.model(
                    Object.assign({}, user, response)
                )
            })
            .catch((err) => this.model(undefined))
    }

    public login(form: AccountForm) {
        if (!form || !form.fields || Object.keys(form.fields).length === 0) { return }

        const data = ValidateAccountForm(form.fields)

        if (!data.valid) { return alert.alert = loginError }

        requests.post(`/user/login`, {
            email_current: data.model.email,
            password: data.model.password
        })
            .then((response: ApiUser) => {
                if (!response.token) { return alert.alert = loginError }

                this.model(response)

                if (this.loggedIn$.value) { routes.route(`profile`) }
            })
            .catch(() => alert.alert = generalError)
    }

    public logout() {
        if (navigator.onLine) {
            if (this.model$.value.token) {
                requests.post(`/user/logout`, { id: this.model$.value.id }, this.model$.value.token)
            }
        }

        localStorage.removeItem(`CAI-USER`)
        this.model$.next({})
        this.loggedIn$.next(false)
    }

    public model(user: ApiUser | undefined) {
        if (!user || !user.token) { return this.logout() }

        delete user.password
        delete (user as any).confirmPassword

        const validated = ValidateAccount(user)
        let model = validated.model

        if (!validated.valid) { model = {} }

        this.model$.next(model)
        this.loggedIn$.next(!!model.token)

        localStorage.setItem(`CAI-USER`, JSON.stringify(model))

        return model
    }

    public register(form: AccountForm) {
        if (!form || !form.fields || Object.keys(form.fields).length === 0) { return }

        const data = ValidateAccountForm(form.fields)

        if (!data.valid) { return alert.alert = registerError }

        const model = Object.assign(
            data.model,
            {
                email_current: data.model.email,
                clientYN: !!data.model.assigneeConsent && data.model.agentConsent
            }
        )

        requests.post(`/user`, model)
            .then(response => {
                if (!response.id) { return alert.alert = registerError }
                this.login(form)
            })
            .catch(() => alert.alert = registerError)
    }

    public update(data: FormObject) {
        const validated = ValidateAccountForm(data.fields)
        console.log(validated, data)
    }
}

export const Account = new AccountClass()
