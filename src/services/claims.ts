import user from './user/user'
import requests from './requests'
import Subject from '@/utils/subject'

class Claims {
    public claim$: Subject

    public get token() {
        return user.model$.value ? user.model$.value.token : undefined
    }

    public get unfiledClaims() {
        return this.claim$.value
            .filter((c: any) => !c.filed && c.distribution >= new Date().getTime())
    }

    public get unfiledClaimsAmount() {
        return this.unfiledClaims.reduce((sum: number, obj: any) => !obj ? sum : obj.payout + sum, 0)
    }

    public get openClaims() {
        return this.claim$.value.filter((c: any) => c.distribution >= new Date().getTime())
    }

    public get filedClaims() {
        return this.claim$.value
            .filter((c: any) => c.filed && c.distribution >= new Date().getTime())
            .sort((a: any, b: any) => a.filed - b.filed)
    }

    public get filedClaimsAmount(): number {
        return this.filedClaims.reduce((sum: number, obj: any) => !obj ? sum : obj.payout + sum, 0)
    }

    public get completedClaims() {
        return this.claim$.value
            .filter((c: any) => c.filed && c.distribution <= new Date().getTime())
            .sort((a: any, b: any) => a.distribution - b.distribution)
    }

    public get completedClaimsAmount(): number {
        return this.completedClaims.reduce((sum: number, obj: any) => !obj ? sum : obj.payout + sum, 0)
    }

    public get transferedClaims() {
        return this.completedClaims
            .filter((c: any) => c.transfered)
            .sort((a: any, b: any) => a.transfered - b.transfered)
    }

    public get transferedClaimsAmount(): number {
        return this.transferedClaims.reduce((sum: number, obj: any) => !obj ? sum : obj.payout + sum, 0)
    }

    public get untransferedClaims() {
        return this.completedClaims
            .filter((c: any) => !c.transfered)
            .sort((a: any, b: any) => a.distribution - b.distribution)
    }

    public get untransferedClaimsAmount(): number {
        return this.untransferedClaims.reduce((sum: number, obj: any) => !obj ? sum : obj.payout + sum, 0)
    }

    public get history() {
        return this.claim$.value
            .filter((c: any) => c.filed)
            .sort((a: any, b: any) => a.distribution - b.distribution)
    }

    public get walletHistory(): any[] {
        /** TODO - this is very inefficient, should refactor */
        const history: any[] = []

        const setAdd = (c: any, i: number) => {
            history.push(
                Object.assign({}, c,
                    {
                        deposit: c.payout,
                        transacted: c.distribution,
                        formattedTransacted: this.formatDate(c.distribution)
                    }
                )
            )
        }

        const setDeduct = (c: any, i: number) => {
            if (c.transfered) {
                history.push(
                    Object.assign({}, c,
                        {
                            deduct: c.payout,
                            transacted: c.transfered,
                            formattedTransacted: this.formatDate(c.transfered)
                        }
                    )
                )
            }
        }

        this.history
            .forEach((c: any, index: number) => {
                setAdd(c, index)
                setDeduct(c, index)
            })

        history.sort((a: any, b: any) => a.transacted - b.transacted)

        let lastWallet = 0

        return history.map((c: any, index: number) => {
            if (c.deduct) {
                c.inWallet = lastWallet - c.deduct
            }

            if (c.deposit) {
                c.inWallet = lastWallet + c.deposit
            }

            lastWallet = c.inWallet

            return c
        })
    }

    constructor() {
        this.claim$ = new Subject([])

        user.loggedIn$.subscribe(() => {
            this.getClaims()
        })
    }

    public file(claim: any) {
        claim.filed = new Date().getTime()
        alert(`I know I'm supposed to do something with: ${JSON.stringify(claim)}, but not sure what...hmmmmmmm...uh...nope, it's gone...`)

        this.modelClaims(this.claim$.value.map((c: any) => {
            if (c.id === claim.id) {
                return claim
            }

            return c
        }))
    }

    public modelClaims(data: any) {
        data = data.map((v: any) => {
            v.formattedDeadline = this.formatDate(v.fileDeadline)
            v.formattedDistro = this.formatDate(v.distribution)
            v.filedOn = v.filed ? this.formatDate(v.filed) : undefined
            return v
        })

        this.claim$.next(data)

        return this.claim$.value
    }

    public formatDate(date: number) {
        const D = new Date(date)
        const monthNames = [
            'January', 'February', 'March',
            'April', 'May', 'June', 'July',
            'August', 'September', 'October',
            'November', 'December'
        ]

        const day = D.getDate()
        const Day = day === 2 ? `${day}nd` : day === 1 ? `${day}st` : `${day}th`

        return `${monthNames[D.getMonth()]} ${Day}, ${D.getFullYear()}`
    }

    public getClaims() {
        if (!this.token) {
            this.modelClaims([])
            return
        }

        return new Promise((resolve) => {
            return resolve(this.modelClaims(fake))
        })

        // requests.get(getClaimsPath, {}, user.model$.value.token)
        //     .then((response) => {
        //         this.modelClaims(response)
        //     })
        //     .catch((err) => {
        //         /** TODO handle error */
        //         console.log(`error`)
        //     })
    }
}

const fake = [{
    id: '1ds2s',
    type: 'purchase',
    defendant: 'Yum tum tummers',
    fileDeadline: 1556393406000,
    distribution: 1557393406000,
    payout: 3,
    filed: 1556393406000
}, {
    id: '12s',
    type: 'phone',
    defendant: 'Calls n More',
    fileDeadline: 1564247314000,
    distribution: 1570900114000,
    payout: 14,
    filed: false
}, {
    id: '1sdfs',
    type: 'vehicle', // category
    defendant: 'Bad Cars Dealership',
    fileDeadline: 1564249314000,
    distribution: 1770900114000,
    payout: 120,
    filed: 1556393406000
}, {
    id: 'sa',
    type: 'employment',
    defendant: 'www.letsdobadstuff.com',
    fileDeadline: 1464249314000,
    distribution: 1670900114000,
    payout: 18,
    filed: false
}, {
    id: 'sgha',
    type: 'employment',
    defendant: 'Skylarking Inc',
    fileDeadline: 1364249314000,
    distribution: 1400900114000,
    payout: 1,
    filed: 1264249314000
}, {
    id: 'ssfdsgha',
    type: 'address',
    defendant: 'Slumlordia',
    fileDeadline: 1264249314000,
    distribution: 1300900114000,
    payout: 22,
    filed: 1164249314000,
    transfered: 1300900154000,
    transferedTo: `sdfdsfsd34`
}]


export default new Claims()
