import Validate from './validate'

const confirmed = {
    type: `number`,
    key: `confirmed`,
    validation: (val: any) => Validate.oneOf([0, 1], Validate.number(val).sanitized)
}

const requiredText = {
    type: `text`,
    formField: true,
    required: true,
    error: ``,
    validation: (val: any) => Validate.text(val)
}

const notRequiredText = {
    type: `text`,
    validation: (val: any) => Validate.text(val)
}

const startDate = {
    type: `date`,
    key: `startDate`,
    formField: true,
    required: true,
    error: ``,
    validation: (val: any, EndDate: any) => {
        if (!val || val === ``) {
            return true
        }

        let processed = Validate.date(val)

        if (EndDate && EndDate !== ``) {
            processed = Validate.dateBefore(val, EndDate)
        }

        return processed
    }
}

const endDate = {
    type: `date`,
    key: `endDate`,
    formField: true,
    required: false,
    error: ``,
    validation: (val: any, StartDate: any) => {
        if (!val || val === ``) {
            return true
        }

        let processed = Validate.date(val)

        if (StartDate && StartDate !== ``) {
            processed = Validate.dateAfter(val, StartDate)
        }

        return processed
    }
}

const phoneTypes = [{
    label: `Mobile`,
    value: `mobile`
}, {
    label: `Landline`,
    value: `landline`
}]

const states = {
    AL: 'Alabama',
    AK: 'Alaska',
    AS: 'American Samoa',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'District of Columbia',
    DE: 'Delaware',
    FL: 'Florida',
    FM: 'Federated States of Micronesia',
    GA: 'Georgia',
    GU: 'Guam',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MH: 'Marshall Islands',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    MP: 'Northern Mariana Islands',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PW: 'Palau',
    PA: 'Pennsylvania',
    PR: 'Puerto Rico',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    VI: 'Virgin Islands',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
}

const countries = {
    'United States': `United States`
}

const current = {
    type: `checkbox`,
    key: `current`,
    formField: true,
    required: false,
    error: ``,
    validation: (val: any) => Validate.bool(val)
}

const password = {
    type: `password`,
    key: `password`,
    formField: true,
    required: false,
    error: ``,
    label: `Password`,
    validationRequires: `confirmPassword`,
    validation: (val: string, other: string) => ({
        valid: val === other,
        sanitized: val,
        original: val,
        reason: val === other ? [] : [`passwords don't match`]
    })
}

