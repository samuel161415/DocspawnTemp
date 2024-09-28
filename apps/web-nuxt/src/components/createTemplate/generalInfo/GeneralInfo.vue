<template>
  <div class="w-full h-full items-center mx-8">
    <p class="font-semibold text-surface-600 text-2xl flex text-center justify-center">
      {{ $t('Cp_createTemplate_generalInfo.general_information') }}
    </p>

    <p class="font-medium text-surface-600 text-lg font-poppins mx-8 mt-4">
      {{ $t('Cp_createTemplate_generalInfo.select_your_use_case') }}
    </p>
    <div class="flex mx-8 mt-3">
      <div class="flex flex-col gap-4">
        <TemplateOption
          v-for="option in options"
          :key="option.label"
          :is-editing="isEditing"
          :label="option.label"
          :is-current="currentData === option.label"
          :is-selected="templateGeneralInformation.useCase === option.label"
          @select="handleSelectTemplate"
          @hover="setIsHovered"
        />
      </div>

      <div class="border surface-border rounded-lg flex-auto flex p-6 ml-4">
        <p class="font-poppins text-surface-600 text-lg font-medium">
          {{ (currentData !== '' ? currentData : templateGeneralInformation.useCase) === 'Form to doc' ? $t('Cp_createTemplate_generalInfo.form_to_doc') : $t('Cp_createTemplate_generalInfo.data_to_doc') }}
        </p>
      </div>
    </div>

    <!-- uploads -->
    <div v-if="isEditing" :class="templateGeneralInformation.useCase === '' ? 'h-[187px]' : 'rounded-lg flex  mx-8 flex-col gap-8'" class="mt-8">
      <div v-if="templateGeneralInformation.useCase !== '' && templateFile">
        <p class="font-medium text-surface-600 text-lg font-poppins">
          {{ $t('Cp_createTemplate_generalInfo.background_file') }}
        </p>
        <Button outlined class="w-max px-6 font-poppins mt-2">
          {{ $t('Cp_createTemplate_generalInfo.view_file') }}
        </Button>
      </div>
      <div v-if="templateGeneralInformation.useCase !== '' && isDataToDoc && datasetFile">
        <p class="font-medium text-surface-600 text-lg font-poppins">
          {{ $t('Cp_createTemplate_generalInfo.dataset_file') }}
        </p>
        <Button outlined class="w-max px-6 font-poppins mt-2">
          {{ $t('Cp_createTemplate_generalInfo.view_file') }}
        </Button>
      </div>
    </div>
    <div v-else :class="templateGeneralInformation.useCase === '' ? 'h-[187px]' : 'rounded-lg flex mx-8 space-x-6 mb-8'" class="mt-8">
      <UploadSection v-if="templateGeneralInformation.useCase !== ''" :title="$t('Cp_createTemplate_generalInfo.upload_your_template')" :is-background="true" @upload="handleTemplateUpload" />
      <UploadSection v-if="templateGeneralInformation.useCase !== '' && isDataToDoc" :title="$t('Cp_createTemplate_generalInfo.upload_your_data_source')" @upload="handleDatasetUpload" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import TemplateOption from './Options.vue'
import UploadSection from './UploadSection.vue'
import uploadFileToBackend from '~/services/uploadFileToBackend'
import { templateGeneralInformation } from '~/composables/useTemplateCreationData'
import { templateEditorStore } from '@/composables/useTemplateEditorData'

const emit = defineEmits()

const currentData = ref('Content I')
const useCase = ref('')
const templateFile = ref()
const datasetFile = ref()

const isEditing = ref(false)
const isUploading = ref(false)

const options = ref([
  { label: 'Data to doc' },
  { label: 'Form to doc' },
])

onMounted(() => {
  if (templateEditorStore?.templateToEdit?.id) {
    isEditing.value = true
    useCase.value = templateGeneralInformation?.useCase
    templateFile.value = templateGeneralInformation?.backgroundFileUrl
    datasetFile.value = templateGeneralInformation?.datasetFileUrl
  }
  else {
    isEditing.value = false
    useCase.value = ''
    templateFile.value = ''
    datasetFile.value = ''
  }
})
function setIsHovered(label, hovered) {
  currentData.value = hovered ? label : ''
}

function handleSelectTemplate(label) {
  // console.log('to select', label, selectedTemplate.value)
  // // if (label === selectedTemplate.value)
  // //   selectedTemplate.value = ''
  // // else
  // selectedTemplate.value = label
  templateGeneralInformation.useCase = label
}

async function handleTemplateUpload(file) {
  if (!file) {
    templateFile.value = ''
    return
  }
  isUploading.value = true
  const url = await uploadFileToBackend(file)
  if (url) {
    templateFile.value = url
    isUploading.value = false
  }
  else {
    isUploading.value = false
  }
}

async function handleDatasetUpload(file) {
  if (!file) {
    datasetFile.value = ''
    return
  }
  isUploading.value = true
  const url = await uploadFileToBackend(file)
  if (url) {
    datasetFile.value = url
    isUploading.value = false
  }
  else {
    isUploading.value = false
  }
}
watch(isUploading, (val) => {
  if (val) {
    const isValid = false
    emit('updateData', { isValid, step: 1 })
  }
  else {
    const isValid = true
    emit('updateData', { isValid, step: 1 })
  }
})

watch([templateFile, datasetFile], () => {
  templateGeneralInformation.backgroundFileUrl = templateFile.value
  templateGeneralInformation.datasetFileUrl = datasetFile.value
  const isValid
  = templateGeneralInformation.useCase !== ''
  // && templateFile.value && (templateGeneralInformation.useCase !== 'Data to doc' || datasetFile.value)

  emit('updateData', { isValid, step: 1 })
})

const isDataToDoc = computed(() => templateGeneralInformation.useCase === 'Data to doc')
</script>
