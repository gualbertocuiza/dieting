import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/home/index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/about/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes,
})

export default router
