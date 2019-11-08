import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'

import App from './App'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Config from '../config/default'
import Migrate from '../migration/migrate-main'

library.add(faTrashAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.moment = Vue.prototype.$moment = moment
Vue.config.productionTip = false
Vue.base_url = Vue.prototype.$base_url = Config.base_url
Vue.db = Vue.prototype.$db = Migrate.run()

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
