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
            objects: updatedObjects,
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
