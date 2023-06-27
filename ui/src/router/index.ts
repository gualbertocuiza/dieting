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
  {
    path: '/',
    redirect: '/login',
    component: () => import('../layouts/auth-layout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../pages/auth/login.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../pages/auth/register.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes,
})

export default router
