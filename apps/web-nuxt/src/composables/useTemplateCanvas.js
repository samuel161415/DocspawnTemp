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
              if (f?.fieldType === 'Text box') {
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
                f.on('scaling', (e) => {
                  console.log('scalinf f run')
                  const f = e.transform.target

                  // Get the current scale and size
                  let newWidth = f.width * f.scaleX
                  let newHeight = f.height * f.scaleY
                  let newLeft = f.left
                  let newTop = f.top

                  // Ensure the new dimensions stay within the canvas boundaries
                  if (newLeft < 10) {
                    // Adjust newLeft to stay within the left boundary
                    newLeft = 10
                  }

                  // Ensure the right side doesn't cross the canvas right boundary
                  if (newLeft + newWidth > this.canvas.width - 10) {
                    // Adjust the width to fit within the canvas
                    newWidth = this.canvas.width - newLeft - 10
                  }

                  // Ensure the top doesn't cross the canvas top boundary
                  if (newTop < 10)
                    newTop = 10

                  // Ensure the bottom doesn't cross the canvas bottom boundary
                  if (newTop + newHeight > this.canvas.height - 10)
                    newHeight = this.canvas.height - newTop - 10

                  // Reset the scale back to 1 after calculating new dimensions
                  f.set({
                    scaleX: 1,
                    scaleY: 1,
                    width: newWidth,
                    height: newHeight,
                    left: newLeft,
                    top: newTop,
                  })

                  // Update the corresponding editor container size
                  const editorContainer = templateEditorStore.editorContainerRefs[f.id]
                  if (editorContainer) {
                    editorContainer.style.width = `${newWidth}px`
                    editorContainer.style.height = `${newHeight}px`
                    editorContainer.style.left = `${newLeft}px`
                    editorContainer.style.top = `${newTop}px`

                    // Update editor container in the store
                    templateEditorStore.editorContainers = templateEditorStore.editorContainers.map((c) => {
                      if (c.id === f.id) {
                        return {
                          ...c,
                          style: {
                            ...c.style,
                            width: `${newWidth}px`,
                            height: `${newHeight}px`,
                            left: `${newLeft}px`,
                            top: `${newTop}px`,
                          },
                        }
                      }
                      return c
                    })
                  }

                  // Re-render the canvas to reflect the changes
                  this.canvas.renderAll()
                })
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
                  const cornerThreshold = 13
                  const pointer = this.canvas.getPointer(options.e) // Get the current mouse pointer
                  const rect = f.getBoundingRect() // Get the bounding box of the object

                  // Calculate the position of the mouse relative to the Fabric object
                  const mouseX = pointer.x - f.left
                  const mouseY = pointer.y - f.top

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
                    console.log('hovering center of rectangle')
                    // Set edit mode and change cursor to "auto" when not on border or at bottom-right corner
                    this.canvas.setCursor('auto') // Reset cursor
                    templateEditorStore.editorContainers = templateEditorStore?.editorContainers?.map((container) => {
                      if (container?.id === f?.id)
                        return { ...container, behaviourMode: 'edit' }
                      else
                        return container
                    })
                  }

                  this.canvas.renderAll() // Re-render the canvas to reflect changes
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
                  this.canvas.getObjects()?.forEach((obj) => {
                    if (id === obj?.id) {
                      // templateEditorStore.selectedAddedField = templateEditorStore?.addedFields?.filter(field => field?.id === id)[0]
                      if (typeof obj.height === 'string' && obj.height.includes('px'))
                        obj.set({ height: Number.parseFloat(obj.height.replace('px', '')) })

                      if (typeof obj.width === 'string' && obj.width.includes('px'))
                        obj.set({ width: Number.parseFloat(obj.width.replace('px', '')) })

                      // this.canvas.setActiveObject(obj)
                      // templateEditorStore.showOptionsBar = true
                      this.canvas.renderAll()
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
                  if (isTopBorder || isLeftBorder || isRightBorder || isBottomBorder
                  //  && !isBottomRight
                  ) {
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
                // const resizeObserver = new ResizeObserver((entries) => {
                //   for (const entry of entries) {
                //     // console.log('entry', entry)
                //     const newWidth = entry.contentRect.width
                //     const newHeight = entry.contentRect.height
                //     /** */
                //     const sample = templateEditorStore.editorContainers
                //     templateEditorStore.editorContainers = sample?.map((s) => {
                //       if (s?.id === id)
                //         // return { ...s, style: { ...s?.style, width: `${entry.contentRect.width}px`, height: `${entry.contentRect.height}px` } }
                //         return { ...s, style: { ...s?.style, width: entry.contentRect.width, height: entry.contentRect.height } }

                //       else return s
                //     })

                //     /** */

                //     // Update the corresponding Fabric.js object dimensions

                //     const fabricObj = templateEditorStore.fabricObjectRefs[id]

                //     if (fabricObj) {
                //       fabricObj.set({
                //         width: newWidth, // + 5,
                //         height: newHeight, // + 5,
                //       })

                //       this.canvas.renderAll() // Re-render the canvas to reflect changes
                //     }
                //   }
                // })

                // // Observe the editor container for size changes
                // resizeObserver.observe(editorContainer)
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
