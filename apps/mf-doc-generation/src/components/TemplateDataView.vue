<template>
  <div class="rounded-lg pb-2 flex justify-center  w-[100vw] h-[98vh] overflow-auto py-4 ">
    <div v-if="previewFormVisible" class="w-max  min-w-[600px] w-max">
      <FormToDocGenerationModal
        v-model:visible="previewFormVisible"
        :mobile="mobile"
        :form-title="formTitle"
        :all-form-fields="currentTemplateAllFormFields"
        :form-description="formDescription"
        :is-collapsed="isCollapsed"
        :is-generatable="true"
        :template-data="currentTemplate"

        @cancel="previewFormVisible = false"
        @update-generated-docs="updateGeneratedDocs"
      />
    </div>
    <div v-if="visibleDataToDoc" class="w-max   w-max border border-black ">
      <DataToDocGenerationModal v-if="visibleDataToDoc" v-model:visible="visibleDataToDoc" :template="currentTemplate" @cancel="visibleDataToDoc = false" @outside-click="handleOutsideClick" />
    </div>
  </div>

  <Toast position="top-right">
    <template #message="slotProps">
      <div class="flex items-start space-x-2">
        <div class="mt-1">
          <font-awesome-icon :icon="fal.faFileCircleXmark" size="lg" style="color: #c8432f;" />
        </div>
        <div class="">
          <div class="font-bold text-lg font-poppins text-error">
            {{ slotProps.message.summary }}
          </div>
          <div class="font-normal text-base font-poppins text-error">
            {{ slotProps.message.detail }}
          </div>
        </div>
      </div>
    </template>
  </Toast>

  <Toast position="top-right" group="ac" @close="onClose">
    <template #message="slotProps">
      <div class="flex flex-col items-start flex-auto">
        <div class="flex items-center gap-2">
          <font-awesome-icon icon="fa-bold fa-clock-rotate-left" size="lg" class="rotate-180" />
          <div>
            <p class="font-bold">
              {{ slotProps?.message?.summary }}
            </p>
            <p class="font-normal">
              {{ slotProps?.message?.detail }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </Toast>
</template>

<script setup>
// import { useI18n } from 'vue-i18n'

import { DataToDocGenerationModal, FormToDocGenerationModal } from '@docspawn/shared-doc-generation-modals'

import { useRuntimeConfig } from '#app'

const props = defineProps(['templateIdIframe', 'email'])

const runtimeConfig = useRuntimeConfig()

const selectedTemplateForDocGeneration = ref()
const templates = ref([])
async function fetchTemplates() {
  try {
    // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates/${props?.email}`)
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)
    const data = await response.json()
    console.log('templates', data)

    if (data?.length > 0) {
      templates.value = data?.map((d) => {
        return { ...d }
      })
      if (props?.templateIdIframe)
        selectedTemplateForDocGeneration.value = templates?.value?.filter(t => Number.parseInt(t?.id) === Number.parseInt(props?.templateIdIframe))[0]
      console.log('props?.templateIdIframe', props?.templateIdIframe)
      console.log('templates.value', templates?.value)
      console.log('templates?.value?.filter(t => t?.id === props?.templateIdIframe)', templates?.value?.filter(t => t?.id === props?.templateIdIframe))
      console.log('templates?.value?.filter(t => t?.id === props?.templateIdIframe)[0]', templates?.value?.filter(t => t?.id === props?.templateIdIframe)[0])
      if (!selectedTemplateForDocGeneration.value)
        selectedTemplateForDocGeneration.value = templates.value[0]
      if (selectedTemplateForDocGeneration.value?.use_case === 'Form to doc') {
        currentTemplate.value = selectedTemplateForDocGeneration.value
        currentTemplateAllFormFields.value = selectedTemplateForDocGeneration.value.added_fields?.filter(f => f?.isFormField)
        previewFormVisible.value = true
      }
      else {
        currentTemplate.value = selectedTemplateForDocGeneration.value
        visibleDataToDoc.value = true
      }
    }
    // console.log('response of fetching templates', data)
  }
  catch (error) {
    console.error('Error fetching templates:', error)
  }
}

// const DataToDocGeneration = defineAsyncComponent(() =>
//   import('docGenerationRemote/DataToDocGeneration'),
// )
// const FormToDocGeneration = defineAsyncComponent(() =>
//   import('docGenerationRemote/FormToDocGeneration'),
// )

// const { t } = useI18n()

const allGeneratedDocs = ref()

function updateGeneratedDocs(val) {
  allGeneratedDocs.value = val
}

const templatesLoading = ref(true)
const currentTemplate = ref()
const visible = ref(false)
const visibleDataToDoc = ref(false)
const previewFormVisible = ref(false)
const currentTemplateAllFormFields = ref('')

onMounted(() => {
  fetchTemplates()
  setTimeout(() => {
    templatesLoading.value = false
  }, 2000)
})

watch(previewFormVisible, () => {
  console.log('previewFormVisible', previewFormVisible.value)
})
watch(selectedTemplateForDocGeneration, () => {
  console.log('selectedTemplateForDocGeneration', selectedTemplateForDocGeneration.value)
  if (selectedTemplateForDocGeneration.value?.use_case === 'Form to doc') {
    currentTemplate.value = selectedTemplateForDocGeneration.value
    currentTemplateAllFormFields.value = selectedTemplateForDocGeneration.value.added_fields?.filter(f => f?.isFormField)
    previewFormVisible.value = true
  }
  else {
    currentTemplate.value = selectedTemplateForDocGeneration.value
    visibleDataToDoc.value = true
  }
})

function showTemplateModal() {
  console.log('props?.templateIdIframe', props?.templateIdIframe)
  if (props?.templateIdIframe)
    selectedTemplateForDocGeneration.value = templates?.value?.filter(t => Number.parseInt(t?.id) === Number.parseInt(props?.templateIdIframe))[0]
  console.log('templates.value', templates?.value)
  console.log('templates?.value?.filter(t => t?.id === props?.templateIdIframe)', templates?.value?.filter(t => t?.id === props?.templateIdIframe))
  console.log('templates?.value?.filter(t => t?.id === props?.templateIdIframe)[0]', templates?.value?.filter(t => t?.id === props?.templateIdIframe)[0])
  if (!selectedTemplateForDocGeneration.value)
    selectedTemplateForDocGeneration.value = templates.value[0]
  if (selectedTemplateForDocGeneration.value?.use_case === 'Form to doc') {
    currentTemplate.value = selectedTemplateForDocGeneration.value
    currentTemplateAllFormFields.value = selectedTemplateForDocGeneration.value.added_fields?.filter(f => f?.isFormField)
    previewFormVisible.value = true
  }
  else {
    currentTemplate.value = selectedTemplateForDocGeneration.value
    visibleDataToDoc.value = true
  }
}
// default favorite state

function handleOutsideClick() {
  visible.value = false
  visibleDataToDoc.value = false
}
</script>

  <style>
  .pointer-parent *{

    pointer-events: none;
  }
  .pointer-auto{
    pointer-events: auto;
  }
  </style>
