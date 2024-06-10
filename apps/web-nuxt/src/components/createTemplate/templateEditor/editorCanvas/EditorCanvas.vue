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
import { uuid } from 'vue-uuid'
import * as pdfjs from 'pdfjs-dist/build/pdf'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'
import ThumbnailBar from './ThumbnailBar.vue'
import CanvasOptionsTopBar from './CanvasOptionsTopBar.vue'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'

const isCanvasLoaded = ref(false)
const templateCanvas = ref()
const hoveredElement = ref()
const canvasWrapper = ref()
const activeElement = ref()

onMounted(() => {
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

async function createCanvas() {
  const { fabric } = await import('fabric')

  const canvasWrapperWidth = canvasWrapper.value.clientWidth > 0 ? canvasWrapper.value.clientWidth : 900

  templateEditorStore.fabric = fabric
  const canvas = new fabric.Canvas(templateCanvas.value, { isDrawing: true, width: canvasWrapperWidth, fill: '#000' })
  templateEditorStore.canvas = canvas
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

  templateEditorStore.canvas.on('mouse:down', () => {
    const objs = templateEditorStore.canvas._objects
    objs.forEach((obj) => {
      if (obj.id === 'watermark-docspawn')

        templateEditorStore.canvas.bringToFront(obj)
    })

    // get active object
    const activeObject = templateEditorStore.canvas?.getActiveObject()

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

function addEventsToCanvas() {
  /** ********* adding watermark */
  if (templateEditorStore?.watermarkImage?.src) {
    const isWaterMarkExists = templateEditorStore.canvas._objects.find(obj => obj?.id === 'watermark-docspawn') !== undefined

    if (!isWaterMarkExists) {
      fabric.Image.fromURL(
        templateEditorStore?.watermarkImage?.src
        , (myImg) => {
          myImg.set({
            // left: 0,
            // top: 0,
            left: templateEditorStore.canvas.width - (myImg.width * (80 / myImg.width)),
            top: templateEditorStore.canvas.height - (myImg.height * (80 / myImg.height)),
            scaleX: 80 / myImg.width,
            scaleY: 80 / myImg.height,
            id: 'watermark-docspawn',

            lockUniScaling: true,
            lockScalingX: true,
            lockScalingY: true,
            uniformScaling: false,

          })

          templateEditorStore.canvas.add(myImg)
          templateEditorStore.canvas.renderAll()
        },
      )
    }
  }

  /** */
  templateEditorStore.canvas.on('object:moving', (e) => {
    templateEditorStore.canvas._objects.forEach((obj) => {
      if (obj.id === 'watermark-docspawn') {
        if (e.target.left <= 0)
          obj.set({ left: 0 })
        if (e.target.top <= 0)
          obj.set({ top: 0 })
        if (e.target.left + (e.target.width * e.target.scaleX) >= templateEditorStore.canvas.width)
          obj.set({ left: templateEditorStore.canvas.width - (e.target.width * e.target.scaleX) })
        if (e.target.top + (e.target.height * e.target.scaleY) >= templateEditorStore.canvas.height)
          obj.set({ top: templateEditorStore.canvas.height - (e.target.height * e.target.scaleY) })
      }
      else if (obj.id === e.target.hash && obj.stroke) {
        if (obj.top === 0)
          obj.set({ top: 0, left: e.target.left })
        if (obj.left === 0) {
          if (obj.fieldType === 'fixed-image' || obj.fieldType === 'Dataset image')
            obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY), left: 0 })
          else
            obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)), left: 0 })
        }
      }
      if (obj.isAlertIcon && obj.id === e.target.hash)
        obj.set({ top: e.target.top, left: e.target.left + (e.target.width * e.target.scaleX) })
    })

    templateEditorStore.canvas.renderAll()
  })
  templateEditorStore.canvas.on('object:scaling', (e) => {
    templateEditorStore.canvas._objects.forEach((obj) => {
      if (obj.id === e.target.hash && obj.stroke) {
        if (obj.top === 0)
          obj.set({ top: 0, left: e.target.left })
        if (obj.left === 0) {
          if (obj.fieldType === 'fixed-image' || obj.fieldType === 'Dataset image')
            obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY), left: 0 })
          else
            obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)), left: 0 })
        }
      }
      if (obj.isAlertIcon && obj.id === e.target.hash)
        obj.set({ top: e.target.top, left: e.target.left + (e.target.width * e.target.scaleX) })
    })

    templateEditorStore.canvas.renderAll()
  })
  let tempXMargin = null
  let tempYMargin = null
  templateEditorStore.canvas.on('mouse:move', (event) => {
    if (templateEditorStore.fieldToAdd.type === 'text' || templateEditorStore.fieldToAdd.type === 'Data field' || templateEditorStore.fieldToAdd.type === 'Static date' || templateEditorStore.fieldToAdd.type === 'Static time' || templateEditorStore.fieldToAdd.type === 'Static text') {
      if (hoveredElement.value)
        templateEditorStore.canvas.remove(hoveredElement.value)

      const isDatafield = templateEditorStore.fieldToAdd.type === 'Data field' || templateEditorStore.fieldToAdd.type === 'Static text'
      hoveredElement.value = new templateEditorStore.fabric.Text(
        `${templateEditorStore.fieldToAdd.name}`,
        {
          left: event.absolutePointer.x,
          top: event.absolutePointer.y - (Number.parseFloat(activeTextStyles.fontSize)) + (Number.parseFloat(activeTextStyles.fontSize) / 5),
          fill: isDatafield ? '#ff0000' : activeTextStyles.fill,
          fontFamily: isDatafield ? 'Arial' : activeTextStyles.fontFamily,
          fontSize: activeTextStyles.fontSize,
          underline: isDatafield ? false : activeTextStyles.underline,
          textAlign: isDatafield ? 'center' : activeTextStyles.textAlign,
          fontStyle: isDatafield ? 'normal' : activeTextStyles.fontStyle,
          fontWeight: isDatafield ? 300 : activeTextStyles.fontWeight,
          hasBorders: true,
          zIndex: 1,
          pageNo: templateEditorStore.activePageForCanvas,
        },
      )
      templateEditorStore.canvas.add(hoveredElement.value)

      if (templateEditorStore.activeAdvancedPointer) {
        if (tempXMargin && tempYMargin) {
          tempXMargin.set({ left: event.absolutePointer.x })
          tempYMargin.set({ top: event.absolutePointer.y + (Number.parseFloat(activeTextStyles.fontSize) / 10) })
        }
        else {
          tempXMargin = new fabric.Line([100, 1000, 100, 5000], {
            left: event.absolutePointer.x,
            top: 0,
            stroke: '#3978eb',
            selectable: false,

          })
          templateEditorStore.canvas.add(tempXMargin)
          tempYMargin = new fabric.Line([1000, 100, 2000, 100], {
            left: 0, // event.absolutePointer.x,
            top: event.absolutePointer.y + (Number.parseFloat(activeTextStyles.fontSize) / 10),
            stroke: '#3978eb',
            selectable: false,

          })
          templateEditorStore.canvas.add(tempYMargin)
        }
      }

      templateEditorStore.canvas.renderAll()
    }
    if (templateEditorStore.fieldToAdd.type === 'Dataset image' || templateEditorStore.fieldToAdd.type === 'fixed-image') {
      fabric.Image.fromURL(
        'https://placehold.co/300x200?text=DocSpawn'
        , (myImg) => {
          if (hoveredElement.value)
            templateEditorStore.canvas.remove(hoveredElement.value)

          myImg.set({
            left: event.absolutePointer.x,
            top: event.absolutePointer.y - (myImg.height),
            scaleX: 400 / myImg.width,
            scaleY: 200 / myImg.height,
          })

          hoveredElement.value = myImg
          if (templateEditorStore.activeAdvancedPointer) {
            if (tempXMargin && tempYMargin) {
              tempXMargin.set({ left: event.absolutePointer.x })
              tempYMargin.set({ top: event.absolutePointer.y })
            }
            else {
              tempXMargin = new fabric.Line([100, 1000, 100, 5000], {
                left: event.absolutePointer.x,
                top: 0,
                stroke: '#3978eb',
                selectable: false,

              })

              templateEditorStore.canvas.add(tempXMargin)
              tempYMargin = new fabric.Line([1000, 100, 2000, 100], {
                left: 0,
                top: event.absolutePointer.y,
                stroke: '#3978eb',
                selectable: false,

              })
              templateEditorStore.canvas.add(tempYMargin)
            }
          }
          templateEditorStore.canvas.add(myImg)
          templateEditorStore.canvas.renderAll()
        },
      )
    }
  })

  templateEditorStore.canvas.on('mouse:down', (event) => {
    if (templateEditorStore.fieldToAdd.type === 'text' || templateEditorStore.fieldToAdd.type === 'Static text' || templateEditorStore.fieldToAdd.type === 'Static date' || templateEditorStore.fieldToAdd.type === 'Static time' || templateEditorStore.fieldToAdd.subType === 'text' || templateEditorStore.fieldToAdd.type === 'Data field') {
      if (hoveredElement.value)
        templateEditorStore.canvas.remove(hoveredElement.value)

      if (tempXMargin && tempYMargin) {
        const obs = templateEditorStore.canvas._objects
        templateEditorStore.canvas._objects = obs.filter((ob) => {
          const test3 = (ob.left === tempXMargin.left && ob.top === tempXMargin.top) || (ob.left === tempYMargin.left && ob.top === tempYMargin.top)

          if (test3)
            return false
          else
            return true
        })
      }
      templateEditorStore.canvas.renderAll()

      const isDatafield = templateEditorStore.fieldToAdd.type === 'Data field' || templateEditorStore.fieldToAdd.type === 'Static text'
      const textEle = new templateEditorStore.fabric.Text(
        `${templateEditorStore.fieldToAdd.name}`,
        {
          left: event.absolutePointer.x,
          top: event.absolutePointer.y - (Number.parseFloat(activeTextStyles.fontSize)) + (1 * (Number.parseFloat(activeTextStyles.fontSize) / 5)),
          fill: isDatafield ? '#ff0000' : activeTextStyles.fill,
          fontFamily: isDatafield ? 'Arial' : activeTextStyles.fontFamily,
          fontSize: activeTextStyles.fontSize,
          underline: isDatafield ? false : activeTextStyles.underline,
          textAlign: isDatafield ? 'center' : activeTextStyles.textAlign,
          fontStyle: isDatafield ? 'normal' : activeTextStyles.fontStyle,
          fontWeight: isDatafield ? 300 : activeTextStyles.fontWeight,
          hasBorders: true,
          zIndex: 1,
          fieldType: templateEditorStore.fieldToAdd.type,
          id: templateEditorStore.fieldToAdd.id,
          hash: uuid.v1(),

          pageNo: templateEditorStore.activePageForCanvas,
          displayGuide: false,
        },
      )

      const fieldToAdd = { fieldType: templateEditorStore.fieldToAdd.type, name: templateEditorStore.fieldToAdd.id, hash: textEle.hash, page: templateEditorStore.activePageForCanvas,
      }
      const allFields = []
      templateEditorStore.addedFields.forEach((f) => {
        allFields.push(JSON.parse(JSON.stringify(f)))
      })
      allFields.push(fieldToAdd)
      templateEditorStore.addedFields = allFields

      templateEditorStore.canvas.renderAll()

      templateEditorStore.fieldToAdd = {}
      textEle.on('mouseover', (e) => {
        if (!templateEditorStore.activeAdvancedPointer)
          return
        templateEditorStore.canvas.add(new fabric.Line([100, 1000, 100, 5000], {
          left: e.target.left,
          top: 0,
          stroke: '#3978eb',
          id: e.target.hash,
          fieldType: textEle.fieldType,
          selectable: false,
        }))
        templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
          left: 0, // event.absolutePointer.x,
          top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)),
          stroke: '#3978eb',
          id: e.target.hash,
          fieldType: textEle.fieldType,
          selectable: false,
        }))
      })
      textEle.on('mouseout', (e) => {
        if (!templateEditorStore.activeAdvancedPointer)
          return

        const objs = templateEditorStore.canvas._objects
        templateEditorStore.canvas._objects = objs.filter((obj) => {
          if (obj.stroke === '#3978eb' && obj?.id === e.target.hash && !e.target.displayGuide)
            return false
          else
            return true
        })

        templateEditorStore.canvas.renderAll()
      })
      templateEditorStore.canvas.add(textEle)

      templateEditorStore.canvas.renderAll()
      /** remove field */
      const remainingFields = templateEditorStore.addedFields.filter(f => f?.name !== templateEditorStore.fieldToAdd?.name)
      templateEditorStore.addedFields = remainingFields
    }
    if (templateEditorStore.fieldToAdd.type === 'Dataset image' || templateEditorStore.fieldToAdd.type === 'fixed-image') {
      const ftoadd = templateEditorStore.fieldToAdd
      templateEditorStore.fieldToAdd = {}
      fabric.Image.fromURL(
        'https://placehold.co/300x200?text=DocSpawn'
        , (myImg) => {
          if (hoveredElement.value)
            templateEditorStore.canvas.remove(hoveredElement.value)

          if (tempXMargin && tempYMargin) {
            const obs = templateEditorStore.canvas._objects
            templateEditorStore.canvas._objects = obs.filter((ob) => {
              const test3 = (ob.left === tempXMargin.left && ob.top === tempXMargin.top) || (ob.left === tempYMargin.left && ob.top === tempYMargin.top)

              if (test3)
                return false
              else
                return true
            })
          }
          templateEditorStore.canvas.renderAll()

          myImg.set({
            left: event.absolutePointer.x,
            top: event.absolutePointer.y - (myImg.height),
            scaleX: 400 / myImg.width,
            scaleY: 200 / myImg.height,
            id: ftoadd.id,
            hash: uuid.v1(),
            fieldType: ftoadd.type,
            pageNo: templateEditorStore.activePageForCanvas,
            displayGuide: false,
          })

          const fieldToAdd = { fieldType: ftoadd.type, name: ftoadd.id, hash: myImg.hash, page: templateEditorStore.activePageForCanvas,
          }
          const allFields = []
          templateEditorStore.addedFields.forEach((f) => {
            allFields.push(JSON.parse(JSON.stringify(f)))
          })
          allFields.push(fieldToAdd)
          templateEditorStore.addedFields = allFields
          templateEditorStore.canvas.renderAll()
          templateEditorStore.fieldToAdd = {}

          myImg.on('mouseover', (e) => {
            if (!templateEditorStore.activeAdvancedPointer)
              return
            templateEditorStore.canvas.add(new fabric.Line([100, 1000, 100, 5000], {
              left: e.target.left,
              top: 0,
              stroke: '#3978eb',
              id: e.target.hash,
              fieldType: myImg.fieldType,
              selectable: false,

            }))
            templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
              left: 0, // event.absolutePointer.x,
              top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY),

              stroke: '#3978eb',
              id: e.target.hash,
              fieldType: myImg.fieldType,
              selectable: false,
            }))
          })
          myImg.on('mouseout', (e) => {
            if (!templateEditorStore.activeAdvancedPointer)
              return

            const objs = templateEditorStore.canvas._objects
            templateEditorStore.canvas._objects = objs.filter((obj) => {
              if (obj?.stroke === '#3978eb' && obj?.id === e.target.hash && !e.target.displayGuide)
                return false
              else
                return true
            })

            templateEditorStore.canvas.renderAll()
          })

          templateEditorStore.canvas.add(myImg)
          templateEditorStore.canvas.renderAll()
        },
      )
    }
    // for showing options when click
    const activeObj = templateEditorStore.canvas.getActiveObject()

    if (activeObj && activeObj?.id !== 'watermark-docspawn') {
      templateEditorStore.showOptionsBar = true
      const field = templateEditorStore.addedFields.filter(f => f?.hash === activeObj?.hash)[0]
      templateEditorStore.selectedAddedField = { ...field, obj: activeObj }
    }

    else {
      templateEditorStore.showOptionsBar = false
      templateEditorStore.selectedAddedField = {}
    }
    templateEditorStore.activeTemplateField = false
    templateEditorStore.ShowAddedFieldsinTemplateFields = true
  })

  templateEditorStore.canvas.on('mouse:out', () => {
    if (tempXMargin) {
      templateEditorStore.canvas.remove(tempXMargin)
      tempXMargin = null
    }
    if (tempYMargin) {
      templateEditorStore.canvas.remove(tempYMargin)
      tempYMargin = null
    }
    if (hoveredElement && (templateEditorStore.fieldToAdd.type === 'text' || templateEditorStore.fieldToAdd.type === 'Static text' || templateEditorStore.fieldToAdd.type === 'Data field' || templateEditorStore.fieldToAdd.type === 'Dataset image'))
      templateEditorStore.canvas.remove(hoveredElement.value)
  })
}

watch(activeTextStyles, () => {
  addEventsToCanvas()
  const activeObject = templateEditorStore.canvas?.getActiveObject()

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
    })
    templateEditorStore.canvas.renderAll()
  }
})

watch(() => templateEditorStore.fieldToAdd, () => {
  // everytime selected added fields change, canvas event should be rewritten becaiuse of slectadeddfields updated value
  addEventsToCanvas()
})
</script>
