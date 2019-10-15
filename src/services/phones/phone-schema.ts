// import Validate from '../validate'
// import Get from '@/utils/get'
// import { ModelField, FormObject, ModelButton } from '@/types'
// import Empty from '@/utils/empty'
// import Phones from './phones'

export interface ApiPhone {
    id: string
    phoneNum: string
    carrier: string
    type: string
    confirmed: 0 | 1
    endDate: Date
    startDate: Date
    isPrimary: number
    bill: any
    SMSVerification: {
        verified: 0 | 1
        status: string
    }
}

// export interface PhoneSchemaProperties {
//     carrier: ModelField
//     confirmed: ModelField
//     endDate: ModelField
//     file: ModelField
//     id: ModelField
//     primaryPhoneInd: ModelField
//     phoneNum: ModelField
//     SMSOK: ModelField
//     SMSVerification: ModelField
//     startDate: ModelField
//     type: ModelField
// }

// const phoneTypes = [{
//     label: `Mobile`,
//     value: `mobile`
// }, {
//     label: `Landline`,
//     value: `landline`
// }]

// const carrier: ModelField = {
//     error: ``,
//     fieldType: `text`,
//     key: `carrier`,
//     label: `Carrier`,
//     required: false,
//     validation: (form: any) => Validate.text(form.carrier)
// }

// const confirmed: ModelField = {
//     error: ``,
//     fieldType: `checkbox`,
//     key: `confirmed`,
//     label: `Confirmed`,
//     required: false,
//     validation: (form: FormObject) => Validate.oneOf([0, 1], Validate.number(form.confirmed).sanitized)
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
//     label: `Phone bill`,
//     get required() {
//         const form = this as any
//         return !form.SMSVerification
//     },
//     get showIf() {
//         const form = this as any
//         const notMobile = !Empty(form.type) && form.type !== `mobile`
//         const canNotSMS = form.SMSOK === 0 && form.type === `mobile`
//         return notMobile || canNotSMS
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

// const primaryPhoneInd: ModelField = {
//     error: ``,
//     fieldType: `checkbox`,
//     key: `primaryPhoneInd`,
//     label: `Primary`,
//     required: true,
//     validation: (form: FormObject) => Validate.oneOf([0, 1], Validate.number(form.primaryPhoneInd).sanitized)
// }

// const phoneNum: ModelField = {
//     error: ``,
//     fieldType: `text`,
//     key: `phoneNum`,
//     label: `Number`,
//     required: true,
//     validation: (form: any) => Validate.phone(form.phoneNum)
// }

// const SMSOK = {
//     error: ``,
//     fieldType: `checkbox`,
//     key: `SMSOK`,
//     label: `Verify via text?`,
//     get required() {
//         const form = this as any
//         return form.type === `mobile`
//     },
//     get showIf() {
//         const form = this as any
//         return form.type === `mobile`
//     },
//     validation: (form: FormObject) => Validate.oneOf([0, 1], Validate.number(form.SMSOK).sanitized)
// }

// const SMSVerification: ModelField = {
//     error: ``,
//     fieldType: `checkbox`,
//     key: `SMSVerification`,
//     label: `SMS Verified`,
//     model: (apiData: ApiPhone) => Get(apiData, `SMSVerification.verified`),
//     required: false,
//     validation: (form: FormObject) => Validate.oneOf([0, 1], Validate.number(form.SMSVerification).sanitized)
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

// const type: ModelField = {
//     error: ``,
//     fieldType: `select`,
//     key: `type`,
//     label: `Type`,
//     required: true,
//     options: phoneTypes,
//     validation: (form: FormObject) => Validate.oneOf(phoneTypes.map((v) => v.value), form.type)
// }

// export const PhoneSchema: PhoneSchemaProperties = {
//     carrier,
//     confirmed,
//     endDate,
//     file,
//     id,
//     primaryPhoneInd,
//     phoneNum,
//     SMSOK,
//     SMSVerification,
//     startDate,
//     type
// }

// const Add: ModelButton = {
//     action: Phones.add,
//     classes: [`btn`, `btn-secondary`],
//     label: `Add phone`,
//     position: `left`,
//     type: `button`,
//     get showIf() {
//         const form = this as any
//         return !form.id
//     }
// }

// const Delete: ModelButton = {
//     action: Phones.del,
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
//         return !!form.id && (form.SMSVerification !== 1 && form.confirmed !== 1)
//     }
// }

// const Update: ModelButton = {
//     action: Phones.update,
//     classes: [`btn`, `btn-secondary`],
//     label: `Update`,
//     position: `left`,
//     type: `button`,
//     get showIf() {
//         const form = this as any
//         return !!form.id
//     }
// }

// const VerifySMS: ModelButton = {
//     action: Phones.verify,
//     classes: [`btn`, `btn-primary`],
//     label: `Send SMS verification`,
//     position: `left`,
//     type: `button`,
//     get showIf() {
//         const form = this as any
//         return form.type === `mobile` && form.SMSOK === 1
//     }
// }

// const Verified: ModelButton = {
//     classes: [`color-primary`, `checkmark-before`],
//     label: `Verified`,
//     position: `left`,
//     type: `text`,
//     get showIf() {
//         const form = this as any
//         return form.SMSVerification === 1 || form.confirmed === 1
//     }
// }

// export const PhoneButtons = {
//     Add,
//     Delete,
//     NotVerified,
//     Update,
//     Verified,
//     VerifySMS,
// }

// export const PhoneFormFields: string[][] = [
//     [`phoneNum`, `type`],
//     [`startDate`, `endDate`],
//     [`primaryPhoneInd`, `SMSOK`],
//     [`file`]
// ]

// export const PhoneFormButtons: string[][] = [
//     [`Add`, `Update`, `VerifySMS`, `NotVerified`, `Verified`, `Delete`]
// ]
