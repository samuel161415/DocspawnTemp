// checked image
// https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/cb212f15-9a46-420d-b091-6f9f8096a048_yes1.png
// unchecked image
// https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png

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
              left: canvas.width - (myImg.width * (80 / myImg.width)) - 10,
              top: canvas.height - (myImg.height * (80 / myImg.height)) - 10,
              scaleX: 80 / myImg.width,
              scaleY: 80 / myImg.height,
              id: 'watermark-docspawn',

              lockUniScaling: true,
              lockScalingX: true,
              lockScalingY: true,
              uniformScaling: false,

            })
            if (templateEditorStore.watermarkDisabled)
              myImg.set({ visible: false, opacity: 0 })

            myImg.setControlsVisibility({ tr: false, tl: false, br: false, bl: false, mt: false, mb: false, mr: false, ml: false, mtr: false })
            canvas.add(myImg)

            canvas.renderAll()
          },
        )
      }
    }
    let firstWatermarkFound = false

    canvas.on('after:render', () => {
      // setting border to multiline textbox
      canvas.contextContainer.strokeStyle = '#0003'

      canvas.forEachObject((obj) => {
        if (obj.fieldType === 'Form long text' && !obj.stroke) {
          const bound = obj.getBoundingRect()

          canvas.contextContainer.strokeRect(
            bound.left + 0.1,
            bound.top + 0.1,
            bound.width,
            bound.height,
          )

          // Handle 'watermark' objects

          if (obj.id === 'watermark-docspawn') {
            if (!firstWatermarkFound) {
              firstWatermarkFound = true
            }
            else {
              canvas.remove(obj)
              firstWatermarkFound = false
            }
          }
        }
      })
    })

    /** */
    canvas.on('object:moving', (e) => {
      canvas._objects.forEach((obj) => {
        if (obj.id === 'watermark-docspawn' && e.target.id === obj.id) {
          if (e.target.left <= 10)
            obj.set({ left: 10 })
          if (e.target.top <= 10)
            obj.set({ top: 10 })
          if (e.target.left + (e.target.width * e.target.scaleX) >= canvas.width - 10)
            obj.set({ left: canvas.width - (e.target.width * e.target.scaleX) - 10 })
          if (e.target.top + (e.target.height * e.target.scaleY) >= canvas.height - 10)
            obj.set({ top: canvas.height - (e.target.height * e.target.scaleY) - 10 })
        }
        else if (obj.id === e.target.hash && obj.stroke) {
          if (obj.top === 0)
            obj.set({ top: 0, left: e.target.left })
          if (obj.left === 0) {
            if (obj.fieldType === 'fixed-image' || obj.fieldType === 'Dataset image' || obj.fieldType === 'Form image' || obj.fieldType === 'Form long text')
              obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY), left: 0 })
            else
              obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)), left: 0 })
          }
        }
        if (obj.isAlertIcon && obj.id === e.target.hash)
          obj.set({ top: e.target.top, left: e.target.left + (e.target.width * e.target.scaleX) })
        if (obj.id === 'checkboxIdNoIcon' && obj.checkboxHash === e.target.checkboxIdentifierHash)
          obj.set({ left: e.target?.left + (e.target?.width * e.target?.scaleX) - 13, top: e.target?.top + (e.target.height * e.target?.scaleY) - 13 })
      })

      canvas.renderAll()
    })
    canvas.on('object:scaling', (e) => {
      /** *updating last scaled options */

      if (e.target instanceof fabric.Text)
        templateEditorStore.lastScaledTextOptions = { x: e.target.scaleX, y: e.target.scaleY }

      // if(e.target.fieldType==='Form text'||e.target.fieldType==='Data field'||e.target.)

      /** */
      canvas._objects.forEach((obj) => {
        if (obj.id === 'watermark-docspawn')
          return
        /** */
        if (obj.id === e.target.hash && obj.stroke) {
          // console.log('e.pointe', e.pointer)
          // console.log('e.target', e.target)
          // console.log('obj', obj)
          // console.log('e arget lineheight', e.target.lineHeight)
          // console.log('e target font sze', e.target.fontSize)
          // console.log('e.target.lineHeight*e.target.fontSize', e.target.lineHeight * e.target.fontSize)
          // console.log('e.target.lineHeight*e.target.fontSize*e.target.scaleY', e.target.lineHeight * e.target.fontSize * e.target.scaleY)
          // console.log('Total height', e.target.height * e.target.scaleY)

          // console.log('obj.top', obj.top - (e.target.fontSize * e.target.scaleY) + (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 10)))
          /****
           * first clculation of bottom margi, bottom of element=
           * top: e.target.top + (e.target.fontSize * e.target.scaleY)
           * second calculation of bottom margin, bottm f text in element=
           * top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5))
           *
           *
           */
          if (obj.top === 0)
            obj.set({ top: 0, left: e.target.left })
          if (obj.left === 0) {
            if (
              obj.fieldType === 'fixed-image' || obj.fieldType === 'Dataset image' || obj.fieldType === 'Form image' || obj.fieldType === 'Form long text')
              obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY), left: 0 })
            else
              e.target.set({ top: obj.top - (e.target.fontSize * e.target.scaleY) + (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 10)) })

            // obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)), left: 0 })
          }
        }
        // if (obj.id === e.target.hash && obj.stroke) {
        //   if (obj.top === 0)
        //     obj.set({ top: 0, left: e.target.left })
        //   if (obj.left === 0) {
        //     if (
        //       obj.fieldType === 'fixed-image' || obj.fieldType === 'Dataset image' || obj.fieldType === 'Form image' || obj.fieldType === 'Form long text')
        //       obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY), left: 0 })
        //     else
        //       obj.set({ top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)), left: 0 })
        //   }
        // }
        /** */
        if (obj.isAlertIcon && obj.id === e.target.hash)
          obj.set({ top: e.target.top, left: e.target.left + (e.target.width * e.target.scaleX) })
        if (obj.id === 'checkboxIdNoIcon' && obj.checkboxHash === e.target.checkboxIdentifierHash)
          obj.set({ left: e.target?.left + (e.target?.width * e.target?.scaleX) - 13, top: e.target?.top + (e.target.height * e.target?.scaleY) - 13 })

        if (obj?.fieldType === 'Form long text') {
          const lineHeight = obj.fontSize * obj.lineHeight
          const currentHeight = obj.height
          const targetHeight = obj.height * obj.scaleY
          const lineDifference = Math.floor((targetHeight - currentHeight) / lineHeight)

          if (lineDifference !== 0) {
            let sampleText = obj?.text?.split('\n')
            if (lineDifference > 0) {
              // Add lines if scaling up
              for (let i = 0; i < lineDifference; i++)
                sampleText.push('')
            }
            else {
              // sampleText = sampleText.slice(0, lineDifference)
              // Remove lines if scaling down, but keep at least one line
              sampleText = sampleText.slice(0, Math.max(sampleText.length + lineDifference, 1))
            }

            obj.set('text', sampleText.join('\n'))
          }

          const newWidth = obj.width * obj.scaleX

          // Reset width and scaling factors
          obj.set({
            width: newWidth,
            scaleX: 1,
            scaleY: 1,
          })

          // Clear cache and recalculate dimensions
          obj._clearCache()
          obj.initDimensions()

          obj.setCoords()
          canvas.renderAll()
        }
      })

      canvas.renderAll()
    })

    let tempXMargin = null
    let tempYMargin = null
    let currentHoveredEle = null
    canvas.on('mouse:move', (event) => {
      // console.log('mouse event', event.absolutePointer)
      if (templateEditorStore.fieldToAdd.type === 'text' || templateEditorStore.fieldToAdd.type === 'Form text' || templateEditorStore.fieldToAdd.type === 'Data field' || templateEditorStore.fieldToAdd.type === 'Dataset date' || templateEditorStore.fieldToAdd.type === 'Form date' || templateEditorStore.fieldToAdd.type === 'Form time' || templateEditorStore.fieldToAdd.type === 'Form list' || templateEditorStore.fieldToAdd.type === 'Static date' || templateEditorStore.fieldToAdd.type === 'Static time' || templateEditorStore.fieldToAdd.type === 'Static text') {
        if (currentHoveredEle && currentHoveredEle?.text) {
          const isDatafield = false
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
            charSpacing: 0, // isDatafield ? 0 : activeTextStyles.charSpacing,
            hasBorders: true,
            zIndex: 1,
            pageNo: templateEditorStore.activePageForCanvas,

            scaleX: templateEditorStore?.lastScaledTextOptions?.x,
            scaleY: templateEditorStore?.lastScaledTextOptions?.y,
          },
          )
        }
        else {
          canvas.remove(currentHoveredEle)
          const isDatafield = false
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
            charSpacing: 0, // isDatafield ? 0 : activeTextStyles.charSpacing,
            hasBorders: true,
            zIndex: 1,
            pageNo: templateEditorStore.activePageForCanvas,
            scaleX: templateEditorStore?.lastScaledTextOptions?.x,
            scaleY: templateEditorStore?.lastScaledTextOptions?.y,
          },
          )
          canvas.add(currentHoveredEle)
        }

        if (templateEditorStore.activeAdvancedPointer) {
          if (tempXMargin && tempYMargin) {
            tempXMargin.set({ left: event.absolutePointer.x })
            tempYMargin.set({ top: currentHoveredEle.top + (Number.parseFloat(currentHoveredEle.height) * currentHoveredEle.scaleY) - (1 * ((Number.parseFloat(currentHoveredEle.height) * currentHoveredEle.scaleY) / 5)),
              // event.absolutePointer.y + (Number.parseFloat(activeTextStyles.fontSize) / 10)
            })
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
              top: currentHoveredEle.top + (Number.parseFloat(currentHoveredEle.height) * currentHoveredEle.scaleY) - (1 * ((Number.parseFloat(currentHoveredEle.height) * currentHoveredEle.scaleY) / 5)), // event.absolutePointer.y + (Number.parseFloat(activeTextStyles.fontSize) / 10) ,
              stroke: '#3978eb',
              selectable: false,

            })
            canvas.add(tempYMargin)
          }
        }

        canvas.renderAll()
      }
      if (templateEditorStore.fieldToAdd.type === 'Form long text') {
        if (currentHoveredEle && currentHoveredEle?.text) {
          const isDatafield = false
          currentHoveredEle.set({
            width: 300,
            left: event.absolutePointer.x,
            top: event.absolutePointer.y - (Number.parseFloat(activeTextStyles.fontSize)) + (Number.parseFloat(activeTextStyles.fontSize) / 5),
            fill: isDatafield ? '#ff0000' : activeTextStyles.fill,
            fontFamily: isDatafield ? 'Arial' : activeTextStyles.fontFamily,
            fontSize: activeTextStyles.fontSize,
            underline: isDatafield ? false : activeTextStyles.underline,
            textAlign: isDatafield ? 'left' : activeTextStyles.textAlign,
            fontStyle: isDatafield ? 'normal' : activeTextStyles.fontStyle,
            fontWeight: isDatafield ? 300 : activeTextStyles.fontWeight,
            hasBorders: true,
            zIndex: 1,
            pageNo: templateEditorStore.activePageForCanvas,
          },
          )
        }
        else {
          canvas.remove(currentHoveredEle)
          const isDatafield = false
          currentHoveredEle = new templateEditorStore.fabric.Textbox(
          `${templateEditorStore.fieldToAdd.name}`,
          {
            width: 300,
            left: event.absolutePointer.x,
            top: event.absolutePointer.y - (Number.parseFloat(activeTextStyles.fontSize)) + (Number.parseFloat(activeTextStyles.fontSize) / 5),
            fill: isDatafield ? '#ff0000' : activeTextStyles.fill,
            fontFamily: isDatafield ? 'Arial' : activeTextStyles.fontFamily,
            fontSize: activeTextStyles.fontSize,
            underline: isDatafield ? false : activeTextStyles.underline,
            textAlign: isDatafield ? 'left' : activeTextStyles.textAlign,
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
      if (templateEditorStore.fieldToAdd.type === 'Dataset image' || templateEditorStore.fieldToAdd.type === 'fixed-image' || templateEditorStore.fieldToAdd.type === 'Form image' || templateEditorStore.fieldToAdd.type === 'Static image') {
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
            'https://placehold.co/300x200?text=Image'
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
      if (templateEditorStore.fieldToAdd.type === 'Form checkbox group') {
        if (currentHoveredEle && currentHoveredEle?._element) {
          currentHoveredEle.set({
            left: event.absolutePointer.x - (40 / currentHoveredEle.width),
            top: event.absolutePointer.y - (40 / currentHoveredEle.height),
            scaleX: 40 / currentHoveredEle.width,
            scaleY: 40 / currentHoveredEle.height,
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
            'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png'
            , (myImg) => {
              if (currentHoveredEle)
                canvas.remove(currentHoveredEle)

              myImg.set({
                left: event.absolutePointer.x - (40 / myImg.width),
                top: event.absolutePointer.y - (40 / myImg.height),
                scaleX: 40 / myImg.width,
                scaleY: 40 / myImg.height,
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
      const isFormField = ['Form text', 'Form long text', 'Form image', 'Form date', 'Form time', 'Form list', 'Form checkbox group']?.includes(templateEditorStore.fieldToAdd.type)
      if (currentHoveredEle)
        canvas.remove(currentHoveredEle)
      if (templateEditorStore.fieldToAdd.type === 'text' || templateEditorStore.fieldToAdd.type === 'Form text' || templateEditorStore.fieldToAdd.type === 'Static text' || templateEditorStore.fieldToAdd.type === 'Form date' || templateEditorStore.fieldToAdd.type === 'Form list' || templateEditorStore.fieldToAdd.type === 'Form time' || templateEditorStore.fieldToAdd.type === 'Static date' || templateEditorStore.fieldToAdd.type === 'Static time' || templateEditorStore.fieldToAdd.subType === 'text' || templateEditorStore.fieldToAdd.type === 'Data field' || templateEditorStore.fieldToAdd.type === 'Dataset date') {
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

        const isDatafield = false

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
            charSpacing: 0, // isDatafield ? 0 : activeTextStyles.charSpacing,
            hasBorders: true,
            zIndex: 1,
            fieldType: templateEditorStore.fieldToAdd.type,
            id: templateEditorStore.fieldToAdd.id,
            hash: uuid.v1(),

            pageNo: templateEditorStore.activePageForCanvas,
            displayGuide: false,

            scaleX: templateEditorStore?.lastScaledTextOptions?.x,
            scaleY: templateEditorStore?.lastScaledTextOptions?.y,
            lockScalingFlip: true,

          },
        )
        textEle.setControlsVisibility({ mt: false, mb: false, mr: false, ml: false, mtr: false })

        let fieldToAdd = { isFormField, isRequired: true, fieldType: templateEditorStore.fieldToAdd.type, name: templateEditorStore.fieldToAdd.id, id: templateEditorStore.fieldToAdd.id, hash: textEle.hash, page: templateEditorStore.activePageForCanvas,
        }
        if (templateEditorStore.fieldToAdd?.dateFormat)
          fieldToAdd = { ...fieldToAdd, dateFormat: templateEditorStore.fieldToAdd?.dateFormat }
        if (templateEditorStore.fieldToAdd?.timeFormat)
          fieldToAdd = { ...fieldToAdd, timeFormat: templateEditorStore.fieldToAdd?.timeFormat }

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
            if (obj.stroke === '#3978eb' && obj?.id === e.target?.hash && !e.target.displayGuide)
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
      if (templateEditorStore.fieldToAdd.type === 'Form long text') {
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

        const isDatafield = false

        const textEle = new templateEditorStore.fabric.Textbox(
          `${templateEditorStore.fieldToAdd.name}`,
          {
            cornerStyle: 'circle',
            borderColor: '#00000066',
            cornerColor: '#119bd6',

            transparentCorners: false,
            transparentBorders: false,
            width: 300,
            left: event.absolutePointer.x,
            top: event.absolutePointer.y - (Number.parseFloat(activeTextStyles.fontSize)) + (1 * (Number.parseFloat(activeTextStyles.fontSize) / 5)),
            fill: isDatafield ? '#ff0000' : activeTextStyles.fill,
            fontFamily: isDatafield ? 'Arial' : activeTextStyles.fontFamily,
            fontSize: activeTextStyles.fontSize,
            underline: isDatafield ? false : activeTextStyles.underline,
            textAlign: isDatafield ? 'left' : activeTextStyles.textAlign,
            fontStyle: isDatafield ? 'normal' : activeTextStyles.fontStyle,
            fontWeight: isDatafield ? 300 : activeTextStyles.fontWeight,
            hasBorders: true,
            borderColor: 'black',
            borderStyle: 'solid',
            // backgroundColor: '#3498db34',
            // borderColor: 1,
            zIndex: 1,
            fieldType: templateEditorStore.fieldToAdd.type,
            id: templateEditorStore.fieldToAdd.id,
            hash: uuid.v1(),
            // editingBorderColor: 'blue',
            pageNo: templateEditorStore.activePageForCanvas,
            displayGuide: false,
            editable: false,
            lockScalingFlip: true,
          },
        )
        textEle.setControlsVisibility({
          mt: false, // middle top
          // mb: false, // middle bottom
          ml: false, // middle left
          // mr: false, // middle right
          bl: false, // bottom left
          br: false, // bottom right
          tl: false, // top left
          tr: false, // top right
          mtr: false, // middle top rotate
        })

        const fieldToAdd = { isFormField, isRequired: true, fieldType: templateEditorStore.fieldToAdd.type, name: templateEditorStore.fieldToAdd.id, id: templateEditorStore.fieldToAdd.id, hash: textEle.hash, page: templateEditorStore.activePageForCanvas,
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
            top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY),
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
      if (templateEditorStore.fieldToAdd.type === 'Dataset image' || templateEditorStore.fieldToAdd.type === 'fixed-image' || templateEditorStore.fieldToAdd.type === 'Form image' || templateEditorStore.fieldToAdd.type === 'Static image') {
        const ftoadd = templateEditorStore.fieldToAdd

        templateEditorStore.fieldToAdd = {}
        fabric.Image.fromURL(
          'https://placehold.co/300x200?text=Image'
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
              lockScalingFlip: true,
            })
            myImg.setControlsVisibility({ mtr: false })

            const fieldToAdd = { isFormField, isRequired: true, fieldType: ftoadd.type, name: ftoadd.id, id: ftoadd.id, hash: myImg.hash, page: templateEditorStore.activePageForCanvas,
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
      if (templateEditorStore.fieldToAdd.type === 'Form checkbox group') {
        const ftoadd = templateEditorStore.fieldToAdd
        templateEditorStore.fieldToAdd = {}
        fabric.Image.fromURL(
          'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png'
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
            const colorsForCheckboxGroup = generateLightAndDarkColors()
            const uniqueHashForEle = uuid.v1()
            myImg.set({
              cornerStyle: 'circle',
              borderColor: '#00000066',
              cornerColor: '#119bd6',
              transparentCorners: false,

              left: event.absolutePointer.x - (40 / myImg.width),
              top: event.absolutePointer.y - (40 / myImg.height),
              scaleX: 40 / myImg.width,
              scaleY: 40 / myImg.height,
              id: ftoadd.id,
              hash: uuid.v1(),
              checkboxIdentifierHash: uniqueHashForEle,
              fieldType: ftoadd.type,
              pageNo: templateEditorStore.activePageForCanvas,
              displayGuide: false,
              lockScalingFlip: true,
            })
            // myImg.setControlsVisibility({ mtr: false })
            myImg.setControlsVisibility({ mt: false, mb: false, mr: false, ml: false, mtr: false })
            /** calculating no of checkbox groups and assigning position no */
            const totalCheckboxGroups = templateEditorStore?.addedFields?.filter(f => f?.fieldType === 'Form checkbox group')?.length

            const fieldToAdd = { isFormField, isRequired: true, groupPosition: totalCheckboxGroups ? totalCheckboxGroups + 1 : 1, fieldType: ftoadd.type, designs: ftoadd?.designs, name: ftoadd.id, id: ftoadd.id, hash: myImg.hash, page: templateEditorStore.activePageForCanvas, minOptions: 1, maxOptions: 0, checkboxes: [{ text: '', id: 1, checkboxIdentifierHash: uniqueHashForEle }], colorsForCheckboxGroup,
            }

            const allFields = []
            templateEditorStore.addedFields.forEach((f) => {
              allFields.push(JSON.parse(JSON.stringify(f)))
            })

            allFields.push(fieldToAdd)
            templateEditorStore.addedFields = allFields
            canvas.renderAll()
            templateEditorStore.fieldToAdd = {}

            const tooltip = new fabric.Text(' Enter label ', {
              left: myImg.left + (myImg.width * myImg.scaleX),
              top: myImg.top - 10,
              fill: 'white',
              backgroundColor: '#009ee2',
              fieldType: 'checkbox-tooltip',
              checkboxHash: myImg?.checkboxIdentifierHash,
              selectable: false,
              evented: false,
              fontSize: 18,
              visible: false,
              opacity: 0,
            })

            myImg.tooltip = tooltip
            canvas.add(tooltip)

            myImg.on('mouseover', (e) => {
              myImg.tooltip.set({ visible: true, opacity: 1 })
              canvas.renderAll()
              // const tooltip = new fabric.Text('Tooltip Text', {
              //   left: myImg.left + (myImg.width * myImg.scaleX),
              //   top: myImg.top - 10,
              //   fill: 'white',
              //   backgroundColor: '#009ee2',
              //   fieldType: 'checkbox-tooltip',
              //   checkboxHash: myImg?.checkboxIdentifierHash,
              //   selectable: false,
              //   evented: false,
              //   fontSize: 18,
              //   padding: 28,
              // })

              // myImg.tooltip = tooltip
              // canvas.add(tooltip)
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
              if (myImg.tooltip) {
                // canvas.remove(myImg.tooltip)
                // myImg.tooltip = null
                myImg.tooltip.set({ visible: false, opacity: 0 })
                canvas.renderAll()
              }

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
            myImg.on('moving', () => {
              if (myImg.tooltip.visible) {
                myImg.tooltip.set({
                  left: myImg.left + (myImg.width * myImg.scaleX),
                  top: myImg.top - 10,
                })
                canvas.renderAll()
              }
            })

            /** ********creating checkbox info icon */
            // https://placehold.co/400/000000/ffffff?font=roboto&text=1
            fabric.Image.fromURL(
                `https://placehold.co/100/${colorsForCheckboxGroup?.light}/${colorsForCheckboxGroup?.dark}?font=roboto&text=1`
                , (icon) => {
                  icon.set({

                    left: myImg?.left + (myImg?.width * myImg?.scaleX) - 13,
                    top: myImg?.top + (myImg.height * myImg?.scaleY) - 13,
                    scaleX: 20 / icon.width,
                    scaleY: 20 / icon.height,
                    id: 'checkboxIdNoIcon',
                    checkboxHash: myImg.checkboxIdentifierHash,
                    checkboxGroupHash: myImg?.hash,
                    fieldType: 'checkboxIdNoIcon',
                    pageNo: templateEditorStore.activePageForCanvas,
                    displayGuide: false,
                    hasControls: false,
                    selectable: false,
                  })
                  canvas.add(icon)
                  canvas.renderAll()
                },
            )

            /** */

            canvas.add(myImg)
            canvas.renderAll()
          },
        )
      }
      // for showing options when click
      const activeObj = canvas.getActiveObject()

      // console.log('active object', activeObj)
      if (activeObj instanceof fabric.Text)
        templateEditorStore.lastScaledTextOptions = { x: activeObj.scaleX, y: activeObj.scaleY }

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

      // if (currentHoveredEle)
      //   canvas.remove(currentHoveredEle)

      canvas.renderAll()
    })
    document.addEventListener('click', (event) => {
      // Get the canvas element's bounding box
      const canvasRect = canvas.getElement().getBoundingClientRect()

      // Check if the click is outside the canvas
      if (
        event.clientX < canvasRect.left
        || event.clientX > canvasRect.right
        || event.clientY < canvasRect.top
        || event.clientY > canvasRect.bottom
      ) {
        if (currentHoveredEle)
          canvas.remove(currentHoveredEle)
          // templateEditorStore.fieldToAdd = null

        canvas.renderAll()
      }
    })
  }
}

function getRandomHexColor(isLight) {
  let color = ''
  for (let i = 0; i < 3; i++) {
    let component = Math.floor(Math.random() * 128) // Values from 0 to 127
    if (isLight)
      component += 128 // Values from 128 to 255

    const hex = component.toString(16).padStart(2, '0')
    color += hex
  }
  return color
}

function generateLightAndDarkColors() {
  const lightColor = getRandomHexColor(true)
  const darkColor = getRandomHexColor(false)

  return {
    light: lightColor,
    dark: darkColor,
  }
}
