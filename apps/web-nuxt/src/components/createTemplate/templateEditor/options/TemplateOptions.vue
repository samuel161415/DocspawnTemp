//Watermark image 1
//https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/494a88a1-edeb-4652-b190-c0ad775b9c80_DS watermark 1 (1).png.png

//Watermark image 2
//https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/84c85464-5815-4414-bd71-b70695ed0af3_DS watermark 2 (1).png.png

<template>
  <div class="mt-4 ">
    <p class="font-poppins text-lg text-surface-600">
      Watermark
    </p>
    <p class="font-poppins text-xs text-surface-500">
      It will appear on every generated document, untill you disable it.
    </p>
    <div class="flex gap-2 my-6">
      <Checkbox v-model="disableWatermark" v-tooltip.top="'Only for paid users'" disabled />
      <p>disable watermark</p>
    </div>
    <p class="font-poppins text-md text-surface-600">
      Select watermark image
    </p>
    <div v-for="image in watermarkImages" :key="image.id" class="flex items-center mt-4 ">
      <RadioButton v-model="templateEditorStore.watermarkImage" :input-id="image.id" name="dynamic" :value="image" />
      <label :for="image.id" class="ml-2">
        <!-- {{ image.id }} -->
        <div class="w-full h-max ">
          <img id="output" accept="image/*" class=" object-cover h-auto w-3/4 " :src="image.src" />
        </div>

      </label>
    </div>
  </div>
</template>

<script setup>
import { templateEditorStore } from '@/composables/useTemplateEditorData'

const disableWatermark = ref(false)
const watermarkImages = ref([{ id: 1, src: 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/494a88a1-edeb-4652-b190-c0ad775b9c80_DS watermark 1 (1).png.png' }, { id: 2, src: 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/84c85464-5815-4414-bd71-b70695ed0af3_DS watermark 2 (1).png.png' }])
onMounted(() => {
  if (!templateEditorStore?.watermarkImage?.src)
    templateEditorStore.watermarkImage = watermarkImages.value[0]
})
watch(() => templateEditorStore.watermarkImage, (newVal) => {
  if (!templateEditorStore.canvas)
    return
  if (newVal.src) {
    const objs = templateEditorStore.canvas._objects

    templateEditorStore.canvas.objects = objs?.map((obj) => {
      if (obj._element && obj.id === 'watermark-docspawn') {
        // const originalHeight = obj.height * obj.scaleY
        const originalWidth = obj.width * obj.scaleX

        obj.setSrc(newVal.src, () => {
          obj.scaleToWidth(originalWidth)
          //   obj.scaleToHeight(originalHeight)
          templateEditorStore.canvas.renderAll()
          if (obj.left <= 0)
            obj.set({ left: 0 })
          if (obj.top <= 0)
            obj.set({ top: 0 })
          if (obj.left + (obj.width * obj.scaleX) >= templateEditorStore.canvas.width)
            obj.set({ left: templateEditorStore.canvas.width - (obj.width * obj.scaleX) })
          if (obj.top + (obj.height * obj.scaleY) >= templateEditorStore.canvas.height)
            obj.set({ top: templateEditorStore.canvas.height - (obj.height * obj.scaleY) })
          templateEditorStore.canvas.renderAll()
        })
      }
      return obj
    })
    templateEditorStore.canvas.renderAll()
  }
})
</script>
