import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import user from '@/services/user'
import { UserCredentials, ValidateResponse } from '@/types'
import Errors from '@/services/error'
import Validate from '@/services/validate'
import Inputs from '@/services/inputs'
import Utils from '@/services/utils';

interface FormInput {
    name: string
    value: string
    register: boolean
    validation: ValidateResponse
    inputType: string
    label: string
}

interface FormInputs {
    [key: string]: FormInput
}

const fields = [
    { name: `fname`, type: `text`, label: `First name` },
    { name: `lname`, type: `text`, label: `Last name` },
    { name: `email_current`, type: `email`, label: `Email` },
    { name: `password`, type: `password`, label: `Password` },
    { name: `confirmPassword`, type: `password`, label: `Confirm password` }
]

const registerInputs = [`confirmPassword`, `fname`, `lname`]

const isRegisterInput = (name: string) => registerInputs.indexOf(name) > -1

const setEmpty = (input: HTMLInputElement) => {
    const notEmpty = Inputs.empty(input)
    const hasNotEmptyClass = input.classList.contains(`not-empty`)

    if (notEmpty && !hasNotEmptyClass) {
        input.classList.add(`not-empty`)
    }

    if (!notEmpty && hasNotEmptyClass) {
        input.classList.remove(`not-empty`)
    }
}

const setFocus = (input: HTMLInputElement) => {
    const focused = Inputs.focused(input)
    const hasFocusedClass = input.classList.contains(`focused`)

    if (focused && !hasFocusedClass) {
        input.classList.add(`focused`)
    }

    if (!focused && hasFocusedClass) {
        input.classList.remove(`focused`)
    }
}

@Component({})
export default class LoginForm extends Vue {

    public state = state

    public formData: FormInputs = {}
    public enigma = false
    public consent = {
        agent: {
            value: false,
            error: ``
        },
        assignee: {
            value: false,
            error: ``
        }
    }

    public validateInput(input: FormInput) {
        let method = Validate.text

        if (input.name === `email_current`) {
            method = Validate.email
        }

        if (input.name === `confirmPassword`) {
            method = (val) => ({
                original: val,
                sanitized: val,
                valid: val === this.formData.password.value,
                reason: val === this.formData.password.value ? [] : [`password does not match`]
            })
        }

        this.formData[input.name].validation = method(this.formData[input.name].value)
    }

    public validate() {
        const isLogin = this.state.state === `login`

        Object.keys(this.formData).forEach((key) => {
            if (isLogin && isRegisterInput(key)) { return }
            this.validateInput(this.formData[key])
        })
    }

    public loginRegister() {
        if (this.enigma) {
            window.location.href = `https://www.youtube.com/watch?v=JPVOPzYiCeg`
        }

        this.validate()

        const isLogin = this.state.state === `login`
        const data: any = {}
        let method = user.login
        let valid = true

        Object.keys(this.formData).forEach((key) => {
            if (isLogin && isRegisterInput(key)) { return }

            if (this.formData[key].validation.valid) {
                data[key] = this.formData[key].validation.sanitized
            } else {
                valid = false
            }
        })

        if (!isLogin) {
            if (!this.consent.agent.value) {
                this.consent.agent.error = `required`
                valid = false
            } else {
                this.consent.agent.error = ``
            }

            if (!this.consent.assignee.value) {
                this.consent.assignee.error = `required`
                valid = false
            } else {
                this.consent.assignee.error = ``
            }
        }

        if (!valid) { return }

        if (!isLogin) {
            method = user.register
        }

        return method(data as UserCredentials)
            .then(() => {
                this.state.state = `account`
             })
            .catch(Errors.alert)
    }

    public checkInputState() {

        const inputs = Array.from(document.body.querySelectorAll(`.login-register-form input`))
        inputs.forEach((input) => {

            setEmpty(input as HTMLInputElement)
            setFocus(input as HTMLInputElement)
        })
    }

    public formInput(inputData: FormInput) {
        this.checkInputState()

        if (!inputData.validation.valid) {
            this.validateInput(inputData)
        }
    }

    public switchForm(type: string) {
        Utils.scrollToTop(100)
        this.createData()
        this.state.state  = type
    }

    public createData() {
        const formData: FormInputs = {}

        fields.forEach((field) => {
            formData[field.name] = {
                name: field.name,
                inputType: field.type,
                label: field.label,
                register: isRegisterInput(field.name),
                value: ``,
                validation: {
                    sanitized: ``,
                    original: ``,
                    reason: [],
                    valid: true
                }
            }

        })

        this.formData = Object.assign({}, formData)

        const inputs = Array.from(document.body.querySelectorAll(`.login-register-form input`))
        inputs.forEach((input) => {
            input.classList.remove(`focused`)
            input.classList.remove(`not-empty`)
        })
    }

    public mounted() {
        this.createData()
        this.switchForm(this.state.state)
    }
}
