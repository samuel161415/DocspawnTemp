<template>
  <div class="flex flex-col flex-wrap gap-4 mt-7">
    <div class="flex items-center">
      <RadioButton v-model="rowSelectionType" input-id="rowSelectionType2" name="pizza" value="manual" />
      <label for="rowSelectionType2" class="ml-2 font-poppins text-surface-600 font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px]">Manual data entry</label>
      <InputText v-model="dataEntryText" class="ml-2 h-8" placeholder="e.g. 1-10,15 etc" :disabled="rowSelectionType === 'data-selection'" />
    </div>
    <div class="flex items-center">
      <RadioButton v-model="rowSelectionType" input-id="rowSelectionType1" name="pizza" value="data-selection" />
      <label for="rowSelectionType1" class="ml-2 font-poppins text-surface-600 font-poppins font-normal text-[rgb(75,85,99)] text-[16px] leading-[25px]">Mark data for document creation</label>
    </div>
  </div>
  <div class="card p-fluid mt-7">
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
      @page="onPage($event)"
      @sort="onSort($event)"
      @select-all-change="onSelectAllChange"
      @row-select="onRowSelect"
      @row-unselect="onRowUnselect"
    >
      <Column v-if="rowSelectionType === 'data-selection'" selection-mode="multiple" header-style="width: 3rem" />

      <Column v-for="(columnName, index) in props?.dataSourceColumnNames" :key="index" :field="columnName">
        <template #header>
          <div class="flex flex-col items-center gap-2">
            <p class="font-poppins whitespace-nowrap">
              {{ columnName }}
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
import { onMounted, ref, watch } from 'vue'

const props = defineProps(['dataSourceFileCompleteJSON', 'dataSourceColumnNames', 'dataSourceSelectedRows'])
const emit = defineEmits(['changeSelectedRows'])

const dt = ref()
const loading = ref(false)
const totalRecords = ref(0)
const completeData = ref()
const selectedRows = ref([])
const selectAll = ref(false)
const first = ref(0)
const rowSelectionType = ref('data-selection')// manual or data-selection

const lazyParams = ref({})
const dataEntryText = ref('')

watch(selectedRows, (newVal) => {
  emit('changeSelectedRows', newVal)
})
watch(dataEntryText, (newVal) => {
  const selected = parseUserInput(newVal)
  selectedRows.value = completeData.value?.filter((f, i) => selected?.includes(i + 1))
})
watch(rowSelectionType, () => {
  selectedRows.value = []
})
// Helper function to parse user input like "1-10, 20, 30-40" into an array of row numbers.
function parseUserInput(input) {
  const ranges = input.split(',')
  const selectedRowsArray = []

  ranges.forEach((range) => {
    const parts = range.trim().split('-')
    if (parts.length === 1) {
      selectedRowsArray.push(Number.parseInt(parts[0]))
    }
    else if (parts.length === 2) {
      const start = Number.parseInt(parts[0])
      const end = Number.parseInt(parts[1])
      for (let i = start; i <= end; i++)
        selectedRowsArray.push(i)
    }
  })

  return selectedRowsArray
}

onMounted(() => {
  loading.value = true

  lazyParams.value = {
    first: 0,
    rows: 10,
    sortField: null,
    sortOrder: null,
  }

  loadLazyData()

  completeData.value = props?.dataSourceFileCompleteJSON
  selectedRows.value = props?.dataSourceSelectedRows?.length > 0 ? props?.dataSourceSelectedRows : []
})

function loadLazyData(event) {
  loading.value = true
  lazyParams.value = { ...lazyParams.value, first: event?.first || first.value }

  setTimeout(() => {
    completeData.value = props?.dataSourceFileCompleteJSON
    totalRecords.value = completeData.value.length
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
  const rowData = event.data
  if (!selectedRows.value.includes(rowData))
    selectedRows.value.push(rowData)
}

function onRowUnselect(event) {
  const rowData = event.data
  selectedRows.value = selectedRows.value.filter(row => row !== rowData)
}
</script>
