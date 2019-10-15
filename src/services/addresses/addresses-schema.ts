// import Validate from '../validate'
// import { ModelField, FormObject, ModelButton } from '@/types'
// import Addresses from './addresses'

export interface ApiAddress {
    id: string
    street: string
    city: string
    county: string
    country: string
    state: string
    zip: string
    endDate: Date
    startDate: Date
    isPrimary: number
    confirmed: 0 | 1
    utility: any
}

// const countries = [{
//     label: 'United States',
//     value: `United States`
// }]

// const states: { [key: string]: string } = {
//     AL: 'Alabama',
//     AK: 'Alaska',
//     AS: 'American Samoa',
//     AZ: 'Arizona',
//     AR: 'Arkansas',
//     CA: 'California',
//     CO: 'Colorado',
//     CT: 'Connecticut',
//     DC: 'District of Columbia',
//     DE: 'Delaware',
//     FL: 'Florida',
//     FM: 'Federated States of Micronesia',
//     GA: 'Georgia',
//     GU: 'Guam',
//     HI: 'Hawaii',
//     ID: 'Idaho',
//     IL: 'Illinois',
//     IN: 'Indiana',
//     IA: 'Iowa',
//     KS: 'Kansas',
//     KY: 'Kentucky',
//     LA: 'Louisiana',
//     ME: 'Maine',
//     MH: 'Marshall Islands',
//     MD: 'Maryland',
//     MA: 'Massachusetts',
//     MI: 'Michigan',
//     MN: 'Minnesota',
//     MS: 'Mississippi',
//     MO: 'Missouri',
//     MT: 'Montana',
//     NE: 'Nebraska',
//     NV: 'Nevada',
//     NH: 'New Hampshire',
//     NJ: 'New Jersey',
//     NM: 'New Mexico',
//     NY: 'New York',
//     NC: 'North Carolina',
//     ND: 'North Dakota',
//     MP: 'Northern Mariana Islands',
//     OH: 'Ohio',
//     OK: 'Oklahoma',
//     OR: 'Oregon',
//     PW: 'Palau',
//     PA: 'Pennsylvania',
//     PR: 'Puerto Rico',
//     RI: 'Rhode Island',
//     SC: 'South Carolina',
//     SD: 'South Dakota',
//     TN: 'Tennessee',
//     TX: 'Texas',
//     UT: 'Utah',
//     VT: 'Vermont',
//     VA: 'Virginia',
//     VI: 'Virgin Islands',
//     WA: 'Washington',
//     WV: 'West Virginia',
//     WI: 'Wisconsin',
//     WY: 'Wyoming',
// }

// const city = (model: string): ModelField => ({
//     error: ``,
//     fieldType: `text`,
//     key: `city`,
//     label: `City`,
//     required: true,
//     value: model,
//     validation: (form: FormObject) => Validate.text(form.city.value)
// })

// const confirmed = (model: number): ModelField => ({
//     error: ``,
//     fieldType: `checkbox`,
//     key: `confirmed`,
//     label: `Confirmed`,
//     required: false,
//     value: [0, 1].indexOf(model) > -1 ? model : 0,
//     validation: (form: FormObject) => Validate.oneOf([0, 1], Validate.number(form.confirmed.value).sanitized)
// })

// const county = (model: string): ModelField => ({
//     error: ``,
//     fieldType: `text`,
//     key: `county`,
//     label: `County`,
//     required: true,
//     value: model,
//     validation: (form: FormObject) => Validate.text(form.county.value)
// })

// const country = (model: string): ModelField => ({
//     error: ``,
//     fieldType: `select`,
//     key: `country`,
//     label: `Country`,
//     options: countries,
//     required: true,
//     value: model,
//     validation: (form: FormObject) => Validate.oneOf(countries.map((v) => v.value), form.country.value)
// })

// const current = (model: number): ModelField => ({
//     error: ``,
//     fieldType: `checkbox`,
//     key: `current`,
//     label: `Current`,
//     required: true,
//     value: [0, 1].indexOf(model) > -1 ? model : 1,
//     validation: (form: FormObject) => Validate.oneOf([0, 1], Validate.number(form.current.value).sanitized)
// })

