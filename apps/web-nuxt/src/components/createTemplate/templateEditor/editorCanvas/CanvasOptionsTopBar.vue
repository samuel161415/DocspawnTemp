<template>
  <div class="h-[62px] flex items-center justify-between px-3 z-10 mb-6 rounded-md bg-primary-50 sticky top-0 left-0">
    <div class="flex justify-content-center gap-6 ml-8">
      <div v-tooltip.top="$t('Cp_templateEditor_topbar.advanced_pointer')">
        <div v-if="!templateEditorStore.activeAdvancedPointer" class="cursor-pointer text-surface-600" @click="templateEditorStore.activeAdvancedPointer = true">
          <font-awesome-icon icon="fa-thin fa-arrow-pointer" size="xl" />
        </div>
        <div v-else class="cursor-pointer text-primary-500" @click="templateEditorStore.activeAdvancedPointer = false">
          <font-awesome-icon icon="fa-solid fa-arrow-pointer" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 1;" />
        </div>
      </div>
      <div v-tooltip.top="templateEditorStore.activeDisplayGuideForAll ? $t('Cp_templateEditor_topbar.remove_all_guides') : $t('Cp_templateEditor_topbar.display_all_guides')">
        <div v-if="!templateEditorStore.activeDisplayGuideForAll" class="cursor-pointer text-surface-600" @click="templateEditorStore.activeDisplayGuideForAll = true;showMargins()">
          <font-awesome-icon icon="fa-thin fa-ruler-combined" size="xl" />
        </div>
        <div v-else class="cursor-pointer text-primary-500" @click="templateEditorStore.activeDisplayGuideForAll = false;removeMargins()">
          <font-awesome-icon icon="fa-solid fa-ruler-combined" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 1;" />
        </div>
      </div>
    </div>
    <!-- <div class=" flex items-center">
      <Slider v-model="scale" :step="0.01" :min="0.7" :max="1.7" class="w-56" />
    </div> -->
    <div class="flex items-center gap-2">
      <button class="p-button p-component p-button-rounded p-button-icon-only text-surface-600" @click="decreaseScale">
        <font-awesome-icon icon="fa-light fa-magnifying-glass-minus" size="xl" />
      </button>
      <Slider v-model="scale" :min="0.5" :max="2" :step="0.1" class="mx-2 flex-1 border" @change="updateScale" />
      <button class="p-button p-component p-button-rounded p-button-icon-only text-surface-600" @click="increaseScale">
        <font-awesome-icon icon="fa-light fa-magnifying-glass-plus" size="xl" />
      </button>
    </div>

    <div class="flex flex-row-reverse">
      <Button
        v-if="!templateEditorStore.showPreview" v-tooltip.top="$t('Cp_templateEditor_topbar.show_preview')" text outlined class="w-max px-3 text-primary-500" @click="templateEditorStore.showPreview = true"
      >
        <font-awesome-icon icon="fa-solid fa-eye" size="xl" />
      </Button>
      <Button
        v-else v-tooltip.top="$t('Cp_templateEditor_topbar.hide_preview')" text outlined class="w-max px-3 text-primary-500" @click="templateEditorStore.showPreview = false"
      >
        <font-awesome-icon icon="fa-solid fa-eye-slash" size="xl" />
      </Button>

      <div v-if="templateEditorStore.showPreview" class="flex items-center">
        <Button text icon="pi pi-chevron-left text-primary-500" @click="changePreviewNo('prev')" />
        <p class="font-poppins text-black">
          {{ currentPreviewNo }}/{{ templateEditorStore?.datasetData?.allEntries?.length }}
        </p>
        <Button text icon="pi pi-chevron-right text-primary-500" @click="changePreviewNo('next')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'

const emit = defineEmits(['updateScale'])
const scale = ref(1)
function decreaseScale() {
  if (scale.value > 0.5)
    scale.value -= 0.1
}

function increaseScale() {
  if (scale.value < 2)
    scale.value += 0.1
}

watch(scale, (val) => {
  emit('updateScale', val)
})

const currentPreviewNo = ref(1)

function changePreviewNo(dir) {
  if (dir === 'prev') {
    if (currentPreviewNo.value > 1)
      currentPreviewNo.value = currentPreviewNo.value - 1
  }
  if (dir === 'next') {
    if (currentPreviewNo.value < templateEditorStore?.datasetData?.allEntries?.length)
      currentPreviewNo.value = currentPreviewNo.value + 1
  }
}

