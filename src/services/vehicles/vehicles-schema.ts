// import Validate from '../validate'
// import { ModelField, FormObject, ModelButton } from '@/types'
// import Vehicles from './vehicles'
// import Empty from '@/utils/empty';

export interface ApiVehicle {
    make: string
    model: string
    year: string
    vin: string
    endDate: Date
    startDate: Date
    current: number
}

// export interface VehicleSchemaProperties {
//     confirmed: ModelField
//     current: ModelField
//     endDate: ModelField
//     file: ModelField
//     id: ModelField
//     make: ModelField
//     model: ModelField
//     startDate: ModelField
//     year: ModelField
//     vin: ModelField
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
//     label: `VIN image`,
//     get required() {
//         const form = this as any
//         return Empty(form.vin)
//     },
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

// const make: ModelField = {
//     error: ``,
//     fieldType: `text`,
//     key: `make`,
//     label: `Make`,
//     required: true,
//     validation: (form: any) => Validate.text(form.make)
// }

// const model: ModelField = {
//     error: ``,
//     fieldType: `text`,
//     key: `model`,
//     label: `Model`,
//     required: true,
//     validation: (form: any) => Validate.text(form.model)
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

// const vin: ModelField = {
//     error: ``,
//     fieldType: `text`,
//     key: `vin`,
//     label: `VIN`,
//     get required() {
//         const form = this as any
//         return Empty(form.file)
//     },
//     validation: (form: any) => Validate.text(form.vin)
// }

// const year: ModelField = {
//     error: ``,
//     fieldType: `text`,
//     key: `year`,
//     label: `Year`,
//     required: true,
//     validation: (form: any) => Validate.text(form.year)
// }

// export const VehicleSchema: VehicleSchemaProperties = {
//     confirmed,
//     current,
//     endDate,
//     file,
//     id,
//     make,
//     model,
//     startDate,
//     year,
//     vin
// }

// const Add: ModelButton = {
//     action: Vehicles.add,
//     classes: [`btn`, `btn-secondary`],
//     label: `Add vehicle`,
//     position: `left`,
//     type: `button`,
//     get showIf() {
//         const form = this as any
//         return !form.id
//     }
// }

// const Delete: ModelButton = {
//     action: Vehicles.del,
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
//     action: Vehicles.update,
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

// export const VehicleButtons = {
//     Add,
//     Delete,
//     NotVerified,
//     Update,
//     Verified
// }

// export const VehicleFormFields: string[][] = [
//     [`make`, `model`, `year`],
//     [`startDate`, `endDate`, `current`],
//     [`file`, `vin`]
// ]

// export const VehicleFormButtons: string[][] = [
//     [`Add`, `Update`, `NotVerified`, `Verified`, `Delete`]
// ]
