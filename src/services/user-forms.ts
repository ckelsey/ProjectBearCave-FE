import { UserSchema } from './user-schema'
import Get from '@/utils/get'

const getSchema = (path: string) => Object.assign({}, Get(UserSchema.properties, path))

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

        model: item,
        key: modelKey
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