function showMargins() {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const objs = canvas._objects

    objs.forEach((obj) => {
      if (obj.pageNo === templateEditorStore.activePageForCanvas && !obj.stroke && !obj.isAlertIcon && obj?.id !== 'watermark-docspawn') {
        obj.displayGuide = true
        canvas.add(new fabric.Line([100, 1000, 100, 5000], {
          left: obj.left,
          top: 0,
          stroke: '#3978eb',
          id: obj.hash,
          selectable: false,
          fieldType: obj.fieldType,
          pageNo: templateEditorStore.activePageForCanvas,
        }))

        if (obj.fieldType === 'Dataset image' || obj.fieldType === 'fixed-image' || obj.fieldType === 'Form image' || obj.fieldType === 'Form multiline') {
          canvas.add(new fabric.Line([1000, 100, 2000, 100], {
            left: 0,
            top: obj.top + (Number.parseFloat(obj.height) * obj.scaleY),
            stroke: '#3978eb',
            id: obj.hash,
            selectable: false,
            fieldType: obj.fieldType,
            pageNo: templateEditorStore.activePageForCanvas,
          }))
        }
        else {
          canvas.add(new fabric.Line([1000, 100, 2000, 100], {
            left: 0,
            top: obj.top + (Number.parseFloat(obj.height) * obj.scaleY) - (1 * ((Number.parseFloat(obj.height) * obj.scaleY) / 5)),
            stroke: '#3978eb',
            id: obj.hash,
            selectable: false,
            fieldType: obj.fieldType,
            pageNo: templateEditorStore.activePageForCanvas,
          }))
        }
      }
    })
    canvas.renderAll()
  }
}
function removeMargins() {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const objs = canvas._objects
    canvas._objects = objs.filter((obj) => {
      if (obj.displayGuide)
        obj.displayGuide = false
      if (obj.stroke === '#3978eb'
        && obj.pageNo === templateEditorStore.activePageForCanvas)
        return false
      else
        return true
    })
    canvas.renderAll()
  }
}

watch(() => templateEditorStore.activeDisplayGuide, () => {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObject = canvas.getActiveObject()
    if (activeObject && activeObject?.id !== 'watermark-docspawn') {
      if (templateEditorStore.activeDisplayGuide) {
        activeObject.set({ displayGuide: true })
        canvas.renderAll()
      }

      else {
        activeObject.set({ displayGuide: false })
        canvas.renderAll()
      }
    }
  }
})

watch(templateEditorStore.activeAdvancedPointer, () => {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    canvas._objects.forEach((obj) => {
      obj.on('mouseover', (e) => {
        if (!templateEditorStore.activeAdvancedPointer)
          return
        canvas.add(new fabric.Line([100, 1000, 100, 5000], {
          left: e.target.left,
          top: 0,
          stroke: '#3978eb',
          id: e.target.hash,
          fieldType: obj.fieldType,
          selectable: false,
        }))
        if (obj.fieldType === 'Dataset image' || obj.fieldType === 'fixed-image' || obj.fieldType === 'Form image' || obj.fieldType === 'Form multiline') {
          canvas.add(new fabric.Line([1000, 100, 2000, 100], {
            left: 0,
            top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY),
            stroke: '#3978eb',
            id: e.target.hash,
            fieldType: obj.fieldType,
            selectable: false,
          }))
        }
        else {
          canvas.add(new fabric.Line([1000, 100, 2000, 100], {
            left: 0,
            top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)),
            stroke: '#3978eb',
            id: e.target.hash,
            fieldType: obj.fieldType,
            selectable: false,
          }))
        }
      })
      obj.on('mouseout', (e) => {
        if (!templateEditorStore.activeAdvancedPointer)
          return

        const objs = canvas._objects
        canvas._objects = objs.filter((obj) => {
          if (obj.stroke === '#3978eb' && obj.id === e.target.hash)
            return false
          else
            return true
        })

        canvas.renderAll()
      })
    })

    canvas.renderAll()
  }
})

