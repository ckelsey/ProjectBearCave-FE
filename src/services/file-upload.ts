// https://github.com/ckelsey/nvidia_upload/blob/master/src/uploader.js

class FileUploader {
    /** @desc The url to upload to */
    public uploadUrl: string | string[] = ``

    /** @desc The url to upload to */
    public authUrl: string = ``

    /** @desc The file to upload */
    public file: File

    /** @desc The current user id */
    public userId: string

    /** @desc The current user token */
    public userToken: string

    /** @desc Progress callback */
    public progressCB: (progress: number) => any

    /** @desc How big to break up the chunks */
    public bytesPerChunk = 647212

    /** @desc If upload has been canceled */
    public stop = false

    /** @desc Number of chunks */
    public total: number = 0

    /** @desc The current chunk to upload */
    public chunkIndex: number = 0

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
                let data = e.data;
                let form = new FormDataBuilder();

                form.append("shipmentfile", data.chunk);

                if(data.thumb){
                    form.append("thumbnail", data.thumb);
                }

                let x = new XMLHttpRequest();
                x.open("POST", data.url, true);
                x.withCredentials = "true";

                if (form.type) {
                    x.setRequestHeader("Content-Type", form.type);
                }

                x.onloadend = function(res){
                    self.postMessage(x.response);
                }

                let dataToSend = form

                if(form.getBlob && typeof form.getBlob === 'function'){
                    dataToSend = form.getBlob()
                }

