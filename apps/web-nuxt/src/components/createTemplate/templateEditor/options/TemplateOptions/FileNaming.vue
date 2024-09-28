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
      @input="updateCaretPosition"
    />
    <p class="whitespace-nowrap w-max text-sm text-surface-400 mx-1">
      {{ `-{doc-id}` }}
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { templateEditorStore } from '@/composables/useTemplateEditorData.js'
import { templateGeneralInformation } from '@/composables/useTemplateCreationData.js'

const enableCustomFileNaming = ref(true)
const inputValue = ref('')
const suggestions = ref([`<template name>`, `<YYMMDD HHMMSS>`, `<MMDDYY HHMMSS>`])
const filteredSuggestions = ref([...suggestions.value])
const completeInput = ref('')
const caretPosition = ref(0)

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

  if (templateEditorStore?.templateToEdit)
    inputValue.value = templateEditorStore?.templateToEdit?.template_options?.fileNamingString || 'DocSpawn - {templateName} - {YYMMDD HHMMSS}'
})

function updateCaretPosition(event) {
  caretPosition.value = event.target.selectionStart
}

function onItemSelect(event) {
  const selectedValue = event.value

  // Insert the selected suggestion at the caret position
  inputValue.value
          = completeInput.value.slice(0, caretPosition.value - 1)
          + selectedValue
          + completeInput.value.slice(caretPosition.value)

  // Update the caret position to be after the inserted value
  caretPosition.value += selectedValue.length - 1

  filteredSuggestions.value = []

  completeInput.value = inputValue.value
}

function onComplete() {
  const inputSubstring = inputValue.value.substring(0, caretPosition.value)

  // Check if there's a `<` character before the current caret position
  if (inputSubstring.endsWith('<'))
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
      .custom-autocomplete .p-inputtext {
        width: 100%;
        min-height: 3rem;
        resize: vertical;
        white-space: pre-wrap;
        overflow: hidden;
      }
      </style>
