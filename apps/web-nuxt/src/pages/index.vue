<template>
  <div class="h-full w-full bg-white rounded-lg overflow-scroll no-scrollbar p-4 py-8">
    <div class="mb-8">
      <h1 class=" text-4xl font-bold text-surface-600">
        {{ $t('welcome') }} {{ user?.name || user?.email }}
      </h1>
    </div>
    <div class="card">
      <!-- <div class="card-header">
        <h2 class=" text-2xl font-semibold text-surface-600 -mb-10">
          Favourite Templates
        </h2>
      </div> -->
      <div class="card-content -mt-12">
        <!-- <FavouriteTemplates :templates="templateData" /> -->
        <TemplateDataView :templates="templateData" :is-favourite-view="true" @update-templates-for-favourites="updateTemplateData" />
      </div>
    </div>
  </div>
  <!-- <Toast position="top-right" group="bc" @close="onClose">
    <template #message="slotProps">
      <div class="flex flex-col items-start flex-auto">
        <div class="flex items-center gap-2">
          <font-awesome-icon icon="fa-bold fa-check" size="lg" />
          <span class="font-bold font-poppins">{{ $t('Pg_home.operation_complete') }}</span>
        </div>
        <div class="font-normal text-lg mt-1 font-poppins text-md">
          {{ $t('Pg_home.document_generated_successfully') }}
        </div>
        <div class="flex gap-2 mt-4">
          <Button size="small" :label="$t('Pg_home.download')" severity="success" class="font-poppins" @click="downloadAllDocuments()" />
          <Button outlined size="small" :label="$t('Pg_home.open_document_library')" class="font-poppins" severity="success" @click="navigateDocumentLibrary()" />
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
  </Toast> -->
</template>

<script setup>
import { uuid } from 'vue-uuid'
import { useToast } from 'primevue/usetoast'
import { useAuth } from '@/composables/useAuth'

// import FavouriteTemplates from '~/components/dashboard/FavouriteTemplates.vue'
import TemplateDataView from '~/components/template/TemplateDataView.vue'

import { resetAllTemplateCreationValues, templateDeliveryOptions, templateGeneralInformation } from '~/composables/useTemplateCreationData'
import { resetAllTemplateEditorValues, templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'
import { docGenerationData } from '@/composables/useDocGenerationData'

const { token, setToken, fetchUserDetails, user, setUser } = useAuth()

const toast = useToast()
const router = useRouter()

const runtimeConfig = useRuntimeConfig()

const templateData = ref([])

async function fetchFavourites() {
  if (!user?.value?.email)
    return
  try {
    // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates/favourites/${user?.value?.email}`)
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
  console.log('user>>>>>>>>>>>>>>', user)
}
onMounted(async () => {
  templateEditorStore.templateToEdit = {}
  resetAllTemplateCreationValues()
  resetAllTemplateEditorValues()
  canvasService.refreshCanvas()
  fetchFavourites()
})
watch(user, (val) => {
  fetchFavourites()
})
function updateTemplateData(data) {
  templateData.value = data
}
function navigateDocumentLibrary() {
  router.push('document-library')
}
function downloadAllDocuments() {
  if (docGenerationData?.generatedDocs?.length < 1)
    return
  docGenerationData?.generatedDocs?.forEach((url, index) => {
    fetch(url)
      .then(response => response.blob())
      .then((blob) => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = `file_${index + 1}.pdf` // Adjust the file name as needed
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(objectUrl)
      })
      .catch((error) => {
        console.error(`Error downloading file ${index + 1}:`, error)
      })
  })
}
</script>
