import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '百城书香 阅读校园'
    }
  },
  {
    path: '/appraisaled', 
    name: 'appraisaled',
    component: () => import(/* webpackChunkName: "about" */ '../views/appraisaled.vue'),
    meta: {
      title: '个人测评结果'
    }
  },
  {
    path: '/schoolResult',
    name: 'schoolResult',
    component: () => import(/* webpackChunkName: "about" */ '../views/schoolResult.vue'),
    meta: {
      title: '园所测评结果'
    }
  },
  {
    path: '/do',
    name: 'do',
    component: () => import(/* webpackChunkName: "about" */ '../views/do.vue'),
    meta: {
      title: '阅读测评'
    }
  },
  {
    path: '/result',
    name: 'result',
    component: () => import(/* webpackChunkName: "about" */ '../views/result.vue'),
    meta: {
      title: '测评结果'
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    if (savedPosition) {
        return savedPosition
    } else {
        return { x: 0, y: 0 }
    }
}
})

export default router
