<script setup>
const orders = [
  {
    id: 1,
    code: 'DH-20260502-001',
    customerName: 'Nguyễn Văn An',
    quantity: 3,
    total: 1250000,
    status: 'processing',
    paymentStatus: 'paid',
    purchasedAt: '02/05/2026',
  },
  {
    id: 2,
    code: 'DH-20260502-002',
    customerName: 'Trần Thị Bình',
    quantity: 1,
    total: 459000,
    status: 'shipping',
    paymentStatus: 'unpaid',
    purchasedAt: '02/05/2026',
  },
  {
    id: 3,
    code: 'DH-20260501-003',
    customerName: 'Lê Minh Quân',
    quantity: 5,
    total: 2845000,
    status: 'completed',
    paymentStatus: 'paid',
    purchasedAt: '01/05/2026',
  },
  {
    id: 4,
    code: 'DH-20260430-004',
    customerName: 'Phạm Thu Hà',
    quantity: 2,
    total: 899000,
    status: 'cancelled',
    paymentStatus: 'unpaid',
    purchasedAt: '30/04/2026',
  },
]

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
        <h1>Danh sách đơn hàng</h1>
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
