<template>
  <div class="h-max p-2  flex items-center justify-between px-3  mb-6 rounded-md bg-primary-50 mt-4 ">
    <div class="w-full  h-max p-2">
      <p class="px-2 mb-1 ">
        Current page: <span class="text-primary-500 text-bold">{{ templateEditorStore.activePageForCanvas }}</span> out of <span class="text-primary-400 text-bold">{{ templateEditorStore.totalPagesArray.length }}</span>
      </p>
      <div v-if="templateEditorStore.activePageForCanvas !== 0" class="flex gap-4 w-full overflow-x-auto overflow-y-hidden p-3">
        <div v-for="item in templateEditorStore.totalPagesArray" :key="item" class=" w-18 h-max " :class="{ 'scale-110': templateEditorStore.activePageForCanvas === item }" @click="selectPageFromThumbnail(item)">
          <canvas :id="`template-thumbnail-${item}`" class=" flex-1 w-full min-h-full h-max   rounded-md  my-0 shadow  cursor-pointer ">
          </canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as pdfjs from 'pdfjs-dist/build/pdf'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'
import { activeTextStyles, templateEditorStore } from '~/composables/useTemplateEditorData'
import canvasService from '~/composables/useTemplateCanvas'
import { templateGeneralInformation } from '~/composables/useTemplateCreationData'

function selectPageFromThumbnail(page) {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    canvas.discardActiveObject()
    canvas.renderAll()
    templateEditorStore.showOptionsBar = false
    templateEditorStore.selectedAddedField = null
    templateEditorStore.activePageForCanvas = page
  }
}

async function changeCurrentPageOnCanvas(pageNo) {
  const canvas = canvasService.getCanvas()

  if (canvas) {
    const response = await fetch(templateGeneralInformation?.backgroundFileUrl ? templateGeneralInformation?.backgroundFileUrl : templateEditorStore.templateBackgroundUrl)
    const pdfData = await response.arrayBuffer()

    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

    const pdf = await pdfjs.getDocument({ data: pdfData }).promise
    const page = await pdf.getPage(pageNo || 1)

    const viewport = page.getViewport({ scale: 2 })

    const parentWidth = document?.getElementById('template-canvas')?.offsetWidth

    const scale = parentWidth / viewport.width

    const canvasWidth = viewport.width * scale
    const canvasHeight = viewport.height * scale

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

    fabric.Image.fromURL(bg, (img) => {
      if (img) {
        canvas.setBackgroundImage(
          img,
          () => {
            canvas.renderAll()

            const objs = canvas._objects

            canvas._objects = objs.map((obj) => {
              if (obj?.id === 'watermark-docspawn')
                return obj

              if (obj.pageNo === pageNo)
                obj.set({ visible: true, opacity: 1 })
              else obj.set({ visible: false, opacity: 0 })
              return obj
            })

            canvas.renderAll()
          },
          {
            scaleX: canvasWidth / img.width,
            scaleY: canvasHeight / img.height,
          },
        )
      }
    })
  }
}

watch(() => templateEditorStore.activePageForCanvas, (newVal) => {
  changeCurrentPageOnCanvas(newVal)
})
</script>

  <style lang="scss" scoped>
::-webkit-scrollbar {
    width: 10px;
    height:10px;
    }
    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
    background: #009ee299;
    border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb:hover {
    background: #009ee2;
    }
  </style>
