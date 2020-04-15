// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/reset.css'
import qs from 'qs'
import axios from 'axios'

import "../src/iconfont/font_6zawy1341sd/iconfont.css"
// import store from './store/user'
// axios.defaults.baseURL='http://kaoshi.test.com/api/app'
// axios.defaults.withCredentials = true
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;UTF-8'

// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   let token=sessionStorage.getItem('token')
//   if(token){
//     config.headers.Authorization=token
//   }
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   let msg=response.data.message
//   if(msg=='用户名不存在！' || msg=='请重新登录！'){
//     window.location='/'
//   }
//   return response;
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.baseURL = 'http://anjian.beiqujy.com/api/app'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  router,
  components: { App },
  template: '<App/>'
})
