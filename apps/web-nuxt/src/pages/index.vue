<template>
  <div class="h-full w-full bg-white rounded-lg overflow-scroll no-scrollbar p-4 py-8">
    <div class="mb-8">
      <h1 class=" text-4xl font-bold text-surface-600">
        Welcome {{ accountData?.accountType }} :)
      </h1>
    </div>
    <div class="card">
      <div class="card-header">
        <h2 class=" text-2xl font-semibold text-surface-600 -mb-10">
          Favourite Templates
        </h2>
      </div>
      <div class="card-content">
        <!-- <FavouriteTemplates :templates="templateData" /> -->
        <TemplateDataView :templates="templateData" :is-favourite-view="true" @update-templates-for-favourites="updateTemplateData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { uuid } from 'vue-uuid'
import { accountData } from '@/composables/useAccountData'

// import FavouriteTemplates from '~/components/dashboard/FavouriteTemplates.vue'
import TemplateDataView from '~/components/template/TemplateDataView.vue'

import { resetAllTemplateCreationValues, templateDeliveryOptions, templateGeneralInformation } from '~/composables/useTemplateCreationData'
import { resetAllTemplateEditorValues, templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'

const runtimeConfig = useRuntimeConfig()

const templateData = ref([])

onMounted(async () => {
  templateEditorStore.templateToEdit = {}
  resetAllTemplateCreationValues()
  resetAllTemplateEditorValues()
  canvasService.refreshCanvas()
  try {
    // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates/favourites/${accountData?.accountType}`)
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
function updateTemplateData(data) {
  templateData.value = data
}
</script>
