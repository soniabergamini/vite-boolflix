import { createApp } from 'vue'
import App from './App.vue'

// Style CSS
import './style/variables.scss'
import './style/mixin.scss'

// Flag Icons
import "/node_modules/flag-icons/css/flag-icons.min.css"

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'
library.add(fasFaStar, farFaStar)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
