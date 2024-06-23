<template>
  <div class="border w-full p-4">
    <div class="card flex justify-center">
      <Select v-model="lookupColumn" :options="columnNames" option-label="name" placeholder="Select a City" class="w-full md:w-56" />
    </div>
  </div>
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
    </DataTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps(['dataSourceFileCompleteJSON', 'dataSourceColumnNames', 'dataSourceSelectedColumns'])

const lookupColumn = ref()
const columnNames = ref(props?.dataSourceColumnNames
  ? props?.dataSourceSelectedColumns?.map((v, i) => {
    return { name: v, id: i + 1 }
  })
  : [])

const selectedColumns = ref(props?.dataSourceSelectedColumns ? props?.dataSourceSelectedColumns : [])

const dt = ref()
const loading = ref(false)
const totalRecords = ref(0)
const completeData = ref()
const selectedRows = ref()
const selectAll = ref(false)
const first = ref(0)

const lazyParams = ref({})

watch(() => props?.dataSourceFileCompleteJSON, (newVal) => {
  completeData.value = newVal
})
watch(() => props?.dataSourceSelectedColumns, (newVal) => {
  selectedColumns.value = newVal
})
watch(() => props?.dataSourceColumnNames, (newVal) => {
  columnNames.value = newVal?.map((v, i) => {
    return { name: v, id: i + 1 }
  })
})
onMounted(() => {
  loading.value = true

  lazyParams.value = {
    first: 0,
    rows: 10,
    sortField: null,
    sortOrder: null,

  }

  loadLazyData()
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

function onSelectAllChange(event) {
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
  // single row selection {data}=event
}

function onRowUnselect(event) {
// single row unselection {data}=event
}

function toggleColumnSelection(columnName) {
  const index = selectedColumns.value.indexOf(columnName)
  if (index > -1)
    selectedColumns.value.splice(index, 1) // Remove column
  else
    selectedColumns.value.push(columnName) // Add column
}
</script>
