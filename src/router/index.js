import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import OrionTypes from '../views/OrionTypes.vue'
import OrionEntities from '../views/OrionEntities.vue'
import OrionSubscriptions from '../views/OrionSubscriptions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'root',
    component: Home
  },
  {
    path: '/types',
    name: 'types',
    component: OrionTypes
  },
  {
    path: '/entities',
    name: 'entities',
    component: OrionEntities
  },
  {
    path: '/subscriptions',
    name: 'subscriptions',
    component: OrionSubscriptions
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
