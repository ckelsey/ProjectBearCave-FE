import { Component, Vue } from 'vue-property-decorator'
import claims from '@/services/claims'

@Component({})
export default class WalletPage extends Vue {
    public history: any[] = []
    public historyList: any[] = []

    public get points() {
        const points: string[] = []
        let startX: number = 0
        let highestY = 0

        this.history.forEach((c: any) => {
            if (!startX) {
                startX = c.transacted
            }

            if (highestY < c.inWallet) {
                highestY = c.inWallet
            }

            points.push(`${c.transacted - startX},${c.inWallet}`)
        })

        return {
            x1: startX,
            x2: this.history.length ? this.history[this.history.length - 1].transacted - startX : 0,
            y1: 0,
            y2: highestY,
            points: points.join(` `)
        }
    }

    public mounted() {
        claims.claim$.subscribe(() => {
            this.history = claims.walletHistory
            this.historyList = this.history.concat([]).reverse()
        })
    }
}
