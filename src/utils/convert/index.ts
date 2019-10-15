import Empty from '../empty'

export interface ConvertMethods {
    array: () => ConvertMethods
    bind: (This: any) => ConvertMethods
    boolean: () => ConvertMethods
    commasToArray: () => ConvertMethods
    decodeUri: () => ConvertMethods
    encodeUri: () => ConvertMethods
    entities: () => ConvertMethods
    function: () => ConvertMethods
    ifEmpty: (v: any) => ConvertMethods
    ifInvalid: (v: any) => ConvertMethods
    ifNot: (toCompare: any, v: any) => ConvertMethods
    indexOf: (arr: any[]) => ConvertMethods
    jsonParse: () => ConvertMethods
    jsonString: () => ConvertMethods
    number: () => ConvertMethods
    object: () => ConvertMethods
    plainText: () => ConvertMethods
    replace: (find: any, replacement: any) => ConvertMethods
    value: any
    valid: boolean
    date: () => ConvertMethods
}

export const Convert = (data: any, valid: boolean = true): ConvertMethods => {
    const decodeUri = (d: any) => Convert(decodeURI(d), typeof d === `string`)
    const encodeUri = (d: any) => Convert(encodeURI(d), typeof d === `string`)
    const htmlEntities = (d: any) => Convert(
        (typeof d !== `string` ? `` : d)
            .replace(/&amp;/g, '<')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
            .replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g, '\''),
        // .replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        typeof d === `string`
    )

    const JsonParse = (d: any) => {
        let validity = true
        try {
            d = JSON.parse(d)
        } catch (error) {
            validity = false
        }

        return Convert(d, validity)
    }

    const JsonString = (d: any) => {
        let validity = true
        try {
            d = JSON.stringify(d)
        } catch (error) {
            validity = false
        }

        return Convert(d, validity)
    }

    const bool = (d: any) => {
        if (d === `undefined`) { d = false }
        if (d === `null`) { d = false }
        if (d === `0`) { d = false }
        if (d === `false`) { d = false }
        return Convert(!!d, true)
    }

    const array = (d: any) => {
        if (typeof d === `string`) {
            d = JsonParse(htmlEntities(decodeUri(data).value).value).value
        }

        return Convert(d, Array.isArray(d))
    }

    const object = (d: any) => {
        if (typeof d === `string`) {
            d = JsonParse(htmlEntities(decodeUri(d).value).value).value
        }

        return Convert(d, typeof d === `object`)
    }

    const aNumber = (d: any) => {
        if (isNaN(d)) {
            d = parseFloat(d)
        }

        return Convert(d, !isNaN(d))
    }

    const aFunction = (d: any) => Convert(d, typeof d === `function`)

    const commasToArray = (d: any) => {
        if (Array.isArray(d)) {
            return Convert(d, true)
        }
        if (typeof d !== `string`) {
            return Convert(d, false)
        }

        return Convert(
            d
                .split(`,`)
                .map(
                    (v: string) => v.trim()
                )
                .filter((v) => !!v && v !== `undefined` && v !== `null`),
            true
        )
    }

    const replace = (find: any, replacement: any, d: any) => {
        const r = Convert(d).value
        r.replace(find, replacement)
        return Convert(r, true)
    }

    const date = (d: any) => {
        d = new Date(d)
        return Convert(d, (d !== `Invalid Date`) && !isNaN(d))
    }

    const methods = {
        array: () => array(data),
        bind: (This: any) => Convert(data.bind(This)),
        boolean: () => bool(data),
        commasToArray: () => commasToArray(data),
        decodeUri: () => decodeUri(data),
        encodeUri: () => encodeUri(data),
        entities: () => htmlEntities(data),
        function: () => aFunction(data),
        ifEmpty: (v: any) => Convert(Empty(methods.value) ? v : methods.value),
        ifInvalid: (v: any) => Convert(methods.valid ? methods.value : v, methods.valid),
        ifNot: (toCompare: any, v: any) => Convert(toCompare === methods.value ? methods.value : v),
        indexOf: (arr: any[]) => Convert(data, arr.indexOf(data) > -1),
        jsonParse: () => JsonParse(data),
        jsonString: () => JsonString(data),
        number: () => aNumber(data),
        object: () => object(data),
        plainText: () => htmlEntities(decodeUri(data).value),
        replace: (find: any, replacement: any) => replace(find, replacement, data),
        value: data,
        valid,
        date: () => date(data)
    }

    for (const key in methods) {
        if (typeof (methods as any)[key] === 'function') {
            (methods as any)[key] = (methods as any)[key].bind(methods)
        }
    }

    return methods
}
