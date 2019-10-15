import { Component, Vue } from 'vue-property-decorator'
import ProfileContent from '../profile-content/profile-content'
import ListToSidebar from '@/components/containers/list-to-sidebar/list-to-sidebar'
import Subject from '@/utils/subject'
import SlideVertical from '@/components/containers/slide-vertical/slide-vertical'
import ProfileHeader from '../profile-header/profile-header'
import routes from '@/services/routes/routes'
import { Account } from '@/services/account/internal'

@Component({
    components: {
        'profile-header': ProfileHeader,
        'profile-content': ProfileContent,
        'list-to-sidebar': ListToSidebar,
        'slide-vertical': SlideVertical
    }
})
export default class ProfilePage extends Vue {
    public profileState$ = new Subject(``)
    public AccountTab = {
        name: `Account settings`,
        icon: `address-card`,
        key: `account`,
        form: {}
    }

    public get Tabs() {
        return [
            this.AccountTab
        ]
    }

    public mounted() {
        routes.route$.subscribe(() => {
            this.profileState$.next(``)
        })

        Account.model$.subscribe(() => {
            this.AccountTab.form = Account.form()
        })
    }

    // public get Tabs() {
    //     const noContentMarkup = (kind: string, key: string) => {
    //         const div = document.createElement(`div`)
    //         const text1 = document.createElement(`span`)
    //         text1.textContent = `You don't have any ${kind} associated with your account, would you like to `

    //         const link = document.createElement(`a`)
    //         link.href = `#`
    //         link.textContent = `add one`
    //         link.addEventListener(`click`, (e) => {
    //             e.preventDefault()
    //             const button = document.querySelector(`.new-${key}`) as HTMLElement

    //             if (button) {
    //                 button.click()
    //             }
    //         })

    //         const text2 = document.createElement(`span`)
    //         text2.textContent = `?`

    //         div.appendChild(text1)
    //         div.appendChild(link)
    //         div.appendChild(text2)

    //         return div
    //     }

    //     const results: any[] = [{
    //         name: `Account settings`,
    //         key: `account`,
    //         icon: `address-card`
    //     }]

    //     const phones: any = {
    //         name: `Phone numbers`,
    //         key: `phoneNumbers`,
    //         newFormText: `new phone number`,
    //         icon: `phone`
    //     }

    //     phones.noContentMarkup = noContentMarkup(
    //         phones.name.toLowerCase(),
    //         phones.key
    //     )

    //     results.push(phones)

    //     const employment: any = {
    //         name: `Employment history`,
    //         key: `employment`,
    //         newFormText: `new employment`,
    //         icon: `briefcase`
    //     }

    //     employment.noContentMarkup = noContentMarkup(
    //         employment.name.toLowerCase(),
    //         employment.key
    //     )

    //     results.push(employment)

    //     return results
    //     // , {
    //     //     name: `Phone numbers`,
    //     //     key: `phoneNumbers`,
    //     //     newFormText: `new phone number`,
    //     //     icon: `phone`,
    //     //         noContentMarkup: noContentMarkup()
    //     // }, {
    //     //     name: `Addresses`,
    //     //     key: `address`,
    //     //     newFormText: `new address`,
    //     //     icon: `home`
    //     // }, {
    //     //     name: `Vehicles`,
    //     //     key: `vehicle`,
    //     //     newFormText: `new vehicle`,
    //     //     icon: `car`
    //     // }, {
    //     //     name: `Employment history`,
    //     //     key: `employment`,
    //     //     newFormText: `new employment`,
    //     //     icon: `briefcase`
    //     // }]
    // }
}
