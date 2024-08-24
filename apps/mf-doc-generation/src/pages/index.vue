<template>
  <TemplateDataView :template-id-iframe="templateId" :email="email" />
</template>

<script setup>
import { uuid } from 'vue-uuid'
import { useQueryParams } from '../composables/useQueryParams'
import TemplateDataView from '@/components/TemplateDataView.vue'

const { email, templateId } = useQueryParams()
const runtimeConfig = useRuntimeConfig()
const templateData = ref([])
async function fetchFavourites() {
  try {
    // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates/${email}`)
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)
    const data = await response.json()

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
  fetchFavourites()
})
</script>
