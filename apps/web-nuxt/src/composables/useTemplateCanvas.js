import { templateEditorStore } from '@/composables/useTemplateEditorData'

// Adjust import path as needed

class CanvasService {
  constructor() {
    this.canvas = null
  }

  async createCanvas(canvasElement, options) {
    if (typeof window !== 'undefined') {
      const { fabric } = await import('fabric')
      this.canvas = new fabric.Canvas(canvasElement, options)

      // Load template if canvas data exists
      if (templateEditorStore?.templateToEdit?.canvas_data) {
        const oldWidth = templateEditorStore?.templateToEdit?.canvas_size?.width
        const oldHeight = templateEditorStore?.templateToEdit?.canvas_size?.height
        const newWidth = options?.width

        if (oldWidth && oldHeight && newWidth) {
          // Calculate the new height while maintaining the aspect ratio
          const aspectRatio = oldHeight / oldWidth
          const newHeight = newWidth * aspectRatio

          // Calculate scaling factors
          const scaleX = newWidth / oldWidth
          const scaleY = newHeight / oldHeight
          // saving scale factor to use with canvas
          templateEditorStore.canvasScaleFactors = { x: scaleX, y: scaleY }

          // Update the objects with new scale and positions
          const updatedObjects = templateEditorStore?.templateToEdit?.canvas_data?.objects?.map((o) => {
            return {
              ...o,
              scaleX: o?.scaleX * scaleX,
              scaleY: o?.scaleY * scaleY,
              left: o?.left * scaleX,
              top: o?.top * scaleY,
            }
          })

          // Scale the background image if it exists
          const backgroundImage = templateEditorStore?.templateToEdit?.canvas_data?.backgroundImage
          if (backgroundImage) {
            backgroundImage.scaleX *= scaleX
            backgroundImage.scaleY *= scaleY
            backgroundImage.left *= scaleX
            backgroundImage.top *= scaleY
          }

          const canvasDataToLoad = {
            ...templateEditorStore?.templateToEdit?.canvas_data,
            objects: updatedObjects,
            backgroundImage,
          }

          await this.loadCanvasFromData(canvasDataToLoad)
        }
      }
    }

    return this.canvas
  }

  getCanvas() {
    return this.canvas
  }

  async saveCanvasData() {
    if (this.canvas) {
      const canvasData = JSON.stringify(this.canvas.toJSON())
      templateEditorStore.templateToEdit.canvas_data = canvasData
      // Optionally, you can save canvasData to your server or database here
    }
  }