watch(() => templateEditorStore.activePageForCanvas, () => {
  templateEditorStore.activeDisplayGuideForAll = false
  templateEditorStore.activeDisplayGuide = false
})
watch(currentPreviewNo, (newVal) => {
  if (templateEditorStore.showPreview) {
    const canvas = canvasService.getCanvas()
    if (canvas) {
      const data = templateEditorStore?.datasetData?.allEntries
      const objs = canvas._objects

      canvas.objects = objs.map((obj) => {
        if (obj.stroke || obj.isAlertIcon)
          return obj
        if (!obj._element && obj.id !== 'Lorem ipsum') {
          let correspondingData = data[newVal - 1][obj?.id]
          correspondingData = correspondingData?.text ? correspondingData?.text : correspondingData

          if (correspondingData)
            obj.set({ text: correspondingData?.toString() })
        }
        else if (obj._element && obj.id !== 'Lorem ipsum') {
          let correspondingData = data[newVal - 1][obj?.id]
          correspondingData = correspondingData?.text ? correspondingData?.text : correspondingData

          const correspondingField = templateEditorStore?.addedFields?.filter(a => a?.hash === obj?.hash)[0]
          if (correspondingData) {
            const originalHeight = obj.height * obj.scaleY
            const originalWidth = obj.width * obj.scaleX

            obj.setSrc(correspondingData, () => {
              correspondingField?.imageProportionMethod && correspondingField?.imageProportionMethod === 'fitToWidth'
                ? obj.scaleToWidth(originalWidth)
                : obj.scaleToHeight(originalHeight)
              // obj.scaleToWidth(originalWidth)
              canvas.renderAll()
            })
          }
        }
        return obj
      })
      canvas.renderAll()
    }
  }
})
watch(() => templateEditorStore.showPreview, (newVal) => {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    if (newVal) {
      const data = templateEditorStore?.datasetData?.allEntries
      const objs = canvas._objects

      canvas.objects = objs.map((obj) => {
        if (obj?.id === 'watermark-docspawn')
          return obj
        if (obj.stroke || obj.isAlertIcon)
          return obj
        if (obj?.fieldType === 'Static image')
          return obj

        if (!obj._element && obj?.id !== 'Lorem ipsum') {
          let correspondingData = data[currentPreviewNo.value - 1][obj?.id]
          correspondingData = correspondingData?.text ? correspondingData?.text : correspondingData
          if (correspondingData)
            obj.set({ text: correspondingData?.toString() })
        }
        else if (obj?.id !== 'Lorem ipsum') {
          let correspondingData = data[currentPreviewNo.value - 1][obj?.id]
          correspondingData = correspondingData?.text ? correspondingData?.text : correspondingData
          const correspondingField = templateEditorStore?.addedFields?.filter(a => a?.hash === obj?.hash)[0]
          if (correspondingData) {
            const originalHeight = obj.height * obj.scaleY
            const originalWidth = obj.width * obj.scaleX

            obj.setSrc(correspondingData, () => {
              if (correspondingField?.imageProportionMethod && correspondingField?.imageProportionMethod === 'fitToWidth')
                obj.scaleToWidth(originalWidth)

              else
                obj.scaleToHeight(originalHeight)

              // console.log('obj after scaling', obj)
              canvas.renderAll()
            })
          }
        }

        return obj
      })
      canvas.renderAll()
    }
    else {
      const objs = canvas._objects
      canvas.objects = objs.map((obj) => {
        if (obj?.id === 'watermark-docspawn')
          return obj
        if (obj.stroke || obj.isAlertIcon)
          return obj
        if (!obj._element && obj.id !== 'Lorem ipsum') {
          obj.set({ text: obj?.id })
        }
        else if (obj._element && obj.id !== 'Lorem ipsum') {
          const correspondingData = 'https://placehold.co/300x200?text=Image'
          const originalHeight = obj.height * obj.scaleY
          const originalWidth = obj.width * obj.scaleX

          const correspondingField = templateEditorStore?.addedFields?.filter(a => a?.hash === obj?.hash)[0]
          obj.setSrc(`https://placehold.co/${Number.parseInt(obj?.height)}x${Number.parseInt(obj?.width)}?text=Image`, () => {
            // if (correspondingField?.imageProportionMethod && correspondingField?.imageProportionMethod === 'fitToWidth') {
            //   console.log('scalin got width', originalWidth)
            //   obj.scaleToWidth(originalWidth)
            // }
            // else {
            // obj.set({ height: originalHeight, width: originalWidth, scaleX: 1, scaleY: 1 })

            // obj.scaleToWidth(originalWidth)
            // obj.scaleToHeight(originalHeight)
            // }
            // obj.set({ width: obj.width, height: obj.height, scaleX: obj.scaleX, scaleY: obj.scaleY })
            console.log('obj after rc setting', obj)
            canvas.renderAll()
          })
        }
        return obj
      })
      canvas.renderAll()
      currentPreviewNo.value = 1
    }
  }
})
</script>
