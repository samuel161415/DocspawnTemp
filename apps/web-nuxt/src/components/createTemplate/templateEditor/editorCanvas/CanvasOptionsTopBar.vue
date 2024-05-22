<template>
  <div class="h-24  flex items-center justify-between px-3  mb-6 rounded-md bg-blue-50  ">
    <div class=" flex justify-content-center  gap-6 ml-8 ">
      <div
        v-tooltip.top="{
          value: 'Display guide',
          pt: {
            arrow: {
              style: {
                borderBottomColor: 'var(--primary-color)',
              },
            },
            text: 'bg-primary font-medium',
          },
        }"
      >
        <div v-if="!templateEditorStore.activeDisplayGuide" class="cursor-pointer " @click="templateEditorStore.activeDisplayGuide = true;toggleMargins() ">
          <font-awesome-icon icon="fa-thin fa-ruler-triangle" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 0.6;" />
        </div>
        <div v-else class="cursor-pointer " @click="templateEditorStore.activeDisplayGuide = false;toggleMargins() ">
          <font-awesome-icon icon="fa-duotone fa-ruler-triangle" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 0.6;" />
        </div>
      </div>
      <div
        v-tooltip.bottom="{
          value: 'Advanced pointer',
          pt: {
            arrow: {
              style: {
                borderBottomColor: '#009ee2',
              },
            },
            text: 'bg-primary font-medium',
          },
        }"
      >
        <div v-if="!templateEditorStore.activeAdvancedPointer" class="cursor-pointer" @click="templateEditorStore.activeAdvancedPointer = true">
          <font-awesome-icon icon="fa-thin fa-arrow-pointer" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 0.6;" />
        </div>
        <div v-else class="cursor-pointer" @click="templateEditorStore.activeAdvancedPointer = false">
          <font-awesome-icon icon="fa-duotone fa-arrow-pointer" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 0.6;" />
        </div>
      </div>
      <div
        v-tooltip.bottom="{
          value: templateEditorStore.activeDisplayGuideForAll ? 'Remove all guides' : 'Display all guides',
          pt: {
            arrow: {
              style: {
                borderBottomColor: '#009ee2',
              },
            },
            text: 'bg-primary font-medium',
          },
        }"
      >
        <div v-if="!templateEditorStore.activeDisplayGuideForAll" class="cursor-pointer" @click="templateEditorStore.activeDisplayGuideForAll = true;showMargins()">
          <font-awesome-icon icon="fa-thin fa-ruler-combined" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 0.6;" />
        </div>
        <div v-else class="cursor-pointer" @click="templateEditorStore.activeDisplayGuideForAll = false;removeMargins()">
          <font-awesome-icon icon="fa-duotone fa-ruler-combined" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 0.6;" />
        </div>
      </div>
    </div>

    <div class="flex flex-row-reverse ">
      <Button v-if="!templateEditorStore.showPreview" outlined class="w-max px-3" @click="templateEditorStore.showPreview = true">
        Show Preview
      </Button>
      <Button v-else outlined class="w-max px-3" @click="templateEditorStore.showPreview = false">
        End Preview
      </Button>

      <div v-if="templateEditorStore.showPreview" class="flex items-center">
        <Button text icon="pi pi-chevron-left " @click="changePreviewNo('prev')" />
        <p>{{ currentPreviewNo }}/{{ templateEditorStore?.datasetData?.allEntries?.length }}</p>
        <Button text icon="pi pi-chevron-right" @click="changePreviewNo('next')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { templateEditorStore } from '../store/templateEditorStore'

const currentPreviewNo = ref(1)

function changePreviewNo(dir) {
  if (dir === 'prev') {
    if (currentPreviewNo.value > 1)
      currentPreviewNo.value = currentPreviewNo.value - 1
  }
  if (dir === 'next') {
    if (currentPreviewNo.value < templateEditorStore?.datasetData?.allEntries?.length)
      currentPreviewNo.value = currentPreviewNo.value + 1
  }
}

