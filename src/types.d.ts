export interface UserCredentials{
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