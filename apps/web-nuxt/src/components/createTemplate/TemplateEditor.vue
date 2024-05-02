<template>
  <div class="flex h-full min-h-screen w-full  space-x-6 relative mb-12 ">
    <TemplateFields />
    <EditorCanvas />
    <Options />
  </div>
</template>

<script setup>
import * as XLSX from 'xlsx'

// Excel parsing library
import TemplateFields from './templateEditor/templateFields/TemplateFields.vue'
import Options from './templateEditor/options/Options.vue'
import EditorCanvas from './templateEditor/editorCanvas/EditorCanvas.vue'
import { templateEditorStore } from './templateEditor/store/templateEditorStore'

// sample dataset file
// https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/51b2ee2b-f2d3-4fc4-8c6e-8be78fd0a482_template_canvas_dataset.xlsx
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

<style lang="scss" scoped></style>
