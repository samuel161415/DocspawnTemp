<template>
  <div class="min-h-full flex-1 w-max  ">
    <CanvasOptionsTopBar />
    <div id="canvas-wrapper" ref="canvasWrapper" class="  rounded-md min-h-full  flex flex-col w-[900px]  relative  ">
      <canvas id="template-canvas" ref="templateCanvas" class=" flex-1 w-full min-h-full h-full  rounded-md  my-0 shadow  ">
      </canvas>

      <ThumbnailBar />
    </div>
  </div>
</template>

<script setup>
// import { fabric } from 'fabric'

import * as pdfjs from 'pdfjs-dist/build/pdf'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'
import { templateEditorStore } from '../store/templateEditorStore'
import { activeTextStyles } from '../store/activeTextStyles'
import ThumbnailBar from './ThumbnailBar.vue'
import CanvasOptionsTopBar from './CanvasOptionsTopBar.vue'

const templateCanvas = ref()
const hoveredElement = ref()
const canvasWrapper = ref()
const activeElement = ref()

onMounted(() => {
  createCanvas()
})

async function showThumbnail() {
  const { fabric } = await import('fabric')

  templateEditorStore.totalPagesArray.forEach(async (i) => {
    const canvasWrapperWidth = 100
    const canvas = new fabric.Canvas(`template-thumbnail-${i}`, { isDrawing: true, width: canvasWrapperWidth, fill: '#000' })
    const response = await fetch(templateEditorStore.templateBackgroundUrl)
    const pdfData = await response.arrayBuffer()

    // const pdfjs =await  import('pdfjs-dist/build/pdf')

    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

    const pdf = await pdfjs.getDocument({ data: pdfData }).promise
    const page = await pdf.getPage(i)

    const viewport = page.getViewport({ scale: 2 })

    // Get the parent container's width
    const parentWidth = 100

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

  const canvasWrapperWidth = canvasWrapper.value.clientWidth
  templateEditorStore.fabric = fabric
  const canvas = new fabric.Canvas(templateCanvas.value, { isDrawing: true, width: canvasWrapperWidth, fill: '#000' })
  templateEditorStore.canvas = canvas
  const response = await fetch(templateEditorStore.templateBackgroundUrl)
  const pdfData = await response.arrayBuffer()

  // const pdfjs =await  import('pdfjs-dist/build/pdf')

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
  templateEditorStore.canvas.on('mouse:down', (event) => {
    // get active object
    const activeObject = templateEditorStore.canvas?.getActiveObject()

    if (activeObject) {
      activeElement.value = activeObject

      activeTextStyles.fill = activeObject.fill
      activeTextStyles.fontFamily = activeObject.fontFamily
      activeTextStyles.fontSize = activeObject.fontSize
      activeTextStyles.underline = activeObject.underline
      activeTextStyles.textAlign = activeObject.textAlign
      activeTextStyles.fontStyle = activeObject.fontStyle
      activeTextStyles.fontWeight = activeObject.fontWeight

      templateEditorStore.addedFields.forEach((f) => {
        if (f.name === activeObject.text) {
          templateEditorStore.selectedAddedField = f
          if (f.fieldType === 'data-fields')
            templateEditorStore.activeDataField = activeObject.text
        }
      })
    }
    else {
      activeElement.value = {}
    }
  })
}

function addEventsToCanvas() {
  templateEditorStore.canvas.on('object:moving', (e) => {
    templateEditorStore.canvas._objects.forEach((obj) => {
      if (obj.id === e.target.id && obj.stroke) {
        if (obj.top === 0)
          obj.set({ top: 0, left: e.target.left })
        if (obj.left === 0)

          obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)), left: 0 })
      }
    })

    templateEditorStore.canvas.renderAll()
  })
  templateEditorStore.canvas.on('mouse:move', (event) => {
    if (templateEditorStore.selectedAddedField.type === 'text' || templateEditorStore.selectedAddedField.subType === 'text' || templateEditorStore.selectedAddedField.type === 'data-fields') {
      if (hoveredElement.value)
        templateEditorStore.canvas.remove(hoveredElement.value)

      hoveredElement.value = new templateEditorStore.fabric.Text(
        `${templateEditorStore.selectedAddedField.name}`,

        {
          left: event.absolutePointer.x,
          top: event.absolutePointer.y,
          fill: activeTextStyles.fill,
          fontFamily: activeTextStyles.fontFamily,
          fontSize: activeTextStyles.fontSize,
          underline: activeTextStyles.underline,
          textAlign: activeTextStyles.textAlign,
          fontStyle: activeTextStyles.fontStyle,
          fontWeight: activeTextStyles.fontWeight,
          hasBorders: true,
          zIndex: 1,
        },
      )

      templateEditorStore.canvas.add(hoveredElement.value)
      templateEditorStore.canvas.renderAll()
    }
    if (templateEditorStore.selectedAddedField.type === 'image') {
      fabric.Image.fromURL(
        // 'https://placehold.co/400x200'
        templateEditorStore.datasetData.allEntries[0]['Anomaly 1']
        , (myImg) => {
          if (hoveredElement)
            templateEditorStore.canvas.remove(hoveredElement.value)

          myImg.set({
            left: event.absolutePointer.x,
            top: event.absolutePointer.y,
            scaleX: 400 / myImg.width,
            scaleY: 200 / myImg.height,
          })

          hoveredElement.value = myImg
          templateEditorStore.canvas.add(myImg)
          templateEditorStore.canvas.renderAll()
        },
      )
    }
  })

  templateEditorStore.canvas.on('mouse:down', (event) => {
    if (templateEditorStore.selectedAddedField.type === 'text' || templateEditorStore.selectedAddedField.subType === 'text' || templateEditorStore.selectedAddedField.type === 'data-fields') {
      if (hoveredElement.value)
        templateEditorStore.canvas.remove(hoveredElement.value)
      const textEle = new templateEditorStore.fabric.Text(
        `${templateEditorStore.selectedAddedField.name}`,

        {
          left: event.absolutePointer.x,
          top: event.absolutePointer.y,
          // hasControls: false,
          // ...templateEditorStore.activeTextStyles,
          fill: activeTextStyles.fill,
          fontFamily: activeTextStyles.fontFamily,
          fontSize: activeTextStyles.fontSize,
          underline: activeTextStyles.underline,
          textAlign: activeTextStyles.textAlign,
          fontStyle: activeTextStyles.fontStyle,
          fontWeight: activeTextStyles.fontWeight,
          hasBorders: true,
          zIndex: 1,
          fieldType: templateEditorStore.selectedAddedField.type,
          PageNo: templateEditorStore.activePageForCanvas,
        },
      )
      /** ** saving to field */

      const fieldToAdd = { fieldType: templateEditorStore.selectedAddedField.type, name: templateEditorStore.selectedAddedField.name,
      }

      const allFields = []

      templateEditorStore.addedFields.forEach((f) => {
        allFields.push(JSON.parse(JSON.stringify(f)))
      })
      allFields.push(fieldToAdd)
      templateEditorStore.addedFields = allFields

      templateEditorStore.canvas.renderAll()
      /** */
      templateEditorStore.selectedAddedField = {}
      textEle.on('mouseover', (e) => {
        if (!templateEditorStore.activeAdvancedPointer)
          return
        templateEditorStore.canvas.add(new fabric.Line([100, 1000, 100, 5000], {
          left: e.target.left,
          top: 0, // event.absolutePointer.y,
          stroke: '#3978eb',
          id: e.target.id,
        }))
        // x axis
        templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
          left: 0, // event.absolutePointer.x,
          top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)),

          stroke: '#3978eb',
          id: e.target.id,
        }))
      })
      textEle.on('mouseout', (e) => {
        if (!templateEditorStore.activeAdvancedPointer)
          return

        const objs = templateEditorStore.canvas._objects
        templateEditorStore.canvas._objects = objs.filter((obj) => {
          if (obj.stroke === '#3978eb' && obj.id === e.target.id)
            return false
          else
            return true
        })

        templateEditorStore.canvas.renderAll()
      })
      templateEditorStore.canvas.add(textEle)
      // y axis

      templateEditorStore.canvas.renderAll()
      /** remove field */
      const remainingFields = templateEditorStore.addedFields.filter(f => f?.name !== templateEditorStore.selectedAddedField?.name)
      templateEditorStore.addedFields = remainingFields

      /** */
    }
    if (templateEditorStore.selectedAddedField.type === 'image') {
      fabric.Image.fromURL(
        // 'https://placehold.co/400x200'
        templateEditorStore.datasetData.allEntries[0]['Anomaly 1']
        , (myImg) => {
          if (hoveredElement.value)
            templateEditorStore.canvas.remove(hoveredElement.value)
          myImg.set({
            left: event.absolutePointer.x,
            top: event.absolutePointer.y,
            scaleX: 400 / myImg.width,
            scaleY: 200 / myImg.height,
            id: templateEditorStore.selectedAddedField.name,
          })
          myImg.id = templateEditorStore.selectedAddedField.name
          templateEditorStore.selectedAddedField = {}
          hoveredElement.value = myImg
          templateEditorStore.canvas.add(myImg)
          templateEditorStore.canvas.renderAll()
        },
      )
    }
    // for showing options while click
    const activeObj = templateEditorStore.canvas.getActiveObject()
    if (activeObj) {
      templateEditorStore.showOptionsBar = true
      templateEditorStore.selectedAddedField = { name: activeObj.id ? activeObj.id : '', fieldType: activeObj.fieldType ? activeObj.fieldType : '', obj: activeObj }
    }

    else {
      templateEditorStore.showOptionsBar = false
      templateEditorStore.selectedAddedField = {}
    }
  })

  templateEditorStore.canvas.on('mouse:out', () => {
    if (hoveredElement && (templateEditorStore.selectedAddedField.type === 'text' || templateEditorStore.selectedAddedField.subType === 'text' || templateEditorStore.selectedAddedField.type === 'data-fields'))
      templateEditorStore.canvas.remove(hoveredElement.value)
  })
}

watch(activeTextStyles, () => {
  addEventsToCanvas()
  const activeObject = templateEditorStore.canvas?.getActiveObject()

  if (activeObject) {
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
</script>

<style  scoped>
*{}
</style>
