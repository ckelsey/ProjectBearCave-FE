import Validate from '../validate'
import { Account } from './internal'
import { ModelField, FormObject, ModelButton } from '@/types'
import { ApiVehicle } from '../vehicles/vehicles-schema'
import { ApiEmployment } from '../employment/employment-schema'
import { ApiAddress } from '../addresses/addresses-schema'
import { ApiPhone } from '../phones/phone-schema'
import routes from '../routes/routes'
import constants from '../constants';
import Empty from '@/utils/empty';

export interface ApiUser {
    id: string
    fname: string
    lname: string
    email: string
    password: string
    claimcount: number
    clientYN: number
    token: string
    refreshToken: string
    phoneNumbers: ApiPhone[]
    address: ApiAddress[]
    employment: ApiEmployment[]
    vehicle: ApiVehicle[]
}

export interface AccountPropertyTypes {
    active?: number
    agentConsent: boolean
    assigneeConsent: boolean
    clientYN?: number
    confirmPassword?: string
    email: string
    fname: string
    lname: string
    password?: string
    id?: string
    refreshToken?: string
    token?: string
}

const Fields = (that: any, page?: string): { [key: string]: ModelField } => {
    return {
        active: {
            error: ``,
            fieldType: `checkbox`,
            key: `active`,
            label: `Active`,
            required: false,
            value: [0, 1].indexOf(that.model.active) > -1 ? that.model.active : 1,
            validation: (form: FormObject) => Validate.oneOf([0, 1], Validate.number(form.active.value).sanitized)
        },

        agentConsent: {
            error: ``,
            fieldType: `checkbox`,
            key: `agentConsent`,
            label: `<span class="checkbox-label">Allow ${constants.companyName} to be your agent</span><span class="checkbox-message"> An 'agent' is someone who works on your behalf. In this context, it lets me file your claims, and keep an eye on any court activity that might affect you.</span>`,
            required: true,
            get showIf() {
                return page === `register`
            },
            value: that.model && that.model.clientYN === 1,
            validation: (form: FormObject) => {
                const val = form.agentConsent.value === true || form.agentConsent.value === `true` || form.agentConsent.value === `on`
                return {
                    sanitized: val,
                    original: val,
                    valid: val === true,
                    reason: val === true ? [] : [`required to register`]
                }
            }
        },

        assigneeConsent: {
            error: ``,
            fieldType: `checkbox`,
            key: `assigneeConsent`,
            label: `<span class="checkbox-label">Allow ${constants.companyName} to be your assignee</span><span class="checkbox-message">An 'assignee' is someone you designate to receive something. In this case, it gives my creators the legal right to collect payments for you.</span>`,
            required: true,
            get showIf() {
                return page === `register`
            },
            value: that.model && that.model.clientYN === 1,
            validation: (form: FormObject) => {
                const val = form.assigneeConsent.value === true || form.assigneeConsent.value === `true` || form.assigneeConsent.value === `on`
                return {
                    sanitized: val,
                    original: val,
                    valid: val === true,
                    reason: val === true ? [] : [`required to register`]
                }
            }
        },

        clientYN: {
            error: ``,
            fieldType: `checkbox`,
            key: `clientYN`,
            label: `Client agreement`,
            required: false,
            value: [0, 1].indexOf(that.model.clientYN) > -1 ? that.model.clientYN : 0,
            validation: (form: FormObject) => Validate.oneOf([0, 1], Validate.number(form.clientYN.value).sanitized)
        },

        confirmPassword: {
            error: ``,
            fieldType: `password`,
            key: `confirmPassword`,
            label: `Confirm password`,
            get required() {
                return !Empty(that.fields.password.value)
            },
            get showIf() {
                return that.model.id || page === `register`
            },
            value: that.model.confirmPassword,
            validation: (form: any) => ({
                valid: form.password.value === form.confirmPassword.value,
                sanitized: form.confirmPassword.value,
                original: form.confirmPassword.value,
                reason: form.password.value === form.confirmPassword.value ? [] : [`passwords don't match`]
            })
        },
        email: {
            error: ``,
            fieldType: `email`,
            key: `email`,
            label: `Email`,
            required: true,
            showIf: true,
            validation: (form: FormObject) => Validate.email(form.email.value),
            value: that.model.email
        },

        fname: {
            error: ``,
            fieldType: `text`,
            key: `fname`,
            label: `First name`,
            required: true,
            get showIf() {
                return !!that.model.id || page === `register`
            },
            validation: (form: FormObject) => Validate.text(form.fname.value),
            value: that.model.fname
        },

        id: {
            error: ``,
            fieldType: `text`,
            key: `id`,
            label: `ID`,
            required: false,
            showIf: false,
            validation: (form: FormObject) => Validate.text(form.id.value),
            value: that.model.id
        },

        lname: {
            error: ``,
            fieldType: `text`,
            key: `lname`,
            label: `Last name`,
            required: true,
            get showIf() {
                return !!that.model.id || page === `register`
            },
            validation: (form: FormObject) => Validate.text(form.lname.value),
            value: that.model.lname
        },

        password: {
            error: ``,
            fieldType: `password`,
            key: `password`,
            label: `Password`,
            get required() {
                return !that.model.id
            },
            showIf: true,
            validation: (form: FormObject) => Validate.text(form.password.value),
            value: that.model.password
        },

        refreshToken: {
            error: ``,
            fieldType: `text`,
            key: `refreshToken`,
            label: `Refresh token`,
            required: false,
            showIf: false,
            validation: (form: FormObject) => Validate.text(form.refreshToken.value),
            value: that.model.refreshToken
        },

        token: {
            error: ``,
            fieldType: `text`,
            key: `token`,
            label: `Token`,
            required: false,
            showIf: false,
            validation: (form: FormObject) => Validate.text(form.token.value),
            value: that.model.token
        }
    }
}

