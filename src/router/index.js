import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import statistical from '@/view/Statistical'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/statistical',
      name: 'statistical',
      component: statistical
    }
  ]
})
