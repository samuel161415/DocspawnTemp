<template>
  <Dialog v-model:visible="visible" :draggable="false" modal header="Edit Profile" :style="{ width: '55rem' }">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="text-lg text-surface-600 font-poppins font-normal"></span>
      </div>
    </template>

    <div class="flex justify-center items-center space-x-8">
      <div class="flex flex-col ">
        <ImagePreview :preview-hash="`${template.image_preview_hash}-modal`" :background-file-url="template.background_file_url" :filtered-templates="filteredTemplates" :is-modal="true" />
      </div>

      <div class="flex flex-col space-y-4 mt-4">
        <p class="text-lg text-surface-500 font-poppins font-normal">
          <span class="font-semibold mr-2">Template name</span>  {{ props.template.name }}
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal">
          <span class="font-semibold mr-2">Date created</span>  {{ formatDateForInput(props?.template?.created_at, "DD/MM/YYYY") }}
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal">
          <span class="font-semibold mr-2">Date modified</span>  {{ formatDateForInput(props?.template?.updated_at, "DD/MM/YYYY") }}  {{ formatTimeForInput(props?.template?.updated_at, "HH:MM") }}
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal">
          <span class="font-semibold mr-2">Total document created</span> {{ props.template.total_generated_docs }}
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal">
          <span class="font-semibold mr-2">Time saved</span> {{ (props.template.total_generated_docs / (60 * 40))?.toFixed(6) }} hrs
        </p>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import ImagePreview from './ImagePreview'

const props = defineProps({
  template: {
    type: Array,
    required: true,
    default: () => {},
  },
})

const emit = defineEmits()

const visible = ref(false)

const clickCount = ref(0)

onMounted(() => {
  const closeOnOutsideClick = (event) => {
    if (clickCount.value > 0)
      emit('outsideClick', false)

    clickCount.value += 1
  }

  document.body.addEventListener('click', closeOnOutsideClick)

  onBeforeUnmount(() => {
    document.body.removeEventListener('click', closeOnOutsideClick)
  })
})
</script>
