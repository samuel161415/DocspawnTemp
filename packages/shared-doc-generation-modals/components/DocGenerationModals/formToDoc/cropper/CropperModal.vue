<template>
  <div>
    <ImageLibraryModal
      :user-value="props.userValue"
      @set-image="url => {
        imageUrl = url;visible = true; originalImage = url
        emit('handleOriginalImage', url)
      }"
    />
    <p class="my-2">
      Or
    </p>

    <input type="file" @change="onFileChange" />
    <Dialog v-model:visible="visible" modal :style="{ width: props?.isCheckbox ? '30vw' : '50vw' }">
      <div v-if="imageUrl && originalImage">
        <div v-if="props?.isCheckbox" class=" flex w-full justify-center  h-[330px]">
          <Cropper
            ref="cropper"
            :src="imageUrl"
            :aspect-ratio="props?.aspectRatio ? props.aspectRatio : 1"
            style="height: 300px; width: 300px;"
          />
        </div>
        <div v-else>
          <Cropper
            ref="cropper"
            :src="imageUrl"
            :aspect-ratio="props?.aspectRatio ? props.aspectRatio : 1"
            style="height: 400px; width: 100%;"
          />
        </div>

        <!--  -->
        <Button label="Save" icon="pi pi-check" @click="saveCroppedImage" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Cropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { ImageLibraryModal } from '@docspawn/image-library-modal'
import uploadFileToBackend from '../../../../services/uploadFileToBackend'

const props = defineProps(['isEdit', 'originalImage', 'aspectRatio', 'isCheckbox', 'userValue'])

// adjust the path as necessary
const emit = defineEmits(['handleCroppedUrl', 'handleOriginalImage', 'toggleEdit'])

const visible = ref(false)
const imageUrl = ref(null)
const croppedImageUrl = ref(null)
const originalImage = ref(null)
const cropper = ref(null)

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
      originalImage.value = e.target.result
      emit('handleOriginalImage', e.target.result)
      visible.value = true
    }
    reader.readAsDataURL(file)
  }
}

function saveCroppedImage() {
  cropper.value.getCroppedCanvas().toBlob(async (blob) => {
    try {
      visible.value = false
      const file = new File([blob], 'cropped_image.png', { type: 'image/png' })
      const uploadedImageUrl = await uploadFileToBackend(file)
      croppedImageUrl.value = uploadedImageUrl
      props?.isEdit
      && emit('toggleEdit')
    }
    catch (error) {
      console.error('Error uploading cropped image:', error)
    }
  })
}

watch(croppedImageUrl, (val) => {
  emit('handleCroppedUrl', val)
})

watch(() => props.isEdit, (val) => {
  if (val) {
    imageUrl.value = originalImage.value
    visible.value = true
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
