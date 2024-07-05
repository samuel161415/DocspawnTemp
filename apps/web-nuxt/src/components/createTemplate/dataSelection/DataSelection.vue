<template>
  <div class="w-full flex flex-col items-center justify-center">
    <div class="flex justify-center items-center ml-5">
      <p class="font-semibold text-xl flex justify-center text-center font-poppins">
        Select columns
      </p>
    </div>

    <div class="w-[70vw] flex flex-col items-center justify-center">
      <div class="w-full">
        <div class="card p-fluid mt-8">
          <DataTable
            ref="dt"
            :value="dataSourceFileCompleteJSON"
            lazy
            :paginator="dataSourceFileCompleteJSON?.length > 0"
            :first="first"
            :rows="10"
            data-key="auto_index_by_docspawn"
            :total-records="totalRecords"
            :loading="loading"
            table-style="min-width: 75rem"
            @page="onPage($event)"
            @sort="onSort($event)"
          >
            <Column v-for="(columnName, index) in dataSourceColumnNames" :key="index" :field="columnName">
              <template #header>
                <div class="flex flex-col items-center gap-2">
                  <input
                    type="checkbox"
                    :value="dataSourceSelectedColumns.includes(columnName)"
                    :checked="dataSourceSelectedColumns.includes(columnName)"
                    @change="toggleColumnSelection(columnName)"
                  />
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'

// Define props and emit for parent-child communication

const emit = defineEmits(['updateData'])

// Define local state variables
const isValid = ref(true)
const toast = useToast()
const dataStartLine = ref(1)
const dataSourceFileCompleteJSON = ref([])
const dataSourceColumnNames = ref([])
const dataSourceSelectedColumns = ref([])
const dt = ref()
const loading = ref(false)
const totalRecords = ref(0)
const first = ref(0)
const lazyParams = ref({})

// Watchers to handle data changes
watch(dataStartLine, (newVal) => {
  if (newVal > dataSourceFileCompleteJSON.value?.length)
    newVal = dataSourceFileCompleteJSON.value?.length
})

watch(dataSourceSelectedColumns, (data) => {
  const valid = data.length > 0
  isValid.value = valid

  emit('updateData', { isValid: valid, step: 2 })
})

watch(() => templateEditorStore.datasetData, (newVal) => {
  dataSourceFileCompleteJSON.value = newVal?.allEntries?.map((f, i) => {
    return { ...f, auto_index_by_docspawn: i + 1 }
  })
  dataSourceColumnNames.value = [...newVal?.keys] // Spread operator to avoid direct mutation
  dataSourceSelectedColumns.value = [...newVal?.selectedKeys]
})

// Functions for data loading and pagination
function loadLazyData(event) {
  loading.value = true
  lazyParams.value = { ...lazyParams.value, first: event?.first || first.value }

  setTimeout(() => {
    dataSourceFileCompleteJSON.value = templateEditorStore.datasetData.allEntries.map((f, i) => {
      return { ...f, auto_index_by_docspawn: i + 1 }
    })
    totalRecords.value = dataSourceColumnNames.value.length
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

// Function to handle column selection
function toggleColumnSelection(columnName) {
  const selectedColumns = [...dataSourceSelectedColumns.value]
  const index = selectedColumns.indexOf(columnName)

  if (index > -1)
    selectedColumns.splice(index, 1) // Remove column
  else
    selectedColumns.push(columnName) // Add column

  dataSourceSelectedColumns.value = selectedColumns
  templateEditorStore.datasetData.selectedKeys = [...selectedColumns] // Ensure reactive update
}

// Mounted lifecycle hook to initialize data
onMounted(() => {
  loading.value = true
  lazyParams.value = {
    first: 0,
    rows: 10,
    sortField: null,
    sortOrder: null,
  }

  loadLazyData()
  emit('updateData', { isValid, step: 2 })
  dataSourceFileCompleteJSON.value = templateEditorStore.datasetData.allEntries.map((f, i) => {
    return { ...f, auto_index_by_docspawn: i + 1 }
  })
  dataSourceColumnNames.value = [...templateEditorStore.datasetData.keys] // Spread operator to avoid direct mutation
  dataSourceSelectedColumns.value = [...templateEditorStore.datasetData.selectedKeys] // Spread operator to avoid direct mutation
})
</script>

<style>
.custom-file-upload {
  position: relative;
  border: 2px dashed #c8c8c8;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
}

.custom-file-upload .hidden-input {
  display: none;
}

.custom-file-upload .drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.file-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-border {
  border-color: red;
}
</style>
