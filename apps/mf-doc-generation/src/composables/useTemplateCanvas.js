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
      if (templateEditorStore?.templateToEdit?.canvas_data || templateEditorStore?.templateToGenerateDocs?.canvas_data) {
        await this.loadCanvasFromData(templateEditorStore?.templateToEdit?.canvas_data
          ? templateEditorStore?.templateToEdit?.canvas_data
          : templateEditorStore?.templateToGenerateDocs?.canvas_data)
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
