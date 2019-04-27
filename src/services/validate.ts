import { ValidateResponse } from '@/types'

const invalidMessage = (input?: HTMLInputElement): string | undefined => {
    let message

    if (!input) { return undefined }

    try {
        message = input.validationMessage === `` ? undefined : input.validationMessage
        // tslint:disable-next-line:no-empty
    } catch (error) { }

    if (message && message[message.length - 1] === `.`) {
        message = message.substring(0, message.length - 1)
    }

    return message
}

const Empty = (val: any): boolean => {
    return val === undefined || val === false || val === null || val === `` || (Array.isArray(val) && val.length === 0)
}

class Validate {
    public static usZipCode(
        val: any,
    ): ValidateResponse {
        const original = val
        const reasons: string[] = []
        let result = val

        if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(val)) {
            result = undefined
            reasons.push(`invalid`)
        }

        return {
            original,
            valid: reasons.length === 0,
            sanitized: result,
            reason: reasons
        }
    }

    public static oneOf(
        options: any,
        val: any,
    ): ValidateResponse {
        const original = val
        const reasons: string[] = []
        let result = val

        if (options.indexOf(val) === -1) {
            result = undefined
            reasons.push(`invalid`)
        }

        return {
            original,
            valid: reasons.length === 0,
            sanitized: result,
            reason: reasons
        }
    }

    public static dateBefore(
        before: any,
        val: any,
    ): ValidateResponse {
        const original = val
        const reasons: string[] = []
        const parsedBefore = Date.parse(!!before ? before.toString() : ``)
        const parsedVal = Date.parse(!!val ? val.toString() : ``)
        let result = val

        if (isNaN(parsedBefore)) {
            result = null
            reasons.push(`invalid before date`)
        }

        if (isNaN(parsedVal)) {
            result = null
            reasons.push(`invalid date`)
        }

        if (parsedBefore <= parsedVal) {
            result = null
            reasons.push(`date is out of range`)
        }

        return {
            original,
            valid: reasons.length === 0,
            sanitized: result,
            reason: reasons
        }
    }

    public static year(
        val: any,
    ): ValidateResponse {
        const original = val
        const reasons: string[] = []
        const parsedVal = new Date(val).getUTCFullYear()
        const valString = !!val ? val.toString() : ``
        let result = val

        if (!!parsedVal && parsedVal.toString() !== valString) {
            result = undefined
            reasons.push(`invalid year`)
        }

        return {
            original,
            valid: reasons.length === 0,
            sanitized: result,
            reason: reasons
        }
    }

    public static dateAfter(
        after: any,
        val: any,
    ): ValidateResponse {
        const original = val
        const reasons: string[] = []
        const parsedAfter = Date.parse(!!after ? after.toString() : ``)
        const parsedVal = Date.parse(!!val ? val.toString() : ``)
        let result = val

        if (isNaN(parsedAfter)) {
            result = null
            reasons.push(`invalid after date`)
        }

        if (isNaN(parsedVal)) {
            result = null
            reasons.push(`invalid date`)
        }

        if (parsedAfter >= parsedVal) {
            result = null
            reasons.push(`date is out of range`)
        }

        return {
            original,
            valid: reasons.length === 0,
            sanitized: result,
            reason: reasons
        }
    }

    public static date(
        val: any,
        input?: HTMLInputElement
    ): ValidateResponse {
        const original = val
        const reasons: string[] = []
        const invalid = invalidMessage(input)
        let result = val

        if (invalid !== undefined) {
            reasons.push(invalid.toLowerCase())
        }

        if (isNaN(Date.parse(!!val ? val.toString() : ``))) {
            result = null
            reasons.push(`invalid date`)
        }

        return {
            original,
            valid: reasons.length === 0,
            sanitized: result,
            reason: reasons
        }
    }

    public static phone(
        val: any,
        input?: HTMLInputElement
    ): ValidateResponse {
        const original = val
        const reasons: string[] = []
        const invalid = invalidMessage(input)
        let result

        if (invalid !== undefined) {
            reasons.push(invalid.toLowerCase())
        }

        if (val) {
            const numberREGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            result = val.replace(/\D/g, '')

            if (result.length === 10) {
                result = `1${result}`
            }

            const length = result.length

            if (!numberREGEX.test(result)) {
                reasons.push(`invalid characters`)
            }

            if (length < 11) {
                reasons.push(`not enough digits`)
            }
        }

        return {
            original,
            valid: reasons.length === 0,
            sanitized: result,
            reason: reasons
        }
    }

    public static bool(
        val: any,
        input?: HTMLInputElement
    ): ValidateResponse {
        const original = val
        const reasons: string[] = []
        let result

        if (val === true || val === `on` || val === `true`) {
            result = true
        }

        if (val === false || val === `off` || val === `false`) {
            result = false
        }

        if (result === undefined) {
            result = false
            reasons.push(`not valid`)
        }

        const invalid = invalidMessage(input)

        if (invalid !== undefined) {
            reasons.push(invalid.toLowerCase())
        }

        return {
            original,
            valid: reasons.length === 0,
            sanitized: !!result,
            reason: reasons
        }
    }

    public static number(
        num: number,
        input?: HTMLInputElement
    ): ValidateResponse {
        const original = num
        const reasons: string[] = []
        const parsed = parseFloat(num as any)

        if (isNaN(parsed)) {
            reasons.push(`not a number`)
        }

        const invalid = invalidMessage(input)

        if (invalid !== undefined) {
            reasons.push(invalid.toLowerCase())
        }

        return {
            original,
            valid: reasons.length === 0,
            sanitized: parsed,
            reason: reasons
        }
    }

    public static email(
        str: string,
        allowedHtmlTags?: string[],
        disallowedHtmlTags?: string[],
        input?: HTMLInputElement
    ): ValidateResponse {
        const original = str

        if (Empty(str) || str.length === 0) {
            return {
                original,
                valid: false,
                sanitized: str,
                reason: [`no value`]
            }
        }

        if (!str) {
            str = ``
        }

        if (typeof str !== `string` && str !== undefined) {
            str = (str as any).toString()
        }

        const reasons: string[] = []
        const split = str.split(`@`)
        const invalid = invalidMessage(input)

        if (invalid !== undefined) {
            reasons.push(invalid.toLowerCase())
        }

        if (Empty(split[0])) {
            reasons.push(`missing username`)
        }

        if (split.length < 2) {
            if (!input) {
                reasons.push(`missing @ symbol`)
            }

            reasons.push(`missing domain, i.e. "mail.com"`)
        }

        if (split.length > 1) {
            const domain = split[1].split(`.`)

            if (Empty(domain[0]) || Empty(domain[1])) {
                reasons.push(`missing domain, i.e. "mail.com"`)
            }
        }

        if (reasons.length) {
            return {
                original,
                valid: false,
                sanitized: str,
                reason: reasons
            }
        }

        return Validate.html(str, allowedHtmlTags, disallowedHtmlTags)
    }

    public static text(
        str: any,
        allowedHtmlTags?: string[],
        disallowedHtmlTags?: string[],
        input?: HTMLInputElement
    ): ValidateResponse {
        const original = str
        const reasons = []
        const invalid = invalidMessage(input)

        if (invalid !== undefined) {
            reasons.push(invalid.toLowerCase())
        }

        if (Empty(str) || str.length === 0) {
            return {
                original,
                valid: false,
                sanitized: str,
                reason: reasons.concat([`no value`])
            }
        }

        if (typeof str !== `string`) {
            return {
                original,
                valid: false,
                sanitized: str,
                reason: reasons.concat([`not text, is a${Array.isArray(str) || typeof str === `object` ? `n` : ``} ${typeof str}`])
            }
        }

        const htmlResults = Validate.html(str, allowedHtmlTags, disallowedHtmlTags)

        htmlResults.reason = htmlResults.reason.concat(reasons)

        return htmlResults
    }

    public static html(
        str: string,
        allowedHtmlTags?: string[],
        disallowedHtmlTags?: string[]
    ) {
        const original = str
        const getElements = (Doc: Document, selector: string): HTMLElement[] => {
            return Array.from(Doc.body.querySelectorAll(selector))
        }
        const reasons: string[] = []

        if (Empty(str) || str.length === 0) {
            reasons.push(`no value`)
            return {
                original,
                valid: false,
                sanitized: str,
                reason: reasons
            }
        }

        if (typeof str !== `string`) {
            reasons.push(`not text, is ${typeof str}`)
            return {
                original,
                valid: false,
                sanitized: str,
                reason: reasons
            }
        }

        let doc: any

        try {
            doc = new DOMParser().parseFromString(str, `text/html`)
        } catch (error) {
            reasons.push(`no html present`)
            return {
                original,
                valid: true,
                sanitized: str,
                reason: reasons
            }
        }

        const totalElements = getElements(doc, `*`)
        let tagsToDestroy: string[] = []
        let elementsToDestroy: HTMLElement[] = []

        if (!Empty(disallowedHtmlTags) && disallowedHtmlTags) {
            tagsToDestroy = disallowedHtmlTags.slice(0)
        } else {
            tagsToDestroy = ([] as string[]).concat(svgTags.slice(0), htmlTags.slice(0))
        }

        if (!Empty(allowedHtmlTags) && allowedHtmlTags) {
            allowedHtmlTags.forEach((tag: string) => {
                const index = tagsToDestroy.indexOf(tag)

                if (index > -1) {
                    tagsToDestroy.splice(index, 1)
                }
            })
        }

        tagsToDestroy.forEach((tag: string) => {
            elementsToDestroy = ([] as HTMLElement[]).concat(getElements(doc, tag), elementsToDestroy)
        })

        elementsToDestroy.forEach((el: HTMLElement) => {
            if (el && el.parentNode) {

                const childrenLength = el.children.length
                let index = 0

                while (index < childrenLength) {
                    el.parentNode.insertBefore(el.children[index], el)
                    index = index + 1
                }

                el.parentNode.removeChild(el)
            }
        })

        const leftOverElements = getElements(doc, `*`)
        const diff = totalElements.length - leftOverElements.length
        const valid = diff === 0

        if (!valid) {
            reasons.push(`${diff} element${diff > 1 ? `s were` : ` was`} removed`)
        }

        return {
            original,
            valid,
            sanitized: valid ? str : Empty(doc.body.innerHTML) ? `` : doc.body.innerHTML,
            reason: reasons
        }
    }
}

