<template>
  <div
    v-if="templateGeneralInformation?.useCase === 'Data to doc'" class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50" @click="() => {
      //   showDataFields ? showDataFields = false : showDataFields = true;
      emit('setShowFieldsToAdd')
    }"
  >
    <font-awesome-icon icon="fa-light fa-file-spreadsheet" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />

    <p class="font-poppins text-surface-600 text-lg">
      {{ $t('Cp_createTemplate_editorTemplateFields.data_fields') }}
    </p>
    <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': props.showFieldsToAdd === 'Datafield' }" />
  </div>
  <div v-if="props.showFieldsToAdd === 'Datafield'" class="flex flex-col gap-2">
    <div
      class="px-5 h-[62px] flex flex-col justify-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
      :class="{ 'border-primaryBlue bg-primary-50': showDatasetOptions, 'border-surface-100 bg-surface-50': !showDatasetOptions }"
      @click="showDatasetOptions ? showDatasetOptions = false : showDatasetOptions = true;showDatasetOptions2 = false;showDatasetOptions3 = false;"
    >
      <div class="flex gap-2 items-center">
        <font-awesome-icon icon="fa-light fa-text" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
        <p class="font-poppins text-surface-600 text-lg">
          {{ $t('Cp_createTemplate_editorTemplateFields.text') }}
        </p>
        <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showDatasetOptions }" />
      </div>
    </div>
    <div v-if="showDatasetOptions" class="px-5 h-[62px] flex items-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
      <Dropdown v-model="selectedDatasetOption" :options="templateEditorStore.datasetData.selectedKeys" filter placeholder="Select data field" class="w-full md:w-full">
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex align-items-center">
            <p class="font-poppins">
              {{ slotProps.value }}
            </p>
          </div>
          <span v-else>
            <p class="font-poppins">{{ slotProps.placeholder }}</p>
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex align-items-center">
            <p class="font-poppins">
              {{ slotProps.option }}
            </p>
          </div>
        </template>
      </Dropdown>
    </div>
    <div
      class="px-5 h-[62px] flex flex-col justify-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
      :class="{ 'border-primaryBlue bg-primary-50': showDatasetOptions3, 'border-surface-100 bg-surface-50': !showDatasetOptions3 }"
      @click="showDatasetOptions3 ? showDatasetOptions3 = false : showDatasetOptions3 = true;showDatasetOptions2 = false;showDatasetOptions = false;"
    >
      <div class="flex gap-2 items-center">
        <font-awesome-icon icon="fa-light fa-calendar" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
        <p class="font-poppins text-surface-600 text-lg">
          Date
        </p>
        <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showDatasetOptions3 }" />
      </div>
    </div>
    <div v-if="showDatasetOptions3" class="px-5 h-[62px] flex items-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
      <Dropdown v-model="selectedDatasetOption3" :options="templateEditorStore.datasetData.selectedKeys" filter placeholder="Select data field" class="w-full md:w-full">
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex align-items-center">
            <p class="font-poppins">
              {{ slotProps.value }}
            </p>
          </div>
          <span v-else>
            <p class="font-poppins">{{ slotProps.placeholder }}</p>
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex align-items-center">
            <p class="font-poppins">
              {{ slotProps.option }}
            </p>
          </div>
        </template>
      </Dropdown>
    </div>
    <div
      class="px-5 h-[62px] flex flex-col justify-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
      :class="{ 'border-primaryBlue bg-primary-50': showDatasetOptions4, 'border-surface-100 bg-surface-50': !showDatasetOptions4 }"
      @click="showDatasetOptions4 ? showDatasetOptions4 = false : showDatasetOptions4 = true;showDatasetOptions3 = false;showDatasetOptions2 = false;showDatasetOptions = false;"
    >
      <div class="flex gap-2 items-center">
        <font-awesome-icon icon="fa-light fa-square-check" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
        <p class="font-poppins text-surface-600 text-lg">
          Checkbox
        </p>
        <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showDatasetOptions3 }" />
      </div>
    </div>
    <div v-if="showDatasetOptions4" class="px-5 h-[62px] flex items-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
      <Dropdown v-model="selectedDatasetOption4" :options="templateEditorStore.datasetData.selectedKeys" filter placeholder="Select data field" class="w-full md:w-full">
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex align-items-center">
            <p class="font-poppins">
              {{ slotProps.value }}
            </p>
          </div>
          <span v-else>
            <p class="font-poppins">{{ slotProps.placeholder }}</p>
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex align-items-center">
            <p class="font-poppins">
              {{ slotProps.option }}
            </p>
          </div>
        </template>
      </Dropdown>
    </div>
    <div
      class="px-5 h-[62px] flex items-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
      :class="{ 'border-primaryBlue bg-primary-50': showDatasetOptions2, 'border-surface-100 bg-surface-50': !showDatasetOptions2 }"
      @click="showDatasetOptions2 ? showDatasetOptions2 = false : showDatasetOptions2 = true;showDatasetOptions = false;showDatasetOptions3 = false;"
    >
      <font-awesome-icon icon="fa-light fa-image" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
      <p class="font-poppins text-surface-600 text-lg">
        {{ $t('Cp_createTemplate_editorTemplateFields.image') }}
      </p>
      <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300" size="lg" :class="{ 'rotate-90': showDatasetOptions2 }" />
    </div>
    <div v-if="showDatasetOptions2" class="px-5 h-[62px] flex items-center pl-14 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50">
      <Dropdown v-model="selectedDatasetOption2" :options="templateEditorStore?.datasetData?.urlKeys?.filter((d) => templateEditorStore.datasetData.selectedKeys?.includes(d))" filter placeholder="Select data field" class="w-full md:w-full">
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex align-items-center">
            <p class="font-poppins">
              {{ slotProps.value }}
            </p>
          </div>
          <span v-else>
            <p class="font-poppins">{{ slotProps.placeholder }}</p>
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex align-items-center">
            <p class="font-poppins">
              {{ slotProps.option }}
            </p>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script setup>
import { templateEditorStore } from '@/composables/useTemplateEditorData'
import { templateGeneralInformation } from '~/composables/useTemplateCreationData'

const props = defineProps(['showFieldsToAdd'])
const emit = defineEmits(['setShowFieldsToAdd', 'selectField'])

const showDatasetOptions = ref(false)
const showDatasetOptions2 = ref(false)
const showDatasetOptions3 = ref(false)
const showDatasetOptions4 = ref(false)
const selectedDatasetOption = ref('')
const selectedDatasetOption2 = ref('')
const selectedDatasetOption3 = ref('')
const selectedDatasetOption4 = ref('')
watch(() => props.showFieldsToAdd, (val) => {
  if (val !== 'Datafield') {
    showDatasetOptions.value = false
    showDatasetOptions2.value = false
    showDatasetOptions3.value = false
    showDatasetOptions4.value = false
    selectedDatasetOption.value = ''
    selectedDatasetOption2.value = ''
    selectedDatasetOption3.value = ''
    selectedDatasetOption4.value = ''
  }
})
watch(selectedDatasetOption, (val) => {
  if (val)
    emit('selectField', 'Data field', val)
})
watch(selectedDatasetOption2, (val) => {
  if (val)
    emit('selectField', 'Dataset image', val)
})
watch(selectedDatasetOption3, (val) => {
  if (val)
    emit('selectField', 'Dataset date', val)
})
watch(selectedDatasetOption4, (val) => {
  if (val)
    emit('selectField', 'Dataset checkbox', val)
})
</script>
