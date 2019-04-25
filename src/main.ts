import Vue from 'vue'
import App from './components/app/App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCoffee, faBars, faUserCircle, faAt, faKey, faChevronRight,
    faAddressCard, faArrowAltCircleLeft, faArrowLeft, faHammer, faCar,
    faPhone, faCheckCircle, faTimesCircle, faTimes, faHome
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faCoffee, faBars, faUserCircle, faAt, faKey, faChevronRight,
    faAddressCard, faArrowAltCircleLeft, faArrowLeft, faHammer,
    faCar, faPhone, faCheckCircle, faTimesCircle, faTimes, faHome
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({ render: (h) => h(App) }).$mount('#app')
