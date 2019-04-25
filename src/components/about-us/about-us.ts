import { Component, Vue } from 'vue-property-decorator'
import state from '@/services/state'
import ContentSection from '../content-section/content-section'
import TicketForm from '../ticket-form/ticket-form'

@Component({
    components: {
        'content-section': ContentSection,
        'ticket-form': TicketForm
    }
})
export default class AboutUs extends Vue {
    public svg = `` // `https://designdroide.com/images/software-developer-character-set.svg`
    public state = state
    public title = `People that care`
    public subTitle = `who we are`
    public message = `Clarence has gathered a small and passionate team of humans from across the globe! We all believe in restoring balance and getting consumers what they’re owed.`
    public headerBackground = `data:image/svg+xml;utf8,${this.svg}`

    public get style() {
        const style = {
            backgroundImage: `url('${this.svg}')`
        }
        return style
    }

    public street = `2777 Alvarado Street, Suite E`
    public city = `San Leandro`
    public addressState = `California`
    public zip = 94577
    public email = `support@classactioninc.com`
    public emailLink = `mailto:${this.email}`

    public get team() {
        return [{
            id: 1,
            name: `Carly Marly`,
            title: `Eats barley`,
            link: `https://www.linkedin.com/in/carly-marly-1829804b`,
            img: ``
            // img: `https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2011/04/profilephotos-960x640.jpg`
        }, {
            id: 2,
            name: `Lorem ipsum`,
            title: `Cool person`,
            link: `https://www.linkedin.com/company/loremipsum-`,
            img: ``
            // img: `https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg`
        }, {
            id: 3,
            name: `Joe Shmo`,
            title: `Tech bro`,
            link: `https://www.linkedin.com/in/joe-shmo-49098a96`,
            img: ``
            // img: `https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
        }, {
            id: 4,
            name: `Jane Dane`,
            title: `Flies airplane`,
            link: `https://www.linkedin.com/in/jane-dane-21092615`,
            img: ``
            // img: `https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg`
        }]
    }

    public profileImage(img: string) {
        return { backgroundImage: `url(${img})` }
    }
}
