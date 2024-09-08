<template>
  <div ref="parentContainer" class="h-full  w-[920px] overflow-auto  " :style="{ width: `${computedCanvasWidth + 20}px` }">
    <CanvasOptionsTopBar
      :show-expert-editor="showExpertEditor" @update-scale="updateScale" @toggle-expert-editor="() => {
        showExpertEditor = !showExpertEditor;
        console.log('toggling expert editor')
      }"
    />
    <TipTapToolbar />

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

    <div id="canvas-wrapper" ref="canvasWrapper" :style="canvasWrapperStyle" class="rounded-md min-h-full flex  flex-col   relative   ">
      <div v-show="showExpertEditor" class="w-max h-max">
        <RichTextEditor v-if="canvasWrapperHeight > 100" :editor-height="canvasWrapperHeight" :editor-width="computedCanvasWidth" />
      </div>

      <canvas id="template-canvas" ref="templateCanvas" class=" flex-1 w-full min-h-full h-full  rounded-md  my-0 shadow border ">
      </canvas>
    </div>

    <ThumbnailBar :style="thumbnailCoverStyle" />
  </div>
</template>

<script setup>
import * as pdfjs from 'pdfjs-dist/build/pdf'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'
import { useRouter } from 'vue-router'
import RichTextEditor from './RichTextEditor.vue'
import ThumbnailBar from './ThumbnailBar.vue'
import CanvasOptionsTopBar from './CanvasOptionsTopBar.vue'
import addEventsToCanvas from './addEventsToCanvas'
import TipTapToolbar from './TipTapToolbar.vue'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'
import { templateGeneralInformation } from '~/composables/useTemplateCreationData'
import { useAuth } from '@/composables/useAuth'
import { useScreenWidth } from '@/composables/useScreenWidth'

const router = useRouter()
const { screenWidth } = useScreenWidth()

const { user } = useAuth()
const runtimeConfig = useRuntimeConfig()

const isCanvasLoaded = ref(false)
const templateCanvas = ref()
const canvasWrapper = ref(null)
const activeElement = ref()
const parentContainer = ref()

const showExpertEditor = ref(false)
watch(showExpertEditor, (val) => {
  console.log('show expert editor', showExpertEditor.value)
})

const scale = ref(1)
// function updateScale(value) {
//   scale.value = value
// }
function updateScale(value) {
  scale.value = value
  updateScrollPosition()
}
onMounted(() => {
  updateScrollPosition()
  watch(scale, updateScrollPosition)
  console.log('templateGeneralInformation.backgroundFileUrl', templateGeneralInformation?.backgroundFileUrl)
})

const computedCanvasWidth = computed(() => {
  if (screenWidth.value > 1600)
    // return 900
    return (Number.parseInt(screenWidth.value / 100) - 9) * 100
  else
    return (Number.parseInt(screenWidth.value / 100) - 6) * 100
})
watch(screenWidth, (val) => {
  if (val < 990)
    router.push('/')
})
function updateScrollPosition() {
  if (parentContainer.value && canvasWrapper.value) {
    const parentWidth = parentContainer.value.clientWidth
    // const parentHeight = parentContainer.value.clientHeight
    const scaledWidth = canvasWrapper.value.clientWidth * scale.value
    // const scaledHeight = canvasWrapper.value.clientHeight * scale.value
    parentContainer.value.scrollLeft = (scaledWidth - parentWidth) / 2
    // parentContainer.value.scrollTop = (scaledHeight - parentHeight) / 2
  }
}

// const canvasStyle = computed(() => ({
//   transform: `scale(${scale.value}) `,
// }))
const canvasWrapperHeight = ref(1)

