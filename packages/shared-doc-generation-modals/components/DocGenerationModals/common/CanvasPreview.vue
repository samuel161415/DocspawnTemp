<template>
  <div class="h-full  w-max overflow-auto w-6/12 ">
    <div class="mb-2  w-200  flex items-center justify-between px-3  mb-0 rounded-md bg-primary-50 sticky top-0 left-0 " :style="{ height: '58px' }">
      <p class="ml-[50%] translate-x-[-50%] font-poppins font-semibold text-surface-600  text-[18px] text-[rgb(75,85,99)] leading-6 ">
        {{ $t('Cp_canvasPreview.live_preview') }}
      </p>

      <div v-if="props?.useCase === 'dataToDoc'" class="flex items-center">
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
          <div class="flex mb-4" :style="{ marginBottom: '12px' }">
            <div>
              <Skeleton width="10rem" class="mb-2" :style="{ marginBottom: '12px' }" />
              <Skeleton width="5rem" class="mb-2" :style="{ marginBottom: '12px' }" />
              <Skeleton height=".5rem" />
            </div>
          </div>
          <Skeleton width="40vw" height="50vh" />
          <Skeleton width="100%" height="60%" />
          <div class="flex justify-between mt-4" :style="{ marginTop: '12px' }">
            <Skeleton width="4rem" height="2rem" />
            <Skeleton width="4rem" height="2rem" />
          </div>
        </div>
      </div>
      <div id="canvas-wrapper" ref="canvasWrapper" class="rounded-md min-h-full flex flex-col w-[900px]  relative  ">
        <!-- <ExpertEditorPreview v-if="docGenerationData?.templateToGenerateDocs?.id && canvasWrapperHeight > 100" :template="docGenerationData?.templateToGenerateDocs" :editor-height="canvasWrapperHeight" :editor-width="900" /> -->
        <div
          v-for="(editorContainer) in docGenerationData?.editorContainers"
          :key="editorContainer.id"
          :ref="setEditorContainerRef(editorContainer.id)"
          :style="{ ...editorContainer.style,
                    resize: 'none',
                    zIndex: !docGenerationData?.activePageForCanvas ? '10' : editorContainer?.pageNo === docGenerationData?.activePageForCanvas ? '10' : '-1',
                    // top: `${extractNumber(editorContainer?.style?.top) * docGenerationData?.canvasScalingFactor?.y}px`,
                    // left: `${extractNumber(editorContainer?.style?.left) * docGenerationData?.canvasScalingFactor?.x}px`,
                    // transformOrigin: 'top left',
                    // transform: `scale(${Number.parseFloat(docGenerationData?.canvasScalingFactor?.x)?.toFixed(1)},${Number.parseFloat(docGenerationData?.canvasScalingFactor?.y)?.toFixed(1)})`,
          }"
          class="editor-container"
        >
          <!-- <h1>{{ editorContainer?.style?.width }}</h1>
        <h1>{{ editorContainer?.style?.height }}</h1> -->
          <HtmlContainer :editor-id="editorContainer.id" />
        </div>
        <canvas id="template-canvas" ref="templateCanvas" class=" flex-1 w-full min-h-full h-full  rounded-md  my-0 shadow border border-surface-300  data-to-doc-canvas" :style="canvasStyle">
        </canvas>
        <ThumbnailBar
          class="pointer-auto" :template="template"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'

import * as pdfjs from 'pdfjs-dist/build/pdf'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'
import ThumbnailBar from '../common/ThumbnailBar'
import canvasService from '../../../composables/useTemplateCanvas'
import { docGenerationData } from '../../../composables/useDocGenerationData'
import ExpertEditorPreview from './ExpertEditorPreview.vue'
import HtmlContainer from './HtmlContainer.vue'
import { formatDateForInput, formatTimeForInput, parseDateString } from '@/utils/dateFunctions'

const props = defineProps({
  template: {
    type: Array,
    required: true,
    default: () => {},
  },
  formValues: {
    type: Array,
  },
  selectedRows: {
    type: Array,
  },
  useCase: {},
})
const selectedData = ref([])
function extractNumber(value) {
  if (typeof value === 'string') {
    // If the value is a string, remove any non-digit characters (like 'px') and convert it to a number
    return Number.parseFloat(value.replace(/[^\d.-]/g, ''))
  }
  // If the value is already a number, just return it
  return Number(value)
}
onMounted(() => {
  docGenerationData.templateToGenerateDocs = props?.template
  selectedData.value = props?.selectedRows
  if (props?.template)
    callCreateCanvas()
})

