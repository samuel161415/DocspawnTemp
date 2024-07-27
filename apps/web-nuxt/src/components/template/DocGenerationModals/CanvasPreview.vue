<template>
  <div class="h-full  w-max overflow-auto w-6/12 ">
    <div class="mb-2 h-[58px] w-200  flex items-center justify-between px-3  mb-0 rounded-md bg-primary-50 sticky top-0 left-0 ">
      <!-- <div class=" flex items-center">
        <Slider v-model="scale" :step="0.01" :min="0.5" :max="1" class="w-56" @input="updateScale" />
        <input v-model="scale" type="range" min="0.5" max="1" step="0.01" class="slider" />
      </div> -->
      <p class="ml-[50%] translate-x-[-50%] font-poppins font-semibold text-surface-600  text-[18px] text-[rgb(75,85,99)] leading-6">
        {{ $t('Cp_canvasPreview.live_preview') }}
      </p>

      <div class="flex items-center">
        <Button text icon="pi pi-chevron-left text-primary-500 " @click="changePreviewNo('prev')" />
        <p class="font-poppins text-black">
          {{ currentPreviewNo }}/{{ selectedData?.length }}
        </p>
        <Button text icon="pi pi-chevron-right text-primary-500" @click="changePreviewNo('next')" />
      </div>
    </div>
    <div class="h-full  w-max overflow-auto  h-[70vh] overflow-y-auto">
      <div v-show="!isCanvasLoaded " class="w-full h-full ">
        <div class="rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-800 h-full shadow-lg mb-4 p-8 ">
          <div class="flex mb-4">
            <div>
              <Skeleton width="10rem" class="mb-2" />
              <Skeleton width="5rem" class="mb-2" />
              <Skeleton height=".5rem" />
            </div>
          </div>
          <Skeleton width="40vw" height="50vh" />
          <Skeleton width="100%" height="60%" />
          <div class="flex justify-between mt-4">
            <Skeleton width="4rem" height="2rem" />
            <Skeleton width="4rem" height="2rem" />
          </div>
        </div>
      </div>
      <div id="canvas-wrapper" ref="canvasWrapper" class="rounded-md min-h-full flex flex-col w-[900px]  relative   border ">
        <canvas id="template-canvas" ref="templateCanvas" class=" flex-1 w-full min-h-full h-full  rounded-md  my-0 shadow  data-to-doc-canvas" :style="canvasStyle">
        </canvas>
        <ThumbnailBar
          class="pointer-auto" :is-generating-preview="true" :template="template"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'

/** ****canvas logic */
import * as pdfjs from 'pdfjs-dist/build/pdf'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'
import ThumbnailBar from '~/components/createTemplate/templateEditor/editorCanvas/ThumbnailBar'
import canvasService from '@/composables/useTemplateCanvas'

import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'
import { templateGeneralInformation } from '~/composables/useTemplateCreationData'

const props = defineProps({
  template: {
    type: Array,
    required: true,
    default: () => {},
  },

  selectedRows: {
    type: Array,
  },
})
const selectedData = ref([])

onMounted(() => {
  templateEditorStore.templateToGenerateDocs = props?.template
  selectedData.value = props?.selectedRows
  if (props?.template)
    callCreateCanvas()
})
watch(() => props?.selectedRows, (newVal) => {
  selectedData.value = newVal
})