function toggleMargins() {
  const activeObject = templateEditorStore.canvas.getActiveObject()

  if (activeObject) {
    if (templateEditorStore.activeDisplayGuide) {
      const objs = templateEditorStore.canvas._objects
      objs.forEach((obj) => {
        if (obj === activeObject) {
          templateEditorStore.canvas.add(new fabric.Line([100, 1000, 100, 5000], {
            left: obj.left,
            top: 0, // event.absolutePointer.y,
            stroke: '#3978eb',
            id: obj.hash,
            selection: false,
            fieldType: obj.fieldType,
            pageNo: templateEditorStore.activePageForCanvas,
          }))
          // x axis
          if (obj.fieldType === 'dataset-image' || obj.fieldType === 'fixed-image') {
            templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
              left: 0, // event.absolutePointer.x,
              top: obj.top + (Number.parseFloat(obj.height) * obj.scaleY),
              stroke: '#3978eb',
              id: obj.hash,
              selection: false,
              fieldType: obj.fieldType,
              pageNo: templateEditorStore.activePageForCanvas,
            }))
          }
          else {
            templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
              left: 0, // event.absolutePointer.x,
              top: obj.top + (Number.parseFloat(obj.height) * obj.scaleY) - (1 * ((Number.parseFloat(obj.height) * obj.scaleY) / 5)),
              stroke: '#3978eb',
              id: obj.hash,
              selection: false,
              fieldType: obj.fieldType,
              pageNo: templateEditorStore.activePageForCanvas,
            }))
          }
        }
      })
      templateEditorStore.canvas.renderAll()
    }
    else {
      const objs = templateEditorStore.canvas._objects
      templateEditorStore.canvas._objects = objs.filter((obj) => {
        if (obj.stroke === '#3978eb' && obj.id === activeObject.hash)
          return false
        else
          return true
      })

      templateEditorStore.canvas.renderAll()
    }
  }
}
function showMargins() {
  const objs = templateEditorStore.canvas._objects

  objs.forEach((obj) => {
    if (obj.pageNo === templateEditorStore.activePageForCanvas && !obj.stroke && !obj.isAlertIcon) {
      obj.displayGuide = true
      templateEditorStore.canvas.add(new fabric.Line([100, 1000, 100, 5000], {
        left: obj.left,
        top: 0, // event.absolutePointer.y,
        stroke: '#3978eb',
        id: obj.hash,
        selection: false,
        fieldType: obj.fieldType,
        pageNo: templateEditorStore.activePageForCanvas,
      }))
      // x axis
      if (obj.fieldType === 'dataset-image' || obj.fieldType === 'fixed-image') {
        templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
          left: 0, // event.absolutePointer.x,
          top: obj.top + (Number.parseFloat(obj.height) * obj.scaleY),
          stroke: '#3978eb',
          id: obj.hash,
          selection: false,
          fieldType: obj.fieldType,
          pageNo: templateEditorStore.activePageForCanvas,
        }))
      }
      else {
        templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
          left: 0, // event.absolutePointer.x,
          top: obj.top + (Number.parseFloat(obj.height) * obj.scaleY) - (1 * ((Number.parseFloat(obj.height) * obj.scaleY) / 5)),
          stroke: '#3978eb',
          id: obj.hash,
          selection: false,
          fieldType: obj.fieldType,
          pageNo: templateEditorStore.activePageForCanvas,
        }))
      }
    }
  })
  templateEditorStore.canvas.renderAll()
}
function removeMargins() {
  const objs = templateEditorStore.canvas._objects

  templateEditorStore.canvas._objects = objs.filter((obj) => {
    if (obj.displayGuide)
      obj.displayGuide = false
    if (obj.stroke === '#3978eb'
    // && !obj.displayGuide
      && obj.pageNo === templateEditorStore.activePageForCanvas)
      return false
    else
      return true
  })
  templateEditorStore.canvas.renderAll()
}

watch(() => templateEditorStore.activeDisplayGuide, () => {
  const activeObject = templateEditorStore.canvas.getActiveObject()
  if (activeObject) {
    if (templateEditorStore.activeDisplayGuide) {
      activeObject.set({ displayGuide: true })
      templateEditorStore.canvas.renderAll()
    }

    else {
      activeObject.set({ displayGuide: false })
      templateEditorStore.canvas.renderAll()
    }
  }
})

watch(templateEditorStore.activeAdvancedPointer, () => {
  templateEditorStore.canvas._objects.forEach((obj) => {
    obj.on('mouseover', (e) => {
      if (!templateEditorStore.activeAdvancedPointer)
        return
      templateEditorStore.canvas.add(new fabric.Line([100, 1000, 100, 5000], {
        left: e.target.left,
        top: 0, // event.absolutePointer.y,
        stroke: '#3978eb',
        id: e.target.hash,
        fieldType: obj.fieldType,
      }))
      if (obj.fieldType === 'dataset-image' || obj.fieldType === 'fixed-image') {
        // x axis
        templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
          left: 0, // event.absolutePointer.x,
          top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY),
          stroke: '#3978eb',
          id: e.target.hash,
          fieldType: obj.fieldType,
        }))
      }
      else {
        // x axis
        templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
          left: 0, // event.absolutePointer.x,
          top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)),
          stroke: '#3978eb',
          id: e.target.hash,
          fieldType: obj.fieldType,
        }))
      }
    })
    obj.on('mouseout', (e) => {
      if (!templateEditorStore.activeAdvancedPointer)
        return

      const objs = templateEditorStore.canvas._objects
      templateEditorStore.canvas._objects = objs.filter((obj) => {
        if (obj.stroke === '#3978eb' && obj.id === e.target.hash)
          return false
        else
          return true
      })

      templateEditorStore.canvas.renderAll()
    })
  })

  templateEditorStore.canvas.renderAll()
})