const canvasWrapperStyle = computed(() => ({
  overflow: 'auto',
  position: 'relative',
  width: '900px',
  height: `${canvasWrapperHeight.value}px`,
  minHeight: '100%',
  transform: `scale(${scale.value})`,
  // transformOrigin: 'center center',
  // transformOrigin: 'top center',
  // transformOrigin: 'center 0',
  transformOriginY: '0',
  // transformOriginX: '0',
  // width: '900px',
  width: `${computedCanvasWidth.value}px`,
  // marginLeft: `${scale.value < 1 ? 0 : ((900 * scale.value) - (900)) / 2}px`,
  marginLeft: `${scale.value < 1 ? 0 : ((computedCanvasWidth.value * scale.value) - (computedCanvasWidth.value)) / 2}px`,
  // // height: 'auto',

  height: `${canvasWrapperHeight.value}px`,
}))

const thumbnailCoverStyle = computed(() => ({
  marginTop: `${(canvasWrapperHeight.value * scale.value) - canvasWrapperHeight.value + 10}px`,
  position: 'sticky',
  top: '0',
  left: '0',
}))

onMounted(() => {
  if (templateEditorStore?.templateToEdit?.id) {
    templateEditorStore.watermarkImage = templateEditorStore?.templateToEdit?.template_options?.watermarkImage
    templateEditorStore.watermarkDisabled = templateEditorStore?.templateToEdit?.template_options?.watermarkDisabled

    if (templateEditorStore?.templateToEdit?.last_text_options) {
      templateEditorStore.lastScaledTextOptions = templateEditorStore?.templateToEdit?.last_text_options?.lastScaledTextOptions
      activeTextStyles.fill = templateEditorStore?.templateToEdit?.last_text_options?.activeTextStyles?.fill || '#000000'
      activeTextStyles.fontFamily = templateEditorStore?.templateToEdit?.last_text_options?.activeTextStyles?.fontFamily || 'Arial'
      activeTextStyles.fontSize = templateEditorStore?.templateToEdit?.last_text_options?.activeTextStyles?.fontSize || 32
      activeTextStyles.underline = templateEditorStore?.templateToEdit?.last_text_options?.activeTextStyles?.underline || false
      activeTextStyles.textAlign = templateEditorStore?.templateToEdit?.last_text_options?.activeTextStyles?.textAlign || 'center'
      activeTextStyles.fontStyle = templateEditorStore?.templateToEdit?.last_text_options?.activeTextStyles?.fontStyle || 'normal'
      activeTextStyles.fontWeight = templateEditorStore?.templateToEdit?.last_text_options?.activeTextStyles?.fontWeight || 300
      activeTextStyles.charSpacing = templateEditorStore?.templateToEdit?.last_text_options?.activeTextStyles?.charSpacing || 0
    }
  }
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

  const canvasWrapperWidth = canvasWrapper.value?.clientWidth > 0
    ? canvasWrapper.value?.clientWidth
    : computedCanvasWidth.value

  // 900

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
  const response = await fetch(templateGeneralInformation?.backgroundFileUrl ? templateGeneralInformation?.backgroundFileUrl : templateEditorStore.templateBackgroundUrl)
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
  // for zooming purpose
  canvasWrapperHeight.value = canvasHeight

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
          addEventsToCanvas(user, runtimeConfig)
          addWaterMarkToCanvas()
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

  // addEventsToCanvas()
  // showThumbnail()

  if (canvas) {
    [
      // 'mouse:over', 'mouse:down',
      'mouse:move',
    ].forEach((event) => {
      canvas.on(event, () => {
        if (canvas) {
          const watermarks = canvas.getObjects().filter(obj => obj?.id === 'watermark-docspawn')

          if (watermarks.length > 1) {
            // If more than one watermark exists, remove all but the first one
            for (let i = 1; i < watermarks.length; i++)
              canvas.remove(watermarks[i])

            canvas.renderAll() // Re-render the canvas after removing excess watermarks
          }
        }
      })
    })

    canvas.on('mouse:down', () => {
      const objs = canvas?.getObjects()
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
    if (templateEditorStore?.templateToEdit?.id) {
      canvas.getObjects()?.forEach((obj) => {
        if (obj.type === 'textbox') {
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

            canvas.add(new fabric.Line([1000, 100, 20000, 100], {
              left: 0, // event.absolutePointer.x,
              top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY),
              stroke: '#3978eb',
              id: e.target.hash,
              fieldType: obj.fieldType,
              selectable: false,
            }))
          })
        }
        if (obj.type === 'text') {
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
            canvas.add(new fabric.Line([1000, 100, 20000, 100], {
              left: 0, // event.absolutePointer.x,
              top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)),
              stroke: '#3978eb',
              id: e.target.hash,
              fieldType: obj.fieldType,
              selectable: false,
            }))
          })
        }
        if (obj.type === 'image') {
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
            canvas.add(new fabric.Line([1000, 100, 20000, 100], {
              left: 0, // event.absolutePointer.x,
              top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY),

              stroke: '#3978eb',
              id: e.target.hash,
              fieldType: obj.fieldType,
              selectable: false,
            }))
          })
        }
        obj.on('mouseout', (e) => {
          if (!templateEditorStore.activeAdvancedPointer)
            return

          const objs = canvas?.getObjects()
          canvas._objects = objs.filter((obj) => {
            if (obj?.stroke === '#3978eb' && obj?.id === e.target?.hash && !e.target?.displayGuide)
              return false
            else
              return true
          })

          canvas.renderAll()
        })
      })
      canvas.renderAll()
    }
  }
}
async function addWaterMarkToCanvas() {
  const canvas = canvasService?.getCanvas()
  if (templateEditorStore?.watermarkImage?.src) {
    // Check if a watermark already exists on the canvas
    const watermarks = canvas.getObjects().filter(obj => obj?.id === 'watermark-docspawn')

    if (watermarks.length > 1) {
      // If more than one watermark exists, remove all but the first one
      for (let i = 1; i < watermarks.length; i++)
        canvas.remove(watermarks[i])

      canvas.renderAll() // Re-render the canvas after removing excess watermarks
    }

    if (watermarks.length === 0) {
      // add logic to remove every object with id watermark-docspawn
      const watermarkScaling = (Number.parseInt(screenWidth.value / 100) - 5) * 10
      fabric.Image.fromURL(
        templateEditorStore?.watermarkImage?.src
        , (myImg) => {
          myImg.set({
            cornerStyle: 'circle',
            borderColor: '#00000066',
            cornerColor: '#119bd6',
            transparentCorners: false,
            // left: 0,
            // top: 0,
            // left: canvas.width - (myImg.width * (80 / myImg.width)) - 10,
            // top: canvas.height - (myImg.height * (80 / myImg.height)) - 10,
            // scaleX: 80 / myImg.width,
            // scaleY: 80 / myImg.height,
            left: canvas.width - (myImg.width * (watermarkScaling / myImg.width)) - 10,
            top: canvas.height - (myImg.height * (watermarkScaling / myImg.height)) - 10,
            scaleX: watermarkScaling / myImg.width,
            scaleY: watermarkScaling / myImg.height,
            id: 'watermark-docspawn',

            lockUniScaling: true,
            lockScalingX: true,
            lockScalingY: true,
            uniformScaling: false,

          })
          if (templateEditorStore.watermarkDisabled)
            myImg.set({ visible: false, opacity: 0 })

          myImg.setControlsVisibility({ tr: false, tl: false, br: false, bl: false, mt: false, mb: false, mr: false, ml: false, mtr: false })
          canvas.add(myImg)

          canvas.renderAll()
        },
      )
    }
  }
}
async function showThumbnail() {
  const { fabric } = await import('fabric')

  templateEditorStore.totalPagesArray.forEach(async (i) => {
    const canvasWrapperWidth = 60
    const canvas = new fabric.Canvas(`template-thumbnail-${i}`, { isDrawing: true, width: canvasWrapperWidth, fill: '#000' })
    const response = await fetch(templateGeneralInformation?.backgroundFileUrl ? templateGeneralInformation?.backgroundFileUrl : templateEditorStore.templateBackgroundUrl)
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
  addEventsToCanvas(user, runtimeConfig)

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
  addEventsToCanvas(user, runtimeConfig)
})
</script>
