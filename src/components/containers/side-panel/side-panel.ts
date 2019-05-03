import { Component, Vue, Prop } from 'vue-property-decorator'

const directions = [`left`, `right`]

@Component({})
export default class SidePanel extends Vue {
    @Prop()
    public direction: string | undefined

    @Prop()
    public toggler: any

    public expanded = false
    public opening = false
    public closing = false
    private timer: any
    private transition: number = 140

    public get Direction() {
        const direction = !this.direction ? directions[0] : directions.indexOf(this.direction) === -1 ? directions[0] : this.direction
        return direction
    }

    public get classes() {
        const classes = [this.Direction]

        if (this.expanded) {
            classes.push(`expanded`)
        }

        if (this.opening) {
            classes.push(`opening`)
        }

        if (this.closing) {
            classes.push(`closing`)
        }

        return classes.join(` `)
    }

    public get $toggler() {
        if (typeof this.toggler === `function`) {
            return this.toggler()
        }

        return this.toggler as HTMLElement
    }

    public get el() {
        return this.$el as HTMLElement
    }

    public mounted() {
        document.body.addEventListener(`click`, (e: Event) => {
            if (!this.$toggler) {
                return
            }

            if (e.target === this.$toggler || this.$toggler.contains(e.target)) {
                this.toggle()
            } else if (this.expanded) {
                this.close()
            }
        }, false)
    }

    public toggle(event?: Event) {
        if (event) { event.preventDefault() }

        if (this.expanded) {
            this.close()
        } else {
            this.open()
        }
    }

    public close(event?: Event) {
        if (event) { event.preventDefault() }

        this.run(false)
    }

    public open(event?: Event) {
        if (event) { event.preventDefault() }

        this.run(true)
    }

    private run(open: boolean) {
        clearTimeout(this.timer)

        if (!document.body.classList.contains(`panel-sliding`)) {
            document.body.classList.remove(`slide-right`)
            document.body.classList.remove(`slide-left`)
        }

        document.body.classList.add(`panel-sliding`)

        const inner = document.getElementById(`app-content-inner`)

        if (inner) {
            this.el.style.height = `${inner.offsetHeight}px`
            this.el.style.top = `${window.innerHeight - inner.offsetHeight}px`
        }

        if (open) {
            document.body.classList.add(`slide-${this.Direction}`)
            this.opening = true
        } else {
            this.closing = true
        }

        this.expanded = open

        this.timer = setTimeout(() => {
            this.opening = false
            this.closing = false
            document.body.classList.remove(`panel-sliding`)
        }, this.transition)
    }
}
