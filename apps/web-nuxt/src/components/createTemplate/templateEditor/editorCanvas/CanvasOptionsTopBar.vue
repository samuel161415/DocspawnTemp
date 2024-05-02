<template>
  <div class="h-24  flex items-center justify-between px-3  mb-6 rounded-md bg-blue-50  ">
    <div class=" flex justify-content-center  gap-6 ml-8 ">
      <div
        v-tooltip.top="{
          value: 'Display guides',
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
        <div v-if="!templateEditorStore.activeDisplayGuide" class="cursor-pointer " @click="templateEditorStore.activeDisplayGuide = true;showMargins()">
          <font-awesome-icon icon="fa-thin fa-ruler-triangle" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 0.6;" />
        </div>
        <div v-else class="cursor-pointer " @click="templateEditorStore.activeDisplayGuide = false;removeMargins()">
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
    </div>

    <div class="flex flex-row-reverse ">
      <Button class="w-max px-3">
        Show Preview
      </Button>
      <div class="flex items-center">
        <Button text icon="pi pi-chevron-left " />
        <p>3/100</p>
        <Button text icon="pi pi-chevron-right" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { templateEditorStore } from '../store/templateEditorStore'

function showMargins() {
  const objs = templateEditorStore.canvas._objects
  objs.forEach((obj) => {
    if (obj.PageNo === templateEditorStore.activePageForCanvas) {
      templateEditorStore.canvas.add(new fabric.Line([100, 1000, 100, 5000], {
        left: obj.left,
        top: 0, // event.absolutePointer.y,
        stroke: '#3978eb',
        id: obj.id,
        selection: false,
      }))
      // x axis
      templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
        left: 0, // event.absolutePointer.x,
        top: obj.top + (Number.parseFloat(obj.height) * obj.scaleY) - (1 * ((Number.parseFloat(obj.height) * obj.scaleY) / 5)),
        stroke: '#3978eb',
        id: obj.id,
        selection: false,
      }))
    }
  })
  templateEditorStore.canvas.renderAll()
}
function removeMargins() {
  const objs = templateEditorStore.canvas._objects
  templateEditorStore.canvas._objects = objs.filter((obj) => {
    if (obj.stroke === '#3978eb')
      return false
    else
      return true
  })

  templateEditorStore.canvas.renderAll()
}

watch(templateEditorStore.activeAdvancedPointer, () => {
  templateEditorStore.canvas._objects.forEach((obj) => {
    obj.on('mouseover', (e) => {
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
    obj.on('mouseout', (e) => {
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
  })

  templateEditorStore.canvas.renderAll()
})
</script>

  <style  scoped>

  </style>
