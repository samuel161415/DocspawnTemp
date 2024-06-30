<template>
  <canvas :id="`template-preview-canvas-${props?.previewHash}`" class=" flex-1 w-full min-h-full h-max   rounded-md  my-0 shadow  cursor-pointer ">
  </canvas>
</template>

<script setup>
import * as pdfjs from 'pdfjs-dist/build/pdf'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'

const props = defineProps(['backgroundFileUrl', 'previewHash', 'filteredTemplates'])

async function loadImagePreview() {
  const { fabric } = await import('fabric')
  const url = props?.backgroundFileUrl
  if (!url)
    return

  const canvasWrapperWidth = 90
  const canvas = new fabric.Canvas(`template-preview-canvas-${props?.previewHash}`, { isDrawing: true, width: canvasWrapperWidth, fill: '#000' })
  const response = await fetch(url)
  const pdfData = await response.arrayBuffer()

  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

  const pdf = await pdfjs.getDocument({ data: pdfData }).promise
  const page = await pdf.getPage(1)

  const viewport = page.getViewport({ scale: 2 })

  // Get the parent container's width
  const parentWidth = 90

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
}
onMounted(() => {
  loadImagePreview()
})

watch(() => props?.filteredTemplates, () => {
  loadImagePreview()
})
</script>
