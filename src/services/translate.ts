import json from './translations.json'
import Get from '@/utils/get'

class Translation {
    public locale = navigator.language ? navigator.language : `en-US`

    public get(key: string) {
        return Get(json, `${key}.${this.locale}`, key)
    }
}

export default new Translation()