// const endDate = (model: string): ModelField => ({
//     error: ``,
//     fieldType: `date`,
//     key: `endDate`,
//     label: `End date`,
//     required: false,
//     value: model,
//     validation: (form: FormObject) => {
//         if (!form.endDate.value || form.endDate.value === ``) {
//             return {
//                 original: ``,
//                 sanitized: ``,
//                 valid: true,
//                 reason: []
//             }
//         }

//         return Validate.dateAfter(
//             Validate.date(form.startDate.value).sanitized,
//             Validate.date(form.endDate.value).sanitized
//         )
//     }
// })

// const file = (model: string): ModelField => ({
//     error: ``,
//     fieldType: `file`,
//     key: `file`,
//     label: `Pay stub`,
//     required: true,
//     value: model,
//     validation: (form: FormObject) => Validate.url(form.file.value)
// })

// const id = (model: string): ModelField => ({
//     error: ``,
//     fieldType: `text`,
//     key: `id`,
//     label: `ID`,
//     required: false,
//     value: model,
//     validation: (form: FormObject) => Validate.text(form.id.value)
// })

// const startDate = (model: string): ModelField => ({
//     error: ``,
//     fieldType: `date`,
//     key: `startDate`,
//     label: `Start date`,
//     required: true,
//     value: model,
//     validation: (form: FormObject) =>
//         (!form.endDate.value || form.endDate.value === ``)
//             ? Validate.date(
//                 Validate.date(form.startDate.value).sanitized
//             )
//             : Validate.dateBefore(
//                 Validate.date(form.endDate.value).sanitized,
//                 Validate.date(form.startDate.value)
//             )
// })

// const state = (model: string): ModelField => ({
//     error: ``,
//     fieldType: `select`,
//     key: `state`,
//     label: `State`,
//     options: Object.keys(states).map((key: string) => ({ value: key, label: states[key] })),
//     required: true,
//     value: model,
//     validation: (form: FormObject) => Validate.oneOf(Object.keys(states), form.state.value)
// })

// const street = (model: string): ModelField => ({
//     error: ``,
//     fieldType: `text`,
//     key: `street`,
//     label: `Street`,
//     required: true,
//     value: model,
//     validation: (form: FormObject) => Validate.text(form.street.value)
// })

// const zip = (model: string): ModelField => ({
//     error: ``,
//     fieldType: `text`,
//     key: `zip`,
//     label: `Zip`,
//     required: true,
//     value: model,
//     validation: (form: FormObject) => Validate.usZipCode(form.zip.value)
// })

// export const AddressSchema = {
//     city,
//     county,
//     country,
//     confirmed,
//     current,
//     endDate,
//     file,
//     id,
//     startDate,
//     state,
//     street,
//     zip
// }

// const Add = (form: FormObject): ModelButton => ({
//     action: Addresses.add,
//     classes: [`btn`, `btn-secondary`],
//     label: `Add address`,
//     position: `left`,
//     type: `button`,
//     get showIf() {
//         return !form.id.value
//     }
// })

// const Delete = (form: FormObject): ModelButton => ({
//     action: Addresses.del,
//     classes: [`color-danger`, `pointer`],
//     label: `Delete`,
//     position: `right`,
//     type: `text`,
//     get showIf() {
//         return !!form.id.value
//     }
// })

// const NotVerified = (form: FormObject): ModelButton => ({
//     classes: [`color-danger`, `close-before`],
//     label: `Not verified`,
//     position: `left`,
//     type: `text`,
//     get showIf() {
//         return !!form.id.value && form.confirmed.value !== 1
//     }
// })

// const Update = (form: FormObject): ModelButton => ({
//     action: Addresses.update,
//     classes: [`btn`, `btn-secondary`],
//     label: `Update`,
//     position: `left`,
//     type: `button`,
//     get showIf() {
//         return !!form.id.value
//     }
// })

// const Verified = (form: FormObject): ModelButton => ({
//     classes: [`color-primary`, `checkmark-before`],
//     label: `Verified`,
//     position: `left`,
//     type: `text`,
//     get showIf() {
//         return form.confirmed.value === 1
//     }
// })

// export const AddressButtons = {
//     Add,
//     Delete,
//     NotVerified,
//     Update,
//     Verified
// }

// export const AddressFormFields: string[][] = [
//     [`company`, `current`],
//     [`startDate`, `endDate`],
//     [`file`]
// ]

// export const AddressFormButtons: string[][] = [
//     [`Add`, `Update`, `NotVerified`, `Verified`, `Delete`]
// ]
