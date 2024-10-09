<template>
  <div>
    <ImageCropper
      :is-edit="isEdit"
      :original-image="originalImage"
      :aspect-ratio="props?.aspectRatio"
      :is-checkbox="props?.isCheckbox"
      :user-value="props.userValue"
      @toggle-edit="isEdit = !isEdit"
      @handle-cropped-url="(url) => croppedImageUrl = url"
      @handle-original-image="(val) => originalImage = val"
    />
    <Button v-if="croppedImageUrl" label="Edit image" class="font-poppins my-2" @click="editCroppedImage" />
  
  </div>
</template>

<script setup>
import ImageCropper from './CropperModal.vue'

const props = defineProps(['aspectRatio', 'isCheckbox', 'userValue'])
const emit = defineEmits(['handleSaveCroppedImage'])
const isEdit = ref(false)
const croppedImageUrl = ref(null)
const originalImage = ref()

function editCroppedImage() {
  // cropperRef.value.editImage()
  isEdit.value = true
}
watch(croppedImageUrl, (val) => {
  emit('handleSaveCroppedImage', val)
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
