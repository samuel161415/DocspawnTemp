<template>
  <div class="h-full w-full bg-white rounded-lg overflow-scroll no-scrollbar">
    <div class="px-8 py-8 flex flex-col gap-2 ">
      <div class="px-3 py-2">
        <h2 class="font-semibold text-surface-600 text-2xl">
          Templates
        </h2>

        <div class="mt-14">
          <div class="flex w-full items-center justify-between mb-4">
            <div v-tooltip="'Total custom template availbale in your plan: 4'" class="px-5 py-4 rounded-lg shadow-sm w-80 border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:scale-105 border-success hover:bg-green-50" @click="visible = true;refreshAllFirst()">
              <p class="font-poppins text-success text-lg text-center">
                Create new template
              </p>
            </div>
          </div>

          <TemplateDataView :templates="templateData" />
        </div>
      </div>

      <FirstStep v-model:visible="visible" @cancel="visible = false" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// import { templateData } from '~/services/templates.js'
import { uuid } from 'vue-uuid'
import FirstStep from '~/components/createTemplate/FirstStep.vue'
import TemplateDataView from '~/components/template/TemplateDataView.vue'
import { resetAllTemplateCreationValues, templateDeliveryOptions, templateGeneralInformation } from '~/composables/useTemplateCreationData'
import { resetAllTemplateEditorValues, templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'

const visible = ref(false)
const runtimeConfig = useRuntimeConfig()

const templateData = ref([])

function refreshAllFirst() {
  resetAllTemplateCreationValues()
  resetAllTemplateEditorValues()
  canvasService.refreshCanvas()
}

onMounted(async () => {
  templateEditorStore.templateToEdit = {}
  resetAllTemplateCreationValues()
  resetAllTemplateEditorValues()
  canvasService.refreshCanvas()
  try {
    // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates`)
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)
    const data = await response.json()
    console.log('templates', data)

    if (data?.length > 0) {
      templateData.value = data?.map((d) => {
        return { ...d, image_preview_hash: uuid.v1() }
      })
    }
    // console.log('response of fetching templates', data)
  }
  catch (error) {
    console.error('Error fetching templates:', error)
  }
})
</script>