                x.send(dataToSend);
            }catch(e){
                self.postMessage(e);
            }
        }`

    constructor(file: File, userId: string, userToken: string, progressCB: (progress: number) => any, authUrl: string = ``, uploadUrl: string = ``) {
        this.uploadUrl = uploadUrl
        this.authUrl = authUrl
        this.file = file
        this.userId = userId
        this.userToken = userToken
        this.progressCB = progressCB
    }

    /**
     * @desc Calls the progress callback with the current progress
     * @param index - The current chunk uploaded
     */
    public setProgress(index: number) {
        let progress = !index ? 0 : Math.ceil((index / this.total) * 100)

        if (progress > 100) {
            progress = 100
        }

        if (typeof this.progressCB === `function`) {
            this.progressCB(progress)
        }
    }

    /** @desc Gets the translated error message */
    public error(msg?: string) {
        return msg && msg !== `` ? msg : `Error uploading image, please refresh the page and try again`
    }

    /**
     * @desc Called after a chunk upload, handles response
     * @param e - Upload web worker event
     */
    public onChunkUploaded(e: any): Promise<string> {

        // If no event, reject
        if (!e || e.data === ``) {
            return Promise.reject(this.error())
        }

        let data: any = {}

        // try to parse the event data
        try {
            data = JSON.parse(e.data) as any
            // tslint:disable-next-line:no-empty
        } catch (error) { }

        if (data.hasOwnProperty(`errorMessage`)) {
            return Promise.reject(this.error(data.errorMessage))
        }

        // increment current chunk index
        this.chunkIndex = this.chunkIndex + 1

        // update progress
        this.setProgress(this.chunkIndex)

        // if more chunks to upload
        if (this.chunkIndex <= this.total) {

            return this.uploadChunk(this.chunkIndex)

        } else {

            // if done, return the url in the response data
            return Promise.resolve(data.result.url)
        }
    }

    /**
     * @desc Handles the upload request
     * @param index - The current chunk to upload
     */
    public uploadChunk(index: number): Promise<string> {
        return new Promise((resolve, reject) => {
            // If upload has been canceled, resolve
            if (this.stop) {
                return resolve()
            }

            const url = Array.isArray(this.uploadUrl) ? this.uploadUrl[index] : this.uploadUrl

            if (typeof url !== `string`) {
                return reject(`invalid upload url`)
            }

            // setup request data
            const data = {
                chunk: this.file.slice(index * this.bytesPerChunk, (index + 1) * this.bytesPerChunk),
                url: url + '?userid=' + this.userId +
                    '&token=' + this.userToken +
                    '&shipmenttotalparts=' + this.total +
                    '&shipmentpartindex=' + this.chunkIndex +
                    '&shipmentuuid=' + this.uploadId +
                    '&shipmentfilename=' + this.file.name +
                    '&done=' + (this.total === this.chunkIndex ? 1 : 0)
            }

            // if IE 11, don't use web worker
            if ((window as any).MSInputMethodContext) {
                const form = new FormData()
                form.append(`shipmentfile`, data.chunk)
                const x = new XMLHttpRequest()
                x.open(`POST`, data.url, true)
                x.withCredentials = true
                // if (form.type) { x.setRequestHeader(`Content-Type`, form.type) }
                x.onload = () => {
                    return this.onChunkUploaded({ data: x.response })
                        .then(res => resolve(res))
                        .catch(res => reject(res))
                }
                x.onerror = () => { reject() }
                // x.send(form.getBlob ? form.getBlob() : form)
                x.send(form)
            } else {
                // create web worker
                const workerBlob = new window.Blob([this.uploadWorker], { type: `text/javascript` })
                const worker = new Worker(window.URL.createObjectURL(workerBlob))

                // when worker is done
                worker.onmessage = (e) => {
                    return this.onChunkUploaded(e)
                        .then(res => resolve(res))
                        .catch(res => reject(res))
                }

                // start worker
                worker.postMessage(data)
            }
        })
    }

    /** @desc cancel upload */
    public cancel() {
        this.stop = true
    }

    public doAuth() {
        return new Promise((resolve, reject) => {
            const authWorker = `
                self.onmessage = function (e) {
                    let data = e.data;

                    let x = new XMLHttpRequest();
                    x.open("POST", data.url, true);
                    x.withCredentials = "true";
                    x.setRequestHeader("Content-Type", "application/JSON");

                    x.onloadend = function(res){
                        self.postMessage(x.response);
                    }

                    x.send(data.data);
                }`

            const workerBlob = new window.Blob([authWorker], { type: `text/javascript` })
            const worker = new Worker(window.URL.createObjectURL(workerBlob))

            // when worker is done
            worker.onmessage = (e) => {
                // If no event, reject
                if (!e || e.data === ``) {
                    return reject(this.error())
                }

                let data: any = {}

                // try to parse the event data
                try {
                    data = JSON.parse(e.data) as any
                    // tslint:disable-next-line:no-empty
                } catch (error) { }

                if (data.hasOwnProperty(`errorMessage`)) {
                    return reject(this.error(data.errorMessage))
                }

                if (data.urls) {
                    this.uploadUrl = data.urls
                }

                return resolve(this.start)
            }

            // start worker
            worker.postMessage({
                url: this.authUrl,
                data: {
                    userId: this.userId,
                    userToken: this.userToken,
                    total: this.total
                }
            })
        })
    }

    public start() {
        return new Promise((resolve, reject) => {
            this.setProgress(this.chunkIndex)

            // Upload first chunk
            return this.uploadChunk(this.chunkIndex)
                .then(res => {

                    if (res) {
                        // last chunk response has a url
                        return resolve(res)
                    } else if (!res && this.stop) {
                        // upload was canceled
                        return resolve()
                    } else {
                        return reject(res || `An error occured`)
                    }
                })
                .catch(res => {
                    return reject(res)
                })
        })
    }

    /** @desc Start the upload flow */
    public upload(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.file || !this.userId || !this.userToken) {
                return reject(`invalid data`)
            }

            // settings
            this.size = this.file.size
            this.total = Math.ceil(this.size / this.bytesPerChunk)
            this.chunkIndex = 0
            this.uploadId = `${new Date().getTime()}${Math.round(Math.random() * 1000)}${this.size}${this.total}`
            this.mime = this.file.type
            this.ext = this.mime === `image/jpeg` ? `jpg` : `png`

            if (this.authUrl !== ``) {
                return this.doAuth()
                    .then((res) => {
                        return resolve(res as any)
                    })
                    .catch((res) => {
                        return reject(res as any)
                    })
            }

            return this.start()
                .then((res) => {
                    return resolve(res as any)
                })
                .catch((res) => {
                    return reject(res as any)
                })
        })
    }
}

export default FileUploader
