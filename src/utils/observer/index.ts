import { ObserverClass, ObserverObject } from '../types'

class Observer implements ObserverClass {
    public handler: ObserverObject
    public isUnsubscribed: boolean
    public id: string = ``

    constructor(handler: any) {
        this.next = this.next.bind(this)
        this.error = this.error.bind(this)
        this.complete = this.complete.bind(this)
        this.unsubscribe = this.unsubscribe.bind(this)
        this.handler = handler
        this.isUnsubscribed = false
    }

    public next(value: any): void {
        if (this.handler.next && !this.isUnsubscribed) {
            this.handler.next(value)
        }
    }

    public error(error: any): void {
        if (!this.isUnsubscribed) {
            if (this.handler.error) {
                this.handler.error(error)
            }

            this.unsubscribe()
        }
    }

    public complete(): void {
        if (!this.isUnsubscribed) {
            if (this.handler.complete) {
                this.handler.complete()
            }

            this.unsubscribe()
        }
    }

    public unsubscribe(): void {
        this.isUnsubscribed = true
    }
}

export default Observer
