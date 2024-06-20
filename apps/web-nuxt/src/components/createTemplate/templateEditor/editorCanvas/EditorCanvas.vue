<template>
  <div class="h-full  w-max overflow-auto  ">
    <CanvasOptionsTopBar />

    <div v-if="!isCanvasLoaded " class="w-full h-full ">
      <div class="rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-800 h-full shadow-lg mb-4 p-8">
        <div class="flex mb-4">
          <div>
            <Skeleton width="10rem" class="mb-2" />
            <Skeleton width="5rem" class="mb-2" />
            <Skeleton height=".5rem" />
          </div>
        </div>
        <Skeleton width="100%" height="60%" />
        <div class="flex justify-between mt-4">
          <Skeleton width="4rem" height="2rem" />
          <Skeleton width="4rem" height="2rem" />
        </div>
      </div>
    </div>
    <div id="canvas-wrapper" ref="canvasWrapper" class="rounded-md min-h-full flex flex-col w-[900px]  relative  ">
      <canvas id="template-canvas" ref="templateCanvas" class=" flex-1 w-full min-h-full h-full  rounded-md  my-0 shadow  ">
      </canvas>
      <ThumbnailBar />
    </div>
  </div>
</template>

<script setup>
import * as pdfjs from 'pdfjs-dist/build/pdf'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'
import ThumbnailBar from './ThumbnailBar.vue'
import CanvasOptionsTopBar from './CanvasOptionsTopBar.vue'
import addEventsToCanvas from './addEventsToCanvas'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'

const isCanvasLoaded = ref(false)
const templateCanvas = ref()
const canvasWrapper = ref()
const activeElement = ref()

onMounted(() => {
  if (typeof window !== 'undefined')
    callCreateCanvas()
})

function callCreateCanvas() {
  // using this function to resolve error- canvas wrapper is loading later than createcanvas function
  const parentWidth = document?.getElementById('template-canvas')?.offsetWidth
  if (parentWidth && parentWidth > 0)
    createCanvas()
    // setTimeout(() => isCanvasLoaded.value = true, 1000)

  else setTimeout(() => callCreateCanvas(), 1000)
}

async function createCanvas() {
  const { fabric } = await import('fabric')

  const canvasWrapperWidth = canvasWrapper.value?.clientWidth > 0 ? canvasWrapper.value?.clientWidth : 900

  templateEditorStore.fabric = fabric
  // const canvas = new fabric.Canvas(templateCanvas.value, { isDrawing: true, width: canvasWrapperWidth, fill: '#000', selection: false,
  // })
  const canvas = await canvasService.createCanvas(templateCanvas.value, {
    isDrawing: true,
    width: canvasWrapperWidth,
    fill: '#000',
    selection: false,
  })

  // templateEditorStore.canvas = canvas
  const response = await fetch(templateEditorStore.templateBackgroundUrl)
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
        },
        {
        // Set the background image to cover the canvas without cropping
          scaleX: canvasWidth / img.width,
          scaleY: canvasHeight / img.height,
        },
      )
    }
  })

  addEventsToCanvas()
  showThumbnail()

  if (canvas) {
    canvas.on('mouse:down', () => {
      const objs = canvas._objects
      objs.forEach((obj) => {
        if (obj.id === 'watermark-docspawn')

          canvas.bringToFront(obj)
      })

      // get active object
      const activeObject = canvas?.getActiveObject()

      // templateEditorStore.activeDisplayGuide = !!activeObject.displayGuide
      if (activeObject && activeObject?.id !== 'watermark-docspawn') {
        templateEditorStore.anyObjectSelected = true
        templateEditorStore.activeDisplayGuide = activeObject.displayGuide
        templateEditorStore.ShowAddedFieldsinTemplateFields = true
        activeElement.value = activeObject

        if (activeObject.text && activeObject.id !== 'Lorem ipsum') {
          activeTextStyles.fill = activeObject.fill ? activeObject.fill : '#000000'
          activeTextStyles.fontFamily = activeObject.fontFamily ? activeObject.fontFamily : 'Arial'
          activeTextStyles.fontSize = activeObject.fontSize ? activeObject.fontSize : 32
          activeTextStyles.underline = activeObject.underline ? activeObject.underline : false
          activeTextStyles.textAlign = activeObject.textAlign ? activeObject.textAlign : 'center'
          activeTextStyles.fontStyle = activeObject.fontStyle ? activeObject.fontStyle : 'normal'
          activeTextStyles.fontWeight = activeObject.fontWeight ? activeObject.fontWeight : 300
          activeTextStyles.charSpacing = activeObject.charSpacing ? activeObject?.charSpacing : 0
        }

        templateEditorStore.addedFields.forEach((f) => {
          if (f.name === activeObject.id || f.name === activeObject.text)
            templateEditorStore.selectedAddedField = f
        })
      }
      else {
        activeElement.value = {}
        templateEditorStore.anyObjectSelected = false
        templateEditorStore.activeDisplayGuide = false
      }
    })
  }
}
async function showThumbnail() {
  const { fabric } = await import('fabric')

  templateEditorStore.totalPagesArray.forEach(async (i) => {
    const canvasWrapperWidth = 60
    const canvas = new fabric.Canvas(`template-thumbnail-${i}`, { isDrawing: true, width: canvasWrapperWidth, fill: '#000' })
    const response = await fetch(templateEditorStore.templateBackgroundUrl)
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

watch(activeTextStyles, () => {
  addEventsToCanvas()

  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObject = canvas?.getActiveObject()

    if (activeObject && activeObject?.id !== 'Lorem ipsum') {
      activeObject.set({
        ...activeObject.styles,
        fill: activeTextStyles.fill[0] === '#' ? activeTextStyles.fill : `#${activeTextStyles.fill}`,
        fontFamily: activeTextStyles.fontFamily,
        fontSize: activeTextStyles.fontSize,
        underline: activeTextStyles.underline,
        textAlign: activeTextStyles.textAlign,
        fontStyle: activeTextStyles.fontStyle,
        fontWeight: activeTextStyles.fontWeight,
        charSpacing: activeTextStyles.charSpacing,
      })
      canvas.renderAll()
    }
  }
})

watch(() => templateEditorStore.fieldToAdd, () => {
  // everytime selected added fields change, canvas event should be rewritten becaiuse of slectadeddfields updated value
  addEventsToCanvas()
})
</script>
