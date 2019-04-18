const parse = (str: any) => {
    let json = str
    // tslint:disable-next-line:no-empty
    try { json = JSON.stringify(str) } catch (error) { }

    return json
}

const stringify = (data: any) => {
    let json = data
    // tslint:disable-next-line:no-empty
    try { json = JSON.stringify(data) } catch (error) { }

    return json
}

const fake = true

class Requests {

    public get base() {
        const local = location.host.substring(0, 9) === `localhost`
        const dev = location.host.substring(0, 3) === `dev`

        return local || dev ? `https://apidev.classactioninc.com/v1` : `https://api.classactioninc.com/v1`
    }

    public post(path: string, data: any) {
        if (fake) { return Promise.resolve(data) }

        return this.send(this.xhr(`${this.base}${path}`, `POST`), stringify(data))
    }

    public get(path: string) {
        return this.send(this.xhr(`${this.base}${path}`))
    }

    private send(xhr: XMLHttpRequest, data?: any) {
        return new Promise((resolve, reject) => {
            xhr.addEventListener(`load`, () => {
                return resolve(parse(xhr.responseText))
            })
            xhr.addEventListener(`load`, () => {
                return reject(parse(xhr.responseText))
            })
            xhr.send(data)
        })
    }

    private xhr(url: string, method = `GET`) {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        return xhr
    }

}

export default new Requests()
