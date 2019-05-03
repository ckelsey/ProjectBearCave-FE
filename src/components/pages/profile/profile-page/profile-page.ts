import { Component, Vue } from 'vue-property-decorator'
import ProfileContent from '../profile-content/profile-content'
import ListToSidebar from '@/components/containers/list-to-sidebar/list-to-sidebar'
import Subject from '@/utils/subject'
import state from '@/services/state';
import SlideVertical from '@/components/containers/slide-vertical/slide-vertical'
import ProfileHeader from '../profile-header'

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

    public get Tabs() {
        return [{
            name: `Account settings`,
            key: `account`,
            icon: `address-card`
        }, {
            name: `Phone numbers`,
            key: `phoneNumbers`,
            newFormText: `new phone number`,
            icon: `phone`
        }, {
            name: `Addresses`,
            key: `address`,
            newFormText: `new address`,
            icon: `home`
        }, {
            name: `Vehicles`,
            key: `vehicle`,
            newFormText: `new vehicle`,
            icon: `car`
        }, {
            name: `Employment history`,
            key: `employment`,
            newFormText: `new employment`,
                icon: `briefcase`
        }]
    }

    public mounted() {
        state.stateObserver$.subscribe(() => {
            this.profileState$.next(``)
        })
    }
    // public state = state
    // public user = user
    // public verifingData: any = null

    // public get classes() {
    //     const classes = []

    //     switch (this.state.profile) {
    //         case undefined:
    //         case ``:
    //             classes.push(`show-none`)
    //             break
    //     }

    //     return classes.join(` `)
    // }

    // public get verifyNumber() {
    //     return this.$refs.verifyNumber as HTMLInputElement
    // }

    // public get verifyModal() {
    //     return this.$refs.verifyModal as any
    // }

    // public verifySMS(e: Event) {
    //     if (e) {
    //         e.preventDefault()
    //     }

    //     user.verifySMS(this.verifingData, this.verifyNumber.value)
    // }

    // public mounted() {
    //     user.verifing$.subscribe((val: any) => {
    //         this.verifingData = val.data
    //         if (val.show) {
    //             this.verifyModal.show()
    //         } else {
    //             this.verifyModal.close()
    //         }
    //     })
    // }
}
