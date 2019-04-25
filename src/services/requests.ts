const parse = (str: any): any => {
    let json = str
    // tslint:disable-next-line:no-empty
    try { json = JSON.parse(str) } catch (error) { }

    return json
}

const stringify = (data: any): any => {
    let json = data
    // tslint:disable-next-line:no-empty
    try { json = JSON.stringify(data) } catch (error) { }

    return json
}

class Requests {

    public get base() {
        const local = location.host.substring(0, 9) === `localhost`
        const dev = location.host.substring(0, 3) === `dev`

        return local || dev ? `https://apidev.classactioninc.com/v1` : `https://api.classactioninc.com/v1`
    }

    public setData(xhr: XMLHttpRequest, data: any, token?: string) {
        if (data) {

            if (data.token) {
                xhr.setRequestHeader(`Authorization`, data.token)
            }

            xhr.setRequestHeader(`Content-Type`, `application/json`)
        }

        if (token) {
            xhr.setRequestHeader(`Authorization`, token)
        }

        return xhr
    }

    public request(type: string, path: string, data?: any, token?: string) {
        return this.send(
            this.setData(
                this.xhr(`${path.substring(0, 4) === `http` ? `` : this.base}${path}`, type),
                data, token),
            stringify(data))
    }

    public del(path: string, data?: any, token?: string) {
        return this.request(`DELETE`, path, data, token)
    }

    public put(path: string, data?: any, token?: string) {
        return this.request(`PUT`, path, data, token)
    }

    public post(path: string, data?: any, token?: string) {
        return this.request(`POST`, path, data, token)
    }

    public get(path: string, data?: any, token?: string) {
        return this.request(`GET`, path, data, token)
    }

    private send(xhr: XMLHttpRequest, data?: any) {
        return new Promise((resolve, reject) => {
            xhr.addEventListener(`load`, (): any => {
                return resolve(parse(xhr.responseText))
            })
            xhr.addEventListener(`error`, (): any => {
                return reject(parse(xhr.responseText))
            })
            xhr.send(data)
        })
    }

    private xhr(url: string, method = `GET`) {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url, true)
        return xhr
    }

}

export default new Requests()
