import { reactive } from 'vue'

class CanvasService {
  constructor() {
    this.canvas = null
  }

  async createCanvas(canvasElement, options) {
    if (typeof window !== 'undefined') {
      const { fabric } = await import('fabric')
      this.canvas = new fabric.Canvas(canvasElement, options)
    }

    return this.canvas
  }

  getCanvas() {
    return this.canvas
  }

  resizeCanvas(width, height) {
    if (this.canvas) {
      this.canvas.setWidth(width)
      this.canvas.setHeight(height)
      this.canvas.renderAll()
    }
  }
}

const canvasService = new CanvasService()
export default canvasService
