<template>
  <div v-if="docGenerationData.totalPagesArray?.length > 1" class="h-max p-2 flex items-center justify-between px-3 mb-6 rounded-md bg-primary-50 mt-4">
    <div class="w-full h-max p-2">
      <p class="px-2 mb-1">
        {{ $t('Cp_createTemplate_editorThumbnail.current_page') }} <span class="text-primary-500 text-bold">{{ docGenerationData.activePageForCanvas }}</span> {{ $t('Cp_createTemplate_editorThumbnail.out_of') }}
        <span class="text-primary-400 text-bold">{{ docGenerationData.totalPagesArray.length }}</span>
      </p>
      <div v-if="docGenerationData.activePageForCanvas !== 0" class="flex gap-4 w-full overflow-x-auto overflow-y-hidden p-3">
        <div v-for="item in docGenerationData.totalPagesArray" :key="item" class="w-18 h-max" :class="{ 'scale-110': docGenerationData.activePageForCanvas === item }" @click="selectPageFromThumbnail(item)">
          <canvas :id="`template-thumbnail-${item}`" class="flex-1 w-full min-h-full h-max rounded-md my-0 shadow cursor-pointer">
          </canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as pdfjs from 'pdfjs-dist/build/pdf'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'
import canvasService from '~/composables/useTemplateCanvas'
import { docGenerationData } from '@/composables/useDocGenerationData'

const props = defineProps(['template'])

function selectPageFromThumbnail(page) {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    canvas.discardActiveObject()
    canvas.renderAll()
    docGenerationData.activePageForCanvas = page
  }
}

async function changeCurrentPageOnCanvas(pageNo) {
  const canvas = canvasService.getCanvas()

  if (canvas) {
    const response = await fetch(props?.template?.background_file_url)
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

watch(() => docGenerationData.activePageForCanvas, (newVal) => {
  changeCurrentPageOnCanvas(newVal)
})
</script>

<style lang="scss" scoped></style>
