import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import redirectMe from '@/components/redirectMe'
import configuration from '@/components/configuration'
import contact from '@/components/contact'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/redirectme',
      name: 'redirectMe',
      component: redirectMe,
      props: (route) => ({ querystr: route.query.q, shrtcut: route.query.s })
    },
    {
      path: '/config',
      name: 'configuration',
      component: configuration
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    }

  ]
})
