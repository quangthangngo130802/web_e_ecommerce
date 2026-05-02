<script setup>
defineProps({
  isAuthenticated: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['logout'])
</script>

<template>
  <header class="site-header">
    <RouterLink class="brand" to="/">Thương Mại Điện Tử</RouterLink>

    <nav class="main-nav" aria-label="Điều hướng chính">
      <RouterLink v-if="isAuthenticated" to="/">Trang chủ</RouterLink>
      <RouterLink v-if="isAuthenticated" to="/products">Sản phẩm</RouterLink>
      <RouterLink v-if="isAuthenticated" to="/orders">Đơn hàng</RouterLink>
      <RouterLink v-if="isAuthenticated" to="/customers">Khách hàng</RouterLink>
      <RouterLink v-if="!isAuthenticated" to="/login">Đăng nhập</RouterLink>
      <button v-else class="nav-button" type="button" @click="$emit('logout')">Đăng xuất</button>
    </nav>
  </header>
</template>
