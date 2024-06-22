<template>
  <div class="card p-fluid mt-8">
    <DataTable
      ref="dt"
      v-model:selection="selectedRows"
      :value="completeData"
      lazy
      :paginator="completeData?.length > 0"
      :first="first"
      :rows="10"
      data-key="auto_index_by_docspawn"
      :total-records="totalRecords"
      :loading="loading"
      :select-all="selectAll"
      table-style="min-width: 75rem"
      @page="onPage($event)" @sort="onSort($event)"
      @select-all-change="onSelectAllChange"
      @row-select="onRowSelect"
      @row-unselect="onRowUnselect"
    >
      <Column selection-mode="multiple" header-style="width: 3rem" />

      <Column v-for="(columnName, index) in props?.dataSourceColumnNames" :key="index" :field="columnName">
        <template #header>
          <div class="flex flex-col items-center gap-2">
            <input type="checkbox" :value="selectedColumns?.includes(columnName)" :checked="selectedColumns?.includes(columnName)" binary variant="filled" @change="toggleColumnSelection(columnName)" />
            <p class="font-poppins whitespace-nowrap">
              {{ columnName }}
              <!-- {{ selectedColumns?.includes(columnName) }} -->
            </p>
          </div>
        </template>
        <template #body="{ data, field }">
          <p class="font-poppins whitespace-nowrap">
            {{ data[field] }}
          </p>
        </template>
      </Column>
      <!-- <Column field="country.name" header="Country" filter-field="country.name" sortable>
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <span>{{ data.country.name }}</span>
          </div>
        </template>
      </Column>
      <Column field="company" header="Company" sortable />
      <Column field="representative.name" header="Representative" sortable>
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />
            <span>{{ data.representative.name }}</span>
          </div>
        </template>
      </Column> -->
    </DataTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps(['dataSourceFileCompleteJSON', 'dataSourceColumnNames', 'dataSourceSelectedColumns'])
const selectedColumns = ref(props?.dataSourceSelectedColumns ? props?.dataSourceSelectedColumns : [])

onMounted(() => {
  loading.value = true

  lazyParams.value = {
    first: 0,
    rows: 10,
    sortField: null,
    sortOrder: null,
    filters: filters.value,
  }

  loadLazyData()
})

const dt = ref()
const loading = ref(false)
const totalRecords = ref(0)
const completeData = ref()
const selectedRows = ref()
const selectAll = ref(false)
const first = ref(0)
const filters = ref({
  'name': { value: '', matchMode: 'contains' },
  'country.name': { value: '', matchMode: 'contains' },
  'company': { value: '', matchMode: 'contains' },
  'representative.name': { value: '', matchMode: 'contains' },
})
const lazyParams = ref({})
const columns = ref([
  { field: 'name', header: 'Name' },
  { field: 'country.name', header: 'Country' },
  { field: 'company', header: 'Company' },
  { field: 'representative.name', header: 'Representative' },
])

watch(() => props?.dataSourceFileCompleteJSON, (newVal) => {
  completeData.value = newVal
})
watch(() => props?.dataSourceSelectedColumns, (newVal) => {
  console.log('new val of data source slected columns', newVal)
  selectedColumns.value = newVal
})

function loadLazyData(event) {
  loading.value = true
  lazyParams.value = { ...lazyParams.value, first: event?.first || first.value }

  setTimeout(() => {
    completeData.value = props?.dataSourceFileCompleteJSON
    totalRecords.value = props?.dataSourceColumnNames?.length
    loading.value = false
  }, Math.random() * 1000 + 250)
}
function onPage(event) {
  lazyParams.value = event
  loadLazyData(event)
}
function onSort(event) {
  lazyParams.value = event
  loadLazyData(event)
}
function onFilter(event) {
  lazyParams.value.filters = filters.value
  loadLazyData(event)
}
function onSelectAllChange(event) {
  console.log('event', event)
  console.log('event checked', event.checked)
  const cData = JSON.parse(JSON.stringify(completeData?.value))
  if (event.checked) {
    selectedRows.value = cData
    selectAll.value = true
  }
  else {
    selectedRows.value = []
    selectAll.value = false
  }
}

function onRowSelect(event) {
  const { data } = event
  console.log('data', data)
}

function onRowUnselect(event) {
  const { data } = event
  console.log('data', data)
}
watch(selectedRows, () => {
  console.log('selected rows', selectedRows?.value)
})
// function onSelectAllChange(event) {
//   console.log('running on sleect all')
//   selectAll.value = event.checked

//   if (selectAll.value) {
//     selectAll.value = true
//     selectedRows.value = props?.dataSourceFileCompleteJSON
//   }
//   else {
//     selectAll.value = false
//     selectedRows.value = []
//   }
// }
// function onRowSelect() {
//   console.log('row select')
// //   selectAll.value = selectedRows.value.length === totalRecords.value
// }
// function onRowUnselect() {
// //   selectAll.value = false
// }

function toggleColumnSelection(columnName) {
  const index = selectedColumns.value.indexOf(columnName)
  if (index > -1)
    selectedColumns.value.splice(index, 1) // Remove column
  else
    selectedColumns.value.push(columnName) // Add column
}
watch(selectedColumns, () => {
  console.log('selected columns', selectedColumns.value)
})
</script>