const svgTags = Object.freeze([
    'svg',
    'a',
    'altglyph',
    'altglyphdef',
    'altglyphitem',
    'animatecolor',
    'animatemotion',
    'animatetransform',
    'audio',
    'canvas',
    'circle',
    'clippath',
    'defs',
    'desc',
    'ellipse',
    'filter',
    'font',
    'g',
    'glyph',
    'glyphref',
    'hkern',
    'image',
    'line',
    'lineargradient',
    'marker',
    'mask',
    'metadata',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialgradient',
    'rect',
    'stop',
    'style',
    'switch',
    'symbol',
    'text',
    'textpath',
    'title',
    'tref',
    'tspan',
    'video',
    'view',
    'vkern',
])

const htmlTags = Object.freeze([
    'a',
    'abbr',
    'acronym',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'bdi',
    'bdo',
    'big',
    'blink',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'center',
    'cite',
    'code',
    'col',
    'colgroup',
    'content',
    'data',
    'datalist',
    'dd',
    'decorator',
    'del',
    'details',
    'dfn',
    'dir',
    'div',
    'dl',
    'dt',
    'element',
    'em',
    'fieldset',
    'figcaption',
    'figure',
    'font',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'main',
    'map',
    'mark',
    'marquee',
    'menu',
    'menuitem',
    'meter',
    'nav',
    'nobr',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'section',
    'select',
    'shadow',
    'small',
    'source',
    'spacer',
    'span',
    'strike',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'tr',
    'track',
    'tt',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
])

export default Validate
