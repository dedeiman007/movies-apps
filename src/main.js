import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import * as moment from "moment/moment";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/scss/app.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.mixin({

  methods: {
    date(date, format){
        return moment(date).format(format)
    },
  }

})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
