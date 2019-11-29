import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/price/:favoriteStockId',
      name: 'price',
      component: require('@/components/Price/Price').default,
      props: true
    },
    {
      path: '/minute-price/:favoriteStockId',
      name: 'minute-price',
      component: require('@/components/MinutePrice/Price').default,
      props: true
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: require('@/components/Favorite/List').default
    }
  ]
})
