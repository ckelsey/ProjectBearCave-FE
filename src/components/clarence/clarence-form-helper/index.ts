import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
// import constants from '@/services/constants'
// import requests from '@/services/requests'

// interface Step {
//     msg: string
//     el: HTMLInputElement
//     event: string
// }

@Component({
    components: {}
})
export default class ClarenceFormHelper extends Vue {
    @Prop()
    public inputs: any

    @Prop()
    public active: any

    public timer: any


    // public clarenceSvgUrl = `${constants.images}/${constants.clarenceSvg}`
    // public clarenceSvg = ``
    // public steps: Step[] = []
    // public step = 0
    // public get Step() {
    //     return this.steps[this.step] ? this.steps[this.step] : {}
    // }

    public step: number = -1

    public Inputs: HTMLInputElement[] = []

    public get $container() {
        return this.$refs.container as HTMLElement
    }

    @Watch('active')
    public onActive() {
        this.start()
    }


    // public goToStep(index: number) {
    //     this.step = index
    // }

    // public runAnimations() {
    //     this.steps = []

    //     this.Inputs.forEach((input: any, index: number) => {
    //         input.addEventListener(input.helpEvent, () => {
    //             this.goToStep(index)
    //         })

    //         this.steps.push({
    //             msg: input.help,
    //             el: input,
    //             event: input.helpEvent
    //         })
    //     })
    // }

    public getBasePosition(): DOMRect | ClientRect {
        const Box = {
            top: window.innerHeight,
            bottom: 0,
            y: window.innerHeight,
            left: window.innerWidth,
            right: 0,
            x: window.innerWidth,
            height: 0,
            width: 0
        }

        this.Inputs.forEach((input: HTMLInputElement) => {
            const box = input.getBoundingClientRect()

            if (Box.x > box.left) {
                Box.x = Box.left = box.left
            }

            if (Box.y > box.top) {
                Box.y = Box.top = box.top
            }

            if (Box.right < box.right) {
                Box.right = box.right
            }

            if (Box.bottom < box.bottom) {
                Box.bottom = box.bottom
            }
        })

        Box.height = Box.bottom - Box.top
        Box.width = Box.right - Box.left
        return Box
    }

    public targetPosition(): DOMRect | ClientRect {
        return this.Inputs[this.step].getBoundingClientRect()
    }

    public setClarencePosition(box: DOMRect | ClientRect, baseBox: DOMRect | ClientRect) {
        const minWidth = 250
        const overlayWidth = 125
        const overlayOffset = 25
        const isOnLeft = baseBox.left > window.innerWidth - baseBox.right
        const maxWidth = isOnLeft ? baseBox.left : window.innerWidth - baseBox.right
        let padding = 0

        if (maxWidth < minWidth) {
            this.$container.classList.add(`overlay`)
            this.$container.style.left = `${window.innerWidth - (overlayWidth - overlayOffset)}px`
            this.$container.style.width = this.$container.style.height = `${overlayWidth}px`
            this.$container.style.top = `${window.innerHeight - (overlayWidth - overlayOffset)}px`
            return
        }

        this.$container.classList.remove(`overlay`)

        padding = Math.min((maxWidth - minWidth) / 2, 30)
        const fullPadding = padding * 2

        const width = maxWidth - fullPadding
        const thisPosition: any = Object.assign({}, baseBox)
        const verticalMiddle = box.top + (box.height / 2)
        const heightHalf = width / 2

        thisPosition.bottom = verticalMiddle + heightHalf > window.innerHeight ? window.innerHeight : verticalMiddle + heightHalf

        if (thisPosition.bottom - width < 0) {
            thisPosition.bottom = width
        }

        thisPosition.y = thisPosition.bottom - width
        thisPosition.x = isOnLeft ? baseBox.left - (width + padding) : baseBox.right + padding
        thisPosition.right = isOnLeft ? baseBox.left - padding : thisPosition.x + width


        this.$container.style.left = `${thisPosition.x}px`
        this.$container.style.width = this.$container.style.height = `${width}px`
        this.$container.style.top = `${thisPosition.y}px`
    }

    public draw() {
        const baseBox = this.getBasePosition()

        if (this.Inputs[this.step]) {
            return this.setClarencePosition(this.targetPosition(), baseBox)
        }

        return this.setClarencePosition(baseBox, baseBox)
    }

    public cancel() {
        cancelAnimationFrame(this.timer)
    }

    public start() {
        this.cancel()

        if (!this.active) {
            return
        }

        this.timer = requestAnimationFrame(() => {
            this.draw()
            this.start()
        })
    }

    public setStep(e: any) {
        this.step = e.target.index
    }

    public setListeners(inputs: HTMLInputElement[]) {
        inputs.forEach((input: any, index: number) => {
            input.index = index
            input.addEventListener(`focus`, this.setStep, false)
        })
    }

    public mounted() {
        this.setStep = this.setStep.bind(this)

        // this.inputs.subscribe((val: HTMLInputElement[]) => {
        //     this.Inputs = val
        //     this.setListeners(this.Inputs)
        //     this.start()
        // })

        // requests.get(this.clarenceSvgUrl)
        //     .then((res: any) => {
        //         this.clarenceSvg = res
        //     })
    }
}