  async loadCanvasFromData(canvasData) {
    if (!canvasData)
      return

    try {
      const parsedData = canvasData
      this.canvas.loadFromJSON(parsedData, () => {
        this.canvas.renderAll()
        /** ********************  test area for editor containers */
        // setTimeout(() => {
        if (!templateEditorStore?.templateToEdit?.editor_fields_data)
          return
        const { editorContainers, editorContainersRefs, fabricObjectRefs } = templateEditorStore?.templateToEdit?.editor_fields_data
        if (editorContainers && editorContainersRefs && fabricObjectRefs) {
          /** * test area: try to add left and top of editor containers by rectangle left and top */

          const canvasHtmlObjects = canvasData?.objects?.filter(f => editorContainers?.filter(s => f?.id === s?.id)[0])

          /** */
          templateEditorStore.editorContainers = editorContainers?.map((e) => {
            const rectTop = canvasHtmlObjects?.filter(ob => ob?.id === e?.id)[0]?.top
            const rectLeft = canvasHtmlObjects?.filter(ob => ob?.id === e?.id)[0]?.left
            const rectScaleX = canvasHtmlObjects?.filter(ob => ob?.id === e?.id)[0]?.scaleX
            const rectScaleY = canvasHtmlObjects?.filter(ob => ob?.id === e?.id)[0]?.scaleY

            // console.log('rect scale x', rectScaleX)
            // console.log('rect scale y', rectScaleY)

            // return { ...e, style: { ...e.style, transformOrigin: 'top left', transform: `scale(${Number.parseFloat(templateEditorStore?.canvasScaleFactors?.x)?.toFixed(1)},${Number.parseFloat(templateEditorStore?.canvasScaleFactors?.y)?.toFixed(1)})`, width: `${Number.parseInt(e.style.width)}px`, height: `${Number.parseInt(e.style.height)}px`, top: `${rectTop}px`, left: `${rectLeft}px` } }
            return { ...e, behaviourMode: 'edit', style: { ...e.style, transformOrigin: 'top left', transform: `scale(${rectScaleX},${rectScaleY})`, width: `${Number.parseInt(e.style.width)}px`, height: `${Number.parseInt(e.style.height)}px`, top: `${rectTop}px`, left: `${rectLeft}px` } }
          })
          // templateEditorStore.editorContainersRefs = editorContainersRefs
          templateEditorStore.fabricObjectRefs = fabricObjectRefs
          // editor container ref will be assigned at runtime but fabric ref, we have to re assign to recreate canvas objects
          let objectsIop = {}

          this.canvas.getObjects()?.forEach((f) => {
            if (templateEditorStore.fabricObjectRefs[f?.id]) {
              objectsIop = { ...objectsIop, [f?.id]: f }
              if (f?.fieldType === 'Html Container') {
                const editorContainer = editorContainers?.filter(s => f?.id === s?.id)[0]
                f.set({
                  width:
                    // Number.parseFloat(
                    editorContainer.style.width, // .replace('px', '')) + 5

                  height:
                    // Number.parseFloat(
                    editorContainer.style.height
                    // .replace('px', '')) + 5
                  ,
                })
                /** ********** set moving event on fabric */
                f.on('moving', () => {
                  const editorContainer = templateEditorStore.editorContainerRefs[f?.id]
                  if (editorContainer) {
                    editorContainer.style.left = `${f.left}px`
                    editorContainer.style.top = `${f.top}px`
                    templateEditorStore.editorContainers = templateEditorStore.editorContainers?.map((c) => {
                      if (c?.id === f?.id)
                        return { ...c, style: { ...c?.style, left: `${f.left}px`, top: `${f.top}px` } }
                      else
                        return c
                    })
                  }
                })
                f.on('mousemove', (options) => {
                  const cornerThreshold = 10
                  // console.log('mouse moving')
                  const pointer = this.canvas.getPointer(options.e) // Get the current mouse pointer
                  const rect = f.getBoundingRect() // Get the bounding box of the object

                  // Calculate the position of the mouse relative to the Fabric object
                  const mouseX = pointer.x - f.left
                  const mouseY = pointer.y - f.top

                  // Check if the mouse is near the corners of the Fabric object
                  const isTopLeft = mouseX < cornerThreshold && mouseY < cornerThreshold
                  const isTopRight = mouseX > rect.width - cornerThreshold && mouseY < cornerThreshold
                  const isBottomLeft = mouseX < cornerThreshold && mouseY > rect.height - cornerThreshold
                  const isBottomRight = mouseX > rect.width - cornerThreshold && mouseY > rect.height - cornerThreshold

                  // Change the cursor based on corner detection
                  if (isTopLeft || isTopRight || isBottomLeft || isBottomRight) {
                    // console.log('hovering at rectangle corners')
                    // canvas.setCursor('move') // Show drag cursor if near corners
                  }
                  else {
                    this.canvas.setCursor('auto')

                    templateEditorStore.editorContainers = templateEditorStore?.editorContainers?.map((container) => {
                      if (container?.id === id)
                        return { ...container, behaviourMode: 'edit' }
                      else
                        return container
                    })
                  } // Reset to default cursor

                  this.canvas.renderAll()
                })
                /** */
                this.canvas.renderAll() // Re-render the canvas to reflect changes
              }
            }
          })

          templateEditorStore.fabricObjectRefs = objectsIop

          // console.log('fabric object at resizing>>>', fabricObj)
          nextTick(() => {
            templateEditorStore?.editorContainers?.forEach((f) => {
              const id = f?.id
              // Add a resize listener for the editor container
              const editorContainer = templateEditorStore.editorContainerRefs[id]
              if (editorContainer) {
                editorContainer.addEventListener('mousemove', (event) => {
                  const rect = editorContainer.getBoundingClientRect()

                  // Calculate the position of the mouse relative to the container
                  const mouseX = event.clientX - rect.left
                  const mouseY = event.clientY - rect.top

                  // Define a threshold for "corner" detection (e.g., 10px)
                  const cornerThreshold = 10

                  // Check if the mouse is near the top-left corner
                  const isTopLeft = mouseX < cornerThreshold && mouseY < cornerThreshold

                  // Check if the mouse is near the top-right corner
                  const isTopRight = mouseX > rect.width - cornerThreshold && mouseY < cornerThreshold

                  // Check if the mouse is near the bottom-left corner
                  const isBottomLeft = mouseX < cornerThreshold && mouseY > rect.height - cornerThreshold

                  // Check if the mouse is near the bottom-right corner
                  const isBottomRight = mouseX > rect.width - cornerThreshold && mouseY > rect.height - cornerThreshold

                  // Handle the hover event based on which corner is hovered
                  // || isBottomRight
                  if (isTopLeft || isTopRight || isBottomLeft) {
                    // console.log('Hovering near a corner')
                    // You can add additional logic to change the cursor or show resize handles
                    editorContainer.style.cursor = 'move'
                    // Example to change the cursor to a resize indicator
                    // setting drag mode

                    templateEditorStore.editorContainers = templateEditorStore?.editorContainers?.map((container) => {
                      if (container?.id === id)
                        return { ...container, behaviourMode: 'drag' }
                      else
                        return container
                    })
                  }
                  else {
                    editorContainer.style.cursor = 'auto' // Reset cursor when not hovering near a corner
                    // console.log('hovering center')
                    // removing dragging mode
                    // templateEditorStore.editorContainers = templateEditorStore?.editorContainers?.map((container) => {
                    //   if (container?.id === id)
                    //     return { ...container, behaviourMode: 'edit' }
                    //   else
                    //     return container
                    // })
                  }
                })
                // Add a resize event listener
                const resizeObserver = new ResizeObserver((entries) => {
                  for (const entry of entries) {
                    // console.log('entry', entry)
                    const newWidth = entry.contentRect.width
                    const newHeight = entry.contentRect.height
                    /** */
                    const sample = templateEditorStore.editorContainers
                    templateEditorStore.editorContainers = sample?.map((s) => {
                      if (s?.id === id)
                        // return { ...s, style: { ...s?.style, width: `${entry.contentRect.width}px`, height: `${entry.contentRect.height}px` } }
                        return { ...s, style: { ...s?.style, width: entry.contentRect.width, height: entry.contentRect.height } }

                      else return s
                    })

                    /** */

                    // Update the corresponding Fabric.js object dimensions

                    const fabricObj = templateEditorStore.fabricObjectRefs[id]

                    if (fabricObj) {
                      fabricObj.set({
                        width: newWidth, // + 5,
                        height: newHeight, // + 5,
                      })

                      this.canvas.renderAll() // Re-render the canvas to reflect changes
                    }
                  }
                })

                // Observe the editor container for size changes
                resizeObserver.observe(editorContainer)
              }
            })
          })
        }
        // }, 2000)
        /** */
      })
    }
    catch (error) {
      console.error('Error loading canvas data:', error)
    }
  }