const currentPreviewNo = ref(0)
watch(selectedData, (newVal) => {
  if (newVal?.length > 0)
    currentPreviewNo.value = 1
  else currentPreviewNo.value = 0
  renderOriginalData()
})
function changePreviewNo(dir) {
  if (dir === 'prev') {
    if (currentPreviewNo.value > 1)
      currentPreviewNo.value = currentPreviewNo.value - 1
  }
  if (dir === 'next') {
    if (currentPreviewNo.value < selectedData?.value?.length)
      currentPreviewNo.value = currentPreviewNo.value + 1
  }
}
watch(currentPreviewNo, () => {
  renderOriginalData()
})
function renderOriginalData() {
  const canvas = canvasService.getCanvas()
  if (selectedData.value?.length > 0) {
    if (canvas) {
      const data = selectedData.value
      const objs = canvas?.getObjects()

      canvas.objects = objs.map((obj) => {
        if (obj.stroke || obj.isAlertIcon)
          return obj
        if (!obj._element && obj.id !== 'Lorem ipsum') {
          let correspondingData = data[currentPreviewNo.value - 1][obj?.id]
          correspondingData = correspondingData?.text ? correspondingData?.text : correspondingData

          if (correspondingData)
            obj.set({ text: correspondingData?.toString() })
        }
        else if (obj._element && obj.id !== 'Lorem ipsum') {
          let correspondingData = data[currentPreviewNo.value - 1][obj?.id]
          correspondingData = correspondingData?.text ? correspondingData?.text : correspondingData

          const correspondingField = templateEditorStore?.templateToGenerateDocs?.added_fields?.filter(a => a?.hash === obj?.hash)[0]

          if (correspondingData) {
            const originalHeight = obj.height * obj.scaleY
            const originalWidth = obj.width * obj.scaleX

            obj.setSrc(correspondingData, () => {
              correspondingField?.imageProportionMethod && correspondingField?.imageProportionMethod === 'fitToWidth'
                ? obj.scaleToWidth(originalWidth)
                : obj.scaleToHeight(originalHeight)
              canvas.renderAll()
            })
          }
        }
        return obj
      })
      canvas.renderAll()
    }
  }
  else {
    if (canvas) {
      const objs = canvas?.getObjects()
      canvas._objects = objs.map((obj) => {
        if (obj?.id === 'watermark-docspawn')
          return obj
        if (obj.stroke || obj.isAlertIcon)
          return obj
        if (!obj._element && obj.id !== 'Lorem ipsum') {
          obj.set({ text: obj?.id })
        }
        else if (obj._element && obj.id !== 'Lorem ipsum') {
          const correspondingData = 'https://placehold.co/300x200?text=Image'
          const correspondingField = templateEditorStore?.templateToGenerateDocs?.added_fields?.filter(a => a?.hash === obj?.hash)[0]

          const originalHeight = obj.height * obj.scaleY
          const originalWidth = obj.width * obj.scaleX

          obj.setSrc(correspondingData, () => {
            correspondingField?.imageProportionMethod && correspondingField?.imageProportionMethod === 'fitToWidth'
              ? obj.scaleToWidth(originalWidth)
              : obj.scaleToHeight(originalHeight)
            canvas.renderAll()
          })
        }
        return obj
      })
      canvas.renderAll()
    }

    currentPreviewNo.value = 0
  }
}
const canvasWrapper = ref()
const templateCanvas = ref()
const isCanvasLoaded = ref(false)

function callCreateCanvas() {
  // using this function to resolve error- canvas wrapper is loading later than createcanvas function
  // const parentWidth = document?.getElementById('template-canvas')?.offsetWidth
  //   if (parentWidth && parentWidth > 0)
  createCanvas()
  // setTimeout(() => isCanvasLoaded.value = true, 1000)

  //   else setTimeout(() => callCreateCanvas(), 1000)
}

