import { http } from '@/services/http'

// Lấy danh sách orders
export async function getOrders(params = {}) {
  const response = await http.get('/admin/order/list', {
    params // dùng cho filter, phân trang nếu có
  })

  return response.data
}

// Lấy chi tiết 1 order
export async function getOrderById(id) {
  const response = await http.get(`/orders/${id}`)
  return response.data
}

// Tạo order
export async function createOrder(data) {
  const response = await http.post('/orders', data)
  return response.data
}

// Cập nhật order
export async function updateOrder(id, data) {
  const response = await http.put(`/orders/${id}`, data)
  return response.data
}

// Xoá order
export async function deleteOrder(id) {
  const response = await http.delete(`/orders/${id}`)
  return response.data
}