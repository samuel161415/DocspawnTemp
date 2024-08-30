import { templateEditorStore } from '@/composables/useTemplateEditorData'

// Adjust import path as needed

class CanvasService {
  constructor() {
    this.canvas = null
  }

  async createCanvas(canvasElement, options, newDimensions) {
    if (typeof window !== 'undefined') {
      const { fabric } = await import('fabric')
      this.canvas = new fabric.Canvas(canvasElement, options)

      // Load template if canvas data exists
      if (templateEditorStore?.templateToEdit?.canvas_data)
        await this.loadCanvasFromData(templateEditorStore?.templateToEdit?.canvas_data)

      // here the login should be about waht if we re rendering existing canvas with existing objects but with different canvas dimensions(width and height)
      // old width(width when canvas was last rendered with objects)=templateEditorStroe?.templateToEdit?.canvas_size?.width
      // old height(height when canvas was last rendered with objects)=templateEditorStroe?.templateToEdit?.canvas_size?.height
      // new width(width at which we want to present canvas, and with all its objectm scaled and positioned according to)=newDimesions?.canvasNewWidth
      // new height(height at which we want to present canvas, and with all its objectm scaled and positioned according to)=newDimesions?.canvasNewHeight

      // console.log('old width', templateEditorStore?.templateToEdit?.canvas_size?.width)
      // console.log('old height', templateEditorStore?.templateToEdit?.canvas_size?.height)
      // console.log('new width', newDimensions?.canvasNewWidth)
      // console.log('new height', newDimensions?.canvasNewHeight)
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
