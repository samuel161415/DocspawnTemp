<template>
  <Dialog v-model:visible="visible" modal :draggable="false" :style="{ width: '80vw' }">
    <template #header>
      <div class="flex justify-center items-center ml-5">
        <p class="font-semibold text-xl flex justify-center text-center font-poppins">
          Create data source
        </p>
      </div>
    </template>

    <div class="w-max flex flex-col gap-6 items-center justify-center">
      <Toast />

      <div
        v-if="selectedFiles.length === 0" class="custom-file-upload" :class="{ 'error-border': hasError }"
        @dragover.prevent
        @dragenter.prevent="handleDragEnter"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
      >
        <FileUpload
          ref="fileupload"
          mode="basic"
          name="demo[]"
          :multiple="false"
          accept=".csv, .xlsx"
          :max-file-size="100000000"
          choose-label="Browse"
          class="hidden-input"
          @select="onFileSelect"
        />
        <div class="drop-zone py-6">
          <span v-if="!hasError" class="font-poppins p-4">Drag and drop csv or xlsx files here to upload or</span>
          <span v-else class="bg-red-50 p-4 text-red-400 font-poppins">{{ fileErrorText }}</span>
          <Button label="Browse" icon="pi pi-plus" class=" font-poppins mt-4" @click="triggerFileInput" />
        </div>
      </div>

      <div v-else class="file-list custom-file-upload">
        <ul>
          <li v-for="file in selectedFiles" :key="file.name" class="font-poppins p-4">
            {{ file.name }}
          </li>
        </ul>
        <Button severity="danger" outlined label="Remove" icon="pi pi-times" class="mt-4 font-poppins" @click="removeFiles" />
      </div>
    </div>
    <TableForDataSourceEdit
      v-if="dataSourceFileCompleteJSON?.length > 0"
      :data-source-file-complete-j-s-o-n="dataSourceFileCompleteJSON"
      :data-source-column-names="dataSourceColumnNames"
      :data-source-selected-columns="dataSourceSelectedColumns"
    />
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'

import * as XLSX from 'xlsx'

// import Papa from 'papaparse'
import { useToast } from 'primevue/usetoast'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import TableForDataSourceEdit from './TableForDataSourceEdit.vue'

const toast = useToast()
const fileupload = ref()
const selectedFiles = ref([])
const hasError = ref(false)
const fileErrorText = ref('')
const dataSourceFileCompleteJSON = ref([])
const dataSourceColumnNames = ref([])
const dataSourceSelectedColumns = ref([])

const validFileTypes = ['.csv', '.xlsx']

function isValidFileType(file) {
  const fileExtension = file.name.split('.').pop().toLowerCase()
  return validFileTypes.includes(`.${fileExtension}`)
}

function onFileSelect(event) {
  const files = event.files
  if (files.length > 1) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Only one file allowed', life: 3000 })
    fileErrorText.value = 'Only one file is allowed'
    hasError.value = true
    setTimeout(() => {
      hasError.value = false
    }, 3000)
    return
  }
  const invalidFiles = files.filter(file => !isValidFileType(file))

  if (invalidFiles.length > 0) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Only CSV or XLSX files are allowed', life: 3000 })

    fileErrorText.value = 'Only CSV or XLSX files are allowed'
    hasError.value = true
    setTimeout(() => {
      hasError.value = false
    }, 3000)
    return
  }

  selectedFiles.value = files
}

function handleDrop(event) {
  const files = Array.from(event.dataTransfer.files)
  if (files.length > 1) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Only one file allowed', life: 3000 })
    fileErrorText.value = 'Only one file is allowed'
    hasError.value = true
    setTimeout(() => {
      hasError.value = false
    }, 3000)
    return
  }
  const invalidFiles = files.filter(file => !isValidFileType(file))

  if (invalidFiles.length > 0) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Only CSV or XLSX files are allowed', life: 3000 })
    hasError.value = true
    setTimeout(() => {
      hasError.value = false
    }, 3000)
    return
  }

  selectedFiles.value = files
}

function triggerFileInput() {
  fileupload.value.choose()
}

function removeFiles() {
  selectedFiles.value = []
}

function handleDragEnter() {
  hasError.value = false
}

function handleDragLeave() {
  hasError.value = false
}
function isObjectEmpty(obj) {
  for (const key in obj) {
    if (obj[key] !== '')
      return false
  }
  return true
}

async function processFiles(data, fileType, file) {
  if (data && fileType) {
    if (fileType === 'csv') {
    // Dynamically import xlsx
      const Papa = await import('papaparse')
      // Parse CSV file using PapaParse
      const csvText = new TextDecoder().decode(data)

      Papa.parse(csvText, {
        complete: (results) => {
          const parsedData = results.data
          const filteredData = parsedData.filter(
            entry => !isObjectEmpty(entry),
          )

          dataSourceFileCompleteJSON.value = filteredData?.map((f, i) => {
            return { ...f, auto_index_by_docspawn: i + 1 }
          })
        // setCSVFileJSON(filteredData)
        },
        header: true,
      })
    }
    else if (['xls', 'xlsx'].includes(fileType)) {
      try {
      // Convert ArrayBuffer to Uint8Array
        // const uint8Array = new Uint8Array(data)
        const dataF = await file.arrayBuffer()
        const uint8Array = new Uint8Array(dataF)

        // Attempt to read the workbook
        const workbook = XLSX.read(uint8Array, { type: 'array' })

        // Check if the workbook contains any sheets
        if (!workbook.SheetNames || workbook.SheetNames.length === 0)
          throw new Error('No sheets found in the workbook.')

        // Get the first sheet name and the worksheet
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        // Convert the worksheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        // Check if the JSON data contains any rows
        if (!jsonData || jsonData.length === 0)
          throw new Error('No data found in the worksheet.')

        // Assuming the first row in the Excel sheet contains headers
        const [headers, ...dataRows] = jsonData

        // Check if headers are present
        if (!headers || headers.length === 0)
          throw new Error('No headers found in the first row of the worksheet.')

        // Map data rows to objects with keys based on headers
        const formattedData = dataRows.map((row) => {
          const rowData = {}
          headers.forEach((header, index) => {
            rowData[header] = row[index] !== undefined ? row[index] : ''
          })
          return rowData
        })

        // Add auto_index_by_docspawn to each row
        dataSourceFileCompleteJSON.value = formattedData.map((f, i) => {
          return { ...f, auto_index_by_docspawn: i + 1 }
        })
      }
      catch (error) {
      // Handle any errors that occurred during the process
        console.error('An error occurred while processing the Excel file:', error.message)
      // Optionally, you could set an error state or display a user-friendly message
      // errorState.value = 'An error occurred while processing the Excel file.';
      }
    }
  }
}

watch(selectedFiles, () => {
  if (selectedFiles?.value?.length > 0) {
    const file = selectedFiles.value[0]
    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        const fileType = file.name.split('.').pop().toLowerCase()

        processFiles(data, fileType, file)
      }
      reader.readAsArrayBuffer(file)
    }
    catch (err) {
      // console.log('err', err)
    }
  }
  else {
    dataSourceColumnNames.value = []
    dataSourceFileCompleteJSON.value = []
    dataSourceSelectedColumns.value = []
  }
})

watch(dataSourceFileCompleteJSON, () => {
  if (dataSourceFileCompleteJSON?.value?.length > 0) {
    const JSON = dataSourceFileCompleteJSON?.value
    dataSourceColumnNames.value = Object.keys(JSON[0])
    dataSourceSelectedColumns.value = Object.keys(JSON[0])
  }
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
.error-border{
  border-color:red
}
</style>