async function createCanvas() {
  const { fabric } = await import('fabric')

  const canvasWrapperWidth = canvasWrapper.value?.clientWidth > 0 ? canvasWrapper.value?.clientWidth : 900

  const canvas = await canvasService.createCanvas(templateCanvas.value, {
    isDrawing: true,
    width: canvasWrapperWidth,
    fill: '#000',
    selection: false,
  })

  // templateEditorStore.canvas = canvas
  const response = await fetch(props?.template?.background_file_url ? props?.template?.background_file_url : templateEditorStore.templateBackgroundUrl)
  const pdfData = await response.arrayBuffer()

  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

  const pdf = await pdfjs.getDocument({ data: pdfData }).promise
  const page = await pdf.getPage(1)

  const pages = await pdf.numPages
  const array = []
  for (let i = 1; i <= pages; i++)
    array.push(i)
  templateEditorStore.totalPagesArray = array
  const viewport = page.getViewport({ scale: 2 })

  // Get the parent container's width
  const parentWidth = document?.getElementById('template-canvas')?.offsetWidth

  // Calculate the scale to fit the canvas within the parent width
  const scale = parentWidth / viewport.width

  const canvasWidth = viewport.width * scale
  const canvasHeight = viewport.height * scale

  // Set the canvas dimensions
  canvas.width = canvasWidth
  canvas.height = canvasHeight

  canvas.setDimensions({
    width: canvasWidth,
    height: canvasHeight,
  })

  const canvas2 = document.createElement('canvas')
  const context = canvas2.getContext('2d')
  canvas2.width = viewport.width
  canvas2.height = viewport.height

  const renderContext = {
    canvasContext: context,
    viewport: page.getViewport({ scale: 2 }),
  }

  await page.render(renderContext).promise
  const bg = canvas2.toDataURL('image/png')
  // setImageURL(bg)

  fabric.Image.fromURL(bg, (img) => {
    if (img) {
      canvas.setBackgroundImage(
        img,
        () => {
          canvas.renderAll()
          isCanvasLoaded.value = true
          showThumbnail()
        },
        {
          // Set the background image to cover the canvas without cropping
          scaleX: canvasWidth / img.width,
          scaleY: canvasHeight / img.height,
        },
      )
    }
  })
}
async function showThumbnail() {
  const { fabric } = await import('fabric')

  templateEditorStore.totalPagesArray.forEach(async (i) => {
    const canvasWrapperWidth = 60
    const canvas = new fabric.Canvas(`template-thumbnail-${i}`, { isDrawing: true, width: canvasWrapperWidth, fill: '#000' })
    const response = await fetch(props?.template?.background_file_url ? props?.template?.background_file_url : templateEditorStore.templateBackgroundUrl)
    const pdfData = await response.arrayBuffer()

    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

    const pdf = await pdfjs.getDocument({ data: pdfData }).promise
    const page = await pdf.getPage(i)

    const viewport = page.getViewport({ scale: 2 })

    // Get the parent container's width
    const parentWidth = 60

    // Calculate the scale to fit the canvas within the parent width
    const scale = parentWidth / viewport.width

    const canvasWidth = viewport.width * scale
    const canvasHeight = viewport.height * scale

    // Set the canvas dimensions
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    canvas.setDimensions({
      width: canvasWidth,
      height: canvasHeight,
    })

    const canvas2 = document.createElement('canvas')
    const context = canvas2.getContext('2d')
    canvas2.width = viewport.width
    canvas2.height = viewport.height

    const renderContext = {
      canvasContext: context,
      viewport: page.getViewport({ scale: 2 }),
    }

    await page.render(renderContext).promise
    const bg = canvas2.toDataURL('image/png')
    // setImageURL(bg)

    fabric.Image.fromURL(bg, (img) => {
      if (img) {
        canvas.setBackgroundImage(
          img,
          () => {
            canvas.renderAll()
          },
          {
            // Set the background image to cover the canvas without cropping
            scaleX: canvasWidth / img.width,
            scaleY: canvasHeight / img.height,
          },
        )
      }
    })
  })
}
const scale = ref(1)
function updateScale(value) {
  scale.value = value
}

// const canvasStyle = computed(() => ({
//   transform: `scale(${scale.value}) translateX(${getTranslateX(scale.value)}%) translateY(${getTranslateY(scale.value)}%)`,
// }))
const canvasStyle = computed(() => ({
  transform: `scale(${scale.value}) `,
}))

function getTranslateX(scale) {
  return -(90 - scale * 100)
}

function getTranslateY(scale) {
  return -(90 - scale * 100)
}
</script>

  <style>
  /* .data-to-doc-canvas{
       transform:scale(0.8) translateX(-10%) translateY(-10%);

  } */
  .data-to-doc-canvas  {
  transition: transform 0.3s ease;
  pointer-events:none;
}

  .pointer-auto, .pointer-auto *{
    pointer-events:auto;
  }
  .slider {
  width: 300px;
}
  </style>
