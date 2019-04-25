import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import translate from '@/services/translate';

@Component({
    components: {}
})
export default class ProfileTabs extends Vue {
    public state = state
    public translate = translate

    public get Tabs() {
        return [{
            name: `Account settings`,
            key: `account`,
            icon: `address-card`
        }, {
            name: `Phone numbers`,
            key: `phoneNumbers`,
            icon: `phone`
        }, {
            name: `Addresses`,
            key: `address`,
            icon: `home`
        }, {
            name: `Employment history`,
            key: `employment`,
            icon: `hammer`
        }, {
            name: `Vehicles`,
            key: `vehicle`,
            icon: `car`
        }]
    }
}
