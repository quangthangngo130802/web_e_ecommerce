<script setup>
import { computed, ref } from 'vue'
import { DeleteOutlined } from '@ant-design/icons-vue'

const customers = ref([
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
])

const totalCustomers = computed(() => customers.value.length)


const customerComments = ref([
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
])

const customerInputRows = ref([])
const commentInputRows = ref([])

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

const customerInputColumns = [
  {
    title: 'Tên khách hàng',
    dataIndex: 'name',
    key: 'name',
    width: 220,
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
    width: 150,
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender',
    width: 140,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 160,
  },
  {
    title: '',
    key: 'action',
    width: 90,
    align: 'center',
  },
]

const commentInputColumns = [
  {
    title: 'Tên khách hàng',
    dataIndex: 'name',
    key: 'name',
    width: 240,
  },
  {
    title: 'Nội dung',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '',
    key: 'action',
    width: 90,
    align: 'center',
  },
]

function createCustomerInputRow() {
  return {
    uid: Date.now() + Math.random(),
    name: '',
    phone: '',
    birthday: '',
    gender: 'male',
    status: 'active',
  }
}

function createCommentInputRow() {
  return {
    uid: Date.now() + Math.random(),
    name: '',
    content: '',
  }
}

function addCustomerInputRow() {
  customerInputRows.value.push(createCustomerInputRow())
}

function removeCustomerInputRow(uid) {
  customerInputRows.value = customerInputRows.value.filter((row) => row.uid !== uid)
}

function saveCustomerInputRows() {
  const validRows = customerInputRows.value.filter((row) => row.name.trim())

  if (!validRows.length) return false

  const currentMaxId = Math.max(...customers.value.map((customer) => customer.id), 0)

  customers.value.push(
    ...validRows.map((row, index) => ({
      id: currentMaxId + index + 1,
      name: row.name.trim(),
      phone: row.phone.trim(),
      birthday: row.birthday.trim(),
      gender: row.gender,
      status: row.status,
    })),
  )
  console.log('Saved customers:', customers.value)

  customerInputRows.value = []
  return true
}

function addCommentInputRow() {
  commentInputRows.value.push(createCommentInputRow())
}

function removeCommentInputRow(uid) {
  commentInputRows.value = commentInputRows.value.filter((row) => row.uid !== uid)
}

function saveCommentInputRows() {
  const validRows = commentInputRows.value.filter((row) => row.name.trim() && row.content.trim())

  if (!validRows.length) return false

  const currentMaxId = Math.max(...customerComments.value.map((comment) => comment.id), 0)

  customerComments.value.push(
    ...validRows.map((row, index) => ({
      id: currentMaxId + index + 1,
      name: row.name.trim(),
      content: row.content.trim(),
    })),
  )

  commentInputRows.value = []
  return true
}

function submitCustomerForm() {
  saveCustomerInputRows()
  saveCommentInputRows()
}

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
        <h2>Danh sách khách hàng</h2>
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
            total: totalCustomers,
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

       <a-tab-pane key="create" tab="Thêm thông tin khách hàng">
        <a-tabs default-active-key="customer-info">
          <a-tab-pane key="customer-info" tab="Thông tin khách hàng">
            <a-table
              :columns="customerInputColumns"
              :data-source="customerInputRows"
              :pagination="false"
              class="data-table input-table"
              row-key="uid"
              :scroll="{ x: 930 }"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                  <a-input v-model:value="record.name" placeholder="Nhập tên khách hàng" />
                </template>

                <template v-else-if="column.key === 'phone'">
                  <a-input v-model:value="record.phone" placeholder="Nhập số điện thoại" />
                </template>

                <template v-else-if="column.key === 'birthday'">
                  <a-input v-model:value="record.birthday" placeholder="dd/mm/yyyy" />
                </template>

                <template v-else-if="column.key === 'gender'">
                  <a-select v-model:value="record.gender" style="width: 100%">
                    <a-select-option value="male">Nam</a-select-option>
                    <a-select-option value="female">Nữ</a-select-option>
                    <a-select-option value="other">Khác</a-select-option>
                  </a-select>
                </template>

                <template v-else-if="column.key === 'status'">
                  <a-select v-model:value="record.status" style="width: 100%">
                    <a-select-option value="active">Hoạt động</a-select-option>
                    <a-select-option value="inactive">Tạm ngưng</a-select-option>
                    <a-select-option value="blocked">Đã khóa</a-select-option>
                  </a-select>
                </template>

                <template v-else-if="column.key === 'action'">
                  <a-button
                    danger
                    shape="circle"
                    title="Xóa"
                    aria-label="Xóa"
                    @click="removeCustomerInputRow(record.uid)"
                  >
                    <DeleteOutlined />
                  </a-button>
                </template>
              </template>
            </a-table>

            <div class="table-actions">
              <a-button @click="addCustomerInputRow">Thêm hàng</a-button>
            </div>
          </a-tab-pane>

          <a-tab-pane key="comment-info" tab="Nội dung">
            <a-table
              :columns="commentInputColumns"
              :data-source="commentInputRows"
              :pagination="false"
              class="data-table input-table"
              row-key="uid"
              :scroll="{ x: 720 }"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                  <a-input v-model:value="record.name" placeholder="Nhập tên khách hàng" />
                </template>

                <template v-else-if="column.key === 'content'">
                  <a-textarea
                    v-model:value="record.content"
                    placeholder="Nhập nội dung"
                    :auto-size="{ minRows: 1, maxRows: 4 }"
                  />
                </template>

                <template v-else-if="column.key === 'action'">
                  <a-button
                    danger
                    shape="circle"
                    title="Xóa"
                    aria-label="Xóa"
                    @click="removeCommentInputRow(record.uid)"
                  >
                    <DeleteOutlined />
                  </a-button>
                </template>
              </template>
            </a-table>

            <div class="table-actions">
              <a-button @click="addCommentInputRow">Thêm hàng</a-button>
            </div>
         
          </a-tab-pane>
        </a-tabs>

        <div class="form-submit-actions">
          <a-button type="primary" @click="submitCustomerForm">Lưu thông tin khách hàng</a-button>
        </div>
      </a-tab-pane>

    </a-tabs>
  </section>
</template>

<style scoped>
.table-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

.form-submit-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

:deep(.input-table .ant-empty) {
  margin-block: 18px;
  font-size: 0.85rem;
}

:deep(.input-table .ant-empty-image) {
  height:24px;
  margin-bottom: 4px;
}

:deep(.input-table .ant-empty-image svg) {
  width: 42px;
  height: 34px;
}
</style>
