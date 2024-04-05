<template>
  <div class="flex-initial w-60">
    <div
      v-if="templateEditorStore.showOptionsBar === true"
      class="transition-all duration-200 ease-linear rounded-md min-h-full   bg-blue-50 p-3  overflow-hidden"
    >
      <p v-if="templateEditorStore.activeTemplateField === ''" class="text-md text-gray-400 text-primaryBlue font-thin">
        No template field is selected
      </p>
      <p v-if="templateEditorStore.activeTemplateField !== ''" class="text-md text-gray-400 text-primaryBlue font-thin">
        Field options
      </p>
      <div v-if="!templateEditorStore.selectedAddedField.name" class="mt-1 mb-0">
        <p v-if="templateEditorStore.activeTemplateField === 'form-field' " class="text-lg text-gray-900   w-full  capitalize">
          {{ templateEditorStore.activeFormField }}
        </p>
        <p v-if="templateEditorStore.activeTemplateField === 'timestamp' " class="text-lg text-gray-900   w-full  capitalize">
          {{ templateEditorStore.activeTimestampField }}
        </p>
        <p v-if="templateEditorStore.activeTemplateField === 'data-fields' " class="text-lg text-gray-900   w-full  capitalize">
          {{ templateEditorStore.activeDataField }}
        </p>
        <p v-if="templateEditorStore.activeTemplateField === 'image' " class="text-lg text-gray-900   w-full  capitalize">
          {{ templateEditorStore.activeImageOption }}
        </p>
      </div>
      <div v-else class="mt-1 mb-0">
        <p v-if="templateEditorStore.selectedAddedField.type === 'form-field' " class="text-lg text-gray-900   w-full  capitalize">
          {{ templateEditorStore.selectedAddedField.subType }}
        </p>
      </div>
      <p v-if="!templateEditorStore.selectedAddedField.name" class="text-lg text-gray-900 w-full mb-2 capitalize">
        ({{ templateEditorStore.activeTemplateField }})
      </p>
      <p v-else class="text-lg text-gray-900 w-full mb-2 capitalize">
        ({{ templateEditorStore.selectedAddedField.type }})
      </p>

      <hr />
      <div class="w-full pt-4">
        <p class="mb-1">
          Field name
        </p>
        <InputText v-model="fieldName" class="h-11 w-full" type="text" />
      </div>

      <!-- specific options -->
      <div v-if="templateEditorStore.activeTemplateField === 'form-field'" class="">
        <FormOptions />
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'data-fields'" class="">
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'image'" class="">
        <ImageOptions />
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'text'" class="">
        <div class="flex flex-col gap-2 mt-4">
          <InputText id="username" v-model="constant_text_value" aria-describedby="username-help" />
          <small id="username-help">This text will be constant for all documents</small>
        </div>
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'timestamp'" class="">
        <div v-if="templateEditorStore.activeTimestampField === 'time'" class="w-full pt-4">
          <Dropdown v-model="selectedTimeFormat" :options="timeFormats" option-label="name" placeholder="Select time format" class="w-full md:w-14rem" />
        </div>
        <div v-if="templateEditorStore.activeTimestampField === 'date'" class="w-full pt-4">
          <Dropdown v-model="selectedDateFormat" :options="dateFormats" option-label="name" placeholder="Select date format" class="w-full md:w-14rem" />
        </div>
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'checkbox'" class="">
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'radio'" class="">
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'dropdown'" class="">
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'signature'" class="">
        <div v-if="templateEditorStore.activeTemplateField === 'signature'" class="w-full pt-4">
          Draw signature
          <div class="mt-3 bg-white h-32 w-full border border-blue-300 rounded-md"></div>
          <Button text class="mt-2 w-full ">
            Save signature
          </Button>
        </div>
      </div>
      <TextFormatting v-if="(templateEditorStore.activeTemplateField === 'form-field' && (templateEditorStore.activeFormField === 'text' || templateEditorStore.activeFormField === 'multiline-text' || templateEditorStore.activeFormField === 'date' || templateEditorStore.activeFormField === 'time')) || templateEditorStore.activeTemplateField === 'text' || templateEditorStore.activeTemplateField === 'data-fields'" />

      <!-- saving field details -->
      <Button class="mt-12 w-full" @click="saveField">
        Save field
      </Button>
    </div>
  </div>
</template>

<script setup>
import { templateEditorStore } from '../store/templateEditorStore.ts'
import { useTimestampFormats } from '../../../../composables/useTimestampFormats'
import ImageOptions from './ImageOptions.vue'
import FormOptions from './FormOptions.vue'
import TextFormatting from './TextFormatting.vue'

const { timeFormats, dateFormats } = useTimestampFormats()

const fieldName = ref(null)

watch(templateEditorStore, () => {
  if (templateEditorStore.selectedAddedField)
    fieldName.value = templateEditorStore.selectedAddedField.name
})
const selectedTimeFormat = ref()
const selectedDateFormat = ref()

const constant_text_value = ref(null)

function saveField() {
  const type = templateEditorStore.activeTemplateField
  let subType = ''

  if (type === 'form-field')
    subType = templateEditorStore.activeFormField
  else if (type === 'data-fields')
    subType = templateEditorStore.activeDataField
  else if (type === 'timestamp')
    subType = templateEditorStore.activeTimestampField
  else if (type === 'image')
    subType = templateEditorStore.activeImageOption

  const fieldToAdd = { name: fieldName.value, type, subType }
  templateEditorStore.addedFields = [...templateEditorStore.addedFields, fieldToAdd]

  fieldName.value = ''
  templateEditorStore.showOptionsBar = false
}
</script>
