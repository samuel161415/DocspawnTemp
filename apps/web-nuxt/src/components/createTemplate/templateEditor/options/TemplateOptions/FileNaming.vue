<!-- <template>
  <div v-if="enableCustomFileNaming" class="w-full flex border">
    <AutoComplete
      v-model="inputValue"
      :suggestions="filteredSuggestions"
      placeholder="Type here..."
      :show-dropdown="false"
      class="w-full custom-autocomplete"
      :auto-resize="true"
      input-style="width: 100%; height: auto;"
      @complete="onComplete"
      @item-select="onItemSelect"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const enableCustomFileNaming = ref(true)
const inputValue = ref('')
const suggestions = ref([`<template name>`, `<date>`, `<dataset key>`])
const filteredSuggestions = ref([...suggestions.value])
const completeInput = ref('')

const dateFormats = [`YY-MM-DD`, `MM-DD-YY`]
const datasetKeys = [`one`, `two`, `three`]

function onItemSelect(event) {
  const selectedValue = event.value

  if (selectedValue === `<date>`) {
    inputValue.value = `${completeInput.value.slice(0, -1)}<date[`
    filteredSuggestions.value = dateFormats
  }
  else if (selectedValue === `<dataset key>`) {
    inputValue.value = `${completeInput.value.slice(0, -1)}<dataset key[`
    filteredSuggestions.value = datasetKeys
  }
  else if (dateFormats.includes(selectedValue)) {
    inputValue.value = `<date[${selectedValue}]>`
    filteredSuggestions.value = []
  }
  else if (datasetKeys.includes(selectedValue)) {
    inputValue.value = `<dataset key[${selectedValue}]>`
    filteredSuggestions.value = []
  }
  else {
    inputValue.value = completeInput.value.slice(0, -1) + selectedValue
    filteredSuggestions.value = []
  }

  completeInput.value = inputValue.value
}

function onComplete() {
  if (inputValue.value.endsWith('<')) { filteredSuggestions.value = suggestions.value }
  else if (inputValue.value.endsWith('[') && inputValue.value.includes('<date')) { filteredSuggestions.value = dateFormats }
  else if (inputValue.value.endsWith('[') && inputValue.value.includes('<dataset key')) { filteredSuggestions.value = datasetKeys }
  else {
    filteredSuggestions.value = []
    completeInput.value = inputValue.value
  }

//   completeInput.value = inputValue.value
}
</script>

  <style scoped>
  /* Custom styling for AutoComplete */
  .custom-autocomplete .p-inputtext {
    width: 100%; /* Full width */
    min-height: 3rem; /* Minimum height to look like a textarea */
    resize: vertical; /* Allows manual resizing by the user */
    white-space: pre-wrap; /* Ensures wrapping for multiline */
    overflow: hidden; /* Hides overflow when auto-resizing */
  }
  </style> -->
<template>
  <div v-if="enableCustomFileNaming" class="w-full flex border items-center">
    <AutoComplete
      v-model="inputValue"
      :suggestions="filteredSuggestions"
      placeholder="Type here..."
      :show-dropdown="false"
      class="w-full custom-autocomplete"
      :auto-resize="true"
      input-style="width: 100%; height: auto;"
      @complete="onComplete"
      @item-select="onItemSelect"
    />
    <p class="whitespace-nowrap w-max text-sm text-surface-400 mx-1">
      {{ `-{doc-id}` }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { templateEditorStore } from '@/composables/useTemplateEditorData.js'
import { templateGeneralInformation } from '@/composables/useTemplateCreationData.js'

const enableCustomFileNaming = ref(true)
const inputValue = ref('')
const suggestions = ref([`<template name>`, `<YYMMDD HHMMSS>`, `<MMDDYY HHMMSS>`])
const filteredSuggestions = ref([...suggestions.value])
const completeInput = ref('')

onMounted(() => {
  console.log('onMounted')
  console.log('templateGeneralInformation.useCase', templateGeneralInformation.useCase)
  if (templateGeneralInformation?.useCase === 'Form to doc') {
    const fieldsNamesToAdd = templateEditorStore?.addedFields?.filter(f => ['Form text', 'Form date', 'Form time']?.includes(f?.fieldType))?.map((f) => {
      return `<${f?.name}>`
    })
    suggestions.value = [...suggestions.value, ...fieldsNamesToAdd]
    filteredSuggestions.value = [...suggestions.value, ...fieldsNamesToAdd]
  }
  if (templateGeneralInformation?.useCase === 'Data to doc') {
    const fieldsNamesToAdd = templateEditorStore?.datasetData?.keys?.map((f) => {
      return `<${f}>`
    })
    suggestions.value = [...suggestions.value, ...fieldsNamesToAdd]
    filteredSuggestions.value = [...suggestions.value, ...fieldsNamesToAdd]
  }
  console.log('templateEditorStore?.templateToEdit', templateEditorStore?.templateToEdit)
  if (templateEditorStore?.templateToEdit)
    inputValue.value = templateEditorStore?.templateToEdit?.template_options?.fileNamingString || 'DocSpawn - {templateName} - {YYMMDD HHMMSS}'
})
function onItemSelect(event) {
  const selectedValue = event.value

  inputValue.value = completeInput.value.slice(0, -1) + selectedValue
  filteredSuggestions.value = []

  completeInput.value = inputValue.value
}

function onComplete() {
  if (inputValue.value.endsWith('<'))
    filteredSuggestions.value = suggestions.value
  else
    filteredSuggestions.value = []

  completeInput.value = inputValue.value
}
watch(inputValue, (val) => {
  templateEditorStore.fileNamingString = val
})
</script>

    <style scoped>
    /* Custom styling for AutoComplete */
    .custom-autocomplete .p-inputtext {
      width: 100%; /* Full width */
      min-height: 3rem; /* Minimum height to look like a textarea */
      resize: vertical; /* Allows manual resizing by the user */
      white-space: pre-wrap; /* Ensures wrapping for multiline */
      overflow: hidden; /* Hides overflow when auto-resizing */
    }
    </style>
