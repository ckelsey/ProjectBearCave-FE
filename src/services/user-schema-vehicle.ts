import { requiredText, current, endDate, startDate } from './user-schema-helpers'
import Validate from './validate'

export const vehicle = {
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
