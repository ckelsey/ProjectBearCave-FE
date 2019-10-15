import Get from '@/utils/get'
import { AccountProperties, AccountForm, ApiUser } from './internal'
import { ValidateResponse } from '@/types'

export const ValidateAccount = (fields: ApiUser) => {
    const form = new AccountForm(fields)
    return ValidateAccountForm(form.fields)
}

export const ValidateAccountForm = (fields: any) => {
    const model: any = {}
    let valid = true

    AccountProperties.forEach(key => {
        const field = Get(fields, key)

        if (!field) {
            valid = false
            return
        }

        const validity: ValidateResponse = field.validation(fields)

        model[key] = validity.sanitized

        if (!validity.valid && field.required && field.showIf) {
            field.error = validity.reason.join(`, `)
            valid = false
        }
    })

    return { model, valid }
}
