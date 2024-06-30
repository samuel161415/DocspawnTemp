// import { reactive } from 'vue'

// class CanvasService {
//   constructor() {
//     this.canvas = null
//   }

//   async createCanvas(canvasElement, options) {
//     if (typeof window !== 'undefined') {
//       const { fabric } = await import('fabric')
//       this.canvas = new fabric.Canvas(canvasElement, options)
//     }

//     return this.canvas
//   }

//   getCanvas() {
//     return this.canvas
//   }

//   resizeCanvas(width, height) {
//     if (this.canvas) {
//       this.canvas.setWidth(width)
//       this.canvas.setHeight(height)
//       this.canvas.renderAll()
//     }
//   }
// }

// const canvasService = new CanvasService()
// export default canvasService

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
      if (templateEditorStore?.templateToEdit?.canvas_data)
        await this.loadCanvasFromData(templateEditorStore.templateToEdit.canvas_data)
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
      console.log('canvas data before parsing', canvasData)
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
}

const canvasService = new CanvasService()
export default canvasService

// import { fabric } from 'fabric'

// import { templateEditorStore } from '@/composables/useTemplateEditorData'

// // Assuming this imports your store

// class CanvasService {
//   constructor() {
//     this.canvas = null
//   }

//   async createCanvas(canvasElement, options) {
//     if (!this.canvas) {
//       if (typeof window !== 'undefined') {
//         const { fabric } = await import('fabric')
//         this.canvas = new fabric.Canvas(canvasElement, options)

//         // Check if there is existing canvas data to load
//         if (templateEditorStore.templateToEdit?.id && templateEditorStore?.templateToEdit?.canvas_data)
//           await this.loadCanvasFromData(templateEditorStore.templateToEdit.canvas_data)
//       }
//     }

//     return this.canvas
//   }

//   getCanvas() {
//     return this.canvas
//   }

//   async loadCanvasFromData(canvasData) {
//     if (!canvasData)
//       return

//     const parsedData = JSON.parse(canvasData)

//     if (parsedData) {
//       this.canvas.loadFromJSON(parsedData, () => {
//         this.canvas.renderAll()
//       })
//     }
//   }

//   async saveCanvasData() {
//     if (this.canvas) {
//       const canvasData = JSON.stringify(this.canvas)
//       templateEditorStore.canvas_data = canvasData
//       // You might want to save canvasData to your server or database here
//     }
//   }

//   clearCanvas() {
//     if (this.canvas) {
//       this.canvas.clear()
//       templateEditorStore.canvas_data = null // Clear saved canvas data
//     }
//   }
// }

// const canvasService = new CanvasService()
// export default canvasService
