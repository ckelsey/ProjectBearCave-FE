import { UserSchema } from './user-schema'
import Get from '@/utils/get'
import User from './user'
import state from './state'

const getSchema = (path: string) => Object.assign({}, Get(UserSchema.properties, path))

const formatHeading = (item: any, type: string) => {
    switch (type) {
        case `account`: return `${item.fname[0].toUpperCase}${item.fname.substring(1)}`
        case `phoneNumbers`:
            return item.phoneNum ?
                `${
                !!item.phoneNum ? item.phoneNum.toString()[0] : ``
                } (${
                !!item.phoneNum ? item.phoneNum.toString().substring(1, 4) : ``
                }) ${
                !!item.phoneNum ? item.phoneNum.toString().substring(4, 7) : ``
                }-${
                !!item.phoneNum ? item.phoneNum.toString().substring(7) : ``
                }`
                : ``

        case `address`: return item.street
        case `vehicle`: return `${item.model[0].toUpperCase}${item.model.substring(1)}`
        case `employment`: return `${item.company[0].toUpperCase}${item.company.substring(1)}`
    }
}

const generate = (schema: any, order: string[][], modelKey: string, model: any) => {
    const newForm: any = []
    const existingForms: any = []
    let value

    const map = (item: any) => ({
        form: order.map((row: string[]) =>
            row.map((key: string) => {
                value = item[key]

                if (schema[key].model) {
                    value = schema[key].model(item)
                }

                if (!item.hasOwnProperty(key)) {
                    value = ``
                }

                return Object.assign(
                    {},
                    Object.assign(
                        {},
                        schema[key],
                        { key }
                    ),
                    { value }
                )
            })
        ),
        get heading() {
            return formatHeading(item, modelKey)
        },
        model: item,
        key: modelKey,
        buttons: FormButtons(item)[modelKey]
    })

    if (modelKey === `account` && !!model) {
        existingForms.push(map(model))

        return {
            newForm,
            existingForms,
            model
        }
    }

    newForm.push(map({}))

    if (model[modelKey] && typeof model[modelKey].forEach === `function`) {
        model[modelKey].forEach((item: any) => existingForms.push(map(item)))
    }

    return {
        newForm,
        existingForms
    }
}

export const FormFields: any = {
    account: [
        [`fname`, `lname`],
        [`email`],
        [`password`, `confirmPassword`]
    ],
    address: [
        [`street`],
        [`city`, `county`, `state`],
        [`country`, `zip`],
        [`startDate`, `endDate`, `isPrimary`],
        [`utility`]
    ],
    employment: [
        [`company`, `current`],
        [`startDate`, `endDate`],
        [`stub`]
    ],
    phoneNumbers: [
        [`phoneNum`, `type`, `carrier`],
        [`startDate`, `endDate`, `isPrimary`],
        [`bill`]
    ],
    vehicle: [
        [`make`, `model`, `year`],
        [`startDate`, `endDate`],
        [`vin`, `current`]
    ]
}

/** TODO to check if values have been updated */
export function FormCompare(data: any) {
    const formData = DataFromForm(data)

    return {
        values: formData,
        dirty: true
    }
}

const cancelClickAndGetData = (e: Event, data: any) => {
    if (e) { e.preventDefault() }

    const formData = DataFromForm(data)

    if (!formData.valid) {
        state.alert = {
            msg: `Invalid data`,
            active: true,
            status: `alert-error`,
            closeIn: 2000
        }
        return
    }

    return formData.results
}

const mergeData = (data: any) => data ? Object.assign({}, User.model$.value, data) : undefined

const submitData = (e: Event, data: any, key: string) =>
    key === `account` ?
        User.update(mergeData(cancelClickAndGetData(e, data)))
        : User.updateData(cancelClickAndGetData(e, data), key)

const submitVerifySMS = (e: Event, data: any) => User.verifyPhone(mergeData(cancelClickAndGetData(e, data)))

const deleteData = (e: Event, data: any, key: string) => User.deleteData(mergeData(cancelClickAndGetData(e, data)), key)