  refreshCanvas() {
    this.canvas = null
  }
}

const canvasService = new CanvasService()
export default canvasService

// import { templateEditorStore } from '@/composables/useTemplateEditorData'

// // Adjust import path as needed

// class CanvasService {
//   constructor() {
//     this.canvas = null
//   }

//   async createCanvas(canvasElement, options) {
//     if (typeof window !== 'undefined') {
//       const { fabric } = await import('fabric')
//       this.canvas = new fabric.Canvas(canvasElement, options)

//       // Load template if canvas data exists
//       if (templateEditorStore?.templateToEdit?.canvas_data)
//         await this.loadCanvasFromData(templateEditorStore?.templateToEdit?.canvas_data)

//       // here the login should be about waht if we re rendering existing canvas with existing objects but with different canvas dimensions(width and height)
//       // old width(width when canvas was last rendered with objects)=templateEditorStroe?.templateToEdit?.canvas_size?.width
//       // old height(height when canvas was last rendered with objects)=templateEditorStroe?.templateToEdit?.canvas_size?.height
//       // new width(width at which we want to present canvas, and with all its objectm scaled and positioned according to)=options?.width
//       // new height(height at which we want to present canvas, and with all its objectm scaled and positioned according to)=newDimesions?.height

//       // console.log('old width', templateEditorStore?.templateToEdit?.canvas_size?.width)
//       // console.log('old height', templateEditorStore?.templateToEdit?.canvas_size?.height)
//       // console.log('new width', options?.wudth)
//       // console.log('new height', options?.options?.height)
//     }

//     return this.canvas
//   }

//   getCanvas() {
//     return this.canvas
//   }

//   async saveCanvasData() {
//     if (this.canvas) {
//       const canvasData = JSON.stringify(this.canvas.toJSON())
//       templateEditorStore.templateToEdit.canvas_data = canvasData
//       // Optionally, you can save canvasData to your server or database here
//     }
//   }

//   async loadCanvasFromData(canvasData) {
//     if (!canvasData)
//       return

//     try {
//       const parsedData = canvasData
//       // JSON.parse(canvasData)
//       this.canvas.loadFromJSON(parsedData, () => {
//         this.canvas.renderAll()
//       })
//     }
//     catch (error) {
//       console.error('Error loading canvas data:', error)
//     }
//   }

//   refreshCanvas() {
//     this.canvas = null
//   }
// }

// const canvasService = new CanvasService()
// export default canvasService
