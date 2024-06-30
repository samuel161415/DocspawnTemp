<template>
  <div class="w-full h-full items-center mx-8">
    <p class="font-semibold text-surface-600 text-2xl flex text-center justify-center">
      General information
    </p>

    <div class="flex mx-8 mt-4">
      <div class="flex-auto flex py-2">
        <div class="w-full space-y-4">
          <p class="font-medium text-surface-600 text-lg font-poppins">
            Template name <span class="text-error">*</span>
          </p>
          <p v-if="isEditing" class="font-poppins text-lg text-surface-600">
            {{ templateName ? templateName : templateGeneralInformation?.name }}
          </p>
          <InputText v-else v-model="templateName" type="text" class="w-80 font-poppins text-surface-600 text-lg pl-5 rounded-lg" placeholder="Template name" />
        </div>
      </div>
    </div>

    <p class="font-medium text-surface-600 text-lg font-poppins mx-8 mt-4">
      Select your use case
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
          {{ currentData !== '' ? currentData : templateGeneralInformation.useCase }}
        </p>
      </div>
    </div>

    <!-- uploads -->
    <div v-if="isEditing" :class="templateGeneralInformation.useCase === '' ? 'h-[187px]' : 'rounded-lg flex  mx-8 flex-col gap-8'" class="mt-8">
      <div v-if="templateGeneralInformation.useCase !== '' && templateFile">
        <p class="font-medium text-surface-600 text-lg font-poppins">
          Background file
        </p>
        <Button outlined class="w-max px-6 font-poppins mt-2">
          view file
        </Button>
      </div>
      <div v-if="templateGeneralInformation.useCase !== '' && isDataToDoc && datasetFile">
        <p class="font-medium text-surface-600 text-lg font-poppins">
          Dataset file
        </p>
        <Button outlined class="w-max px-6 font-poppins mt-2">
          view file
        </Button>
      </div>
    </div>
    <div v-else :class="templateGeneralInformation.useCase === '' ? 'h-[187px]' : 'rounded-lg flex mx-8 space-x-6'" class="mt-8">
      <UploadSection v-if="templateGeneralInformation.useCase !== ''" title="Upload your template" :is-background="true" @upload="handleTemplateUpload" />
      <UploadSection v-if="templateGeneralInformation.useCase !== '' && isDataToDoc" title="Upload your data source" @upload="handleDatasetUpload" />
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
const selectedTemplate = ref('')
const templateName = ref('')
const useCase = ref('')
const templateFile = ref()
const datasetFile = ref()
const dataSourceFile = ref()
const isEditing = ref(false)

const options = ref([
  { label: 'Data to doc' },
  { label: 'Form to doc' },
  // { label: 'Table to doc' },
])

onMounted(() => {
  if (templateEditorStore?.templateToEdit?.id) {
    isEditing.value = true
    useCase.value = templateGeneralInformation?.useCase
    templateName.value = templateGeneralInformation?.name
    templateFile.value = templateGeneralInformation?.backgroundFileUrl
    datasetFile.value = templateGeneralInformation?.datasetFileUrl
  }
  else {
    isEditing.value = false
    useCase.value = ''
    templateName.value = ''
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
  const url = await uploadFileToBackend(file)
  if (url)

    templateFile.value = url
}

async function handleDatasetUpload(file) {
  if (!file) {
    datasetFile.value = ''
    return
  }

  const url = await uploadFileToBackend(file)
  if (url)

    datasetFile.value = url
}

watch([templateName, templateFile, datasetFile], () => {
  templateGeneralInformation.name = templateName.value
  // templateGeneralInformation.useCase = selectedTemplate.value
  templateGeneralInformation.backgroundFileUrl = templateFile.value
  templateGeneralInformation.datasetFileUrl = datasetFile.value
  const isValid
  = templateName.value !== ''
  && templateGeneralInformation.useCase !== ''
  // && templateFile.value && (templateGeneralInformation.useCase !== 'Data to doc' || datasetFile.value)

  emit('updateData', { isValid, step: 1 })
})

const isDataToDoc = computed(() => templateGeneralInformation.useCase === 'Data to doc')
</script>
