import Vue from 'vue'
import App from './components/app/app'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCoffee, faBars, faUserCircle, faAt, faKey, faChevronRight,
    faAddressCard, faArrowAltCircleLeft, faArrowLeft, faHammer, faCar,
    faPhone, faCheckCircle, faTimesCircle, faTimes, faHome, faListUl,
    faEdit, faCheckSquare, faChevronLeft, faPlus, faBriefcase
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faCoffee, faBars, faUserCircle, faAt, faKey, faChevronRight,
    faAddressCard, faArrowAltCircleLeft, faArrowLeft, faHammer,
    faCar, faPhone, faCheckCircle, faTimesCircle, faTimes, faHome,
    faListUl, faEdit, faCheckSquare, faChevronLeft, faPlus, faBriefcase
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({ render: (h) => h(App) }).$mount('#app')
