import { Component, Vue } from 'vue-property-decorator'
import constants from '@/services/constants'
import SupportTicket from '@/components/forms/support-ticket/support-ticket'

@Component({
    components: {
        'support-ticket': SupportTicket
    }
})
export default class AboutPage extends Vue {
    public constants = constants
    public title = `People that care`
    public subTitle = `who we are`
    public message = `Clarence has gathered a small and passionate team of humans from across the globe! We all believe in restoring balance and getting consumers what they’re owed.`

    public get team() {
        return [{
            id: 1,
            name: `Carly Marly`,
            title: `Eats barley`,
            link: `https://www.linkedin.com/in/carly-marly-1829804b`,
            img: ``
        }, {
            id: 2,
            name: `Lorem ipsum`,
            title: `Cool person`,
            link: `https://www.linkedin.com/company/loremipsum-`,
            img: ``
        }, {
            id: 3,
            name: `Joe Shmo`,
            title: `Tech bro`,
            link: `https://www.linkedin.com/in/joe-shmo-49098a96`,
            img: ``
        }, {
            id: 4,
            name: `Jane Dane`,
            title: `Flies airplane`,
            link: `https://www.linkedin.com/in/jane-dane-21092615`,
            img: ``
        }]
    }
}