const Buttons = (that: any, page?: string): ModelButton[] => {
    return [
        {
            action: () => Account.login(that),
            classes: [`btn`, `btn-secondary`],
            label: `Sign in`,
            position: `left`,
            type: `button`,
            get showIf() {
                return !that.model.id && page === `login`
            }
        }, {
            action: () => Account.register(that),
            classes: [`btn`, `btn-secondary`],
            label: `Sign up`,
            position: `left`,
            type: `button`,
            get showIf() {
                return !that.model.id && page === `register`
            }
        }, {
            action: () => Account.update(that),
            classes: [`btn`, `btn-secondary`],
            label: `Update`,
            position: `left`,
            type: `button`,
            get showIf() {
                return !!that.model.id
            }
        }, {
            action: () => Account.activate(),
            classes: [`btn`, `btn-primary`],
            label: `Reactivate`,
            position: `left`,
            type: `button`,
            get showIf() {
                return !!that.model.id && that.model.active === 0
            }
        }, {
            action: () => Account.deactivate(),
            classes: [`color-danger`, `pointer`],
            label: `Deactivate`,
            position: `right`,
            type: `text`,
            get showIf() {
                return !!that.model.id && that.model.active === 1
            }
        }, {
            action: () => routes.route(`login`),
            classes: [`color-primary`, `pointer`],
            label: `Have an account?`,
            position: `right`,
            type: `text`,
            get showIf() {
                return !that.model.id && page === `register`
            }
        }, {
            action: () => routes.route(`register`),
            classes: [`color-primary`, `pointer`],
            label: `Need an account?`,
            position: `right`,
            type: `text`,
            get showIf() {
                return !that.model.id && page === `login`
            }
        }
    ]
}

export const AccountProperties = Object.keys(Fields({ model: {} }))

export class AccountForm {
    public model: any
    public fields: any
    public form: ModelField[][] = []
    public buttons: ModelButton[] = []

    constructor(model: any, page?: string) {
        this.model = model || {}
        this.buttons = Buttons(this, page)
        this.fields = Fields(this, page)

        this.form = [
            [this.fields.fname, this.fields.lname],
            [this.fields.email],
            [this.fields.password, this.fields.confirmPassword],
            [this.fields.agentConsent],
            [this.fields.assigneeConsent]
        ]
    }
}
