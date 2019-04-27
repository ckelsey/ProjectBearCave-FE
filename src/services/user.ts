/** TODO
 * collapse forms
 * DECOUPLE UPLOADS AND USER
 * bug when adding phones
 * can't update anything
 */

import requests from './requests'
import { UserCredentials, UserModel } from '@/types'
import Subject from '@/utils/subject'
import FileUploader from './file-upload'
import constants from './constants'
import Observable from '@/utils/observable'
import { ObserverObject } from '@/utils/types'
import { UserSchema, UserDataToAPI, ValidateData } from './user-schema'
import { FormFieldsFlat } from './user-forms';

const urlKeys: { [key: string]: string } = {
    phoneNumbers: `phonenum`,
    address: `address`,
    employment: `employment`,
    vehicle: `vehicle`
}

class User {
    public model$: Subject
    public ready$: Subject
    public loggedIn$: Subject
    public uploader$: Subject
    public verifing$: Subject
    public completionStats$: Subject

    constructor() {
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.logout = this.logout.bind(this)

        this.model$ = new Subject({})
        this.ready$ = new Subject(false)
        this.loggedIn$ = new Subject(false)
        this.uploader$ = new Subject(undefined)
        this.verifing$ = new Subject({ data: null, show: false })
        this.completionStats$ = new Subject({
            account: 0,
            phone: 0,
            employment: 0,
            vehicle: 0,
            address: 0
        })

        let existing: any = localStorage.getItem(`CAI-USER`)

        try {
            existing = JSON.parse(existing as string)
        } catch (error) {
            existing = {}
        }

        this.modelUser(existing)
        this.getUser(existing)

            // tslint:disable-next-line:align
            ; (window as any).user = this
    }

    public getDefault(key: string) {
        const props = UserSchema.properties as any
        const data = props[key]
        let result: any

        if (!data) {
            return result
        }

        result = {}

        Object.keys(data.properties).forEach((p) => {
            if (!data.properties[p].formField) { return }

            switch (data.properties[p].type) {
                case `number`:
                case `file`:
                    result[p] = undefined
                    break

                case `checkbox`:
                    result[p] = false

                case `email`:
                case `select`:
                case `year`:
                case `date`:
                case `text`:
                    result[p] = ``
                    break
            }
        })

        return result
    }

    public getData(urlKey: string, property: string) {
        return requests.get(`/user/${this.model$.value.id}/${urlKey}`, {}, this.model$.value.token)
            .then((response: any) => {
                return this.modelUser(
                    Object.assign(
                        {},
                        this.model$.value,
                        { [property]: response }
                    )
                )
            })
            .catch((err) => {
                /** TODO */
                return Promise.reject(err)
            })
    }

    public getUser(data: any) {
        if (!data || !data.token) {
            this.loggedIn$.next(false)
            this.setReady()
            return Promise.resolve()
        }

        return requests.get(`/user/${data.id}`, data)
            .then((response: any) => {

                if (!response.id) { throw new Error(response) }

                this.modelUser(
                    Object.assign(
                        {},
                        data,
                        response
                    )
                )

                return this.getData(`phonenum`, `phoneNumbers`)
            })
            .catch(() => {
                return this.refreshToken(data)
            })
    }

    public refreshToken(data: UserModel) {
        /** TODO GET REFRESH PATH */
        return requests.get(`/user/${data.id}`, data)
            .then((response: any) => {

                if (!response.id) {
                    /** TODO get refresh path */
                    throw new Error(response)
                    // return
                }

                return this.modelUser(
                    Object.assign(
                        {},
                        data,
                        response
                    )
                )
            })
            .catch(() => {
                return this.logout()
            })
    }

    public setCompletionStats() {
        const model = this.model$.value
        const stats = this.completionStats$.value
        const fields = FormFieldsFlat()

        Object.keys(fields).forEach((key: string) => {
            const fieldCount = fields[key].length

            if (key === `account`) {
                stats[key] = fields[key].filter((field: string) => {
                    return !!model[field]
                }).length / (fieldCount - 2) // - 2 for passwords

                return
            }

            stats[key] = fields[key].filter((field: string) => {
                return !!model[key] && model[key].length && !!model[key][0][field]
            }).length / fieldCount
        })

        this.completionStats$.next(stats)
    }

    public modelUser(data: any) {
        if (!data || !data.token) {
            localStorage.removeItem(`CAI-USER`)
            this.model$.next({})
            this.loggedIn$.next(false)
            this.setReady()
            return this.model$.value
        }

        if (data.password) {
            delete data.password
        }

        if (data.confirmPassword) {
            delete data.confirmPassword
        }

        const model = ValidateData(data)

        this.model$.next(model)
        this.loggedIn$.next(!!model.token)
        this.setCompletionStats()

        localStorage.setItem(`CAI-USER`, JSON.stringify(this.model$.value))

        this.setReady()
    }

    public update(data: any): Promise<UserModel> {
        if (!this.loggedIn$.value || !data) { return Promise.reject() }

        return new Promise((resolve, reject) => {
            const model = Object.assign({}, this.model$.value, ValidateData(data))

            return requests.put(`/user/${model.id}`, model)
                .then((response: any) => {
                    if (response.ok !== 1) { throw new Error(response) }

                    this.modelUser(model)

                    return resolve()

                })
                .catch((error) => {
                    /** TODO handle error */
                    return reject(error)
                })
        })
    }

