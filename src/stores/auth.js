import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { loginAdmin } from '@/services/authService'
import { TOKEN_STORAGE_KEY } from '@/services/http'

const AUTH_STORAGE_KEY = 'web_e_commerce_auth'

function getSavedUser() {
  const savedUser = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!savedUser) {
    return null
  }

  try {
    return JSON.parse(savedUser)
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(getSavedUser())
  const token = ref(localStorage.getItem(TOKEN_STORAGE_KEY))
  const isLoading = ref(false)
  const error = ref('')
  const isAuthenticated = computed(() => Boolean(user.value))

  async function login(credentials) {
    isLoading.value = true
    error.value = ''

    try {
      const data = await loginAdmin(credentials)
      const responseToken = data.token || data.access_token || data.data?.token || data.data?.access_token
      const responseUser = data.user || data.admin || data.data?.user || data.data?.admin

      user.value = responseUser || {
        email: credentials.email,
        name: credentials.email.split('@')[0],
      }
      token.value = responseToken || ''

      if (credentials.remember) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user.value))

        if (token.value) {
          localStorage.setItem(TOKEN_STORAGE_KEY, token.value)
        }
      }

      return user.value
    } catch (requestError) {
      error.value =
        requestError.response?.data?.message ||
        requestError.response?.data?.error ||
        'Email hoặc mật khẩu không đúng.'
      throw requestError
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = ''
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
  }
})
