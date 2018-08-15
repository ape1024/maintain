import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import echarts from 'echarts'
import 'vue2-animate/dist/vue2-animate.min.css'
import 'common/stylus/index.styl'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { interceptors, interceptorsResponse } from 'api/axios-interceptors'
import axios from 'axios'
Vue.prototype.axios = axios

Vue.use(ElementUI)
Vue.use(Leaflet)
interceptors(router)
interceptorsResponse(router)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  echarts,
  render: h => h(App)
})
