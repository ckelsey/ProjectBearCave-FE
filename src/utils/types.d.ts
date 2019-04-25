import Observable from "./observable"

export interface GenericObjects {
    [key: string]: any
}

export type ObserverNext = (newValue: any) => any
export type ObserverError = (error: any) => any
export type ObserverComplete = GenericFunction

export interface SubjectObject {
    state: any
    next: ObserverNext
    error: ObserverError
    complete: ObserverComplete
    subscribe: Subscribe
}

export type Subscriptions = { [key: string]: ObserverObject }
export type Subscribe = (fn: ObserverNext, er: ObserverError, c: ObserverComplete) => () => Subscriptions

export interface SubscriptionObject {
    subscriptions: { [key: string]: ObserverObject }
    _subscribe: Subscribe
    _unsubscribe: (observer: ObserverClass) => () => Subscriptions
}

export interface ObserverObject {
    next: ObserverNext
    error: ObserverError
    complete: ObserverComplete
}

export interface ObserverClass extends ObserverObject {
    handler: ObserverObject
    isUnsubscribed: boolean
    id: string
    unsubscribe: () => void
}

export interface ObservableObject extends SubscriptionObject {
    isSharing: boolean
    fn: GenericFunction
    subscribe: Subscribe
    share: () => ObservableObject
    fromEvent: (element: HTMLElement, eventName: string, preventDefault?: boolean, stopPropagation?: boolean) => Observable
}

export interface QueueClass {
    fn: GenericFunction
    queue: any[]
    add: (el: any) => void
    run: () => void
}

export type GenericFunction = (...v: any) => any
