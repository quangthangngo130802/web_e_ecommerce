<script setup>
const customers = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    phone: '0901 234 567',
    birthday: '12/03/1995',
    gender: 'male',
    status: 'active',
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    phone: '0912 345 678',
    birthday: '24/08/1998',
    gender: 'female',
    status: 'active',
  },
  {
    id: 3,
    name: 'Lê Minh Quân',
    phone: '0934 567 890',
    birthday: '05/11/1992',
    gender: 'male',
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Phạm Thu Hà',
    phone: '0987 654 321',
    birthday: '19/01/2000',
    gender: 'female',
    status: 'blocked',
  },
]

const customerComments = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    content: 'Sản phẩm đẹp, giao hàng nhanh và đóng gói cẩn thận.',
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    content: 'Nhân viên tư vấn nhiệt tình, sẽ tiếp tục ủng hộ.',
  },
  {
    id: 3,
    name: 'Lê Minh Quân',
    content: 'Cần cải thiện thời gian phản hồi khi khách nhắn tin.',
  },
  {
    id: 4,
    name: 'Phạm Thu Hà',
    content: 'Đổi trả thuận tiện, chất lượng sản phẩm đúng mô tả.',
  },
]

const genderMap = {
  male: 'Nam',
  female: 'Nữ',
  other: 'Khác',
}

const customerStatusMap = {
  active: {
    label: 'Hoạt động',
    color: 'green',
  },
  inactive: {
    label: 'Tạm ngưng',
    color: 'orange',
  },
  blocked: {
    label: 'Đã khóa',
    color: 'red',
  },
}

const customerColumns = [
  {
    title: 'STT',
    key: 'index',
    width: 72,
    align: 'center',
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'name',
    key: 'name',
    width: 220,
    sorter: (a, b) => a.name.localeCompare(b.name, 'vi'),
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
    width: 170,
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birthday',
    key: 'birthday',
    width: 140,
    sorter: (a, b) => parseDate(a.birthday) - parseDate(b.birthday),
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender',
    width: 130,
    filters: [
      { text: 'Nam', value: 'male' },
      { text: 'Nữ', value: 'female' },
      { text: 'Khác', value: 'other' },
    ],
    onFilter: (value, record) => record.gender === value,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 150,
    filters: [
      { text: 'Hoạt động', value: 'active' },
      { text: 'Tạm ngưng', value: 'inactive' },
      { text: 'Đã khóa', value: 'blocked' },
    ],
    onFilter: (value, record) => record.status === value,
  },
]

const commentColumns = [
  {
    title: 'STT',
    key: 'index',
    width: 72,
    align: 'center',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    width: 220,
    sorter: (a, b) => a.name.localeCompare(b.name, 'vi'),
  },
  {
    title: 'Nội dung bình luận',
    dataIndex: 'content',
    key: 'content',
  },
]

function parseDate(value) {
  const [day, month, year] = value.split('/').map(Number)

  return new Date(year, month - 1, day).getTime()
}

function getGenderLabel(gender) {
  return genderMap[gender] || gender
}

function getCustomerStatusLabel(status) {
  return customerStatusMap[status]?.label || status
}

function getCustomerStatusColor(status) {
  return customerStatusMap[status]?.color || 'default'
}
</script>

<template>
  <section class="customers-page">
    <div class="section-header page-section-header">
      <div>
        <p class="eyebrow">Khách hàng</p>
        <h1>Danh sách khách hàng</h1>
      </div>
    </div>

    <a-tabs class="customer-tabs" default-active-key="customers">
      <a-tab-pane key="customers" tab="Thông tin khách hàng">
        <a-table
          :columns="customerColumns"
          :data-source="customers"
          :pagination="{
            defaultPageSize: 5,
            pageSizeOptions: ['5', '10', '20', '50'],
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} khách hàng`,
          }"
          class="data-table"
          row-key="id"
          :scroll="{ x: 900 }"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">
              {{ index + 1 }}
            </template>

            <template v-else-if="column.key === 'name'">
              <strong>{{ record.name }}</strong>
            </template>

            <template v-else-if="column.key === 'gender'">
              {{ getGenderLabel(record.gender) }}
            </template>

            <template v-else-if="column.key === 'status'">
              <a-tag :color="getCustomerStatusColor(record.status)">
                {{ getCustomerStatusLabel(record.status) }}
              </a-tag>
            </template>
          </template>
        </a-table>
      </a-tab-pane>

      <a-tab-pane key="comments" tab="Bình luận khách hàng">
        <a-table
          :columns="commentColumns"
          :data-source="customerComments"
          :pagination="{
            defaultPageSize: 5,
            pageSizeOptions: ['5', '10', '20', '50'],
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} bình luận`,
          }"
          class="data-table"
          row-key="id"
          :scroll="{ x: 720 }"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">
              {{ index + 1 }}
            </template>

            <template v-else-if="column.key === 'name'">
              <strong>{{ record.name }}</strong>
            </template>
          </template>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </section>
</template>
