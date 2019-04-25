import { SubscriptionObject, Subscriptions, ObserverNext, ObserverError, ObserverComplete, ObserverClass } from '../types'
import Observer from '../observer'

class Subscription implements SubscriptionObject {
    public subscriptions: Subscriptions = {}

    public _subscribe(next: ObserverNext, error?: ObserverError, complete?: ObserverComplete): () => Subscriptions {

        const observer: ObserverClass = new Observer(typeof next === `function` ? { next, error, complete } : next)
        const id = `${new Date().getTime()}_${Object.keys(this.subscriptions).length}_${Math.round(Math.random() * 10000)}`

        observer.id = id

        this.subscriptions[id] = observer

        return this._unsubscribe(observer)
    }

    public _unsubscribe(observer: ObserverClass): () => Subscriptions {
        return (): Subscriptions => {
            observer.unsubscribe()
            delete this.subscriptions[observer.id]
            return this.subscriptions
        }
    }
}

export default Subscription
