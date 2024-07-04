<template>
  <div class=" bg-white  ">
    <div class="h-12 w-full  flex items-center justify-between">
      <div class="flex gap-2">
        <div v-tooltip.top="'rotate 45° clockwise'" class="h-8 w-8 text-2xl text-black  flex items-center justify-center rounded-md cursor-pointer p-2 " @click="rotateClockwise">
          <font-awesome-icon icon="fa-light fa-arrow-rotate-right" size="xs" />
        </div>
        <div v-tooltip.top="'rotate 45° anti-clockwise'" class="h-8 w-8 text-2xl text-black  flex items-center justify-center rounded-md cursor-pointer p-2 " @click="rotateAntiClockwise">
          <font-awesome-icon icon="fa-light fa-arrow-rotate-left" size="xs" />
        </div>
      </div>
    </div>
    <p v-if="(activeDataField === 'Lorem ipsum' && templateEditorStore.selectedAddedField?.fieldType === 'Data field') " class="font-poppins text-sm text-surface-500 mt-2">
      Apply rotation to the element on pdf
    </p>
  </div>
</template>

<script setup>
import canvasService from '@/composables/useTemplateCanvas'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'

const rotationVal = ref(0)

function initiateRotation() {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      if (!activeObject?.angle || activeObject?.angle === 0) {
        // activeObject.set({ angle: 0 })
        activeObject.rotate(0)
        rotationVal.value = 0
        canvas.renderAll()
      }
      else {
        rotationVal.value = activeObject?.angle
      }
    }
  }
}
onMounted(() => {
  initiateRotation()
})
watch(() => templateEditorStore.selectedAddedField, () => {
  initiateRotation()
})
function rotateClockwise() {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObject = canvas.getActiveObject()
    const ang = activeObject?.angle ? activeObject?.angle + 45 : 0 + 45

    activeObject.rotate(ang)
    rotationVal.value = ang

    canvas._objects.forEach((obj) => {
      if (obj.id === 'watermark-docspawn')
        return

      if (obj.id === activeObject.hash && obj.stroke) {
        if (obj.top === 0)
          obj.set({ top: 0, left: activeObject.left })

        if (obj.left === 0) {
          if (obj.fieldType === 'fixed-image' || obj.fieldType === 'Dataset image' || obj.fieldType === 'Form image')
            obj.set({ top: activeObject.top + (Number.parseFloat(activeObject.height) * activeObject.scaleY), left: 0 })
          else
            obj.set({ top: activeObject.top + (Number.parseFloat(activeObject.height) * activeObject.scaleY) - (1 * ((Number.parseFloat(activeObject.height) * activeObject.scaleY) / 5)), left: 0 })
        }
      }
      if (obj.isAlertIcon && obj.id === activeObject.hash)
        obj.set({ top: activeObject.top, left: activeObject.left + (activeObject.width * activeObject.scaleX) })
    })

    canvas.renderAll()
  }
}
function rotateAntiClockwise() {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObject = canvas.getActiveObject()
    const ang = activeObject?.angle ? activeObject?.angle - 45 : -45
    rotationVal.value = ang

    // activeObject.set({ angle: ang })
    activeObject.rotate(ang)
    /** */
    canvas._objects.forEach((obj) => {
      if (obj.id === 'watermark-docspawn')
        return

      if (obj.id === activeObject.hash && obj.stroke) {
        if (obj.top === 0)
          obj.set({ top: 0, left: activeObject.left })

        if (obj.left === 0) {
          if (obj.fieldType === 'fixed-image' || obj.fieldType === 'Dataset image' || obj.fieldType === 'Form image')
            obj.set({ top: activeObject.top + (Number.parseFloat(activeObject.height) * activeObject.scaleY), left: 0 })
          else
            obj.set({ top: activeObject.top + (Number.parseFloat(activeObject.height) * activeObject.scaleY) - (1 * ((Number.parseFloat(activeObject.height) * activeObject.scaleY) / 5)), left: 0 })
        }
      }
      if (obj.isAlertIcon && obj.id === activeObject.hash)
        obj.set({ top: activeObject.top, left: activeObject.left + (activeObject.width * activeObject.scaleX) })
    })
    canvas.renderAll()
  }
}
</script>
