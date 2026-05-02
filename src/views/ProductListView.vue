<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
const { products, isLoading, error } = storeToRefs(productStore)

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <section>
    <div class="section-header">
      <p class="eyebrow">Danh mục</p>
      <h1>Sản phẩm</h1>
    </div>

    <p v-if="isLoading">Đang tải sản phẩm...</p>
    <p v-else-if="error" class="error-message">{{ error }}</p>

    <div v-else class="product-grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>
