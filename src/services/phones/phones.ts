import Subject from '@/utils/subject'
import { FormObject } from '@/types'

class Phones {
    public model$ = new Subject({})

    public add(data: FormObject) {
        console.log(`add`, data)
    }

    public del(data: FormObject) {
        console.log(`del`, data)
    }

    public get() {
        console.log(`get`)
    }

    public model() {
        console.log(`model`)
    }

    public verify(data: FormObject) {
        console.log(`v`, data)
    }

    public update(data: FormObject) {
        console.log(data)
    }
}

export default new Phones()
