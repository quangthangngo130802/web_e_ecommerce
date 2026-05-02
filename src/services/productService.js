const fallbackProducts = [
  {
    id: 1,
    name: 'Áo thun basic',
    description: 'Sản phẩm mẫu cho giao diện danh mục.',
    price: 199000,
  },
  {
    id: 2,
    name: 'Quần jean slim',
    description: 'Dữ liệu demo có thể thay bằng API thật.',
    price: 459000,
  },
  {
    id: 3,
    name: 'Giày sneaker',
    description: 'Mẫu sản phẩm dùng để phát triển UI ban đầu.',
    price: 699000,
  },
]

export async function getProducts() {
  return fallbackProducts
}
