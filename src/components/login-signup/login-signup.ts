import { Component, Vue } from 'vue-property-decorator'
import InputLabel from '../input-label/input-label.vue'

@Component({
    components: {
        'input-label': InputLabel
    }
})
export default class LoginSignup extends Vue {
    public mounted() {
        console.log('login')
    }
}
