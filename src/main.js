// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import cookies from 'vue-cookies'
// 引入公共JS文件
import commonJS from './commonJs/common.js'
// 引入全局变量
import global from './components/Global.vue'
// 引入公共样式文件
import './style/common.css'
import axios from 'axios'

Vue.prototype.commonJS = commonJS
Vue.prototype.global = global
Vue.prototype.$cookies = cookies

Vue.use(ElementUI)
Vue.use(VueJsonp)
Vue.config.productionTip = false

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log(response)
  console.log(response.data.factory_node)
  if (response.data.factory_data === 'notlogin') {
    // 未登录跳转登录页面
    window.location.href = global.server + '/#/login'
  } else {
    return response
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
