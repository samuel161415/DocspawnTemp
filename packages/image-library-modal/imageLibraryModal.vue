<template>
  <div>
    <!-- Button to open the modal -->
    <Button outlined label="Select from Image library" icon="pi pi-images" size="small" @click="showModal = true" />

    <!-- PrimeVue Modal -->
    <Dialog v-model:visible="showModal" header="Select an Image" :modal="true" :closable="true" :style="{ width: '50vw' }">
      <div class="grid grid-cols-4 xl:grid-cols-6 gap-4 p-4 pb-24">
        <div
          v-for="image in images"
          :key="image.id"
          class="relative  cursor-pointer border-2 rounded overflow-hidden transition-all duration-200 transform" :class="[
            selectedImage?.id === image.id ? 'border-blue-500 scale-105' : 'border-gray-300',
          ]"
          tabindex="0"
          @click="selectImage(image)"
          @keydown.enter="selectImage(image)"
          @mouseover="hoverImage = image"
          @mouseleave="hoverImage = null"
        >
          <img
            :src="image.image_url"
            alt="Image preview"
            class="w-full h-36 object-contain"
          />

          <!-- Selected overlay -->
          <div v-if="selectedImage?.id === image.id" class="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
            <span class="text-white text-sm font-bold">Selected</span>
          </div>
        </div>
      </div>

      <!-- Image Preview Modal on Hover -->
      <div v-if="hoverImage" class="fixed bottom-4 right-4 bg-white border rounded shadow-lg p-2 max-w-48 z-50">
        <img :src="hoverImage.image_url" alt="Hovered Image" class="w-full h-auto object-contain rounded" />
      </div>
    </Dialog>

    <!-- Display the selected image outside the modal -->
    <!-- <div v-if="selectedImage" class="mt-4">
      <h3 class="text-lg font-bold">
        Selected Image:
      </h3>
      <img :src="selectedImage.image_url" alt="Selected Image" class="w-32 h-32 object-cover border rounded" />
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

// or any other theme

// import { useAuth } from '@/composables/useAuth'

const props = defineProps(['userValue'])
const emit = defineEmits(['setImage'])
const runtimeConfig = useRuntimeConfig()
// const { user } = useAuth()

// Sample array of images
const images = ref([])
onMounted(async () => {
  fetchImages()
})

async function fetchImages() {
  const response = await fetch(`${runtimeConfig.public.BASE_URL}/library-image/${props.userValue?.email}`)
  const data = await response.json()
  // console.log('response data', data)
  images.value = data
}
// [
//   { id: 1, url: 'https://via.placeholder.com/150/92c952' },
//   { id: 2, url: 'https://via.placeholder.com/150/771796' },
//   { id: 3, url: 'https://via.placeholder.com/150/24f355' },
//   // Add more images as needed
// ]

// State management
const showModal = ref(false)
const selectedImage = ref(null)
const hoverImage = ref(null)
watch(showModal, (val) => {
  if (val)
    fetchImages()
})
// Function to handle image selection
function selectImage(image) {
  selectedImage.value = image
  showModal.value = false // Close the modal after selection
  emit('setImage', image?.image_url)
}
</script>

  <style scoped>
  /* Tailwind CSS is recommended for styling, but you can add custom styles here if needed */
  </style>
