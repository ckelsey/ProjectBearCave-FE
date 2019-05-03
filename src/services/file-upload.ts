import constants from './constants'
import user from './user/user'
import Subject from '@/utils/subject'

const bytesPerChunk = 647212

export const FileUpload$ = new Subject({})

export class FileUploader {
    public state$ = new Subject({
        error: null,
        progress: 0,
    })

    /** @desc The url to upload to */
    public uploadUrls: Array<{ url: string, expires: number }> = []

    public uploadedUrls: string[] = []

    /** @desc The file to upload */
    public file: File

    /** @desc If upload has been canceled */
    public stop = false

    /** @desc Number of chunks */
    public total: number = 0

    /** @desc Extension of the image */
    public ext: string = ``

    /** @desc Mime type of image */
    public mime: string = ``

    /** @desc Identifier for backend, can be used for resumable upload but is yet to be implemented */
    public uploadId: string = ``

    /** @desc File size */
    public size: number = 0

    /** @desc Upload web worker function string */
    public uploadWorker = `
        (function(c){let e=function(){this.boundary="----WebKitFormBoundary"+Math.random().toString(36).slice(2);this.type="multipart/form-data; boundary="+this.boundary;this.crlf="\\r\\n";this.pairs=[]};e.prototype.append=function(b,a){let c=Object.prototype.toString.call(a),f=function(a){return a.replace(/\\r/g,"%0D").replace(/\\n/g,"%0A").replace(/"/g,"%22")},d={disposition:'form-data; name="'+f(b||"")+'"'};b&&("[object File]"===c||"[object Blob]"===c?(d.disposition+='; filename="'+f(a.name||"blob")+'"',d.type=a.type||"application/octet-stream",d.value=a):d.value=String(a),this.pairs.push(d))};e.prototype.getBlob=function(){let b=[],a,e=this.pairs.length;for(a=0;a<e;a++)b.push("--"+this.boundary+this.crlf+"Content-Disposition: "+this.pairs[a].disposition),this.pairs[a].type&&b.push(this.crlf+"Content-Type: "+this.pairs[a].type),b.push(this.crlf+this.crlf),b.push(this.pairs[a].value),b.push(this.crlf);b.push("--"+this.boundary+"--"+this.crlf);return c.Blob?new Blob(b):(new c.FileReaderSync).readAsArrayBuffer(function(a){let b=new (c.BlobBuilder||c.WebKitBlobBuilder||c.MSBlobBuilder);(a||[]).forEach(function(a){b.append(a)});return b.getBlob()}(b))};c.FormDataBuilder=e})(this);
        self.onmessage = function (e) {
            try{
                const data = e.data;
                const form = new FormData();
                form.append('file', data.chunk)
                const x = new XMLHttpRequest();
                x.open("PUT", data.url, true);
                x.setRequestHeader('Content-type', 'application/octet-stream');
                x.onload = function(res){ self.postMessage('success'); }
                x.onerror = function(res){ self.postMessage('error'); }
                x.send(form);
            }catch(e){
                self.postMessage(e);
            }
        }`

    constructor(file: File) {
        this.file = file
    }

    /**
     * @desc Calls the progress callback with the current progress
     * @param index - The current chunk uploaded
     */
    public setProgress(index: number) {
        let progress = !index ? 0 : Math.ceil((index / this.total) * 100)

        if (progress > 100) { progress = 100 }

        return this.state$.next(
            Object.assign({}, this.state$.value, { progress })
        )
    }

    /** @desc Gets the translated error message */
    public error(msg?: string) {
        return this.state$.next(
            Object.assign({}, this.state$.value,
                { error: msg && msg !== `` ? msg : `Error during upload, please try again` }
            )
        )
    }

