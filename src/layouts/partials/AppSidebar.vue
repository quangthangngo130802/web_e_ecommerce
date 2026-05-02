<template>
  <aside class="app-sidebar" aria-label="Thanh điều hướng">
    <div class="sidebar-section">
      <p class="sidebar-title">Quản lý</p>
      <RouterLink to="/">Tổng quan</RouterLink>
      <RouterLink to="/products">Sản phẩm</RouterLink>
    </div>

    <div class="sidebar-section">
      <p class="sidebar-title">Bán hàng</p>
      <RouterLink to="/orders">Đơn hàng</RouterLink>
      <RouterLink to="/customers">Khách hàng</RouterLink>
      <a href="#">Báo cáo</a>
    </div>
  </aside>
</template>
