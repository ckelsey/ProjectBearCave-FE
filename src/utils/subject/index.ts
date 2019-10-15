import { Subscriptions, ObserverNext, ObserverError, ObserverComplete, SubjectObject } from '../types'
import Subscription from '../subscriptions'

const loop = (subscriptions: Subscriptions, key: string, value: any) => {
    Object.keys(subscriptions).forEach((id: string) => {
        const obj: any = subscriptions[id]
        const fn: any = obj[key]
        fn(value)
    })
}

class Subject extends Subscription implements SubjectObject {
    public state: any

    constructor(state: any) {
        super()
        this.state = state
    }

    get value() {
        return this.state
    }

    public next(value: any): void {
        if (typeof this.state === `function`) {
            return loop(this.subscriptions, `next`, this.state)
        }

        if (typeof value === `function`) {
            value = value(this.state)
        }

        this.state = value

        loop(this.subscriptions, `next`, this.state)
    }

    public error(error: any): void {
        loop(this.subscriptions, `error`, error)
    }

    public complete(): void {
        loop(this.subscriptions, `complete`, undefined)
    }

    public subscribe(next: ObserverNext, error?: ObserverError, complete?: ObserverComplete): () => Subscriptions {
        next(this.value)

        return super._subscribe(next, error, complete)
    }
}

export default Subject
