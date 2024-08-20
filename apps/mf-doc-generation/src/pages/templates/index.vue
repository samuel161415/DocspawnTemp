<template>
  <div class="h-full w-full bg-white rounded-lg overflow-scroll no-scrollbar">
    <div class="px-8 py-8 flex flex-col gap-2 ">
      <div class="px-3 py-2">
        <h2 class="font-semibold text-surface-600 text-2xl">
          {{ $t('Pg_template_index.templates') }}
        </h2>

        <div class="mt-14">
          <div class="flex w-full items-center justify-between mb-4">
            <div v-tooltip="$t('Pg_template_index.total_custom_templates')" class="px-5 py-4 rounded-lg shadow-sm w-80 border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:scale-105 border-success hover:bg-green-50" @click="visible = true;refreshAllFirst()">
              <p class="font-poppins text-success text-lg text-center">
                {{ $t('Pg_template_index.create_new_template') }}
              </p>
            </div>
          </div>

          <TemplateDataView :templates="templateData" @delete-template="deleteTemplate" @update-templates-for-favourites="updateTemplateData" />
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

import { useAuth } from '@/composables/useAuth'

const { token, setToken, fetchUserDetails, user, setUser } = useAuth()

const visible = ref(false)
const runtimeConfig = useRuntimeConfig()

const templateData = ref([])
function updateTemplateData(data) {
  templateData.value = data
}

function refreshAllFirst() {
  resetAllTemplateCreationValues()
  resetAllTemplateEditorValues()
  canvasService.refreshCanvas()
}

async function fetchTemplates() {
  if (!user?.value?.email)
    return
  try {
    // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates/${user?.value?.email}`)
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)
    const data = await response.json()
    // console.log('templates', data)

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
}
onMounted(async () => {
  templateEditorStore.templateToEdit = {}
  resetAllTemplateCreationValues()
  resetAllTemplateEditorValues()
  canvasService.refreshCanvas()
  fetchTemplates()
})
watch(user, () => fetchTemplates())
async function deleteTemplate(template) {
  const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates/${template?.id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    // throw new Error(`Network response was not ok ${response.statusText}`)
    // console.log('not deleetd')
  }
  templateData.value = templateData.value?.filter(t => t?.id !== template?.id)
}
</script>
