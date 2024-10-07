<template>
  <div class="px-5 h-[62px] flex items-center gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50 border-surface-100 bg-surface-50" @click="addHtmlContainer">
    <font-awesome-icon icon="fa-brands fa-html5" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />

    <p class="font-poppins text-surface-600 text-lg">
      {{ $t('Cp_createTemplate_editorTemplateFields.add_text_box') }}
    </p>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'

function addHtmlContainer() {
  const canvas = canvasService.getCanvas()
  // console.log('template editor store scaling factors', templateEditorStore?.canvasScaleFactors)
  if (canvas) {
    // Generate a UUID for the new editor and fabric object
    const id = uuidv4()

    // Set initial position to avoid overlap between editors
    const left = 100 + templateEditorStore.editorContainers.length * 50 // Offset new editors to avoid overlap
    const top = 100 + templateEditorStore.editorContainers.length * 50 // Offset new editors to avoid overlap

    // Create a new editor container entry for this element with a unique ID
    const newEditor = {
      id, // Unique ID for the editor and fabric object
      style: {
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        width: '300px',
        height: '150px',
        border: '0.6px dashed lightgray',
        resize: 'both',
        overflow: 'hidden',
        zIndex: 10, // Ensure it's above the canvas
      },
      pageNo: templateEditorStore?.activePageForCanvas,
      content: '<p>Advance multiline text box...</p>',
      behaviourMode: 'edit',
    }
    templateEditorStore.editorContainers.push(newEditor)

    // Wait until DOM updates with the new editor container
    nextTick(() => {
      // Create a Fabric.js object representing the new editor container
      const fabricObject = new fabric.Rect({
        id, // Assign the same unique ID to the fabric object
        hash: id,
        left,
        top,
        width: 300,
        height: 150,
        fill: 'rgba(0, 0, 0, 0)',
        // stroke: '#000',
        stroke: 'transparent',
        strokeWidth: 1,
        selectable: true,
        fieldType: 'Text box',
        pageNo: templateEditorStore.activePageForCanvas,
        displayGuide: false,
        lockScalingFlip: true,
      })
      fabricObject.setControlsVisibility({ tr: false, tl: false, br: false, bl: false, mt: false, mb: false, mr: false, ml: false, mtr: false })

      templateEditorStore.fabricObjectRefs[id] = fabricObject // Store reference to fabric object

      canvas.add(fabricObject)
      /** */
      /** count no. of containers and name accordingly */
      const containerCount = templateEditorStore?.addedFields?.filter(f => f?.fieldType === 'Text box')?.length
      const nameToBe = `Text box ${containerCount + 1}`
      let fieldToAdd = { fieldType: 'Text box', name: nameToBe, id, hash: id, page: templateEditorStore.activePageForCanvas,
      }

      if (templateEditorStore?.fieldToAdd?.type === 'Form text')
        fieldToAdd = { ...fieldToAdd, allowDecimals: false, minCharAllowed: 2, maxCharAllowed: 50, characterAcception: 'Text' }

      const allFields = []
      templateEditorStore.addedFields.forEach((f) => {
        allFields.push(JSON.parse(JSON.stringify(f)))
      })
      allFields.push(fieldToAdd)
      templateEditorStore.addedFields = allFields

      /** */

      // Add a resize listener for the editor container
      const editorContainer = templateEditorStore.editorContainerRefs[id]
      if (editorContainer) {
        editorContainer.addEventListener('mousemove', (event) => {
          canvas.getObjects()?.forEach((obj) => {
            if (id === obj?.id) {
              templateEditorStore.selectedAddedField = templateEditorStore?.addedFields?.filter(field => field?.id === id)[0]

              canvas.setActiveObject(obj)
              canvas.renderAll()
            }
          })
          const rect = editorContainer.getBoundingClientRect()

          // Calculate the position of the mouse relative to the container
          const mouseX = event.clientX - rect.left
          const mouseY = event.clientY - rect.top

          // Define a threshold for "border" detection (e.g., 10px)
          const borderThreshold = 13

          // Check if the mouse is near any of the borders, excluding the bottom-right corner
          const isTopBorder = mouseY < borderThreshold
          const isLeftBorder = mouseX < borderThreshold
          const isRightBorder = mouseX > rect.width - borderThreshold
          const isBottomBorder = mouseY > rect.height - borderThreshold

          // Check for the bottom-right corner exclusion
          const isBottomRight = mouseX > rect.width - borderThreshold && mouseY > rect.height - borderThreshold

          // Check if the mouse is on any border except the bottom-right corner
          if ((isTopBorder || isLeftBorder || isRightBorder || isBottomBorder) && !isBottomRight) {
            // Change the cursor to "move"
            editorContainer.style.cursor = 'move'

            // Set the drag mode in the store
            templateEditorStore.editorContainers = templateEditorStore?.editorContainers?.map((container) => {
              if (container?.id === id)
                return { ...container, behaviourMode: 'drag' }
              else
                return container
            })
          }
          else {
            editorContainer.style.cursor = 'auto' // Reset cursor when not on the border
          }
        })

        // Add a resize event listener
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            // console.log('entry', entry)
            const newWidth = entry.contentRect.width
            const newHeight = entry.contentRect.height
            /** this part resolves an issue of resizing to original height and width when dragged- editor container */
            const sample = templateEditorStore.editorContainers

            templateEditorStore.editorContainers = sample?.map((s) => {
              if (s?.id === id)
              // return { ...s, style: { ...s?.style, width: `${entry.contentRect.width}px`, height: `${entry.contentRect.height}px` } }
                return { ...s, style: { ...s?.style, width: entry.contentRect.width, height: entry.contentRect.height } }

              else return s
            })

            // Update the corresponding Fabric.js object dimensions

            const fabricObj = templateEditorStore.fabricObjectRefs[id]
            // console.log('fabric object at resizing>>>', fabricObj)
            if (fabricObj) {
              fabricObj.set({
                width: newWidth, // + 50,
                height: newHeight, // + 50,
              })

              canvas.renderAll() // Re-render the canvas to reflect changes
            }
          }
        })

        // Observe the editor container for size changes
        // console.log('calling resize observer observe')
        resizeObserver.observe(editorContainer)
      }

      // Moving logic for the new Fabric.js object
      fabricObject.on('moving', () => {
        // console.log('fabric object moving')
        const editorContainer = templateEditorStore.editorContainerRefs[fabricObject?.id]
        if (editorContainer) {
          editorContainer.style.left = `${fabricObject.left}px`
          editorContainer.style.top = `${fabricObject.top}px`
          templateEditorStore.editorContainers = templateEditorStore.editorContainers?.map((c) => {
            if (c?.id === fabricObject?.id)
              return { ...c, style: { ...c?.style, left: `${fabricObject.left}px`, top: `${fabricObject.top}px` } }
            else
              return c
          })
        }
      })

      fabricObject.on('mousemove', (options) => {
        const cornerThreshold = 13
        const pointer = canvas.getPointer(options.e) // Get the current mouse pointer
        const rect = fabricObject.getBoundingRect() // Get the bounding box of the object

        // Calculate the position of the mouse relative to the Fabric object
        const mouseX = pointer.x - fabricObject.left
        const mouseY = pointer.y - fabricObject.top

        // Check if the mouse is near any of the borders, excluding the bottom-right corner
        const isTopBorder = mouseY < cornerThreshold
        const isLeftBorder = mouseX < cornerThreshold
        const isRightBorder = mouseX > rect.width - cornerThreshold
        const isBottomBorder = mouseY > rect.height - cornerThreshold

        // Check for the bottom-right corner exclusion
        const isBottomRight = mouseX > rect.width - cornerThreshold && mouseY > rect.height - cornerThreshold

        // Check if the mouse is on any border except the bottom-right corner
        if ((isTopBorder || isLeftBorder || isRightBorder || isBottomBorder) && !isBottomRight) {
          // Set drag mode and change cursor to "move"

        }
        else {
          // Set edit mode and change cursor to "auto" when not on border or at bottom-right corner
          canvas.setCursor('auto') // Reset cursor
          templateEditorStore.editorContainers = templateEditorStore?.editorContainers?.map((container) => {
            if (container?.id === id)
              return { ...container, behaviourMode: 'edit' }
            else
              return container
          })
        }

        canvas.renderAll() // Re-render the canvas to reflect changes
      })
    })
  }
}
</script>
