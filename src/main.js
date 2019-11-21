import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './libs/rem'
import './utils/depend.js'
import './utils/tool.js'
import wx from 'weixin-js-sdk'

Vue.config.productionTip = false

// 微信授权
store.dispatch('wxConfig')
Vue.prototype.$wx = wx

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




// import 'babel-polyfill'
// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store/index'
// import Vconsole from 'vconsole'
// import filters from './filter'
// import wx from 'weixin-js-sdk'
// import '../utils/depend.js'
// import '../utils/tool.js'
// import './mta/index'
// import './assets/css/reset-wap.min.css'
// import './assets/css/common.scss'

// if (Vue.prototype.$getQueryString('debug')) {
//   let newConsole = new Vconsole()
// }
// document.body.addEventListener('touchstart', function () {})
// Vue.config.productionTip = false

// // 过滤器
// Object.keys(filters).forEach(item => {
//   Vue.filter(item, filters[item])
// })


// // 微信授权
// store.dispatch('wxConfig')
// Vue.prototype.$wx = wx


// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')