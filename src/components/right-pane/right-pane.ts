import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class LeftPane extends Vue {
    public open() {
        const pane = this.$refs.pane as HTMLElement

        pane.classList.add(`open`)

        const hero = document.body.querySelector(`.hero-element`)
        if (hero) {
            hero.classList.add(`blur`)
            hero.classList.add(`shift-left`)
        }
    }

    public close() {
        const pane = this.$refs.pane as HTMLElement

        pane.classList.remove(`open`)

        const hero = document.body.querySelector(`.hero-element`)
        if (hero) {
            hero.classList.remove(`blur`)
            hero.classList.remove(`shift-left`)
        }
    }

    public toggle() {
        const pane = this.$refs.pane as HTMLElement

        pane.classList.toggle(`open`)

        const hero = document.body.querySelector(`.hero-element`)
        if (hero) {
            hero.classList.toggle(`blur`)
            hero.classList.toggle(`shift-left`)
        }
    }
}
