import { http } from '@/services/http'

export async function loginAdmin(credentials) {
  const response = await http.post('/admin/login', {
    email: credentials.email,
    password: credentials.password,
  })

  return response.data
}
