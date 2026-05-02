import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getProducts } from '@/services/productService'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const isLoading = ref(false)
  const error = ref('')

  async function fetchProducts() {
    isLoading.value = true
    error.value = ''

    try {
      products.value = await getProducts()
    } catch {
      error.value = 'Không thể tải danh sách sản phẩm.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    error,
    fetchProducts,
  }
})
