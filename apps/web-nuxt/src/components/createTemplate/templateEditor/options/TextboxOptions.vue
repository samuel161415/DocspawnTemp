<template>
  <div class="flex items-center gap-2 my-4">
    <!-- <Checkbox /> -->
    <!-- <p class="text-md">
      Set text box to full page
    </p> -->
    <Button outlined="" label="Set textbox to full page" class="w-full" @click="setTextboxToFullPage" />
  </div>
  <div class="flex flex-col gap-4 my-2">
    <p class="text-lg text-surface-500 font-normal">
      Order text boxes
    </p>
    <!-- <p>Selected textbox will be ordered at top of layer</p> -->
    <!-- <div v-tooltip="'Bring the selected object forward one level so it\'s hidden behind fewer objects.'" class="flex gap-2 items-center cursor-pointer " @click="bringForward">
      <font-awesome-icon icon="fa-duotone fa-solid fa-bring-forward" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
      <p>
        Bring forward
      </p>
    </div>
    <div v-tooltip="'Send the selected object back one level so its hidden behind more objects.'" class="flex gap-2 items-center cursor-pointer" @click="bringBackward">
      <font-awesome-icon icon="fa-duotone fa-solid fa-send-backward" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
      <p> Send backward</p>
    </div> -->
    <div v-tooltip="'Bring the selected object in front of all other objects.'" class="flex gap-2 items-center cursor-pointer" @click="bringToFront">
      <font-awesome-icon icon="fa-duotone fa-solid fa-bring-front" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
      <p> Bring to front</p>
    </div>
    <!-- <div v-tooltip="'Send the selected object behind all other objects.'" class="flex gap-2 items-center cursor-pointer" @click="sendToBack">
      <font-awesome-icon icon="fa-duotone fa-solid fa-send-back" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
      <p>Send to back</p>
    </div> -->
  </div>
</template>

<script setup>
import { templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'

function setTextboxToFullPage() {
  const canvas = canvasService.getCanvas()
  const selectedField = templateEditorStore.selectedAddedField
  const activeObj = canvas.getActiveObject()

  //   console.log('selected field', selectedField)
  //   console.log('active object', activeObj)
  activeObj.set(({
    left: 10,
    top: 10,
    scaleX: 1,
    scaleY: 1,
    width: canvas.width - 20,
    height: canvas.height - 20,

  }))
  const editorContainer = templateEditorStore.editorContainerRefs[activeObj.id]
  if (editorContainer) {
    editorContainer.style.width = `${canvas.width - 20}px`
    editorContainer.style.height = `${canvas.height - 20}px`
    editorContainer.style.left = `${10}px`
    editorContainer.style.top = `${10}px`

    // Update editor container in the store
    templateEditorStore.editorContainers = templateEditorStore.editorContainers.map((c) => {
      if (c.id === activeObj.id) {
        return {
          ...c,
          style: {
            ...c.style,
            width: `${canvas.width - 20}px`,
            height: `${canvas.height - 20}px`,
            left: `${10}px`,
            top: `${10}px`,
          },
        }
      }
      return c
    })
  }
  canvas.renderAll()
}
function sendToBack() {

}
function bringBackward() {

}
function bringToFront() {
  console.log('bringing to front')
  // Update the corresponding editor container size
  const canvas = canvasService.getCanvas()
  const activeObj = canvas.getActiveObject()

  const editorContainer = templateEditorStore.editorContainerRefs[activeObj.id]
  if (editorContainer) {
    editorContainer.style.zIndex = 100

    // Update editor container in the store
    templateEditorStore.editorContainers = templateEditorStore.editorContainers.map((c) => {
      if (c.id === activeObj.id) {
        console.log('c id is qual to active object')
        return {
          ...c,
          style: {
            ...c.style,
            zIndex: 100,
          },
        }
      }
      //   return c
      return {
        ...c,
        style: {
          ...c.style,
          zIndex: 10,
        },
      }
    })
  }

  // Re-render the canvas to reflect the changes
  canvas.renderAll()
}
function bringForward() {

}

// Example reactive state for editor containers and fabric objects
</script>