    /**
     * @desc Handles the upload request
     * @param index - The current chunk to upload
     */
    public uploadChunk(index: number) {
        if (this.stop) { return }

        const urlData: any = this.uploadUrls[index]
        const expires = urlData.expires
        let url = urlData.url

        const done = () => {
            this.uploadedUrls.push(url.split(`?`)[0])
            this.setProgress(index + 1)

            if (index + 1 === this.total) { return }

            return this.uploadChunk(index + 1)
        }

        const run = () => {
            // setup request data
            const data = {
                chunk: this.file.slice(index * bytesPerChunk, (index + 1) * bytesPerChunk),
                url
            }

            // if IE 11, don't use web worker
            if ((window as any).MSInputMethodContext) {
                const form = new FormData()
                form.append('file', data.chunk)
                const x = new XMLHttpRequest()
                x.open(`PUT`, data.url, true)
                x.onload = () => done()
                x.onerror = () => this.error()
                x.send(form);
            } else {
                // create web worker
                const workerBlob = new window.Blob([this.uploadWorker], { type: `text/javascript` })
                const workerUrl = window.URL.createObjectURL(workerBlob)
                const worker = new Worker(workerUrl)

                // when worker is done
                worker.onmessage = (e) => {
                    window.URL.revokeObjectURL(workerUrl)
                    if (e.data === `error`) { return this.error() }
                    return done()
                }

                // start worker
                worker.postMessage(data)
            }
        }

        if (expires < new Date().getTime()) {
            return this.getSignedUrls(index)
                .then(() => {
                    url = this.uploadUrls[index].url
                    return run()
                })
                .catch(this.error)
        }

        if (typeof url !== `string`) {
            return this.error(`invalid upload url`)
        }

        return run()
    }

    /** @desc cancel upload */
    public cancel() {
        this.stop = true
    }

    public getSignedUrls(index: number) {
        return new Promise((resolve) => {
            const authWorker = `
                self.onmessage = function (e) {
                    const x = new XMLHttpRequest();
                    x.open("POST", e.data.url, true);
                    x.setRequestHeader("Content-Type", "application/JSON");
                    x.onloadend = function(res){ self.postMessage(x.response); }
                    x.send(e.data.data);
                }`

            const workerBlob = new window.Blob([authWorker], { type: `text/javascript` })
            const workerUrl = window.URL.createObjectURL(workerBlob)
            const worker = new Worker(workerUrl)

            // when worker is done
            worker.onmessage = (e) => {
                window.URL.revokeObjectURL(workerUrl)

                if (!e || e.data === ``) {
                    return this.error()
                }

                let data: any

                try {
                    data = JSON.parse(e.data) as any
                } catch (error) {
                    return this.error()
                }

                if (!data || !Array.isArray(data)) {
                    return this.error()
                }

                this.uploadUrls = this.uploadUrls.slice(0, index - 1).concat(data)

                return resolve()
            }

            // start worker
            worker.postMessage({
                url: constants.apiUploadAuth,
                data: JSON.stringify({
                    userId: user.model$.value.id,
                    userToken: user.model$.value.token,
                    total: this.total - index,
                    mime: this.mime
                })
            })
        })
    }

    public start() {
        this.setProgress(0)
        this.uploadChunk(0)
    }

    public stitch() {
        const stitchWorker = `
        self.onmessage = function (e) {
            const x = new XMLHttpRequest();
            x.open("POST", e.data.url, true);
            x.setRequestHeader("Content-Type", "application/JSON");
            x.onloadend = function(res){ self.postMessage(x.response); }
            x.send(e.data.data);
        }`

        const workerBlob = new window.Blob([stitchWorker], { type: `text/javascript` })
        const workerUrl = window.URL.createObjectURL(workerBlob)
        const worker = new Worker(workerUrl)

        worker.onmessage = (e) => {
            window.URL.revokeObjectURL(workerUrl)

            if (!e || e.data === ``) {
                return this.error()
            }

            this.state$.next(
                Object.assign({}, this.state$.value, { url: e.data })
            )
        }

        // start worker
        worker.postMessage({
            url: constants.apiUploadStitch,
            data: JSON.stringify({
                userId: user.model$.value.id,
                userToken: user.model$.value.token,
                files: this.uploadedUrls,
                ext: this.ext
            })
        })
    }

    /** @desc Start the upload flow */
    public upload() {
        if (!this.file || !user.model$.value.id || !user.model$.value.token) {
            return this.state$.next({ error: `invalid data` })
        }

        FileUpload$.subscribe((val) => {
            if (val.cancel) {
                this.state$.next({ cancel: true })
            }
        })

        // settings
        this.total = Math.ceil(this.file.size / bytesPerChunk)
        this.mime = this.file.type
        this.ext = this.file.name.split(`.`).pop() as string

        const state = this.state$.subscribe((val) => {
            if (!val.cancel) {
                FileUpload$.next(val)
            }

            if (val.error) {
                return state()
            }

            if (val.cancel) {
                this.cancel()
                return state()
            }

            if (val.url) {
                return state()
            }

            if (val.progress === 100) {
                this.stitch()
            }
        })

        return this.getSignedUrls(0)
            .then(() => this.start())
    }
}