function setEditorContainerRef(id) {
  return (el) => {
    if (el)
      docGenerationData.editorContainerRefs[id] = el
  }
}
watch(() => props?.selectedRows, (newVal) => {
  selectedData.value = newVal
})
watch(props?.formValues, (val) => {
  if (props?.useCase === 'formToDoc') {
    selectedData.value = val?.formValues
    renderOriginalData()
  }
})
watch(props, (val) => {
  // setting watch for props , because when final preview called from main app, watch on specific props does not work

  if (props?.useCase === 'formToDoc') {
    selectedData.value = val?.formValues
    renderOriginalData()
  }
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
  if (props?.useCase === 'formToDoc') {
    if (selectedData.value?.length > 0) {
      if (canvas) {
        const data = selectedData.value
        const objs = canvas?.getObjects()

        canvas.objects = objs.map((obj) => {
          if (obj.stroke || obj.isAlertIcon)
            return obj
          if (!obj._element && obj.id !== 'Lorem ipsum') {
            let correspondingData
            if (obj?.fieldType === 'Form date') {
              if (data?.filter(d => d?.hash === obj?.hash)[0]?.state)
              // correspondingData = new Date(data?.filter(d => d?.hash === obj?.hash)[0]?.state)?.toUTCString()
                correspondingData = formatDateForInput(data?.filter(d => d?.hash === obj?.hash)[0]?.state, data?.filter(d => d?.hash === obj?.hash)[0]?.dateFormat)
            }
            else if (obj?.fieldType === 'Form time') {
              if (data?.filter(d => d?.hash === obj?.hash)[0]?.state)
              //  correspondingData = new Date(data?.filter(d => d?.hash === obj?.hash)[0]?.state)?.getTime()
                correspondingData = formatTimeForInput(data?.filter(d => d?.hash === obj?.hash)[0]?.state, data?.filter(d => d?.hash === obj?.hash)[0]?.timeFormat)
            }
            else { correspondingData = data?.filter(d => d?.hash === obj?.hash)[0]?.state }

            correspondingData = correspondingData?.text ? correspondingData?.text : correspondingData

            if (correspondingData)
              obj.set({ text: correspondingData?.toString() })
          }
          else if (obj?.fieldType === 'Form checkbox group') {
            const specificCheck = data?.filter(d => d?.hash === obj?.hash)[0]?.checkboxes?.filter(c => c?.checkboxIdentifierHash === obj?.checkboxIdentifierHash)[0]
            const isChecked = specificCheck?.state === true
            const correspondingField = data?.filter(a => a?.hash === obj?.hash)[0]
            if (correspondingField?.designs) {
              const originalHeight = obj.height * obj.scaleY
              const originalWidth = obj.width * obj.scaleX
              const srcToSet = isChecked ? correspondingField?.designs.yes : correspondingField?.designs.no
              obj.setSrc(isChecked ? correspondingField?.designs.yes : correspondingField?.designs.no, () => {
                //   correspondingField?.imageProportionMethod && correspondingField?.imageProportionMethod === 'fitToWidth'
                //     ?
                obj.scaleToWidth(originalWidth)
                // : obj.scaleToHeight(originalHeight)
                canvas.renderAll()
              })
            }
          }
          else if (obj._element && obj.id !== 'Lorem ipsum') {
            let correspondingData = data?.filter(d => d?.hash === obj?.hash)[0]?.state
            correspondingData = correspondingData?.text ? correspondingData?.text : correspondingData

            const correspondingField = data?.filter(a => a?.hash === obj?.hash)[0]

            const originalHeight = obj.height * obj.scaleY
            const originalWidth = obj.width * obj.scaleX

            if (correspondingData) {
              obj.setSrc(correspondingData, () => {
              // correspondingField?.imageProportionMethod && correspondingField?.imageProportionMethod === 'fitToWidth'
              //   ? obj.scaleToWidth(originalWidth)
              //   : obj.scaleToHeight(originalHeight)

                // Conditional scaling logic
                if (correspondingField?.imageProportionMethod && correspondingField?.imageProportionMethod === 'fitToWidth') {
                  const scaleFactor = originalWidth / obj.width
                  obj.set({ scaleX: scaleFactor, scaleY: scaleFactor })
                }
                else {
                  const scaleFactor = originalHeight / obj.height
                  obj.set({ scaleX: scaleFactor, scaleY: scaleFactor })
                }

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
    // alert('problem problem')
      if (canvas) {
        const data = selectedData.value
        const objs = canvas?.getObjects()
        canvas._objects = objs.map((obj) => {
          if (obj?.id === 'watermark-docspawn')
            return obj
          if (obj.stroke || obj.isAlertIcon)
            return obj
          if (!obj._element && obj.id !== 'Lorem ipsum') {
            if (obj?.id)
              obj.set({ text: obj?.id })
          }
          else if (obj._element && obj.id !== 'Lorem ipsum') {
            const correspondingField = data?.filter(a => a?.hash === obj?.hash)[0]
            const correspondingData = 'https://placehold.co/300x200?text=Image'
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
  else if (props?.useCase === 'dataToDoc') {
    if (selectedData.value?.length > 0) {
      if (canvas) {
        const data = selectedData.value
        const objs = canvas?.getObjects()

        canvas.objects = objs.map((obj) => {
          if (obj.stroke || obj.isAlertIcon)
            return obj
          if (!obj._element && obj.id !== 'Lorem ipsum') {
            let correspondingData = data[currentPreviewNo.value - 1][obj?.id]
            if (obj?.fieldType === 'Dataset date') {
              const correspondingField = docGenerationData?.templateToGenerateDocs?.added_fields?.filter(a => a?.hash === obj?.hash)[0]
              correspondingData = parseDateString(correspondingData) && formatDateForInput(parseDateString(correspondingData), correspondingField?.dateFormat)
            }
            else {
              correspondingData = correspondingData?.text ? correspondingData?.text : correspondingData
            }
            if (correspondingData)
              obj.set({ text: correspondingData?.toString() })
          }
          else if (obj._element && obj.id !== 'Lorem ipsum') {
            let correspondingData = data[currentPreviewNo.value - 1][obj?.id]
            correspondingData = correspondingData?.text ? correspondingData?.text : correspondingData

            const correspondingField = docGenerationData?.templateToGenerateDocs?.added_fields?.filter(a => a?.hash === obj?.hash)[0]

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
            if (obj?.id)
              obj.set({ text: obj?.id })
          }
          else if (obj._element && obj.id !== 'Lorem ipsum') {
            const correspondingData = 'https://placehold.co/300x200?text=Image'
            const correspondingField = docGenerationData?.templateToGenerateDocs?.added_fields?.filter(a => a?.hash === obj?.hash)[0]

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
}
const canvasWrapper = ref()
const templateCanvas = ref()
const isCanvasLoaded = ref(false)
const canvasWrapperHeight = ref(1)

function callCreateCanvas() {
  createCanvas()
}

async function createCanvas() {
  const { fabric } = await import('fabric')

  const canvasWrapperWidth
  //  canvasWrapper.value?.clientWidth > 0 ? canvasWrapper.value?.clientWidth :
      = 900

  const canvas = await canvasService.createCanvas(templateCanvas.value, {
    isDrawing: true,
    width: canvasWrapperWidth,
    fill: '#000',
    selection: false,
  })

  // templateEditorStore.canvas = canvas
  const response = await fetch(props?.template?.background_file_url)
  const pdfData = await response.arrayBuffer()

  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

  const pdf = await pdfjs.getDocument({ data: pdfData }).promise
  const page = await pdf.getPage(1)

  const pages = await pdf.numPages
  const array = []
  for (let i = 1; i <= pages; i++)
    array.push(i)
  docGenerationData.totalPagesArray = array
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
  canvasWrapperHeight.value = canvasHeight

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
  if (canvas) {
    // setTimeout(() => {
    //   console.log('docGenerationData.canvasScalingFactor', docGenerationData.canvasScalingFactor)

    //   if (!docGenerationData?.templateToGenerateDocs?.editor_fields_data)
    //     return
    //   const { editorContainers, editorContainersRefs, fabricObjectRefs } = docGenerationData?.templateToGenerateDocs?.editor_fields_data
    //   if (editorContainers && editorContainersRefs && fabricObjectRefs) {
    //     docGenerationData.editorContainers = editorContainers?.map((e) => {
    //       return { ...e, style: { ...e.style, width: `${Number.parseInt(e.style.width)}px`, height: `${Number.parseInt(e.style.height)}px` } }
    //     })
    //     // top: `${extractNumber(e?.style?.top) * docGenerationData?.canvasScalingFactor?.y}px`, left: `${extractNumber(e?.style?.left) * docGenerationData?.canvasScalingFactor?.x}px`
    //     // transform: `scale(${Number.parseFloat(docGenerationData?.canvasScalingFactor?.x)?.toFixed(1)},${Number.parseFloat(docGenerationData?.canvasScalingFactor?.y)?.toFixed(1)})`
    //     // transform: `scale(${Number.parseFloat(docGenerationData?.canvasScalingFactor?.x)?.toFixed(1)},${Number.parseFloat(docGenerationData?.canvasScalingFactor?.y)?.toFixed(1)})`,
    //     // templateEditorStore.editorContainersRefs = editorContainersRefs
    //     docGenerationData.fabricObjectRefs = fabricObjectRefs
    //     // editor container ref will be assigned at runtime but fabric ref, we have to re assign to recreate canvas objects
    //     let objectsIop = {}
    //     canvas.getObjects()?.forEach((f) => {
    //       if (docGenerationData.fabricObjectRefs[f?.id]) {
    //         objectsIop = { ...objectsIop, [f?.id]: f }
    //         if (f?.fieldType === 'Html Container') {
    //           const editorContainer = editorContainers?.filter(s => f?.id === s?.id)[0]
    //           f.set({
    //             width:
    //               // Number.parseFloat(
    //               editorContainer.style.width, // .replace('px', '')) + 5

    //             height:
    //               // Number.parseFloat(
    //               editorContainer.style.height, // .replace('px', '')) + 5

    //           })

    //           f.on('moving', () => {
    //             const editorContainer = docGenerationData.editorContainerRefs[f?.id]
    //             if (editorContainer) {
    //               editorContainer.style.left = `${f.left}px`
    //               editorContainer.style.top = `${f.top}px`
    //               docGenerationData.editorContainers = docGenerationData.editorContainers?.map((c) => {
    //                 if (c?.id === f?.id)
    //                   return { ...c, style: { ...c?.style, left: `${f.left}px`, top: `${f.top}px` } }
    //                 else
    //                   return c
    //               })
    //             }
    //           })

    //           canvas.renderAll() // Re-render the canvas to reflect changes
    //         }
    //       }
    //     })

    //     docGenerationData.fabricObjectRefs = objectsIop

    //     // console.log('fabric object at resizing>>>', fabricObj)
    //     // nextTick(() => {
    //     //   docGenerationData?.editorContainers?.forEach((f) => {
    //     //     const id = f?.id
    //     //     // Add a resize listener for the editor container
    //     //     const editorContainer = docGenerationData.editorContainerRefs[id]
    //     //     if (editorContainer) {
    //     //       // Add a resize event listener
    //     //       const resizeObserver = new ResizeObserver((entries) => {
    //     //         for (const entry of entries) {
    //     //           // console.log('entry', entry)
    //     //           const newWidth = entry.contentRect.width
    //     //           const newHeight = entry.contentRect.height

    //     //           const sample = docGenerationData.editorContainers
    //     //           docGenerationData.editorContainers = sample?.map((s) => {
    //     //             if (s?.id === id)
    //     //               // return { ...s, style: { ...s?.style, width: `${entry.contentRect.width}px`, height: `${entry.contentRect.height}px` } }
    //     //               return { ...s, style: { ...s?.style, width: entry.contentRect.width, height: entry.contentRect.height } }

    //     //             else return s
    //     //           })

    //     //           // Update the corresponding Fabric.js object dimensions

    //     //           const fabricObj = docGenerationData.fabricObjectRefs[id]
    //     //           console.log('fabric object at resizing>>>', fabricObj)
    //     //           if (fabricObj) {
    //     //             fabricObj.set({
    //     //               width: newWidth + 5,
    //     //               height: newHeight + 5,
    //     //             })

    //     //             canvas.renderAll() // Re-render the canvas to reflect changes
    //     //           }
    //     //         }
    //     //       })

    //     //       // Observe the editor container for size changes
    //     //       resizeObserver.observe(editorContainer)
    //     //     }
    //     //   })
    //     // })
    //   }
    // }, 5000)
  }
}

async function showThumbnail() {
  const { fabric } = await import('fabric')

  docGenerationData.totalPagesArray.forEach(async (i) => {
    const canvasWrapperWidth = 60
    const canvas = new fabric.Canvas(`template-thumbnail-${i}`, { isDrawing: true, width: canvasWrapperWidth, fill: '#000' })
    const response = await fetch(props?.template?.background_file_url)
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
