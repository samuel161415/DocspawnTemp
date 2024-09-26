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
      white-space: pre-wrap;
      overflow: hidden;

    }
    </style>
