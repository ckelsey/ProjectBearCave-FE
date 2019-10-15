import constants from './constants'
import { Convert } from '@/utils/convert'

const workerString = `
self.onmessage = function (e) {
    var x = new XMLHttpRequest();

    x.open(e.data.method, e.data.url, true);
    x.setRequestHeader("Content-Type", "application/JSON");

    if(e.data.token){
        x.setRequestHeader("Authorization", e.data.token);
    }

    x.onload = function(res){ self.postMessage(JSON.stringify({status: 1, response: x.responseText})); }
    x.onerror = function(res){ self.postMessage(JSON.stringify({status: 0, response: x.response})); }
    x.send(e.data.data);
}`

class Requests {

    public request(method: string, url: string, data: any, token?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const workerBlob = new window.Blob([workerString], { type: `text/javascript` })
            const workerUrl = window.URL.createObjectURL(workerBlob)
            const worker = new Worker(workerUrl)

            url = `${url.substring(0, 4) === `http` ? `` : constants.apiBase}${url}`
            data = Convert(data).jsonString().value

            worker.onmessage = (e) => {
                window.URL.revokeObjectURL(workerUrl)

                if (!e || e.data === ``) {
                    return reject()
                }

                const result = Convert(e.data)
                    .jsonParse()
                    .ifInvalid({})
                    .value

                const response = Convert(result.response)
                    .jsonParse()
                    .ifInvalid({})
                    .value

                if (result.status !== 1) {
                    return reject(response)
                }

                return resolve(response)
            }

            worker.postMessage({ url, method, data, token })
        })
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
}

export default new Requests()
