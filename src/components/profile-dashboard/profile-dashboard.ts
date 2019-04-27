import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import user from '@/services/user'
import ClarenceFormHelper from '../clarence-form-helper'
import ProfileHeader from '../profile-header'
import ProfileTabs from '../profile-tabs'
import ProfileContent from '../profile-content/profile-content'
import ModalContent from '../modal-content/modal-content'

@Component({
    components: {
        'profile-header': ProfileHeader,
        'profile-tabs': ProfileTabs,
        'profile-content': ProfileContent,
        'clarence-form-helper': ClarenceFormHelper,
        'modal-content': ModalContent,
    }
})
export default class ProfileDashboard extends Vue {
    public state = state
    public user = user
    public verifingData: any = null

    public get classes() {
        const classes = []

        switch (this.state.profile) {
            case undefined:
            case ``:
                classes.push(`show-none`)
                break;
        }

        return classes.join(` `)
    }

    public get verifyNumber() {
        return this.$refs.verifyNumber as HTMLInputElement
    }

    public get verifyModal() {
        return this.$refs.verifyModal as any
    }

    public verifySMS(e: Event) {
        if (e) {
            e.preventDefault()
        }

        user.verifySMS(this.verifingData, this.verifyNumber.value)
    }

    public mounted() {
        user.verifing$.subscribe((val: any) => {
            this.verifingData = val.data
            if (val.show) {
                this.verifyModal.show()
            } else {
                this.verifyModal.close()
            }
        })
    }
}
