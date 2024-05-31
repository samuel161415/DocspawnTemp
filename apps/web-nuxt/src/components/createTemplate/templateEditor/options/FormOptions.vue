<template>
  <div v-if="templateEditorStore.activeFormField === 'time'" class="w-full pt-4 mt-2">
    <Dropdown v-model="selectedTimeFormat" :options="timeFormats" option-label="name" placeholder="Select time format" class="w-full md:w-full p-1" />
  </div>

  <div v-if="templateEditorStore.activeFormField === 'date'" class="w-full pt-4 mt-2">
    <Dropdown v-model="selectedDateFormat" :options="dateFormats" option-label="name" placeholder="Select date format" class="w-full md:w-full p-1" />
  </div>

  <div v-if="templateEditorStore.activeFormField === 'image'" class="w-full pt-4">
    <ImageOptions />
  </div>
</template>

<script setup>
import ImageOptions from '../../../../components/createTemplate/templateEditor/options/ImageOptions.vue'
import { useTimestampFormats } from '../../../../composables/useTimestampFormats'
import { templateEditorStore } from '@/composables/useTemplateEditorData'

const { timeFormats, dateFormats } = useTimestampFormats()
const selectedTimeFormat = ref()
const selectedDateFormat = ref()
</script>

  <style lang="scss" scoped>
.fields_in_form_fields_options{
height:38px;
width:100%;
}
</style>
