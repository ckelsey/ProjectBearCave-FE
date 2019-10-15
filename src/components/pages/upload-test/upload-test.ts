import { Component, Vue } from 'vue-property-decorator'
import { FileUploader } from '@/services/file-upload';

@Component({ components: {} })
export default class UploadTest extends Vue {
    public progress = 0
    public error = ``
    public upload(e: Event) {
        if (!e || !e.target) {
            return
        }

        const target = e.target as HTMLInputElement
        const files = target.files

        if (!files) {
            return
        }

        const file = files[0]
        const prog = (progress: number) => this.progress = progress

        const uploader = new FileUploader(file)

        uploader.state$.subscribe(state => {
            console.log(state)
            this.error = state.error
            this.progress = state.progress
        })

        uploader.upload()
    }
}
