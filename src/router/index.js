import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import RankList from '@/components/RankList'
import PersonalInfo from '@/components/PersonalInfo'
import Update from '@/components/Update'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/getranklist',
      name: 'RankList',
      meta: {
        requireAuth: true
      },
      component: RankList
    },
    {
      path: '/personal',
      name: 'PersonalInfo',
      meta: {
        requireAuth: true
      },
      component: PersonalInfo
    },
    {
      path: '/update',
      name: 'Update',
      meta: {
        requireAuth: true
      },
      component: Update
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
export default router
