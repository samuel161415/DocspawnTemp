<template>
  <div class="h-max p-2  flex items-center justify-between px-3  mb-6 rounded-md bg-blue-50 mt-4 ">
    <div class="w-full  h-max p-2">
      <p class="px-2 mb-1 ">
        Current page: <span class="text-primary-500 text-bold">{{ templateEditorStore.activePageForCanvas }}</span> out of <span class="text-primary-400 text-bold">{{ templateEditorStore.totalPagesArray.length }}</span>
      </p>
      <div v-if="templateEditorStore.activePageForCanvas !== 0" class="flex gap-4 w-full overflow-x-auto overflow-y-hidden p-3">
        <div v-for="item in templateEditorStore.totalPagesArray" :key="item" class=" w-18 h-max " :class="{ 'scale-110': templateEditorStore.activePageForCanvas === item }" @click="changeCurrentPageOnCanvas(item)">
          <canvas :id="`template-thumbnail-${item}`" class=" flex-1 w-full min-h-full h-max   rounded-md  my-0 shadow  cursor-pointer ">
          </canvas>
          <!-- <p class="align-center  items-center justify-center p-2 text-center text-black ">
            {{ item }}
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as pdfjs from 'pdfjs-dist/build/pdf'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'
import { templateEditorStore } from '../store/templateEditorStore'
import { activeTextStyles } from '../store/activeTextStyles'

async function changeCurrentPageOnCanvas(pageNo) {
  templateEditorStore.canvas.discardActiveObject()
  templateEditorStore.canvas.renderAll()
  templateEditorStore.activePageForCanvas = pageNo
  const response = await fetch(templateEditorStore.templateBackgroundUrl)
  const pdfData = await response.arrayBuffer()

  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

  const pdf = await pdfjs.getDocument({ data: pdfData }).promise
  const page = await pdf.getPage(pageNo || 1)

  const viewport = page.getViewport({ scale: 2 })

  const parentWidth = document?.getElementById('template-canvas')?.offsetWidth

  const scale = parentWidth / viewport.width

  const canvasWidth = viewport.width * scale
  const canvasHeight = viewport.height * scale

  // Set the canvas dimensions
  templateEditorStore.canvas.width = canvasWidth
  templateEditorStore.canvas.height = canvasHeight

  templateEditorStore.canvas.setDimensions({
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
      templateEditorStore.canvas.setBackgroundImage(
        img,
        () => {
          templateEditorStore.canvas.renderAll()
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

watch(() => templateEditorStore.activePageForCanvas, (newVal) => {
  templateEditorStore.selectedAddedField = null
  templateEditorStore.showOptionsBar = false
  const objs = templateEditorStore.canvas._objects

  templateEditorStore.canvas._objects = objs.map((obj) => {
    if (obj.pageNo === newVal)
      obj.set({ visible: true, opacity: 1 })
    else obj.set({ visible: false, opacity: 0 })
    return obj
  })

  templateEditorStore.canvas.renderAll()
})
</script>

  <style lang="scss" scoped>
    /* width */
    ::-webkit-scrollbar {
    width: 10px;
    height:10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #009ee299;
    border-radius: 8px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #009ee2;
    }
  </style>