watch(() => templateEditorStore.activePageForCanvas, () => {
  templateEditorStore.activeDisplayGuideForAll = false
  templateEditorStore.activeDisplayGuide = false
})
watch(currentPreviewNo, (newVal) => {
  if (templateEditorStore.showPreview) {
    const data = templateEditorStore?.datasetData?.allEntries
    const objs = templateEditorStore.canvas._objects

    templateEditorStore.canvas.objects = objs.map((obj) => {
      if (obj.stroke || obj.isAlertIcon)
        return obj
      if (!obj._element && obj.id !== 'Lorem ipsum') {
        const correspondingData = data[newVal - 1][obj?.id]
        if (correspondingData)
          obj.set({ text: correspondingData })
      }
      else if (obj._element && obj.id !== 'Lorem ipsum') {
        const correspondingData = data[newVal - 1][obj?.id]
        // 'https://images.pexels.com/photos/381739/pexels-photo-381739.jpeg?cs=srgb&dl=pexels-sevenstormphotography-381739.jpg&fm=jpg'
        // data[newVal - 1][obj?.id]
        if (correspondingData) {
          // fabric.Image.fromURL(correspondingData, (img) => {
          const originalHeight = obj.height * obj.scaleY
          const originalWidth = obj.width * obj.scaleX
          // obj.set({ height: img.height, width: img.width })

          // const imgElement = obj._element
          // imgElement.src = correspondingData // set image source
          // imgElement.onload = () => {
          //   obj.scaleToWidth(originalWidth)
          //   obj.scaleToHeight(originalHeight)
          //   templateEditorStore.canvas.renderAll()
          // }
          obj.setSrc(correspondingData, () => {
            obj.scaleToWidth(originalWidth)
            obj.scaleToHeight(originalHeight)
            templateEditorStore.canvas.renderAll()
          })
          // })
        }
      }
      return obj
    })
    templateEditorStore.canvas.renderAll()
  }
})
watch(() => templateEditorStore.showPreview, (newVal) => {
  if (newVal) {
    const data = templateEditorStore?.datasetData?.allEntries
    const objs = templateEditorStore.canvas._objects

    templateEditorStore.canvas.objects = objs.map((obj) => {
      if (obj.stroke || obj.isAlertIcon)
        return obj

      if (!obj._element && obj?.id !== 'Lorem ipsum') {
        const correspondingData = data[currentPreviewNo.value - 1][obj?.id]
        if (correspondingData)
          obj.set({ text: correspondingData })
      }
      else if (obj?.id !== 'Lorem ipsum') {
        const correspondingData = data[currentPreviewNo.value - 1][obj?.id]
        //  'https://images.pexels.com/photos/381739/pexels-photo-381739.jpeg?cs=srgb&dl=pexels-sevenstormphotography-381739.jpg&fm=jpg'

        // data[currentPreviewNo.value - 1][obj?.id]
        if (correspondingData) {
          // fabric.Image.fromURL(correspondingData, (img) => {
          const originalHeight = obj.height * obj.scaleY
          const originalWidth = obj.width * obj.scaleX
          // obj.set({ height: img.height, width: img.width })

          // const imgElement = obj._element
          // imgElement.src = correspondingData // set image source
          // imgElement.onload = () => {
          //   obj.scaleToWidth(originalWidth)
          //   obj.scaleToHeight(originalHeight)
          //   templateEditorStore.canvas.renderAll()
          // }
          obj.setSrc(correspondingData, () => {
            obj.scaleToWidth(originalWidth)
            obj.scaleToHeight(originalHeight)
            templateEditorStore.canvas.renderAll()
          })
          // })

          // const imgElement = obj._element
          // imgElement.src = correspondingData // set image source
          // imgElement.onload = () => templateEditorStore.canvas.renderAll()
        }
      }

      return obj
    })
    templateEditorStore.canvas.renderAll()
  }
  else {
    const objs = templateEditorStore.canvas._objects
    templateEditorStore.canvas.objects = objs.map((obj) => {
      if (obj.stroke || obj.isAlertIcon)
        return obj
      if (!obj._element && obj.id !== 'Lorem ipsum') {
        obj.set({ text: obj?.id })
      }
      else if (obj._element && obj.id !== 'Lorem ipsum') {
        // const imgElement = obj._element
        // imgElement.src = 'https://placehold.co/300x200?text=DocSpawn' // set image source
        // imgElement.onload = () => templateEditorStore.canvas.renderAll()
        const correspondingData = 'https://placehold.co/300x200?text=DocSpawn'
        // fabric.Image.fromURL(correspondingData, (img) => {
        const originalHeight = obj.height * obj.scaleY
        const originalWidth = obj.width * obj.scaleX
        // obj.set({ height: img.height, width: img.width })

        // const imgElement = obj._element
        // imgElement.src = correspondingData // set image source
        // imgElement.onload = () => {
        //   obj.scaleToWidth(originalWidth)
        //   obj.scaleToHeight(originalHeight)
        //   templateEditorStore.canvas.renderAll()
        // }
        obj.setSrc(correspondingData, () => {
          obj.scaleToWidth(originalWidth)
          obj.scaleToHeight(originalHeight)
          templateEditorStore.canvas.renderAll()
        })
        // })
      }
      return obj
    })
    templateEditorStore.canvas.renderAll()
    currentPreviewNo.value = 1
  }
})
</script>

  <style  scoped>

  </style>
