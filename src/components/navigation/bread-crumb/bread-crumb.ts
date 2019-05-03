import { Component, Vue, Prop } from 'vue-property-decorator'
import Subject from '@/utils/subject'

@Component({})
export default class BreadCrumbs extends Vue {
    @Prop()
    public breadCrumbs$!: Subject

    public mounted() {
        const existingCrumbs: any = []

        this.breadCrumbs$.subscribe((crumbs: any) => {
            const getBreadCrumbs = (): HTMLElement[] => Array.from(this.$el.querySelectorAll(`.breadcrumb-element`))

            let breadCrumbs: HTMLElement[] = getBreadCrumbs()

            if (!breadCrumbs.length && !crumbs.length) { return }

            const remove = (index: number) => {
                return new Promise((resolve) => {
                    const crumb = getBreadCrumbs()[index]

                    if (!crumb || !crumb.parentNode) { return resolve() }

                    crumb.classList.remove(`expanded`)
                    const parentNode = crumb.parentNode

                    return setTimeout(() => {
                        parentNode.removeChild(crumb)
                        existingCrumbs.splice(index, 1)
                        return resolve()
                    }, 200)
                })
            }

            const create = (index: number) => {
                const crumb = crumbs[index]
                const crumbElement = document.createElement(`div`)
                crumbElement.className = `breadcrumb-element d-flex align-items-center`
                crumbElement.innerHTML = crumb.label

                if (crumb.click) {
                    crumbElement.addEventListener(`click`, () => { crumb.click() })
                } else {
                    crumbElement.classList.add(`no-click`)
                }

                return crumbElement
            }

            const add = (index: number) => {
                return new Promise((resolve) => {
                    breadCrumbs = getBreadCrumbs()

                    const crumb = crumbs[index]
                    const crumbElement = create(index)

                    existingCrumbs.splice(index, 0, crumb)
                    this.$el.insertBefore(crumbElement, breadCrumbs[index])

                    requestAnimationFrame(() => {
                        crumbElement.classList.add(`expanded`)
                    })

                    return resolve()
                })
            }

            const replace = (index: number) => {
                breadCrumbs = getBreadCrumbs()

                const crumb = crumbs[index]
                const crumbElement = create(index)
                const hasNoClick = breadCrumbs[index].classList.contains(`no-click`)

                crumbElement.className = `${crumbElement.className} expanded${hasNoClick ? ` no-click` : ``}`
                existingCrumbs[index] = crumb

                this.$el.replaceChild(crumbElement, breadCrumbs[index])

                return new Promise((resolve) => {
                    if (!!crumb.click && hasNoClick) {
                        requestAnimationFrame(() => {
                            crumbElement.classList.remove(`no-click`)
                            return resolve()
                        })
                    } else {
                        return resolve()
                    }
                })
            }

            const run = (): any => {
                if (existingCrumbs.length > crumbs.length) {
                    return remove(existingCrumbs.length - 1).then(() => run())
                }

                let index = 0

                while (index < existingCrumbs.length) {
                    const labelsMatch = existingCrumbs[index].label === crumbs[index].label
                    const existingClick = typeof existingCrumbs[index].click === `function` ? existingCrumbs[index].click.toString() : ``
                    const newClick = typeof crumbs[index].click === `function` ? crumbs[index].click.toString() : ``

                    if (labelsMatch) {
                        if (existingClick !== newClick) {
                            return replace(index).then(() => run())
                        }

                        index = index + 1
                    } else {
                        return remove(index)
                            .then(() => {
                                return add(index)
                                    .then(() => run())
                            })
                    }
                }

                if (crumbs.length > existingCrumbs.length) {
                    index = existingCrumbs.length
                    return add(index)
                        .then(() => run())
                }
            }

            run()
        })
    }
}
