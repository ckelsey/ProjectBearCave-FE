import { Component, Vue, Prop } from 'vue-property-decorator'
import user from '@/services/user/user'
import state from '@/services/state'
import translate from '@/services/translate/translate'
import Subject from '@/utils/subject'

@Component({
    components: {}
})

export default class ProfileStats extends Vue {
    @Prop()
    public profileState$!: Subject
    public translate = translate
    public stats = [
        { key: `account`, title: `Account`, icon: `address-card`, complete: 0 },
        { key: `phoneNumbers`, title: `Phones`, icon: `phone`, complete: 0 },
        { key: `address`, title: `Addresses`, icon: `home`, complete: 0 },
        { key: `vehicle`, title: `Vehicles`, icon: `car`, complete: 0 },
        { key: `employment`, title: `Employment`, icon: `briefcase`, complete: 0 },
    ]

    public get total() {
        return [
            this.stats.reduce((sum, acc) => sum = sum + acc.complete, 0),
            this.stats.length
        ]
    }

    public mounted() {
        const getCompletion = (stat: any, userModel: any) => {
            return stat.key === `account`
                ? !!userModel.fname && !!userModel.lname && !!userModel.email
                    ? 1 : 0
                : userModel[stat.key] && userModel[stat.key].length
                    ? 1 : 0
        }

        user.model$.subscribe((val) => {
            if (val && val.id) {
                this.stats.forEach((stat: any, index: number) => {
                    this.stats[index].complete = getCompletion(stat, val)
                })

                this.stats.sort((a: any, b: any) => {
                    return b.complete - a.complete
                })
            }
        })
    }
}


// let runStats = (val: any) => {
        //     this.total = 0
        //     const keys = Object.keys(val)
        //     const length = keys.length

        //     keys.forEach((key: string) => {
        //         this.stats[key] = Math.min(this.dashArray - (val[key] * this.dashArray), this.dashArray * 0.99)
        //         this.statPercents[key] = Math.round(val[key] * 100)
        //         this.total = this.total + (val[key] * 100)
        //     })

        //     this.total = Math.round(this.total / length)
        // }

        // runStats = runStats.bind(this)
        // user.completionStats$.subscribe(runStats)



// public state = state
    // public dashArray = 339.292
    // public total = 0
    // public stats: any = {
    //     account: this.dashArray,
    //     phoneNumbers: this.dashArray,
    //     address: this.dashArray,
    //     vehicle: this.dashArray,
    //     employment: this.dashArray,
    // }

    // public statPercents: any = {
    //     account: 0,
    //     phoneNumbers: 0,
    //     address: 0,
    //     vehicle: 0,
    //     employment: 0,
    // }

    // public selectedStat = {
    //     key: ``,
    //     percent: 0
    // }

    // public statOver(key: string) {
    //     const text = this.translate.get(key.split(/(?=[A-Z])/)[0].toLowerCase())
    //     this.selectedStat.key = `${text[0].toUpperCase()}${text.substring(1)}`
    //     this.selectedStat.percent = this.statPercents[key]
    // }
