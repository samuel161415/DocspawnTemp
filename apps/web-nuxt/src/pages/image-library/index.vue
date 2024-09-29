<template>
  <div class="h-full w-full bg-white rounded-lg overflow-scroll no-scrollbar">
    <div class="px-8 py-8 h-full">
      <h2 class="font-semibold text-surface-600 text-2xl px-3 py-2">
        {{ $t("Cp_documents_library.doc_library") }}
      </h2>
      <div class="w-full border mt-4">
        <div class="flex gap-4 my-4 p-2 ">
          <div v-for=" image in images" :key="image.id" class="relative">
            <img class="w-auto h-72" :src="image.image_url" />
            <div class="absolute right-0 bottom-0 p-4 bg-white border border-primaryBlue cursor-pointer" @click="() => deleteImage (image)">
              <font-awesome-icon icon="fa-duotone fa-trash" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2cc; --fa-secondary-opacity: 0.6;" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script setup>
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import { useAuth } from '@/composables/useAuth'

const runtimeConfig = useRuntimeConfig()
const { user } = useAuth()
const images = ref([])
const toast = useToast()
onMounted(async () => {
  fetchImages()
})
async function fetchImages() {
  const response = await fetch(`${runtimeConfig.public.BASE_URL}/library-image/${user.value.email}`)
  const data = await response.json()
  console.log('response data', data)
  images.value = data
}
async function deleteImage(img) {
  // console.log('runnig delet image')
  const response = await fetch(`${runtimeConfig.public.BASE_URL}/library-image/${img?.id}`, {
    method: 'delete',
  })
  fetchImages()
  toast.add({ severity: 'success', summary: 'Success', detail: 'Image deleted successfully', life: 1000 })
}
</script>
