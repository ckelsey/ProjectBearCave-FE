interface StringObject { [key: string]: string }

class State {
    public query: StringObject = {}
    public urlStates: any = []
    private State: string = `home`

    public get state() {
        return this.State
    }

    public set state(val) {
        this.setState(`p`, val)
    }

    constructor() {
        this.query = this.setQuery()

        // Update states on popstate
        window.addEventListener('popstate', () => {
            const last = this.urlStates.pop()

            if (this.urlStates.length) {
                if (JSON.stringify(last) === JSON.stringify(this.urlStates[this.urlStates.length - 1])) {
                    this.urlStates.pop()
                    return history.back()
                }
            }
        })
    }

    public getQuery(): StringObject {
        const searchString: string = window.location.search
        const results: StringObject = {}

        if (!searchString) {
            return results
        }

        const search: string[] = searchString.substr(1).split('&')

        search.forEach((s) => {
            const key = s.split('=').shift()

            if (key) {
                const val: string = s.split(`${key}=`)[1]

                if (val && val !== 'undefined' && val !== '') {
                    results[key] = val
                }
            }
        })

        this.query = this.clearEmptyQuery(results)

        return this.query
    }

    public clearEmptyQuery(query: StringObject): StringObject {
        if (!query) {
            return {}
        }

        Object.keys(query).forEach((key) => {
            if (query[key] === `` || query[key] === `undefined` || query[key] === `null` || query[key] === null || query[key] === undefined) {
                delete query[key]
            }
        })

        return query
    }

    public setState(key: string, val: string): StringObject {
        if (!key || key === ``) {
            return this.query
        }

        this.setQuery(Object.assign({}, this.query, { [key]: val }))

        return this.query
    }

    public setQuery(data?: StringObject) {
        this.query = this.clearEmptyQuery((data || this.getQuery()))

        if (this.query[`p`]) {
            this.State = this.query[`p`]
        }

        history.replaceState(this.query, window.document.title, window.location.origin + window.location.pathname + this.getQueryString(this.query))

        return this.query
    }

    public getQueryString(data: StringObject): string {
        const params: string[] = []

        Object.keys(data).forEach((key) => {
            params.push(`${key}=${data[key]}`)
        })

        if (params.length === 0) {
            return ``
        }

        return `?${params.join(`&`)}`
    }
}

export default new State()
