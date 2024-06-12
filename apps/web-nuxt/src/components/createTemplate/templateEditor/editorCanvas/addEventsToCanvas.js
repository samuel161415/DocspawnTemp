import { uuid } from 'vue-uuid'
import canvasService from '@/composables/useTemplateCanvas'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'
export default function addEventsToCanvas() {
  /** ********* adding watermark */
  const canvas = canvasService.getCanvas()
  if (canvas) {
    if (templateEditorStore?.watermarkImage?.src) {
      const isWaterMarkExists = canvas._objects.find(obj => obj?.id === 'watermark-docspawn') !== undefined

      if (!isWaterMarkExists) {
        fabric.Image.fromURL(
          templateEditorStore?.watermarkImage?.src
          , (myImg) => {
            myImg.set({
              cornerStyle: 'circle',
              borderColor: '#00000066',
              cornerColor: '#119bd6',
              transparentCorners: false,
              // left: 0,
              // top: 0,
              left: canvas.width - (myImg.width * (80 / myImg.width)),
              top: canvas.height - (myImg.height * (80 / myImg.height)),
              scaleX: 80 / myImg.width,
              scaleY: 80 / myImg.height,
              id: 'watermark-docspawn',

              lockUniScaling: true,
              lockScalingX: true,
              lockScalingY: true,
              uniformScaling: false,

            })
            myImg.setControlsVisibility({ tr: false, tl: false, br: false, bl: false, mt: false, mb: false, mr: false, ml: false, mtr: false })
            canvas.add(myImg)
            canvas.renderAll()
          },
        )
      }
    }

    /** */
    canvas.on('object:moving', (e) => {
      canvas._objects.forEach((obj) => {
        if (obj.id === 'watermark-docspawn' && e.target.id === obj.id) {
          if (e.target.left <= 0)
            obj.set({ left: 0 })
          if (e.target.top <= 0)
            obj.set({ top: 0 })
          if (e.target.left + (e.target.width * e.target.scaleX) >= canvas.width)
            obj.set({ left: canvas.width - (e.target.width * e.target.scaleX) })
          if (e.target.top + (e.target.height * e.target.scaleY) >= canvas.height)
            obj.set({ top: canvas.height - (e.target.height * e.target.scaleY) })
        }
        else if (obj.id === e.target.hash && obj.stroke) {
          if (obj.top === 0)
            obj.set({ top: 0, left: e.target.left })
          if (obj.left === 0) {
            if (obj.fieldType === 'fixed-image' || obj.fieldType === 'Dataset image' || obj.fieldType === 'Form image')
              obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY), left: 0 })
            else
              obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)), left: 0 })
          }
        }
        if (obj.isAlertIcon && obj.id === e.target.hash)
          obj.set({ top: e.target.top, left: e.target.left + (e.target.width * e.target.scaleX) })
      })

      canvas.renderAll()
    })
    canvas.on('object:scaling', (e) => {
      canvas._objects.forEach((obj) => {
        if (obj.id === 'watermark-docspawn')
          return

        if (obj.id === e.target.hash && obj.stroke) {
          if (obj.top === 0)
            obj.set({ top: 0, left: e.target.left })
          if (obj.left === 0) {
            if (obj.fieldType === 'fixed-image' || obj.fieldType === 'Dataset image' || obj.fieldType === 'Form image')
              obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY), left: 0 })
            else
              obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)), left: 0 })
          }
        }
        if (obj.isAlertIcon && obj.id === e.target.hash)
          obj.set({ top: e.target.top, left: e.target.left + (e.target.width * e.target.scaleX) })
      })

      canvas.renderAll()
    })
    let tempXMargin = null
    let tempYMargin = null
    let currentHoveredEle = null
    canvas.on('mouse:move', (event) => {
      if (templateEditorStore.fieldToAdd.type === 'text' || templateEditorStore.fieldToAdd.type === 'Form text' || templateEditorStore.fieldToAdd.type === 'Data field' || templateEditorStore.fieldToAdd.type === 'Form date' || templateEditorStore.fieldToAdd.type === 'Form time' || templateEditorStore.fieldToAdd.type === 'Static date' || templateEditorStore.fieldToAdd.type === 'Static time' || templateEditorStore.fieldToAdd.type === 'Static text') {
        canvas.renderAll()
        if (currentHoveredEle && currentHoveredEle?.text) {
          const isDatafield = templateEditorStore.fieldToAdd.type === 'Data field' || templateEditorStore.fieldToAdd.type === 'Static text' || templateEditorStore.fieldToAdd.type === 'Form text' || templateEditorStore.fieldToAdd.type === 'Form date' || templateEditorStore.fieldToAdd.type === 'Form time'
          currentHoveredEle.set({
            left: event.absolutePointer.x,
            top: event.absolutePointer.y - (Number.parseFloat(activeTextStyles.fontSize)) + (Number.parseFloat(activeTextStyles.fontSize) / 5),
            fill: isDatafield ? '#ff0000' : activeTextStyles.fill,
            fontFamily: isDatafield ? 'Arial' : activeTextStyles.fontFamily,
            fontSize: activeTextStyles.fontSize,
            underline: isDatafield ? false : activeTextStyles.underline,
            textAlign: isDatafield ? 'center' : activeTextStyles.textAlign,
            fontStyle: isDatafield ? 'normal' : activeTextStyles.fontStyle,
            fontWeight: isDatafield ? 300 : activeTextStyles.fontWeight,
            hasBorders: true,
            zIndex: 1,
            pageNo: templateEditorStore.activePageForCanvas,
          },
          )
        }
        else {
          const isDatafield = templateEditorStore.fieldToAdd.type === 'Data field' || templateEditorStore.fieldToAdd.type === 'Static text' || templateEditorStore.fieldToAdd.type === 'Form text' || templateEditorStore.fieldToAdd.type === 'Form date' || templateEditorStore.fieldToAdd.type === 'Form time'
          currentHoveredEle = new templateEditorStore.fabric.Text(
          `${templateEditorStore.fieldToAdd.name}`,
          {
            left: event.absolutePointer.x,
            top: event.absolutePointer.y - (Number.parseFloat(activeTextStyles.fontSize)) + (Number.parseFloat(activeTextStyles.fontSize) / 5),
            fill: isDatafield ? '#ff0000' : activeTextStyles.fill,
            fontFamily: isDatafield ? 'Arial' : activeTextStyles.fontFamily,
            fontSize: activeTextStyles.fontSize,
            underline: isDatafield ? false : activeTextStyles.underline,
            textAlign: isDatafield ? 'center' : activeTextStyles.textAlign,
            fontStyle: isDatafield ? 'normal' : activeTextStyles.fontStyle,
            fontWeight: isDatafield ? 300 : activeTextStyles.fontWeight,
            hasBorders: true,
            zIndex: 1,
            pageNo: templateEditorStore.activePageForCanvas,
          },
          )
          canvas.add(currentHoveredEle)
        }

        if (templateEditorStore.activeAdvancedPointer) {
          if (tempXMargin && tempYMargin) {
            tempXMargin.set({ left: event.absolutePointer.x })
            tempYMargin.set({ top: event.absolutePointer.y + (Number.parseFloat(activeTextStyles.fontSize) / 10) })
          }
          else {
            tempXMargin = new fabric.Line([100, 1000, 100, 5000], {
              left: event.absolutePointer.x,
              top: 0,
              stroke: '#3978eb',
              selectable: false,

            })
            canvas.add(tempXMargin)
            tempYMargin = new fabric.Line([1000, 100, 2000, 100], {
              left: 0, // event.absolutePointer.x,
              top: event.absolutePointer.y + (Number.parseFloat(activeTextStyles.fontSize) / 10),
              stroke: '#3978eb',
              selectable: false,

            })
            canvas.add(tempYMargin)
          }
        }

        canvas.renderAll()
      }
      if (templateEditorStore.fieldToAdd.type === 'Dataset image' || templateEditorStore.fieldToAdd.type === 'fixed-image' || templateEditorStore.fieldToAdd.type === 'Form image') {
        if (currentHoveredEle && currentHoveredEle?._element) {
          currentHoveredEle.set({
            left: event.absolutePointer.x,
            top: event.absolutePointer.y - (currentHoveredEle.height),
            scaleX: 400 / currentHoveredEle.width,
            scaleY: 200 / currentHoveredEle.height,
          })

          if (templateEditorStore.activeAdvancedPointer) {
            if (tempXMargin && tempYMargin) {
              tempXMargin.set({ left: event.absolutePointer.x })
              tempYMargin.set({ top: event.absolutePointer.y })
            }
            else {
              canvas.remove(tempXMargin)
              canvas.remove(tempYMargin)
              tempXMargin = new fabric.Line([100, 1000, 100, 5000], {
                left: event.absolutePointer.x,
                top: 0,
                stroke: '#3978eb',
                selectable: false,

              })

              canvas.add(tempXMargin)
              tempYMargin = new fabric.Line([1000, 100, 2000, 100], {
                left: 0,
                top: event.absolutePointer.y,
                stroke: '#3978eb',
                selectable: false,

              })
              canvas.add(tempYMargin)
            }
          }
          canvas.renderAll()
        }
        else {
          fabric.Image.fromURL(
            'https://placehold.co/300x200?text=DocSpawn'
            , (myImg) => {
              if (currentHoveredEle)
                canvas.remove(currentHoveredEle)

              myImg.set({
                left: event.absolutePointer.x,
                top: event.absolutePointer.y - (myImg.height),
                scaleX: 400 / myImg.width,
                scaleY: 200 / myImg.height,
              })

              currentHoveredEle = myImg
              if (templateEditorStore.activeAdvancedPointer) {
                if (tempXMargin && tempYMargin) {
                  tempXMargin.set({ left: event.absolutePointer.x })
                  tempYMargin.set({ top: event.absolutePointer.y })
                }
                else {
                  tempXMargin = new fabric.Line([100, 1000, 100, 5000], {
                    left: event.absolutePointer.x,
                    top: 0,
                    stroke: '#3978eb',
                    selectable: false,

                  })

                  canvas.add(tempXMargin)
                  tempYMargin = new fabric.Line([1000, 100, 2000, 100], {
                    left: 0,
                    top: event.absolutePointer.y,
                    stroke: '#3978eb',
                    selectable: false,

                  })
                  canvas.add(tempYMargin)
                }
              }
              canvas.add(myImg)
              canvas.renderAll()
            },
          )
        }
      }
    })

    canvas.on('mouse:down', (event) => {
      if (currentHoveredEle)
        canvas.remove(currentHoveredEle)
      if (templateEditorStore.fieldToAdd.type === 'text' || templateEditorStore.fieldToAdd.type === 'Form text' || templateEditorStore.fieldToAdd.type === 'Static text' || templateEditorStore.fieldToAdd.type === 'Form date' || templateEditorStore.fieldToAdd.type === 'Form time' || templateEditorStore.fieldToAdd.type === 'Static date' || templateEditorStore.fieldToAdd.type === 'Static time' || templateEditorStore.fieldToAdd.subType === 'text' || templateEditorStore.fieldToAdd.type === 'Data field') {
        if (tempXMargin && tempYMargin) {
          const obs = canvas._objects
          canvas._objects = obs.filter((ob) => {
            const test3 = (ob.left === tempXMargin.left && ob.top === tempXMargin.top) || (ob.left === tempYMargin.left && ob.top === tempYMargin.top)

            if (test3)
              return false
            else
              return true
          })
        }
        canvas.renderAll()

        const isDatafield = templateEditorStore.fieldToAdd.type === 'Data field' || templateEditorStore.fieldToAdd.type === 'Static text' || templateEditorStore.fieldToAdd.type === 'Form text' || templateEditorStore.fieldToAdd.type === 'Form date' || templateEditorStore.fieldToAdd.type === 'Form time'

        const textEle = new templateEditorStore.fabric.Text(
          `${templateEditorStore.fieldToAdd.name}`,
          {
            cornerStyle: 'circle',
            borderColor: '#00000066',
            cornerColor: '#119bd6',
            transparentCorners: false,

            left: event.absolutePointer.x,
            top: event.absolutePointer.y - (Number.parseFloat(activeTextStyles.fontSize)) + (1 * (Number.parseFloat(activeTextStyles.fontSize) / 5)),
            fill: isDatafield ? '#ff0000' : activeTextStyles.fill,
            fontFamily: isDatafield ? 'Arial' : activeTextStyles.fontFamily,
            fontSize: activeTextStyles.fontSize,
            underline: isDatafield ? false : activeTextStyles.underline,
            textAlign: isDatafield ? 'center' : activeTextStyles.textAlign,
            fontStyle: isDatafield ? 'normal' : activeTextStyles.fontStyle,
            fontWeight: isDatafield ? 300 : activeTextStyles.fontWeight,
            hasBorders: true,
            zIndex: 1,
            fieldType: templateEditorStore.fieldToAdd.type,
            id: templateEditorStore.fieldToAdd.id,
            hash: uuid.v1(),

            pageNo: templateEditorStore.activePageForCanvas,
            displayGuide: false,
          },
        )
        textEle.setControlsVisibility({ mt: false, mb: false, mr: false, ml: false, mtr: false })

        const fieldToAdd = { fieldType: templateEditorStore.fieldToAdd.type, name: templateEditorStore.fieldToAdd.id, hash: textEle.hash, page: templateEditorStore.activePageForCanvas,
        }
        const allFields = []
        templateEditorStore.addedFields.forEach((f) => {
          allFields.push(JSON.parse(JSON.stringify(f)))
        })
        allFields.push(fieldToAdd)
        templateEditorStore.addedFields = allFields

        canvas.renderAll()

        templateEditorStore.fieldToAdd = {}
        textEle.on('mouseover', (e) => {
          if (!templateEditorStore.activeAdvancedPointer)
            return
          canvas.add(new fabric.Line([100, 1000, 100, 5000], {
            left: e.target.left,
            top: 0,
            stroke: '#3978eb',
            id: e.target.hash,
            fieldType: textEle.fieldType,
            selectable: false,
          }))
          canvas.add(new fabric.Line([1000, 100, 2000, 100], {
            left: 0, // event.absolutePointer.x,
            top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)),
            stroke: '#3978eb',
            id: e.target.hash,
            fieldType: textEle.fieldType,
            selectable: false,
          }))
        })
        textEle.on('mouseout', (e) => {
          if (!templateEditorStore.activeAdvancedPointer)
            return

          const objs = canvas._objects
          canvas._objects = objs.filter((obj) => {
            if (obj.stroke === '#3978eb' && obj?.id === e.target.hash && !e.target.displayGuide)
              return false
            else
              return true
          })

          canvas.renderAll()
        })
        canvas.add(textEle)

        canvas.renderAll()
        /** remove field */
        const remainingFields = templateEditorStore.addedFields.filter(f => f?.name !== templateEditorStore.fieldToAdd?.name)
        templateEditorStore.addedFields = remainingFields
      }
      if (templateEditorStore.fieldToAdd.type === 'Dataset image' || templateEditorStore.fieldToAdd.type === 'fixed-image' || templateEditorStore.fieldToAdd.type === 'Form image') {
        const ftoadd = templateEditorStore.fieldToAdd
        templateEditorStore.fieldToAdd = {}
        fabric.Image.fromURL(
          'https://placehold.co/300x200?text=DocSpawn'
          , (myImg) => {
            if (currentHoveredEle)
              canvas.remove(currentHoveredEle)
            if (tempXMargin && tempYMargin) {
              const obs = canvas._objects
              canvas._objects = obs.filter((ob) => {
                const test3 = (ob.left === tempXMargin.left && ob.top === tempXMargin.top) || (ob.left === tempYMargin.left && ob.top === tempYMargin.top)

                if (test3)
                  return false
                else
                  return true
              })
            }
            canvas.renderAll()

            myImg.set({
              cornerStyle: 'circle',
              borderColor: '#00000066',
              cornerColor: '#119bd6',
              transparentCorners: false,

              left: event.absolutePointer.x,
              top: event.absolutePointer.y - (myImg.height),
              scaleX: 400 / myImg.width,
              scaleY: 200 / myImg.height,
              id: ftoadd.id,
              hash: uuid.v1(),
              fieldType: ftoadd.type,
              pageNo: templateEditorStore.activePageForCanvas,
              displayGuide: false,
            })
            myImg.setControlsVisibility({ mtr: false })

            const fieldToAdd = { fieldType: ftoadd.type, name: ftoadd.id, hash: myImg.hash, page: templateEditorStore.activePageForCanvas,
            }

            const allFields = []
            templateEditorStore.addedFields.forEach((f) => {
              allFields.push(JSON.parse(JSON.stringify(f)))
            })

            allFields.push(fieldToAdd)
            templateEditorStore.addedFields = allFields
            canvas.renderAll()
            templateEditorStore.fieldToAdd = {}

            myImg.on('mouseover', (e) => {
              if (!templateEditorStore.activeAdvancedPointer)
                return
              canvas.add(new fabric.Line([100, 1000, 100, 5000], {
                left: e.target.left,
                top: 0,
                stroke: '#3978eb',
                id: e.target.hash,
                fieldType: myImg.fieldType,
                selectable: false,

              }))
              canvas.add(new fabric.Line([1000, 100, 2000, 100], {
                left: 0, // event.absolutePointer.x,
                top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY),

                stroke: '#3978eb',
                id: e.target.hash,
                fieldType: myImg.fieldType,
                selectable: false,
              }))
            })
            myImg.on('mouseout', (e) => {
              if (!templateEditorStore.activeAdvancedPointer)
                return

              const objs = canvas._objects
              canvas._objects = objs.filter((obj) => {
                if (obj?.stroke === '#3978eb' && obj?.id === e.target?.hash && !e.target.displayGuide)
                  return false
                else
                  return true
              })

              canvas.renderAll()
            })

            canvas.add(myImg)
            canvas.renderAll()
          },
        )
      }
      // for showing options when click
      const activeObj = canvas.getActiveObject()

      if (activeObj && activeObj?.id !== 'watermark-docspawn') {
        templateEditorStore.showOptionsBar = true
        const field = templateEditorStore.addedFields.filter(f => f?.hash === activeObj?.hash)[0]
        templateEditorStore.selectedAddedField = { ...field, obj: activeObj }
      }

      else {
        templateEditorStore.showOptionsBar = false
        templateEditorStore.selectedAddedField = {}
      }
      templateEditorStore.activeTemplateField = false
      templateEditorStore.ShowAddedFieldsinTemplateFields = true
    })

    canvas.on('mouse:out', () => {
      if (tempXMargin) {
        canvas.remove(tempXMargin)
        tempXMargin = null
      }
      if (tempYMargin) {
        canvas.remove(tempYMargin)
        tempYMargin = null
      }
      if (currentHoveredEle && (templateEditorStore.fieldToAdd.type === 'text' || templateEditorStore.fieldToAdd.type === 'Static text' || templateEditorStore.fieldToAdd.type === 'Data field' || templateEditorStore.fieldToAdd.type === 'Dataset image'))
        canvas.remove(currentHoveredEle.value)
    })
  }
}
