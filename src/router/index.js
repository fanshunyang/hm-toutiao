import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../pages/login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/Profile.vue'
import editprofile from '../pages/editprofile.vue'
import interest from '../pages/interest.vue'
import followup from '../pages/followup'
import enshrine from '../pages/enshrine.vue'
import different from '../pages/different.vue'
import article from '../pages/article.vue'
import tabmanger from '../pages/tabmanger'
import search from '../pages/search'
import store from '../store'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', component: login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/profile', component: Profile, name: 'Profile' },
    { path: '/editprofile', component: editprofile, name: 'editprofile' },
    { path: '/interest', component: interest, name: ' interest ' },
    { path: '/followup', component: followup, name: ' followup ' },
    { path: '/enshrine', component: enshrine, name: ' enshrine ' },
    { path: '/different', component: different, name: ' different ' },
    { path: '/article/:id', component: article, name: ' article ' },
    { path: '/tabmanger/', component: tabmanger, name: ' tabmanger ' },
    { path: '/search/', component: search, name: ' search ' }
  ]
})
const auters = [
  '/profile',
  '/editprofile',
  '/interest',
  '/followup',
  '/enshrine'
]
router.beforeEach(function (to, from, next) {
  // 这里的首页一进来就被缓存过如果到首页那么就把cache和different给到mutations
  if (to.name === 'different') {
    store.commit('cache', 'different')
  }
  // 如是从different离开并且不是去详情页那么就不缓存
  if (from.name === 'different' && to.name !== 'article') {
    store.commit('uncache', 'different')
  }
  // 判断用户是否登录
  const token = localStorage.getItem('token')
  // 如果去个人中心，需要判断是否登录
  //   如果有token，说明，登录了，继续
  //   如果没有token，没有没有登录，去登录
  // 如果不是去个人中心，不判断，直接去
  // 判断数组是否包含某个值
  if (auters.includes(to.path)) {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
