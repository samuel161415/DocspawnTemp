<template>
  <p class="font-semibold text-surface-600 text-2xl flex text-center justify-center pb-5">
    Template editor
  </p>
  <div class="flex w-full space-x-6 relative mb-12 h-[90vh] overflow-hidden">
    <TemplateFields />
    <EditorCanvas />
    <Options />
  </div>
</template>

<script setup>
import ExcelJS from 'exceljs'
import TemplateFields from './templateEditor/templateFields/TemplateFields.vue'
import Options from './templateEditor/options/Options.vue'
import EditorCanvas from './templateEditor/editorCanvas/EditorCanvas.vue'
import { templateEditorStore } from '@/composables/useTemplateEditorData'
import { templateGeneralInformation } from '~/composables/useTemplateCreationData'

function getFileType(url) {
  // Use URL constructor to parse the URL
  const parsedUrl = new URL(url)

  // Get the pathname from the URL which contains the file name
  const pathname = parsedUrl.pathname

  // Extract the file extension from the pathname
  const fileExtension = pathname.split('.').pop()

  // Return the file extension
  return fileExtension
}
function isObjectEmpty(obj) {
  for (const key in obj) {
    if (obj[key] !== '')
      return false
  }
  return true
}
async function readDataset() {
  const datasetUrl = templateGeneralInformation?.datasetFileUrl ? templateGeneralInformation?.datasetFileUrl : 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/51b2ee2b-f2d3-4fc4-8c6e-8be78fd0a482_template_canvas_dataset.xlsx'
  try {
    const response = await fetch(datasetUrl)
    const arrayBuffer = await response.arrayBuffer()

    const fileType = getFileType(datasetUrl)
    if (fileType === 'xlsx') {
      // Create a new workbook and read the file
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.load(arrayBuffer)

      // Get the first worksheet
      const worksheet = workbook.worksheets[0]

      // Convert worksheet to JSON
      const jsonData = []
      const headers = []
      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber === 1) {
        // Assuming the first row contains headers
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            headers.push(cell.value)
          })
        }
        else {
          const rowData = {}
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            rowData[headers[colNumber - 1]] = cell.value
          })
          jsonData.push(rowData)
        }
      })

      // Store the formatted data in the templateEditorStore
      templateEditorStore.datasetData = { keys: headers, allEntries: jsonData }
    }
    if (fileType === 'csv') {
      // Dynamically import PapaParse
      const Papa = await import('papaparse')

      // Decode arrayBuffer to a string
      const csvText = new TextDecoder().decode(arrayBuffer)

      // Parse CSV file using PapaParse
      Papa.parse(csvText, {
        complete: (results) => {
          const parsedData = results.data
          const filteredData = parsedData.filter(
            entry => !isObjectEmpty(entry),
          )

          // Assuming similar structure as for XLSX
          const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : []
          templateEditorStore.datasetData = { keys: headers, allEntries: filteredData }
        },
        header: true,
      })
    }
  }
  catch (error) {
    console.error('Error fetching or processing file:', error)
  }
}

onMounted(() => {
  readDataset()
})
watch(() => templateGeneralInformation.datasetFileUrl, () => {
  readDataset()
})
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
::-webkit-scrollbar-track {
    background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
    background: #009ee233;
    border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover {
    background: #009ee288;
}
</style>
