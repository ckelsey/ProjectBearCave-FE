class Inputs {
    public static empty(input: any) {
        if (!input) { return false }

        if (input.value && input.value !== ``) {
            return true
        }

        const nativeMatches = (input.matches || input.msMatchesSelector)

        try {
            return nativeMatches.call(input, `:-webkit-autofill`)
        } catch (error) {
            try {
                return nativeMatches.call(input, `:-moz-autofill`)
            } catch (error) {
                try {
                    return nativeMatches.call(input, `:-ms-autofill`)
                } catch (error) {
                    try {
                        return nativeMatches.call(input, `:-o-autofill`)
                    } catch (error) {
                        try {
                            return nativeMatches.call(input, `:autofill`)
                        } catch (error) {
                            return false
                        }
                    }
                }
            }
        }
    }

    public static focused(input: any) {
        if (!input) { return false }

        if (input[`focused`]) {
            return true
        }

        const nativeMatches = (input.matches || input.msMatchesSelector)

        try {
            return nativeMatches.call(input, `:focus`)
        } catch (error) {
            return false
        }
    }

    public static value(input: any) {
        if (!input) { return undefined }

        const type = input.type
        let value = input.value

        if (type === `checkbox` || type === `radio`) {
            value = input.checked
        }

        if (type === `select` && input.selectedOptions) {
            value = input.selectedOptions
        }

        return value
    }
}

export default Inputs
