import { Component, Vue } from 'vue-property-decorator'
import user from '@/services/user'
import state from '@/services/state'
import translate from '@/services/translate';

@Component({
    components: {}
})

export default class ProfileStats extends Vue {
    public translate = translate
    public state = state
    public dashArray = 339.292
    public total = 0
    public statKeys = [
        `account`,
        `phoneNumbers`,
        `address`,
        `vehicle`,
        `employment`
    ]
    public stats: any = {
        account: this.dashArray,
        phoneNumbers: this.dashArray,
        address: this.dashArray,
        vehicle: this.dashArray,
        employment: this.dashArray,
    }

    public statPercents: any = {
        account: 0,
        phoneNumbers: 0,
        address: 0,
        vehicle: 0,
        employment: 0,
    }

    public selectedStat = {
        key: ``,
        percent: 0
    }

    public statOver(key: string) {
        const text = this.translate.get(key.split(/(?=[A-Z])/)[0].toLowerCase())
        this.selectedStat.key = `${text[0].toUpperCase()}${text.substring(1)}`
        this.selectedStat.percent = this.statPercents[key]
    }

    public mounted() {
        let runStats = (val: any) => {
            this.total = 0
            const keys = Object.keys(val)
            const length = keys.length

            keys.forEach((key: string) => {
                this.stats[key] = Math.min(this.dashArray - (val[key] * this.dashArray), this.dashArray * 0.99)
                this.statPercents[key] = Math.round(val[key] * 100)
                this.total = this.total + (val[key] * 100)
            })

            this.total = Math.round(this.total / length)
        }

        runStats = runStats.bind(this)
        user.completionStats$.subscribe(runStats)

        runStats(user.completionStats$.value)
    }
}
