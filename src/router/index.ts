import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/OrderBookPage.vue')
    },
    {
      path: '/order-book/:symbol',
      name: 'order-book',
      component: () => import('@/views/OrderBookPage.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsPage.vue')
    }
  ]
})

export default router
