import { Component, Vue } from 'vue-property-decorator'
import anime from 'animejs'

@Component({ components: {} })
export default class HomePage extends Vue {

    public run() {

        const container = this.$refs.container as HTMLElement
        const getStartedButton = this.$refs.getStartedButton as HTMLElement

        container.style.opacity = `0`

        function resize() {
            container.style.fontSize = Math.round(container.offsetHeight * 0.11112) + 'px'
            container.style.lineHeight = Math.round(container.offsetHeight * 0.11112) + 'px'
        }

        window.addEventListener('resize', resize, false)
        resize()

        const spring = 'spring(0.5, 100, 10, 0)'
        const spring2 = 'spring(0.15, 100, 20, 0)'

        const timeline = anime.timeline({ autoplay: false })

        const group1 = {
            targets: '#header-text-group-1',
            top: [{ value: ['-100%', 0], duration: 1000 }],
            left: [
                { value: 0, duration: 5500, easing: 'linear' },
                { value: '-100%', duration: 1000 },
            ],
            opacity: [
                { value: [0, 1], duration: 1000 },
                { value: 1, duration: 5000, easing: 'linear' },
                { value: [1, 0], duration: 500 }
            ]
        }

        const action = {
            targets: '#header-text-action',
            scaleY: [
                { value: [0, 1], duration: 800 },
                { value: 1, duration: 5000, easing: 'linear' },
                { value: [1, 0], duration: 800 },
            ],
            left: [
                { value: 0, duration: 5000, easing: 'linear' },
                { value: '-100%', duration: 1000 },
            ]
        }

        const keeps = {
            targets: '#header-text-keeps',
            left: [
                { value: ['150%', '0%'], duration: 500, easing: spring },
                { value: 0, duration: 2000, easing: 'linear' },
                { value: ['0%', '150%'], duration: 500, easing: spring }
            ],
            opacity: [
                { value: [0, 1], duration: 200, easing: spring },
                { value: [1, 0.9], duration: 2300, easing: 'linear' },
                { value: [0.8, 0], duration: 100, easing: 'linear' },
            ]
        }

        const hundreds = {
            targets: '#header-text-hundreds',
            left: [
                { value: ['150%', '0%'], duration: 500, easing: spring },
                { value: 0, duration: 2000, easing: 'linear' },
                { value: ['0%', '150%'], duration: 500, easing: spring }
            ],
            opacity: [
                { value: [0, 1], duration: 200, easing: spring },
                { value: [1, 0.9], duration: 2300, easing: 'linear' },
                { value: [0.8, 0], duration: 100, easing: 'linear' },
            ],
            scaleY: [
                { value: [0, 1], duration: 500, easing: spring },
                { value: 1, duration: 2000, easing: 'linear' },
                { value: [1, 0], duration: 2000, easing: spring }
            ]
        }

        const helps = {
            targets: '#header-text-helps',
            top: [-500, 0],
            opacity: [0, 1],
            duration: 500,
            easing: spring
        }

        const svg = {
            targets: '#clarence-header-svg-container',
            top: [500, 0],
            opacity: [0, 1],
            duration: 500,
            easing: spring
        }

        const clarence = {
            targets: '#clarence-header-svg-container svg',
            top: [500, '12%'],
            opacity: [0, 1],
            duration: 500,
            easing: spring2
        }

        setTimeout(() => {
            container.style.opacity = `1`
            timeline
                .add(group1, 100)
                .add(action, 350)
                .add(Object.assign(action, { targets: '#header-text-inc' }), 450)
                .add(keeps, 600)
                .add(hundreds, 700)
                .add(Object.assign(hundreds, { targets: '#header-text-settlements' }), 750)
                .add(Object.assign(keeps, { targets: '#header-text-and' }), 3000)
                .add(helps, 3300)
                .add(Object.assign(hundreds, { targets: '#header-text-determine' }), 3100)
                .add(Object.assign(hundreds, { targets: '#header-text-eligibility' }), 3150)
                .add(svg, 5900)
                .add(clarence, 6000)
                .add(Object.assign(svg, { targets: '#header-text-meet-clarence' }), 6100)
                .add(Object.assign(svg, { targets: '#header-text-clarence' }), 6200)
                .add(Object.assign(svg, {
                    targets: '#header-text-start-button',
                    complete: () => {
                        getStartedButton.style.pointerEvents = 'all'
                    }
                }), 6300)
                .play()
        }, 300)
    }

    public mounted() {
        requestAnimationFrame(() => {
            this.run()
        })
    }
}
