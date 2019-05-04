import { Component, Vue, Prop } from 'vue-property-decorator'
import Subject from '@/utils/subject'
import translate from '@/services/translate/translate'

@Component({})
export default class ListToSidebar extends Vue {
    public translate = translate

    @Prop()
    public show$!: Subject

    @Prop()
    public tabs: any

    @Prop()
    public collapseIcon!: boolean

    @Prop()
    public collapseLabel!: boolean

    public isSidebar = false

    public mounted() {
        this.show$.subscribe((val: any) => {
            if (val && val !== ``) {
                this.isSidebar = true
                return
            }

            this.isSidebar = false
        })
    }
}