    public updateData(data: any, modelKey: string) {
        if (!data || !modelKey) { return Promise.reject() }

        const urlKey = urlKeys[modelKey]

        if (!urlKey) { return Promise.reject(`invalid url`) }

        return new Promise((resolve, reject) => {
            if (!this.loggedIn$.value) { return reject(`not logged in`) }
            if (!data || !urlKey || !modelKey) { return reject(`no value`) }

            const userId = this.model$.value.id
            const token = this.model$.value.token
            const dataId = data.id
            const model = this.model$.value
            const apiData = UserDataToAPI(data, urlKey)

            if (!userId || !token) { return reject(`invalid user`) }

            const finish = () => {
                this.modelUser(model)

                if (!!data.file) {
                    return this.handleUpload(data)
                        .then(() => {
                            return this.getData(urlKey, modelKey)
                                .then(resolve)
                                .catch(reject)
                        })
                        .catch((err) => {
                            return reject(err)
                        })
                }

                return this.getData(urlKey, modelKey)
                    .then(resolve)
                    .catch(reject)
            }

            if (dataId) {
                return requests.put(`/user/${userId}/${urlKey}/${dataId}`, apiData, token)
                    .then(() => {
                        const existing = model[modelKey]
                        let index
                        let count = existing.length

                        while (count-- && index === undefined) {
                            const item = existing[count]

                            if (item.id === dataId) {
                                index = count
                                model[modelKey][index] = data
                            }
                        }

                        return finish()
                    })
                    .catch(reject)
            } else {
                return requests.post(`/user/${userId}/${urlKey}`, apiData, token)
                    .then(() => {
                        if (Array.isArray(model[modelKey])) {
                            model[modelKey].push(data)
                        } else {
                            Object.keys(data).forEach((prop) => {
                                model[prop] = data[prop]
                            })
                        }

                        return finish()
                    })
                    .catch(reject)
            }
        })
    }

    public deleteData(data: any, modelKey: string) {
        if (!data || !modelKey) { return Promise.reject() }

        const urlKey = urlKeys[modelKey]

        if (!urlKey) { return Promise.reject(`invalid url`) }

        const dataId = data.id
        const apiData = UserDataToAPI(data, urlKey)

        return requests.del(`/user/${this.model$.value.id}/${urlKey}/${dataId}`, apiData, this.model$.value.token)
            .then(() => {
                this.getData(urlKey, modelKey)
            })
    }

    public verifyPhone(data: any) {
        if (!data) { return Promise.reject() }
        this.verifing$.next({ data, show: true })
        return requests.post(`/user/${this.model$.value.id}/phonenum/${data.id}/verify`, data, this.model$.value.token)
    }

    public verifySMS(data: any, tokenVal: any) {
        if (!data || !tokenVal) { return Promise.reject() }
        const url = `/user/${this.model$.value.id}/phonenum/${data.id}/verify/${tokenVal}`
        return requests.post(url, data, this.model$.value.token)
            .then(() => {
                this.verifing$.next({ data: null, show: false })
                this.getData(`phonenum`, `phoneNumbers`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    public logout() {
        if (navigator.onLine) {
            if (this.model$.value.token) {
                requests.post(`/user/logout`, { id: this.model$.value.id }, this.model$.value.token)
            }

            localStorage.removeItem(`CAI-USER`)
            window.location.reload()
        }
    }

    public login(credentials: UserCredentials) {
        return requests.post(`/user/login`, credentials)
            .then((response: any) => {
                if (!response.token) {
                    throw new Error(response)
                }

                this.modelUser(response)

                return this.getUser(response)
            })
            .catch((error) => {
                /** TODO handle error */
                return error
            })
    }

    public register(credentials: UserCredentials) {
        return requests.post(`/user`, credentials)
            .then(() => {
                return this.login(credentials)
            })
            .catch((error) => {
                /** TODO handle error */
                return error
            })
    }

    public uploadFile(data: any) {
        const file = data.file
        const uploaderFn = (observer: ObserverObject) => {
            let progress = (val: number) => {
                observer.next(val)
            }

            progress = progress.bind(this)

            const uploader = new FileUploader(file, this.model$.value.id, this.model$.value.token, progress, constants.authUrl)

            uploader.upload()
                .then(() => {
                    observer.complete()
                })
                .catch((err) => {
                    observer.error(err)
                })
        }

        return new Observable(uploaderFn)
    }

    public handleUpload(data: any) {
        return new Promise((resolve, reject) => {
            const newUpload$ = this.uploadFile(data)
            const uploadSubscription = newUpload$.subscribe(
                // upload progress, don't need to do anything
                // tslint:disable-next-line:no-empty
                () => { },

                // upload error
                (err) => {
                    uploadSubscription()
                    return reject(err)
                },

                // upload complete
                () => {
                    uploadSubscription()
                    return resolve()
                }
            )

            this.uploader$.next(newUpload$)
        })
    }

    public deactivate() {
        /** TODO */
        this.modelUser(Object.assign({}, this.model$.value, { active: 0 }))
    }

    public activate() {
        /** TODO */
        this.modelUser(Object.assign({}, this.model$.value, { active: 1 }))
    }

    private setReady() {
        if (this.ready$.value) { return }

        requestAnimationFrame(() => {
            this.ready$.next(true)
        })
    }
}

export default new User()
