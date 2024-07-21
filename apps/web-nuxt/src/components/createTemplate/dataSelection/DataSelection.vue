<template>
  <div class="w-full flex flex-col items-center justify-center">
    <div class="flex flex-col justify-center items-center ml-5 mb-3 gap-2">
      <p class="font-semibold text-xl flex justify-center text-center font-poppins">
        <!-- {{ $t('Cp_createTemplate_dataSelection.select_columns') }} -->
      </p>
      <p class="font-semibold text-surface-600 text-2xl flex text-center justify-center">
        {{ $t('Cp_createTemplate_dataSelection.data_field_selection') }}
      </p>
      <p class="font-normal text-lg text-surface-500 font-poppins">
        {{ $t('Cp_createTemplate_dataSelection.select_columns_to_display') }}
      </p>
    </div>
    <div class="w-[70vw] flex flex-col ">
      <p class="font-semibold text-lg text-surface-600 font-poppins mt-3">
        {{ $t('Cp_createTemplate_dataSelection.data_starts_on_line') }}
      </p>
      <Dropdown
        v-model="dataStartLine"
        :options="dropdownOptions"
        placeholder="Select number"
        class="mt-2"
      />
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
            class="h-[400px] overflow-scroll"
            @page="onPage"
            @sort="onSort"
          >
            <!-- Auto Index Column -->
            <Column field="auto_index_by_docspawn" header="">
              <template #body="{ data, field }">
                <p class="font-poppins whitespace-nowrap">
                  {{ data[field] }}
                </p>
              </template>
            </Column>
            <Column
              v-for="(columnName, index) in dataSourceColumnNames"
              :key="index"
              :field="columnName"
            >
              <template #header>
                <div class="flex flex-col items-center gap-2">
                  <CheckboxSp
                    :key-s="index"
                    :val="dataSourceSelectedColumns.includes(columnName)"
                    :column-name="columnName"
                    @change-d-s="toggleColumnSelection(columnName)"
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
import CheckboxSp from './CheckboxSp'

const emit = defineEmits(['updateData'])

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
const dropdownOptions = ref([])

watch(dataStartLine, (newVal) => {
  if (newVal > dataSourceFileCompleteJSON.value?.length)
    newVal = dataSourceFileCompleteJSON.value?.length
  templateEditorStore.datasetStartAtLine = dataStartLine.value
})

function updateDropdownOptions() {
  dropdownOptions.value = Array.from({ length: dataSourceFileCompleteJSON.value.length }, (_, i) => (i + 1))
}

watch(dataSourceSelectedColumns, (data) => {
  const valid = data.length > 0
  isValid.value = valid

  emit('updateData', { isValid: valid, step: 2 })
})

watch(() => templateEditorStore.datasetData, (newVal) => {
  dataSourceFileCompleteJSON.value = newVal?.allEntries?.map((f, i) => {
    return { ...f, auto_index_by_docspawn: i + 1 }
  })
  dataSourceColumnNames.value = [...newVal?.keys]
  dataSourceSelectedColumns.value = [...newVal?.selectedKeys]

  updateDropdownOptions()
})

function loadLazyData(event) {
  loading.value = true
  lazyParams.value = { ...lazyParams.value, first: event?.first || first.value }

  setTimeout(() => {
    dataSourceFileCompleteJSON.value = templateEditorStore.datasetData.allEntries.slice(lazyParams.value.first, lazyParams.value.first + 10).map((f, i) => {
      return { ...f, auto_index_by_docspawn: lazyParams.value.first + i + 1 }
    })
    totalRecords.value = templateEditorStore.datasetData.allEntries.length
    loading.value = false
  }, Math.random() * 1000 + 250)
}

function onPage(event) {
  first.value = event.first
  loadLazyData(event)
}

function onSort(event) {
  lazyParams.value = event
  loadLazyData(event)
}

function toggleColumnSelection(columnName) {
  const selectedColumns = [...dataSourceSelectedColumns.value]
  const index = selectedColumns.indexOf(columnName)

  if (index > -1)
    selectedColumns.splice(index, 1)
  else
    selectedColumns.push(columnName)

  dataSourceSelectedColumns.value = selectedColumns
  templateEditorStore.datasetData.selectedKeys = [...selectedColumns]
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
  emit('updateData', { isValid, step: 2 })
  dataSourceFileCompleteJSON.value = templateEditorStore.datasetData.allEntries.map((f, i) => {
    return { ...f, auto_index_by_docspawn: i + 1 }
  })
  dataSourceColumnNames.value = [...templateEditorStore.datasetData.keys]
  dataSourceSelectedColumns.value = [...templateEditorStore.datasetData.selectedKeys]
  dataStartLine.value = templateEditorStore.datasetStartAtLine ? templateEditorStore.datasetStartAtLine : 1
  if (templateEditorStore?.templateToEdit?.id) {
    dataStartLine.value = templateEditorStore?.templateToEdit?.dataset_start_line ? templateEditorStore?.templateToEdit?.dataset_start_line : 1
    templateEditorStore.datasetStartAtLine = templateEditorStore?.templateToEdit?.dataset_start_line ? templateEditorStore?.templateToEdit?.dataset_start_line : 1
  }

  updateDropdownOptions()
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
