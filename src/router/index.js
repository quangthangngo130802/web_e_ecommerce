import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/products',
    name: 'products',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/ProductListView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      guestOnly: true,
    },
    component: () => import('@/views/auth/LoginView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('You must be logged in to access this page.');
    return {
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'home' }
  }

  return true
})

export default router
