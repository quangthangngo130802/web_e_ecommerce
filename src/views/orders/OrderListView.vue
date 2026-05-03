<script setup>
import { ref, onMounted } from 'vue'
import { getOrders } from '@/services/orderService'
const orders = ref([])
const loading = ref(false)

const fetchOrders = async () => {
  loading.value = true
  try {
    const data = await getOrders()
    orders.value = data;
    console.log(data);
    console.log(orders.value);
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchOrders)

const orderStatusMap = {
  processing: {
    label: 'Đang xử lý',
    color: 'gold',
  },
  shipping: {
    label: 'Đang giao',
    color: 'blue',
  },
  completed: {
    label: 'Hoàn thành',
    color: 'green',
  },
  cancelled: {
    label: 'Đã hủy',
    color: 'red',
  },
}

const paymentStatusMap = {
  paid: {
    label: 'Đã thanh toán',
    color: 'green',
  },
  unpaid: {
    label: 'Chưa thanh toán',
    color: 'orange',
  },
}

const columns = [
  {
    title: 'STT',
    key: 'index',
    width: 72,
    align: 'center',
  },
  {
    title: 'Mã đơn hàng',
    dataIndex: 'code',
    key: 'code',
    width: 170,
    sorter: (a, b) => a.code.localeCompare(b.code),
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'customerName',
    key: 'customerName',
    width: 180,
    sorter: (a, b) => a.customerName.localeCompare(b.customerName, 'vi'),
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 110,
    align: 'center',
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total',
    key: 'total',
    width: 150,
    align: 'right',
    sorter: (a, b) => a.total - b.total,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 150,
    sorter: (a, b) => getOrderStatusLabel(a.status).localeCompare(getOrderStatusLabel(b.status), 'vi'),
    filters: [
      { text: 'Đang xử lý', value: 'processing' },
      { text: 'Đang giao', value: 'shipping' },
      { text: 'Hoàn thành', value: 'completed' },
      { text: 'Đã hủy', value: 'cancelled' },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    title: 'Thanh toán',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    width: 170,
    sorter: (a, b) =>
      getPaymentStatusLabel(a.paymentStatus).localeCompare(
        getPaymentStatusLabel(b.paymentStatus),
        'vi',
      ),
    filters: [
      { text: 'Đã thanh toán', value: 'paid' },
      { text: 'Chưa thanh toán', value: 'unpaid' },
    ],
    onFilter: (value, record) => record.paymentStatus === value,
  },
  {
    title: 'Ngày mua',
    dataIndex: 'purchasedAt',
    key: 'purchasedAt',
    width: 130,
    sorter: (a, b) => parseDate(a.purchasedAt) - parseDate(b.purchasedAt),
    defaultSortOrder: 'descend',
  },
]

function formatCurrency(value) {
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
}

function parseDate(value) {
  const [day, month, year] = value.split('/').map(Number)

  return new Date(year, month - 1, day).getTime()
}

function getOrderStatusLabel(status) {
  return orderStatusMap[status]?.label || status
}

function getOrderStatusColor(status) {
  return orderStatusMap[status]?.color || 'default'
}

function getPaymentStatusLabel(status) {
  return paymentStatusMap[status]?.label || status
}

function getPaymentStatusColor(status) {
  return paymentStatusMap[status]?.color || 'default'
}
</script>

<template>
  <section class="orders-page">
    <div class="section-header page-section-header">
      <div>
        <p class="eyebrow">Bán hàng</p>
        <h2>Danh sách đơn hàng</h2>
      </div>
    </div>

    <a-table
      :columns="columns"
      :data-source="orders"
      :pagination="{
        defaultPageSize: 5,
        pageSizeOptions: ['5', '10', '20', '50'],
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} đơn hàng`,
      }"
      class="data-table"
      row-key="id"
      :scroll="{ x: 1100 }"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          {{ index + 1 }}
        </template>

        <template v-else-if="column.key === 'code'">
          <strong class="order-code">{{ record.code }}</strong>
        </template>

        <template v-else-if="column.key === 'total'">
          <strong>{{ formatCurrency(record.total) }}</strong>
        </template>

        <template v-else-if="column.key === 'status'">
          <a-tag :color="getOrderStatusColor(record.status)">
            {{ getOrderStatusLabel(record.status) }}
          </a-tag>
        </template>

        <template v-else-if="column.key === 'paymentStatus'">
          <a-tag :color="getPaymentStatusColor(record.paymentStatus)">
            {{ getPaymentStatusLabel(record.paymentStatus) }}
          </a-tag>
        </template>
      </template>
    </a-table>
  </section>
</template>
