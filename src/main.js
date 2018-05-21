// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import numeral from 'numeral'
import store from './store/store'

import 'element-ui/lib/theme-chalk/index.css'

import './mock' // mock data
Vue.use(Mint);
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.filter('numeral', function (value) {
  // 返回处理后的值
  return numeral(value).format('0,0.00')
})

Vue.filter('thousand', function (value) {
  // 返回处理后的值
  return numeral(value).format('0,0')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