export const UserSchema = {
    properties: {
        clientYN: Object.assign({ key: `clientYN` }, confirmed),
        email: {
            type: `email`,
            key: `email`,
            formField: true,
            required: true,
            error: ``,
            label: `Email`,
            validation: (val: any) => Validate.email(val)
        },
        fname: Object.assign({ label: `First name`, key: `fname` }, requiredText),
        lname: Object.assign({ label: `Last name`, key: `lname` }, requiredText),
        password,
        confirmPassword: Object.assign({}, password, { key: `confirmPassword`, label: `Confirm password`, validationRequires: `password` }),
        id: Object.assign({ key: `id` }, notRequiredText),
        refreshToken: Object.assign({ key: `refreshToken` }, notRequiredText),
        token: Object.assign({ key: `token` }, notRequiredText),
        phoneNumbers: {
            type: `array`,
            properties: {
                phoneNum: {
                    type: `text`,
                    formField: true,
                    required: true,
                    error: ``,
                    label: `Number`,
                    key: `phoneNum`,
                    validation: (val: any) => Validate.phone(val)
                },
                SMSVerification: {
                    model: (val: any) => val.SMSVerification && val.SMSVerification.hasOwnProperty(`verified`) ? val.SMSVerification.verified : val.SMSVerification,
                    type: `number`,
                    key: `SMSVerification`,
                    validation: confirmed.validation
                },
                type: {
                    type: `select`,
                    formField: true,
                    required: true,
                    error: ``,
                    options: phoneTypes,
                    label: `Type`,
                    key: `type`,
                    validation: (val: any) => Validate.oneOf(phoneTypes.map((v) => v.value), val)
                },
                id: Object.assign({ key: `id` }, notRequiredText),
                carrier: Object.assign({ label: `Carrier`, key: `carrier` }, requiredText),
                confirmed,
                endDate: Object.assign({ label: `End date` }, endDate),
                startDate: Object.assign({ label: `Start date` }, startDate),
                isPrimary: Object.assign({}, current, { label: `Primary`, key: `isPrimary` }),
                bill: {
                    type: `file`,
                    formField: true,
                    required: true,
                    error: ``,
                    label: `Phone bill`,
                    key: `bill`,
                    validation: (val: any) => ({ valid: !!val, sanitized: val })
                }
            }
        },
        address: {
            type: `array`,
            properties: {
                city: Object.assign({ label: `City`, key: `city` }, requiredText),
                county: Object.assign({ label: `County`, key: `county` }, requiredText),
                country: {
                    type: `select`,
                    options: countries,
                    formField: true,
                    required: true,
                    error: ``,
                    key: `country`,
                    label: `Country`,
                    validation: (val: any) => Validate.oneOf(Object.keys(countries), val)
                },
                confirmed,
                endDate: Object.assign({}, endDate, { label: `Move out date` }),
                startDate: Object.assign({}, startDate, { label: `Move in date` }),
                isPrimary: Object.assign({}, current, { label: `Primary`, key: `isPrimary` }),
                state: {
                    type: `select`,
                    options: states,
                    formField: true,
                    required: true,
                    error: ``,
                    key: `state`,
                    label: `State`,
                    validation: (val: any) => Validate.oneOf(Object.keys(states), val)
                },
                street: Object.assign({}, requiredText, { label: `Street`, key: `street` }),
                zip: {
                    type: `text`,
                    formField: true,
                    required: true,
                    error: ``,
                    label: `Zip`,
                    key: `zip`,
                    validation: (val: any) => Validate.usZipCode(val)
                },
                id: {
                    model: (val: any) => val._id ? val._id : val.id,
                    type: `text`,
                    key: `id`,
                    validation: (val: any) => Validate.text(val)
                },
                utility: {
                    type: `file`,
                    formField: true,
                    required: true,
                    error: ``,
                    label: `Utility bill`,
                    key: `utility`,
                    validation: (val: any) => ({ valid: !!val, sanitized: val })
                }
            }
        },
        employment: {
            type: `array`,
            properties: {
                company: Object.assign({}, requiredText, { label: `Company`, key: `company` }),
                endDate: Object.assign({}, endDate, { label: `Start date` }),
                startDate: Object.assign({}, startDate, { label: `Leave date` }),
                current: Object.assign({}, current, { label: `Current` }),
                stub: {
                    type: `file`,
                    formField: true,
                    required: true,
                    error: ``,
                    label: `Pay stub`,
                    key: `stub`,
                    validation: (val: any) => ({ valid: !!val, sanitized: val })
                }
            }
        },
        vehicle: {
            type: `array`,
            properties: {
                make: Object.assign({}, requiredText, { label: `Make`, key: `make` }),
                model: Object.assign({}, requiredText, { label: `Model`, key: `model` }),
                vin: Object.assign({}, requiredText, { label: `VIN`, key: `vin` }),
                year: {
                    type: `year`,
                    formField: true,
                    required: true,
                    error: ``,
                    label: `Year`,
                    key: `year`,
                    validation: (val: any) => Validate.year(val)
                },
                endDate: Object.assign({}, endDate, { label: `Purchase date` }),
                startDate: Object.assign({}, startDate, { label: `Sell date` }),
                current: Object.assign({}, current, { label: `Current` })
            }
        }
    }
}

export function UserDataToAPI(data: any, urlKey: string) {
    const toConvert = Object.assign({}, data)
    let toApi

    switch (urlKey) {
        case `phonenum`:
            toApi = {
                carrier: toConvert.carrier,
                endDate: toConvert.endDate,
                startDate: toConvert.startDate,
                phoneNum: toConvert.phoneNum,
                type: toConvert.type
            }
            break

        case `address`:
            toApi = {
                zip: toConvert.zip,
                street: toConvert.street,
                state: toConvert.state,
                county: toConvert.county,
                country: toConvert.country,
                city: toConvert.city,
                isPrimary: toConvert.isPrimary,
                endDate: toConvert.endDate,
                startDate: toConvert.startDate,
            }
            break


        default:
            toApi = toConvert
            break
    }

    return toApi
}
