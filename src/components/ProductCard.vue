<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="product-card">
    <div class="product-image" aria-hidden="true">{{ product.name.charAt(0) }}</div>
    <div class="product-body">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <strong>{{ product.price.toLocaleString('vi-VN') }} VND</strong>
    </div>
  </article>
</template>
