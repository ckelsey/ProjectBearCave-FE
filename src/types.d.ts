export interface UserCredentials {
    email_current: string
    password: string
    fname?: string
    lname?: string
    confirmPassword?: string
}

export interface ValidateResponse {
    original: any
    valid: boolean
    sanitized: any
    reason: string[]
}

export interface PhoneModel {
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

export interface AddressModel {
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

export interface EmploymentModel {
    company:string
    endDate: Date
    startDate: Date
    current: number
    stub: any
}

export interface VehicleModel {
    make: string
    model: string
    year: string
    vin: string
    endDate: Date
    startDate: Date
    current: number
}

export interface UserModel {
    id: string
    fname: string
    lname: string
    email: string
    password: string
    claimcount: number
    clientYN: number
    token: string
    refreshToken: string
    phoneNumbers: PhoneModel[]
    address: AddressModel[]
    employment: EmploymentModel[]
    vehicle: VehicleModel[]
}
