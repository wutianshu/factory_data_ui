import Vue from 'vue'
import Router from 'vue-router'
import LOGIN from '@/components/Login'
import TOOLS1 from '@/pages/tools1'
import TOOLS2 from '@/pages/tools2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HOME',
      component: TOOLS1
    },
    {
      path: '/login',
      name: 'LOGIN',
      component: LOGIN
    },
    {
      path: '/tools1',
      name: 'TOOLS1_PAGE',
      component: TOOLS1
    },
    {
      path: '/tools2',
      name: 'TOOLS2_PAGE',
      component: TOOLS2
    }
  ]
})
