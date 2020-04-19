import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import 'lib-flexible'
import { Button, Toast, Dialog, Field, Radio, RadioGroup, Uploader, List, Tab, Tabs, PullRefresh } from 'vant'
import hminput from './components/hminput'
import hmnav from './components/hmnav'
import hmheader from './components/hmheader'
import './style/base.css'
import './style/icon.css'
import axios from 'axios'
import moment from 'moment'
import btn from './components/btn'
Vue.use(Button)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)

Vue.component('hminput', hminput)
Vue.component('hmnav', hmnav)
Vue.component('hmheader', hmheader)
Vue.component('btn', btn)
Vue.config.productionTip = false
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://localhost:3000'

Vue.filter('item', function (input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

axios.interceptors.response.use(function (response) {
  // 在发送请求之前做些什么，例如加入token
  if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    Toast.fail('用户验证失败')
  }
  return response
  // console.log(response.data)
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.revision = function (url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}
