class Requests {

    public get base() {
        return `https://apidev.classactioninc.com`
    }

    constructor() {
        this.get(`/user/1`)
    }

    public post(path: string, data: any) {
        let Data

        try {
            Data = JSON.stringify(data)
        } catch (error) {
            Data = data
        }

        const xhr = this.xhr(`${this.base}${path}`, `POST`)

        xhr.addEventListener(`load`, () => {
            console.log(xhr)
        })

        xhr.send(Data)
    }

    public get(path: string) {
        const xhr = this.xhr(`${this.base}${path}`)
        xhr.addEventListener(`load`, () => {
            console.log(xhr)
        })
        xhr.send()
    }

    private xhr(url: string, method = `GET`) {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        return xhr
    }

}

export default new Requests()
