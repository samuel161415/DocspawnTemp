<template>
  <div v-if="templateEditorStore.activeFormField === 'time'" class="w-full pt-4 mt-2">
    <Dropdown v-model="selectedTimeFormat" :options="timeFormats" option-label="name" placeholder="Select time format" class="w-full md:w-full p-1" />
  </div>

  <div v-if="templateEditorStore.activeFormField === 'date'" class="w-full pt-4 mt-2">
    <Dropdown v-model="selectedDateFormat" :options="dateFormats" option-label="name" placeholder="Select date format" class="w-full md:w-full p-1" />
  </div>
  <!-- <div v-if="templateEditorStore.activeFormField === 'signature'" class="w-full pt-4">
    Draw signature
    <div class="mt-3 bg-white h-32 w-full border border-blue-300 rounded-md"></div>
    <Button class="mt-2 w-full ">
      Save signature
    </Button>
  </div> -->
  <div v-if="templateEditorStore.activeFormField === 'image'" class="w-full pt-4">
    <ImageOptions />
  </div>
</template>

<script setup>
import ImageOptions from '../../../../components/createTemplate/templateEditor/options/ImageOptions.vue'
import { templateEditorStore } from '../store/templateEditorStore.ts'

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
</script>

  <style lang="scss" scoped>
.fields_in_form_fields_options{
height:38px;
width:100%;
}
</style>