export function FormButtons(item: any): any {
    const standardButtons = (key: string) => {
        const standard: any[] = [{
            label: `Add`,
            type: `button`,
            position: `left`,
            classes: [`btn-secondary`],
            get condition() { return !item.id },
            action: (e: Event, data: any) => submitData(e, data, key),
        }, {
            label: `Update`,
            type: `button`,
            position: `left`,
            classes: [`btn-secondary`],
            get condition() { return item.id },
            action: (e: Event, data: any) => submitData(e, data, key),
        }, {
            label: `Delete`,
            type: `text`,
            position: `right`,
            classes: [`color-danger`, `pointer`],
            get condition() { return !!item.id },
            action: (e: Event, data: any) => deleteData(e, data, key),
        }]

        const phones: any[] = [{
            label: `SMS Verification`,
            type: `button`,
            position: `left`,
            classes: [`btn-primary`],
            get condition() { return !!item.id && item.SMSVerification !== 1 && item.type === `mobile` },
            action: (e: Event, data: any) => submitVerifySMS(e, data),
        }, {
            label: `Verified`,
            type: `text`,
            position: `left`,
            classes: [`color-primary`, `checkmark-before`],
            get condition() { return item.SMSVerification === 1 || item.confirmed === 1 },
        }, {
            label: `Not verified`,
            type: `text`,
            position: `left`,
            classes: [`color-danger`, `close-before`],
            get condition() { return !!item.id && item.SMSVerification !== 1 && item.confirmed !== 1 },
        }]

        if (key === `phoneNumbers`) {
            return standard.concat(phones)
        }

        return standard
    }

    return {
        account: [
            {
                label: `Update`,
                type: `button`,
                position: `left`,
                classes: [`btn-secondary`],
                get condition() { return User.model$.value.active === 1 },
                action: (e: Event, data: any) => submitData(e, data, `account`),
            }, {
                label: `Reactivate`,
                type: `button`,
                position: `left`,
                classes: [`btn-primary`],
                get condition() { return User.model$.value.active === 0 },
                action: (e: Event) => {
                    if (e) { e.preventDefault() }
                    User.activate()
                },
            }, {
                label: `Deactivate`,
                type: `text`,
                position: `right`,
                classes: [`color-danger`, `pointer`],
                get condition() { return User.model$.value.active === 1 },
                action: (e: Event) => {
                    if (e) { e.preventDefault() }
                    User.deactivate()
                },
            },
        ],
        phoneNumbers: standardButtons(`phoneNumbers`),
        address: standardButtons(`address`),
        employment: standardButtons(`employment`),
        vehicle: standardButtons(`vehicle`),
    }
}

export function FormFieldsFlat() {
    const results: { [key: string]: string[] } = {}

    Object.keys(FormFields).forEach((key: string) => {
        results[key] = []
        FormFields[key].forEach((row: string[]) => {
            row.forEach((field: string) => {
                results[key].push(field)
            })
        })
    })

    return results
}

export function UserForm(type: string, user: any) {
    const model = Object.assign({}, user)

    if (type === `account`) {
        return Object.assign(
            generate(
                Object.assign({}, getSchema(``)),
                FormFields.account,
                type,
                model
            ),
            { updateOnly: true }
        )
    }

    return generate(
        Object.assign({}, getSchema(`${type}.properties`)),
        FormFields[type],
        type,
        model
    )
}

export function DataFromForm(formData: any) {
    const results: any = {
        results: {},
        valid: true
    }

    const original: any = [].concat(formData)

    const searchForField = (searchKey: string) => {
        if (!searchKey) { return }
        let fieldValue
        let rowCount = original.length

        while (rowCount-- && fieldValue === undefined) {
            const row = original[rowCount]
            let fieldCount = row.length

            while (fieldCount-- && fieldValue === undefined) {
                const field = row[fieldCount]

                if (field.key === searchKey) {
                    fieldValue = field.value
                }
            }
        }

        return fieldValue
    }

    formData = formData.map((row: any) => {
        return row.map((field: any) => {
            field.error = ``
            results.results[field.key] = field.value

            if (!!field.value && field.validation && typeof field.validation === `function`) {
                const validation = field.validation(field.value, searchForField(field.validationRequires))

                if (!validation.valid) {
                    results.valid = false
                    field.error = field.errorMessage || `invalid`
                }
            }

            if (field.required) {
                if (field.value === `` || field.value === undefined) {
                    results.valid = false
                    field.error = `this field is required`
                }
            }

            return field
        })
    })

    return results
}
