<template>
  <div class="transition-all duration-200 ease-linear rounded-md min-h-full  flex-initial w-60 p-2 bg-blue-50 p-3  overflow-hidden">
    <p v-if="templateEditorStore.activeTemplateField !== ''" class="text-md text-gray-400 text-primaryBlue font-thin">
      Options for
    </p>
    <p v-if="templateEditorStore.activeTemplateField === ''" class="text-md text-gray-400 text-primaryBlue font-thin">
      No template field is selected
    </p>
    <div v-if="templateEditorStore.activeTemplateField === 'form-field'" class="">
      <p class="text-lg text-gray-900 mt-1  w-full mb-2 capitalize">
        {{ templateEditorStore.activeFormField }} (form field)
      </p>
      <hr />

      <FormOptions />
    </div>
    <div v-if="templateEditorStore.activeTemplateField === 'data-fields'" class="">
      <p class="text-lg text-gray-900 mt-1  w-full mb-2 capitalize">
        {{ templateEditorStore.activeDataField }} (Data field)
      </p>
      <hr />
    </div>
    <div v-if="templateEditorStore.activeTemplateField === 'image'" class="">
      <p class="text-xl text-gray-900 mt-1  w-full">
        Image
      </p>
      <hr />
      <ImageOptions />
    </div>
    <div v-if="templateEditorStore.activeTemplateField === 'text'" class="">
      <p class="text-xl text-gray-900 mt-1  w-full">
        Text
      </p>
      <hr />
      <div class="flex flex-col gap-2 mt-4">
        <InputText id="username" v-model="constant_text_value" aria-describedby="username-help" />
        <small id="username-help">This text will be constant for all documents</small>
      </div>
    </div>
    <div v-if="templateEditorStore.activeTemplateField === 'timestamp'" class="">
      <p class="text-xl text-gray-900 mt-1  w-full">
        Timestamp
      </p>
      <hr />

      <div v-if="templateEditorStore.activeTimestampField === 'time'" class="w-full pt-4">
        <Dropdown v-model="selectedTimeFormat" :options="timeFormats" option-label="name" placeholder="Select time format" class="w-full md:w-14rem" />
      </div>
      <div v-if="templateEditorStore.activeTimestampField === 'date'" class="w-full pt-4">
        <Dropdown v-model="selectedDateFormat" :options="dateFormats" option-label="name" placeholder="Select date format" class="w-full md:w-14rem" />
      </div>
    </div>
    <div v-if="templateEditorStore.activeTemplateField === 'checkbox'" class="">
      <p class="text-xl text-gray-900 mt-1  w-full">
        Checkbox
      </p>
      <hr />
    </div>
    <div v-if="templateEditorStore.activeTemplateField === 'radio'" class="">
      <p class="text-xl text-gray-900 mt-1  w-full">
        Radio
      </p>
      <hr />
    </div>
    <div v-if="templateEditorStore.activeTemplateField === 'dropdown'" class="">
      <p class="text-xl text-gray-900 mt-1  w-full">
        Dropdown
      </p>
      <hr />
    </div>
    <div v-if="templateEditorStore.activeTemplateField === 'signature'" class="">
      <p class="text-xl text-gray-900 mt-1  w-full">
        Signature
      </p>
      <hr />
      <div v-if="templateEditorStore.activeTemplateField === 'signature'" class="w-full pt-4">
        Draw signature
        <div class="mt-3 bg-white h-32 w-full border border-blue-300 rounded-md"></div>
        <Button class="mt-2 w-full ">
          Save signature
        </Button>
      </div>
    </div>
    <TextFormatting v-if="(templateEditorStore.activeTemplateField === 'form-field' && (templateEditorStore.activeFormField === 'text' || templateEditorStore.activeFormField === 'multiline-text' || templateEditorStore.activeFormField === 'date' || templateEditorStore.activeFormField === 'time')) || templateEditorStore.activeTemplateField === 'text' || templateEditorStore.activeTemplateField === 'data-fields'" />
  </div>
</template>

<script setup>
import { templateEditorStore } from '../store/templateEditorStore.js'
import ImageOptions from './ImageOptions.vue'
import FormOptions from './FormOptions.vue'
import TextFormatting from './TextFormatting.vue'

const selectedTimeFormat = ref()
const timeFormats = ref([
  { name: 'HH:MM:SS' },
  { name: 'HH:SS' },
  { name: 'MM:SS' },
])
const selectedDateFormat = ref()
const dateFormats = ref([
  { name: 'MM/DD/YYYY' },
  { name: 'MM-DD-YYYY' },
  { name: 'MM-DD-YY' },
  { name: 'DD-MM-YY' },
])
const constant_text_value = ref(null)
</script>

  <style lang="scss" scoped></style>
