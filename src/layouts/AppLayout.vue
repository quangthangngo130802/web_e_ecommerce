<script setup>
import { useRouter } from 'vue-router'

import AppFooter from '@/layouts/partials/AppFooter.vue'
import AppHeader from '@/layouts/partials/AppHeader.vue'
import AppSidebar from '@/layouts/partials/AppSidebar.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="app-shell">
    <AppHeader :is-authenticated="authStore.isAuthenticated" @logout="handleLogout" />

    <div class="layout-body" :class="{ 'layout-body--guest': !authStore.isAuthenticated }">
      <AppSidebar v-if="authStore.isAuthenticated" />

      <main class="page-content">
        <RouterView />
      </main>
    </div>

    <AppFooter />
  </div>
</template>
