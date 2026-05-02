<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="hero">
    <div>
      <p class="eyebrow">Nền tảng Vue 3</p>
      <h1>Khởi tạo nhanh cho dự án thương mại điện tử</h1>
      <p>
        Cấu trúc sẵn sàng cho router, store, API service, component dùng chung và các màn hình
        chính.
      </p>
      <RouterLink class="primary-link" to="/products">Xem sản phẩm</RouterLink>
    </div>
  </section>
</template>
