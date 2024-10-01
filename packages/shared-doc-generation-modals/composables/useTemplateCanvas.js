import { docGenerationData } from './useDocGenerationData'

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
      if (docGenerationData?.templateToGenerateDocs?.canvas_data) {
        console.log('docGenerationData?.templateToGenerateDocs?.canvas_data', docGenerationData?.templateToGenerateDocs?.canvas_data)

        const oldWidth = docGenerationData?.templateToGenerateDocs?.canvas_size?.width
        const oldHeight = docGenerationData?.templateToGenerateDocs?.canvas_size?.height
        const newWidth = options?.width

        if (oldWidth && oldHeight && newWidth) {
          // Calculate the new height while maintaining the aspect ratio
          const aspectRatio = oldHeight / oldWidth
          const newHeight = newWidth * aspectRatio

          // Calculate scaling factors
          const scaleX = newWidth / oldWidth
          const scaleY = newHeight / oldHeight
          docGenerationData.canvasScalingFactor = { x: scaleX, y: scaleY }

          // Update the objects with new scale and positions
          const updatedObjects = docGenerationData?.templateToGenerateDocs?.canvas_data?.objects?.map((o) => {
            return {
              ...o,
              scaleX: o?.scaleX * scaleX,
              scaleY: o?.scaleY * scaleY,
              left: o?.left * scaleX,
              top: o?.top * scaleY,
            }
          })

          // Scale the background image if it exists
          const backgroundImage = docGenerationData?.templateToGenerateDocs?.canvas_data?.backgroundImage
          if (backgroundImage) {
            backgroundImage.scaleX *= scaleX
            backgroundImage.scaleY *= scaleY
            backgroundImage.left *= scaleX
            backgroundImage.top *= scaleY
          }

          const canvasDataToLoad = {
            ...docGenerationData?.templateToGenerateDocs?.canvas_data,
            objects: updatedObjects.filter(obj =>
              obj?.fieldType !== 'checkboxIdNoIcon',
            ),
            backgroundImage,
          }

          console.log('canvasDataToLoad', canvasDataToLoad)
          await this.loadCanvasFromData(canvasDataToLoad)
        }
        // await
        // this.loadCanvasFromData(
        //   docGenerationData?.templateToGenerateDocs?.canvas_data,
        // )
      }
    }

    return this.canvas
  }

  getCanvas() {
    return this.canvas
  }

  async loadCanvasFromData(canvasData) {
    if (!canvasData)
      return

    try {
      const parsedData = canvasData
      // JSON.parse(canvasData)
      this.canvas.loadFromJSON(parsedData, () => {
        this.canvas.renderAll()
        /** *********** setting editor containers */
        // setTimeout(() => {
        console.log('docGenerationData.canvasScalingFactor', docGenerationData.canvasScalingFactor)

        if (!docGenerationData?.templateToGenerateDocs?.editor_fields_data)
          return
        const { editorContainers, editorContainersRefs, fabricObjectRefs } = docGenerationData?.templateToGenerateDocs?.editor_fields_data
        if (editorContainers && editorContainersRefs && fabricObjectRefs) {
          /** * test area: try to add left and top of editor containers by rectangle left and top */

          const canvasHtmlObjects = canvasData?.objects?.filter(f => editorContainers?.filter(s => f?.id === s?.id)[0])
          console.log('canvas html objects', canvasHtmlObjects)
          /** */
          docGenerationData.editorContainers = editorContainers?.map((e) => {
            const rectTop = canvasHtmlObjects?.filter(ob => ob?.id === e?.id)[0]?.top
            const rectLeft = canvasHtmlObjects?.filter(ob => ob?.id === e?.id)[0]?.left
            const rectScaleX = canvasHtmlObjects?.filter(ob => ob?.id === e?.id)[0]?.scaleX
            const rectScaleY = canvasHtmlObjects?.filter(ob => ob?.id === e?.id)[0]?.scaleY
            console.log('rect scale x', rectScaleX)
            console.log('rect scale y', rectScaleY)
            // return { ...e, style: { ...e.style, width: `${Number.parseInt(e.style.width)}px`, height: `${Number.parseInt(e.style.height)}px` } }
            return { ...e, style: { ...e.style, transformOrigin: 'top left', transform: `scale(${rectScaleX},${rectScaleY})`, width: `${Number.parseInt(e.style.width)}px`, height: `${Number.parseInt(e.style.height)}px`, top: `${rectTop}px`, left: `${rectLeft}px` } }
          })
          // top: `${extractNumber(e?.style?.top) * docGenerationData?.canvasScalingFactor?.y}px`, left: `${extractNumber(e?.style?.left) * docGenerationData?.canvasScalingFactor?.x}px`
          // transform: `scale(${Number.parseFloat(docGenerationData?.canvasScalingFactor?.x)?.toFixed(1)},${Number.parseFloat(docGenerationData?.canvasScalingFactor?.y)?.toFixed(1)})`
          // transform: `scale(${Number.parseFloat(docGenerationData?.canvasScalingFactor?.x)?.toFixed(1)},${Number.parseFloat(docGenerationData?.canvasScalingFactor?.y)?.toFixed(1)})`,
          // templateEditorStore.editorContainersRefs = editorContainersRefs
          docGenerationData.fabricObjectRefs = fabricObjectRefs
          // editor container ref will be assigned at runtime but fabric ref, we have to re assign to recreate canvas objects
          let objectsIop = {}
          this.canvas.getObjects()?.forEach((f) => {
            if (docGenerationData.fabricObjectRefs[f?.id]) {
              objectsIop = { ...objectsIop, [f?.id]: f }
              if (f?.fieldType === 'Text box') {
                const editorContainer = editorContainers?.filter(s => f?.id === s?.id)[0]
                f.set({
                  width:
                  // Number.parseFloat(
                  // editorContainer.style.width

                  0, // .replace('px', '')) + 5

                  height:
                  // Number.parseFloat(
                  // editorContainer.style.height
                  0, // .replace('px', '')) + 5
                  opacity: 0,
                  visible: false,

                })

                f.on('moving', () => {
                  const editorContainer = docGenerationData.editorContainerRefs[f?.id]
                  if (editorContainer) {
                    editorContainer.style.left = `${f.left}px`
                    editorContainer.style.top = `${f.top}px`
                    docGenerationData.editorContainers = docGenerationData.editorContainers?.map((c) => {
                      if (c?.id === f?.id)
                        return { ...c, style: { ...c?.style, left: `${f.left}px`, top: `${f.top}px` } }
                      else
                        return c
                    })
                  }
                })

                this.canvas.renderAll() // Re-render the canvas to reflect changes
              }
            }
          })

          docGenerationData.fabricObjectRefs = objectsIop

          // console.log('fabric object at resizing>>>', fabricObj)
          // nextTick(() => {
          //   docGenerationData?.editorContainers?.forEach((f) => {
          //     const id = f?.id
          //     // Add a resize listener for the editor container
          //     const editorContainer = docGenerationData.editorContainerRefs[id]
          //     if (editorContainer) {
          //       // Add a resize event listener
          //       const resizeObserver = new ResizeObserver((entries) => {
          //         for (const entry of entries) {
          //           // console.log('entry', entry)
          //           const newWidth = entry.contentRect.width
          //           const newHeight = entry.contentRect.height

          //           const sample = docGenerationData.editorContainers
          //           docGenerationData.editorContainers = sample?.map((s) => {
          //             if (s?.id === id)
          //               // return { ...s, style: { ...s?.style, width: `${entry.contentRect.width}px`, height: `${entry.contentRect.height}px` } }
          //               return { ...s, style: { ...s?.style, width: entry.contentRect.width, height: entry.contentRect.height } }

          //             else return s
          //           })

          //           // Update the corresponding Fabric.js object dimensions

          //           const fabricObj = docGenerationData.fabricObjectRefs[id]
          //           console.log('fabric object at resizing>>>', fabricObj)
          //           if (fabricObj) {
          //             fabricObj.set({
          //               width: newWidth + 5,
          //               height: newHeight + 5,
          //             })

          //             canvas.renderAll() // Re-render the canvas to reflect changes
          //           }
          //         }
          //       })

          //       // Observe the editor container for size changes
          //       resizeObserver.observe(editorContainer)
          //     }
          //   })
          // })
        }
        // }, 5000)
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
