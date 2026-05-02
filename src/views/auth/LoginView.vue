<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LockOutlined, MailOutlined } from '@ant-design/icons-vue'

import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  remember: true,
})

async function handleSubmit() {
  try {
    await authStore.login(form)
    router.push(route.query.redirect?.toString() || '/')
  } catch {
    form.password = ''
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-showcase">
      <p class="eyebrow">Thành viên</p>
      <h1>Mua sắm nhanh hơn với tài khoản của bạn</h1>
      <p>
        Theo dõi đơn hàng, lưu địa chỉ giao hàng và nhận các ưu đãi phù hợp chỉ trong một nơi.
      </p>

      <div class="auth-metrics" aria-label="Lợi ích tài khoản">
        <div>
          <strong>24/7</strong>
          <span>Tra cứu đơn hàng</span>
        </div>
        <div>
          <strong>1 chạm</strong>
          <span>Thanh toán nhanh</span>
        </div>
      </div>
    </div>

    <div class="auth-panel">
      <div class="auth-header">
        <h1>Đăng nhập</h1>
        <p>Chào mừng bạn quay lại. Vui lòng nhập thông tin tài khoản.</p>
      </div>

      <form class="auth-form" @submit.prevent="handleSubmit">
        <a-form layout="vertical" :model="form" @finish="handleSubmit">
          <a-form-item
            label="Email"
            name="email"
            :rules="[
              { required: true, message: 'Vui lòng nhập email.' },
              { type: 'email', message: 'Email không hợp lệ.' },
            ]"
          >
            <a-input
              v-model:value="form.email"
              autocomplete="email"
              placeholder="ban@example.com"
              size="large"
            >
              <template #prefix>
                <MailOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            label="Mật khẩu"
            name="password"
            :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu.' }]"
          >
            <a-input-password
              v-model:value="form.password"
              autocomplete="current-password"
              placeholder="Nhập mật khẩu"
              size="large"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="form-row">
            <a-checkbox v-model:checked="form.remember">Ghi nhớ đăng nhập</a-checkbox>

            <a href="#">Quên mật khẩu?</a>
          </div>

          <a-alert
            v-if="authStore.error"
            :message="authStore.error"
            show-icon
            type="error"
          />

          <a-button
            block
            class="auth-submit"
            html-type="submit"
            :loading="authStore.isLoading"
            size="large"
            type="primary"
          >
            Đăng nhập
          </a-button>
        </a-form>

        <p class="auth-register">
          Chưa có tài khoản?
          <a href="#">Tạo tài khoản mới</a>
        </p>
      </form>
    </div>
  </section>
</template>
