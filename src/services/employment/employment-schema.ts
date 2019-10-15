// import Validate from '../validate'
// import { ModelField, FormObject, ModelButton } from '@/types'
// import Employment from './employment'

export interface ApiEmployment {
    company: string
    endDate: Date
    startDate: Date
    current: number
    stub: any
}

// export interface EmploymentSchemaProperties {
//     company: ModelField
//     confirmed: ModelField
//     current: ModelField
//     endDate: ModelField
//     file: ModelField
//     id: ModelField
//     startDate: ModelField
// }

// const company: ModelField = {
//     error: ``,
//     fieldType: `text`,
//     key: `company`,
//     label: `Company`,
//     required: true,
//     validation: (form: any) => Validate.text(form.company)
// }

// const confirmed: ModelField = {
//     error: ``,
//     fieldType: `checkbox`,
//     key: `confirmed`,
//     label: `Confirmed`,
//     required: false,
//     validation: (form: FormObject) => Validate.oneOf([0, 1], Validate.number(form.confirmed).sanitized)
// }

// const current: ModelField = {
//     error: ``,
//     fieldType: `checkbox`,
//     key: `current`,
//     label: `Current`,
//     required: true,
//     validation: (form: FormObject) => Validate.oneOf([0, 1], Validate.number(form.current).sanitized)
// }

// const endDate: ModelField = {
//     error: ``,
//     fieldType: `date`,
//     key: `endDate`,
//     label: `End date`,
//     required: false,
//     validation: (form: FormObject) => {
//         if (!form.endDate || form.endDate === ``) {
//             return {
//                 original: ``,
//                 sanitized: ``,
//                 valid: true,
//                 reason: []
//             }
//         }

//         return Validate.dateAfter(
//             Validate.date(form.startDate).sanitized,
//             Validate.date(form.endDate).sanitized
//         )
//     }
// }

// const file: ModelField = {
//     error: ``,
//     fieldType: `file`,
//     key: `file`,
//     label: `Pay stub`,
//     required: true,
//     validation: (form: any) => Validate.url(form.file)
// }

// const id: ModelField = {
//     error: ``,
//     fieldType: `text`,
//     key: `id`,
//     label: `ID`,
//     required: false,
//     validation: (form: any) => Validate.text(form.id)
// }

// const startDate: ModelField = {
//     error: ``,
//     fieldType: `date`,
//     key: `startDate`,
//     label: `Start date`,
//     required: true,
//     validation: (form: FormObject) =>
//         (!form.endDate || form.endDate === ``)
//             ? Validate.date(
//                 Validate.date(form.startDate).sanitized
//             )
//             : Validate.dateBefore(
//                 Validate.date(form.endDate).sanitized,
//                 Validate.date(form.startDate)
//             )
// }

// export const EmploymentSchema: EmploymentSchemaProperties = {
//     company,
//     confirmed,
//     current,
//     endDate,
//     file,
//     id,
//     startDate,
// }

// const Add: ModelButton = {
//     action: Employment.add,
//     classes: [`btn`, `btn-secondary`],
//     label: `Add job`,
//     position: `left`,
//     type: `button`,
//     get showIf() {
//         const form = this as any
//         return !form.id
//     }
// }

// const Delete: ModelButton = {
//     action: Employment.del,
//     classes: [`color-danger`, `pointer`],
//     label: `Delete`,
//     position: `right`,
//     type: `text`,
//     get showIf() {
//         const form = this as any
//         return !!form.id
//     }
// }

// const NotVerified: ModelButton = {
//     classes: [`color-danger`, `close-before`],
//     label: `Not verified`,
//     position: `left`,
//     type: `text`,
//     get showIf() {
//         const form = this as any
//         return !!form.id && form.confirmed !== 1
//     }
// }

// const Update: ModelButton = {
//     action: Employment.update,
//     classes: [`btn`, `btn-secondary`],
//     label: `Update`,
//     position: `left`,
//     type: `button`,
//     get showIf() {
//         const form = this as any
//         return !!form.id
//     }
// }

// const Verified: ModelButton = {
//     classes: [`color-primary`, `checkmark-before`],
//     label: `Verified`,
//     position: `left`,
//     type: `text`,
//     get showIf() {
//         const form = this as any
//         return form.confirmed === 1
//     }
// }

// export const EmploymentButtons = {
//     Add,
//     Delete,
//     NotVerified,
//     Update,
//     Verified
// }

// export const EmploymentFormFields: string[][] = [
//     [`company`, `current`],
//     [`startDate`, `endDate`],
//     [`file`]
// ]

// export const EmploymentFormButtons: string[][] = [
//     [`Add`, `Update`, `NotVerified`, `Verified`, `Delete`]
// ]
