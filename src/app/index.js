import Vue from 'vue'
import App from './App'
import store from './store'
import VueForceNextTick from 'vue-force-next-tick'
import { VueMaskDirective } from 'v-mask'
import { MakeHttp } from './utils/http'
import { getUrlParams } from './utils/helpers'
import './assets/scss/index.scss'

Vue.config.productionTip = false

Vue.use(VueForceNextTick)
Vue.directive('mask', VueMaskDirective)

Vue.filter('num', value => {
  if (value >= 0) {
    return value.toLocaleString('ru-RU')
  }
  return null
})

Vue.filter('formatDateTime', value => {
  if (value) {
    const date = new Date(value)
    const options = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', hour12: false
    }
    return new Intl.DateTimeFormat('ru-RU', options).format(date)
  }
  return null
})

let config = location.search ? getUrlParams(location.search) : {}
config.objectSrc = config.objectSrc || '/grntobject'
const $http = MakeHttp(config)

store.app = store.app || {}
store.app.$http = Vue.prototype.$http = $http
store.app.$config = Vue.prototype.$config = config

new Vue({
  store,
  el: '#app',
  render: h => h(App),
})
