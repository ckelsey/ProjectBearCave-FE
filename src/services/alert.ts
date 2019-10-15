import Subject from '@/utils/subject'
const defaultAlert = { msg: ``, active: false, status: ``, closeIn: 0 }
class Alert {
    public alert$ = new Subject(defaultAlert)

    public get alert() {
        return this.alert$.value
    }

    public set alert(val) {
        this.alert$.next(Object.assign({}, defaultAlert, val))
    }

    constructor() {
        this.closeAlert = this.closeAlert.bind(this)
    }

    public closeAlert() {
        this.alert = Object.assign({}, defaultAlert)
    }
}

export default new Alert()
