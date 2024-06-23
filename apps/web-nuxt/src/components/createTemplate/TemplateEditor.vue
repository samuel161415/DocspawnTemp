<template>
  <p class="font-semibold text-surface-600 text-2xl flex text-center justify-center pb-5">
    Template editor
  </p>
  <div class="flex  w-full space-x-6 relative mb-12  h-[90vh] overflow-hidden  ">
    <TemplateFields />
    <EditorCanvas />
    <Options />
  </div>
</template>

<script setup>
import * as XLSX from 'xlsx'
import TemplateFields from './templateEditor/templateFields/TemplateFields.vue'
import Options from './templateEditor/options/Options.vue'
import EditorCanvas from './templateEditor/editorCanvas/EditorCanvas.vue'
import { templateEditorStore } from '@/composables/useTemplateEditorData'

onMounted(() => {
  const dataset = 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/51b2ee2b-f2d3-4fc4-8c6e-8be78fd0a482_template_canvas_dataset.xlsx'

  fetch(dataset)
    .then(response => response.arrayBuffer())
    .then((data) => {
      // Parse Excel file using xlsx
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      // Assuming the first row in the Excel sheet contains headers
      const [headers, ...dataRows] = jsonData

      // Map data rows to objects with keys based on headers
      const formattedData = dataRows.map((row) => {
        const rowData = {}
        headers.forEach((header, index) => {
          rowData[header] = row[index]
        })

        return rowData
      })

      templateEditorStore.datasetData = { keys: Object.keys(formattedData[0]), allEntries: formattedData }
    })
})
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    width: 10px;
    height:10px;
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
