import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import search from '@/components/search'
import shoppingCart from '@/components/shoppingCart'
import distribution from '@/components/distribution'
import orderConfirm from '@/components/orderConfirm'
import details from '@/components/details'
import payment from '@/components/payment'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: shoppingCart
    },
    {
      path: '/distribution',
      name: 'distribution',
      component: distribution
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    },
    {
      path: '/details',
      name: 'details',
      component: details
    },
    {
      path: '/payment',
      name: 'payment',
      component: payment
    }
  ]
})
