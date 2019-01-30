import Vue from 'vue'
import Router from 'vue-router'
import toPlatform from '@/utils/toPlatform'
import Login from './views/Login'
import Member from './views/Member'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    }
  ]
})

const getUserinfo = () => {
  return JSON.parse(localStorage.getItem('nb-casino-userinfo') || 'null') || null
}

const routerInterceptor = {
  // '/': toPlatform,
  '/': function (next) {
    if (!getUserinfo()) {
      next({ path: '/login' })
      return
    }
    toPlatform()
  },
  '/login': (next) => {
    const userinfo = getUserinfo()
    if (userinfo) {
      next({ path: '/' })
      return
    }

    next()
  },
  '/member': (next) => {
    const userinfo = getUserinfo()
    if (userinfo) {
      next()
      return
    }

    next({ path: '/login' })
  }
}

router.beforeEach((to, from, next) => {
  const interceptor = routerInterceptor[to.path]
  if (interceptor) {
    interceptor(next)
    return
  }
  next()
})

export default router
