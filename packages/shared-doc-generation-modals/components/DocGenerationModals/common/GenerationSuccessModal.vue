<template>
  <div>
    <!-- Trigger button to open the modal (for demonstration purposes) -->

    <!-- PrimeVue Dialog (Modal) -->
    <Dialog v-model:visible="showModal" :modal="true" :closable="false">
      <div class="flex flex-col justify-center items-center gap-6">
        <p>Document are being generated. Will be recieved via selected medium.</p>
        <Image :src="giphy" :style="{ width: '300px', height: 'auto' }" />
        <!-- Reload Page Button -->
        <Button label="Generate again" icon="pi pi-refresh" class="p-button-success" @click="reloadPage" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import giphy from '../../../assets/giphy1.webp'

const showModal = ref(true)
const router = useRouter()

// Method to reload the page
function reloadPage() {
  router.go(0) // Reloads the current page
}
</script>

  <style scoped>
  /* Add any additional styles if necessary */
  </style>
