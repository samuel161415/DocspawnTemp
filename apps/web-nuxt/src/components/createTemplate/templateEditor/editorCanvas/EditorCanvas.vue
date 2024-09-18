<template>
  <div ref="parentContainer" class="h-full  w-[920px] overflow-auto  " :style="{ width: `${computedCanvasWidth + 20}px` }">
    <CanvasOptionsTopBar
      :show-expert-editor="showExpertEditor" @update-scale="updateScale" @toggle-expert-editor="() => {
        showExpertEditor = !showExpertEditor;
        console.log('toggling expert editor')
      }"
    />
    <div v-show="showExpertEditor">
      <TipTapToolbar />
    </div>

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
    <!-- <Button @click="addHtmlContainer">
      Add html container
    </Button> -->
    <div id="canvas-wrapper" ref="canvasWrapper" :style="canvasWrapperStyle" class="rounded-md min-h-full flex  flex-col   relative   ">
      <!-- <div v-show="showExpertEditor" ref="editorContainer" class="w-max h-max">
        <RichTextEditor
          v-if="canvasWrapperHeight > 100"
          :editor-height="canvasWrapperHeight" :editor-width="computedCanvasWidth"
        />
      </div> -->
      <!-- Dynamically inserted container -->
      <!-- <div v-if="showExpertEditor" ref="editorContainer" class="editor-container">
        <HtmlContainer />
      </div> -->
      <!-- Loop through all editor instances and display them -->
      <div
        v-for="(editorContainer) in templateEditorStore.editorContainers"
        :key="editorContainer.id"
        :ref="setEditorContainerRef(editorContainer.id)"
        :style="{ ...editorContainer.style,
                  zIndex: editorContainer?.pageNo === templateEditorStore?.activePageForCanvas ? '10' : '-1',
        // top: `${extractNumber(editorContainer?.style?.top) * templateEditorStore?.canvasScaleFactors?.y}px`,
        // left: `${extractNumber(editorContainer?.style?.left) * templateEditorStore?.canvasScaleFactors?.x}px`,
        // transformOrigin: 'top left',
        // transform: `scale(${Number.parseFloat(templateEditorStore?.canvasScaleFactors?.x)?.toFixed(1)},${Number.parseFloat(templateEditorStore?.canvasScaleFactors?.y)?.toFixed(1)})`,

        }"
        class="editor-container"
      >
        <!-- <h1>{{ editorContainer?.style?.width }}</h1>
        <h1>{{ editorContainer?.style?.height }}</h1> -->
        <HtmlContainer :editor-id="editorContainer.id" />
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
import { v4 as uuidv4 } from 'uuid'
import RichTextEditor from './RichTextEditor.vue'
import ThumbnailBar from './ThumbnailBar.vue'
import CanvasOptionsTopBar from './CanvasOptionsTopBar.vue'
import addEventsToCanvas from './addEventsToCanvas'
import TipTapToolbar from './TipTapToolbar.vue'
import HtmlContainer from './HtmlContainer.vue'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'
import { templateGeneralInformation } from '~/composables/useTemplateCreationData'
import { useAuth } from '@/composables/useAuth'
import { useScreenWidth } from '@/composables/useScreenWidth'

// Array to keep track of all editor containers and their styles

const router = useRouter()
const { screenWidth } = useScreenWidth()

const { user } = useAuth()
const runtimeConfig = useRuntimeConfig()

const isCanvasLoaded = ref(false)
const templateCanvas = ref()
const canvasWrapper = ref(null)
const activeElement = ref()
const parentContainer = ref()

const showExpertEditor = ref(true)

const scale = ref(1)
// function updateScale(value) {
//   scale.value = value
// }
function updateScale(value) {
  scale.value = value
  updateScrollPosition()
}
function extractNumber(value) {
  if (typeof value === 'string') {
    // If the value is a string, remove any non-digit characters (like 'px') and convert it to a number
    return Number.parseFloat(value.replace(/[^\d.-]/g, ''))
  }
  // If the value is already a number, just return it
  return Number(value)
}
onMounted(() => {
  updateScrollPosition()
  watch(scale, updateScrollPosition)

  // console.log('templateGeneralInformation.backgroundFileUrl', templateGeneralInformation?.backgroundFileUrl)
}) // Import UUID generator

