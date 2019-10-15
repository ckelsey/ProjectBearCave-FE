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

export interface FormObject {
    [key: string]: ModelField
}

export interface ModelField {
    error: string
    fieldType: string
    key: string
    label: string
    required: boolean
    options?: { label: string, value: any }[]
    showIf?: boolean
    validation: (val: FormObject) => ValidateResponse
    value: any
    model?: (val: any) => any
}

export interface ModelButton {
    action?: (any: any) => any
    classes: string[]
    label: string
    position: string
    type: string
    showIf: boolean
}
