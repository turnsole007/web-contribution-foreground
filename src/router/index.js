import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import RankList from '@/components/RankList'
import PersonalInfo from '@/components/PersonalInfo'
import Update from '@/components/Update'
import Certification from '@/components/Certification'
import Entity from '@/components/Entity'
import Page401 from '@/components/401'
import Page404 from '@/components/404'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
      /* meta: {
        keepAlive: true
      } */
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
      /* meta: {
        keepAlive: false
      } */
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
      /* meta: {
        keepAlive: false
      } */
    },
    {
      path: '/getranklist',
      name: 'RankList',
      // meta: {
      //   requireAuth: true
      //   // keepAlive: true
      // },
      component: RankList
    },
    {
      path: '/homepage/:username',
      name: 'Homepage',
      meta: {
        requireAuth: true
        // keepAlive: true
      },
      component: PersonalInfo
    },
    {
      path: '/personal',
      name: 'PersonalInfo',
      // meta: {
      //   requireAuth: true
      //   // keepAlive: true
      // },
      component: PersonalInfo
    },
    {
      path: '/update',
      name: 'Update',
      meta: {
        requireAuth: true
        // keepAlive: true
      },
      component: Update
    },
    {
      path: '/certification',
      name: 'Certification',
      meta: {
        requireAuth: true
      },
      component: Certification
    },
    {
      path: '/entity/:username',
      name: 'Entity',
      meta: {
        requireAuth: true
      },
      component: Entity
    },
    {
      path: '/error/401',
      name: '401',
      component: Page401
    },
    {
      path: '/error/404',
      name: '404',
      component: Page404
    }
  ]
})
// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      alert('请先登录')
      next({
        path: '/index',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
export default router