// Function to assign a ref to each editor container based on UUID
function setEditorContainerRef(id) {
  return (el) => {
    if (el)
      templateEditorStore.editorContainerRefs[id] = el
  }
}

/** */

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
  // if (!templateEditorStore?.templateToEdit?.editor_fields_data)
  //   return
  // const { editorContainers, editorContainersRefs, fabricObjectRefs } = templateEditorStore?.templateToEdit?.editor_fields_data
  // if (editorContainers && editorContainersRefs && fabricObjectRefs) {
  //   // docGenerationData.editorContainerRefs = editorContainersRefs
  //   templateEditorStore.editorContainers = editorContainers?.map((e) => {
  //     return { ...e, style: { ...e?.style, top: `${extractNumber(e?.style?.top) * templateEditorStore?.canvasScaleFactors?.y}px`, left: `${extractNumber(e?.style?.left) * templateEditorStore?.canvasScaleFactors?.x}px` } }
  //     // return { ...e, style: { ...e?.style, top: `${extractNumber(e?.style?.top)}px`, left: `${extractNumber(e?.style?.left)}px` } }
  //   })
  //   // docGenerationData.fabricObjectRefs = fabricObjectRefs
  // }
})

// watch(() => templateEditorStore?.canvasScaleFactors, (val) => {
//   if (!templateEditorStore?.canvasScaleFactors?.y)
//     return
//   const { editorContainers, editorContainersRefs, fabricObjectRefs } = templateEditorStore?.templateToEdit?.editor_fields_data
//   if (editorContainers && editorContainersRefs && fabricObjectRefs) {
//     // docGenerationData.editorContainerRefs = editorContainersRefs
//     templateEditorStore.editorContainers = editorContainers?.map((e) => {
//     // return { ...e, style: { ...e?.style, top: `${extractNumber(e?.style?.top)}px`, left: `${extractNumber(e?.style?.left)}px` } }
//       return { ...e, style: { ...e?.style, top: `${extractNumber(e?.style?.top) * templateEditorStore?.canvasScaleFactors?.y}px`, left: `${extractNumber(e?.style?.left) * templateEditorStore?.canvasScaleFactors?.x}px` } }
//     })
//     // docGenerationData.fabricObjectRefs = fabricObjectRefs
//   }
// })

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
    /** */
      // setTimeout(() => {
      //   if (!templateEditorStore?.templateToEdit?.editor_fields_data)
      //     return
      //   const { editorContainers, editorContainersRefs, fabricObjectRefs } = templateEditorStore?.templateToEdit?.editor_fields_data
      //   if (editorContainers && editorContainersRefs && fabricObjectRefs) {
      //     /** * test area: try to add left and top of editor containers by rectangle left and top */
      //     const canvasHtmlObjects = canvas.getObjects()?.filter(f => templateEditorStore?.editorContainers?.filter(s => f?.id === s?.id)[0])
      //     console.log('canvas html objects', canvasHtmlObjects)
      //     /** */
      //     templateEditorStore.editorContainers = editorContainers?.map((e) => {
      //       const rectTop = canvasHtmlObjects?.filter(ob => ob?.id === e?.id)[0]?.top
      //       const rectLeft = canvasHtmlObjects?.filter(ob => ob?.id === e?.id)[0]?.left
      //       console.log('rect top', rectTop)
      //       console.log('rect eft', rectLeft)
      //       console.log('templateEditorStore.editorContainerRefs[e?.id]', templateEditorStore.editorContainerRefs[e?.id])
      //       // const editorContainer = templateEditorStore.editorContainerRefs[e?.id]
      //       // if (editorContainer) {
      //       //   editorContainer.style.left = `${rectLeft}px`
      //       //   editorContainer.style.top = `${rectTop}px`
      //       // }
      //       return { ...e, style: { ...e.style, transformOrigin: 'top left', transform: `scale(${Number.parseFloat(templateEditorStore?.canvasScaleFactors?.x)?.toFixed(1)},${Number.parseFloat(templateEditorStore?.canvasScaleFactors?.y)?.toFixed(1)})`, width: `${Number.parseInt(e.style.width)}px`, height: `${Number.parseInt(e.style.height)}px`, top: `${rectTop}px`, left: `${rectLeft}px` } }
      //     })
      //     // templateEditorStore.editorContainersRefs = editorContainersRefs
      //     templateEditorStore.fabricObjectRefs = fabricObjectRefs
      //     // editor container ref will be assigned at runtime but fabric ref, we have to re assign to recreate canvas objects
      //     let objectsIop = {}

      //     canvas.getObjects()?.forEach((f) => {
      //       if (templateEditorStore.fabricObjectRefs[f?.id]) {
      //         objectsIop = { ...objectsIop, [f?.id]: f }
      //         if (f?.fieldType === 'Html Container') {
      //           const editorContainer = editorContainers?.filter(s => f?.id === s?.id)[0]

      //           console.log(' editorContainer.style.width>>>>', editorContainer.style.width)
      //           f.set({
      //             width:
      //             // Number.parseFloat(
      //             editorContainer.style.width, // .replace('px', '')) + 5

      //             height:
      //             // Number.parseFloat(
      //             editorContainer.style.height
      //             // .replace('px', '')) + 5
      //             ,
      //           })
      //           /** ********** set moving event on fabric */
      //           f.on('moving', () => {
      //             const editorContainer = templateEditorStore.editorContainerRefs[f?.id]
      //             if (editorContainer) {
      //               editorContainer.style.left = `${f.left}px`
      //               editorContainer.style.top = `${f.top}px`
      //               templateEditorStore.editorContainers = templateEditorStore.editorContainers?.map((c) => {
      //                 if (c?.id === f?.id)
      //                   return { ...c, style: { ...c?.style, left: `${f.left}px`, top: `${f.top}px` } }
      //                 else
      //                   return c
      //               })
      //             }
      //           })
      //           /** */
      //           canvas.renderAll() // Re-render the canvas to reflect changes
      //         }
      //       }
      //     })

      //     templateEditorStore.fabricObjectRefs = objectsIop

      //     // console.log('fabric object at resizing>>>', fabricObj)
      //     nextTick(() => {
      //       templateEditorStore?.editorContainers?.forEach((f) => {
      //         const id = f?.id
      //         // Add a resize listener for the editor container
      //         const editorContainer = templateEditorStore.editorContainerRefs[id]
      //         if (editorContainer) {
      //           // Add a resize event listener
      //           const resizeObserver = new ResizeObserver((entries) => {
      //             for (const entry of entries) {
      //               // console.log('entry', entry)
      //               const newWidth = entry.contentRect.width
      //               const newHeight = entry.contentRect.height
      //               /** */
      //               const sample = templateEditorStore.editorContainers
      //               templateEditorStore.editorContainers = sample?.map((s) => {
      //                 if (s?.id === id)
      //                 // return { ...s, style: { ...s?.style, width: `${entry.contentRect.width}px`, height: `${entry.contentRect.height}px` } }
      //                   return { ...s, style: { ...s?.style, width: entry.contentRect.width, height: entry.contentRect.height } }

      //                 else return s
      //               })

      //               /** */

      //               // Update the corresponding Fabric.js object dimensions

      //               const fabricObj = templateEditorStore.fabricObjectRefs[id]
      //               console.log('fabric object at resizing>>>', fabricObj)
      //               if (fabricObj) {
      //                 fabricObj.set({
      //                   width: newWidth + 5,
      //                   height: newHeight + 5,
      //                 })

      //                 canvas.renderAll() // Re-render the canvas to reflect changes
      //               }
      //             }
      //           })

      //           // Observe the editor container for size changes
      //           resizeObserver.observe(editorContainer)
      //         }
      //       })
      //     })
      //   }
      // }, 5000)

      /** */
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
watch(() => templateEditorStore?.editorContainers, (val) => {
  const canvas = canvasService?.getCanvas()
})
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

<style scoped>
.editor-container {
  position: absolute;
  z-index: 10; /* Ensure the editor is above the canvas */
}
</style>
