<template>
  <template v-for="(field, index) in templateEditorStore.addedFields?.filter(f => !f?.isTextBoxInserted)" :key="index">
    <!-- v-if="templateEditorStore.ShowAddedFieldsinTemplateFields === true" -->
    <div

      class="px-5 h-[62px] flex items-center mb-3 gap-2 rounded-lg shadow-sm w-full border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:bg-primary-50"
      :class="{
        'border-primaryBlue bg-primary-50': templateEditorStore?.selectedAddedField?.hash === field?.hash,
        'border-surface-100 bg-surface-50': templateEditorStore?.selectedAddedField?.hash !== field?.hash,
      }"
    >
      <div
        class="h-full w-full py-2 cursor-pointer overflow-hidden"
        @click="templateEditorStore?.selectedAddedField?.hash !== field?.hash && selectAddedField(field)"
      >
        <p
          v-if="field.name === 'Lorem ipsum' && (field?.fieldType === 'Data field' && field?.fieldType === 'Dataset image')"
          class="font-poppins text-red-400 text-lg mt-1"
        >
          {{ $t('Cp_createTemplate_editorTemplateFields.select_a_data_field') }}
        </p>
        <p
          v-else-if="(field.name === 'Add text' || field.name === 'Lorem ipsum') && field?.fieldType === 'Static text'"
          class="font-poppins text-red-400 text-lg mt-1"
        >
          {{ $t('Cp_createTemplate_editorTemplateFields.add_text') }}
        </p>
        <p
          v-else-if="(field.name === 'Add field name' || field.name === 'Lorem ipsum') && (field?.fieldType === 'Static image')"
          class="font-poppins text-red-400 text-lg mt-1"
        >
          {{ $t('Cp_createTemplate_editorTemplateFields.select_image') }}
        </p>
        <p
          v-else-if="(field.name === 'Add field name' || field.name === 'Lorem ipsum') && (field?.fieldType === 'Form text' || field?.fieldType === 'Form image' || field?.fieldType === 'Form date' || field?.fieldType === 'Form time' || field?.fieldType === 'Form long text' || field?.fieldType === 'Form list')"
          class="font-poppins text-red-400 text-lg mt-1"
        >
          {{ $t('Cp_createTemplate_editorTemplateFields.add_field_name') }}
        </p>
        <p
          v-else-if="(field.name === 'Add description' || field.name === 'Lorem ipsum') && (field?.fieldType === 'Form checkbox group')"
          class="font-poppins text-red-400 text-lg mt-1"
        >
          {{ $t('Cp_createTemplate_editorTemplateFields.add_description') }}
        </p>

        <p v-if="field.name !== 'Lorem ipsum'" class="font-poppins text-surface-600 text-lg mt-1 overflow-ellipsis max-w-36 whitespace-nowrap overflow-hidden">
          {{ field.name }}
        </p>

        <p v-if="field?.fieldType === 'Form checkbox group'" class="font-poppins text-surface-600 text-sm">
          {{ $t('Cp_createTemplate_editorTemplateFields.checkbox_group') }} {{ field?.groupPosition }} - <span class="text-primaryBlue">p.{{ field.page }}</span>
        </p>
        <p v-else class="font-poppins text-surface-600 text-sm">
          {{ field?.fieldType === 'Form list' ? $t('Cp_createTemplate_editorTemplateFields.list_selection') : field?.fieldType }} - <span class="text-primaryBlue">p.{{ field.page }}</span>
        </p>
      </div>

      <div class="flex flex-row gap-4">
        <Button v-if="field?.fieldType !== 'Form checkbox group' && field?.fieldType !== 'Text box'" v-tooltip.top="$t('Cp_createTemplate_editorTemplateFields.duplicate')" text class="text-lg text-surface-600 w-max h-max" @click="duplicateField(field)">
          <font-awesome-icon icon="fa-light fa-clone" size="lg" />
        </Button>
        <Button v-tooltip.top="$t('Cp_createTemplate_editorTemplateFields.delete')" text class="text-lg text-surface-600 w-max h-max" @click="fieldToDelete = field;confirm2($event)">
          <font-awesome-icon icon="fa-light fa-trash" size="lg" />
        </Button>
      </div>
    </div>
  </template>
</template>

<script setup>
import { uuid } from 'vue-uuid'
import { useConfirm } from 'primevue/useconfirm'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'

// const emit = defineEmits(['selectAddedField'])

const confirm = useConfirm()

const fieldToDelete = ref()

function confirm2(event) {
  confirm.require({
    target: event.currentTarget,
    message: ' Do you want to delete this field?',
    group: 'confirmFieldDeletion',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm text-black  ',
    acceptClass: ' p-button-sm bg-surface-500 hover:bg-surface-500 ring-0 focus:ring-0 border-none ',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    accept: () => {
      deleteField()
    },
    reject: () => {
    },
  })
}

function duplicateField(field) {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const objs = canvas._objects
    objs.forEach((obj) => {
      if (obj.hash === field.hash) {
        if (obj?._element && !obj.stroke && !obj.isAlertIcon) {
          fabric.Image.fromURL(
            'https://placehold.co/300x200?text=Image'
            , (myImg) => {
              myImg.set({
                cornerStyle: 'circle',
                borderColor: '#00000066',
                cornerColor: '#119bd6',
                transparentCorners: false,
                left: 20,
                top: 20,
                scaleX: obj.scaleX,
                scaleY: obj.scaleY,
                height: obj.height,
                width: obj.width,
                id: obj.id,
                hash: uuid.v1(),
                fieldType: obj.fieldType,
                pageNo: obj.pageNo,
                displayGuide: false,
                lockScalingFlip: true,
              })
              myImg.setControlsVisibility({ mtr: false })

              const fieldToAdd = { fieldType: myImg.fieldType, name: myImg.id, hash: myImg.hash, page: myImg.pageNo,
              }
              const allFields = []
              templateEditorStore.addedFields.forEach((f) => {
                allFields.push(JSON.parse(JSON.stringify(f)))
              })
              allFields.push(fieldToAdd)

              templateEditorStore.addedFields = allFields
              canvas.renderAll()

              myImg.on('mouseover', (e) => {
                if (!templateEditorStore.activeAdvancedPointer)
                  return
                canvas.add(new fabric.Line([100, 1000, 100, 5000], {
                  left: e.target.left,
                  top: 0,
                  stroke: '#3978eb',
                  id: e.target.hash,
                  fieldType: myImg.fieldType,

                }))
                canvas.add(new fabric.Line([1000, 100, 2000, 100], {
                  left: 0, // event.absolutePointer.x,
                  top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY),

                  stroke: '#3978eb',
                  id: e.target.hash,
                  fieldType: myImg.fieldType,
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
              setTimeout(() => selectAddedField({ ...fieldToAdd, obj: myImg }), 50)
              // setTimeout(() => emit('selectAddedField', { ...fieldToAdd, obj: myImg }), 50)
            },
          )
        }
        else if (obj?.type === 'textbox') {
          const textEle = new templateEditorStore.fabric.Textbox(
          `${templateEditorStore.fieldToAdd.name}`,
          {
            cornerStyle: 'circle',
            borderColor: '#00000066',
            cornerColor: '#119bd6',

            transparentCorners: false,
            transparentBorders: false,
            width: obj.width,
            top: 20,
            left: 20,
            scaleX: obj.scaleX,
            scaleY: obj.scaleY,
            fill: obj.fill,
            fontFamily: obj.fontFamily,
            fontSize: obj.fontSize,
            fontStyle: obj.fontStyle,
            underline: obj.underline,
            fontWeight: obj.fontWeight,
            textAlign: obj.textAlign,
            fieldType: field.fieldType,
            charSpacing: obj.charSpacing,
            id: obj.id,
            name: field.name,
            hash: uuid.v1(),
            pageNo: obj.pageNo,
            editable: false,
            text: obj.text,
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

          const fieldToAdd = { ...field, fieldType: field.fieldType, name: field.name, hash: textEle.hash, page: textEle.pageNo, obj: textEle }

          const allFields = []
          templateEditorStore.addedFields.forEach((f) => {
            allFields.push(JSON.parse(JSON.stringify(f)))
          })
          allFields.push(fieldToAdd)
          templateEditorStore.addedFields = allFields

          canvas.renderAll()

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
          canvas.setActiveObject(textEle)
          canvas.renderAll()
          setTimeout(() => selectAddedField(fieldToAdd), 50)
        }
        else {
          const ele = new templateEditorStore.fabric.Text(
        `${obj.text}`,
        {
          cornerStyle: 'circle',
          borderColor: '#00000066',
          cornerColor: '#119bd6',
          transparentCorners: false,
          top: 20,
          left: 20,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
          fill: obj.fill,
          fontFamily: obj.fontFamily,
          fontSize: obj.fontSize,
          fontStyle: obj.fontStyle,
          underline: obj.underline,
          fontWeight: obj.fontWeight,
          charSpacing: obj.charSpacing,
          textAlign: obj.textAlign,
          fieldType: field.fieldType,
          id: obj.id,
          name: field.name,
          hash: uuid.v1(),
          pageNo: obj.pageNo,
          lockScalingFlip: true,
        },
          )
          ele.setControlsVisibility({ mt: false, mb: false, mr: false, ml: false, mtr: false })
          canvas.add(ele)

          const fieldToAdd = { ...field, fieldType: field.fieldType, name: field.name, hash: ele.hash, page: ele.pageNo, obj: ele }
          const allFields = []
          templateEditorStore.addedFields.forEach((f) => {
            allFields.push(JSON.parse(JSON.stringify(f)))
          })
          allFields.push(fieldToAdd)
          templateEditorStore.addedFields = allFields

          ele.on('mouseover', (e) => {
            if (!templateEditorStore.activeAdvancedPointer)
              return
            canvas.add(new fabric.Line([100, 1000, 100, 5000], {
              left: e.target.left,
              top: 0,
              stroke: '#3978eb',
              id: e.target.hash,
              fieldType: ele.fieldType,
            }))
            canvas.add(new fabric.Line([1000, 100, 2000, 100], {
              left: 0,
              top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)),
              stroke: '#3978eb',
              id: e.target.hash,
              fieldType: ele.fieldType,
            }))
          })
          ele.on('mouseout', (e) => {
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

          canvas.setActiveObject(ele)
          canvas.renderAll()
          setTimeout(() => selectAddedField(fieldToAdd), 50)
          // setTimeout(() => emit('selectAddedField', fieldToAdd), 50)
        }
      }
    })
  }
}
function deleteField() {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    canvas._objects = canvas._objects.filter((obj) => {
      if (obj?.hash === fieldToDelete?.value?.hash || obj.id === fieldToDelete?.value?.hash || obj?.checkboxGroupHash === fieldToDelete?.value?.hash)
        return false
      else
        return true
    })
    /** ****** incase of Text box */

    const containers = templateEditorStore.editorContainers.filter(f => f?.id !== fieldToDelete?.value?.hash)
    templateEditorStore.editorContainers = containers
    // console.log('templateEditorStore.editorContainerRefs', templateEditorStore.editorContainerRefs)
    // const refs = templateEditorStore.editorContainerRefs.filter(f => f?.id !== fieldToDelete?.value?.hash)
    // templateEditorStore.editorContainerRefs = refs
    // Convert the Proxy object to an array of entries
    const refsArray = Object.entries(templateEditorStore.editorContainerRefs)

    // Filter the array to exclude the field with the hash you want to delete
    const filteredRefsArray = refsArray.filter(([key, value]) => key !== fieldToDelete?.value?.hash)

    // Convert the filtered array back to an object
    const filteredRefs = Object.fromEntries(filteredRefsArray)

    // Update the Proxy object with the filtered references
    templateEditorStore.editorContainerRefs = filteredRefs
    /** */
    const fieldsS = templateEditorStore.addedFields.filter(f => f?.hash !== fieldToDelete?.value?.hash)
    templateEditorStore.addedFields = fieldsS.map(f => JSON.parse(JSON.stringify (f)))
    canvas.discardActiveObject()
    canvas.renderAll()
    templateEditorStore.showOptionsBar = false
  }
}
function selectAddedField(field) {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    canvas.discardActiveObject()
    canvas.renderAll()
    if (field?.fieldType === 'Form checkbox group') {
      let obj = {}
      const allObjs = canvas?.getObjects()
      allObjs?.forEach((r) => {
        if (obj?.checkboxIdentifierHash)
          return
        if (r?.id !== 'checkboxIdNoIcon' && r?.hash === field?.hash) {
          obj = r
          canvas.discardActiveObject()
          canvas.renderAll()
        }
      })

      if (field.page !== templateEditorStore.activePageForCanvas) {
        templateEditorStore.activePageForCanvas = field.page
        setTimeout(() => {
          const sel = new fabric.ActiveSelection(canvas.getObjects()?.filter(f => f?.hash === obj?.hash || f?.checkboxGroupHash === obj?.hash), {
            canvas,
            cornerStyle: 'circle',
            borderColor: '#00000066',
            cornerColor: '#119bd6',
            transparentCorners: false,
            hash: obj?.hash,
            lockScalingFlip: true,
          })
          // sel.setControlsVisibility({ mtr: false })
          sel.setControlsVisibility({ mt: false, mb: false, mr: false, ml: false, mtr: false })
          sel.on('scaling', () => {
            applyLastObjectPropertiesToAll(sel)
          })
          canvas.setActiveObject(sel)
          canvas.requestRenderAll()
          canvas.renderAll()
        }, 500)
      }
      else {
        const sel = new fabric.ActiveSelection(canvas.getObjects()?.filter(f => f?.hash === obj?.hash || f?.checkboxGroupHash === obj?.hash), {
          canvas,
          cornerStyle: 'circle',
          borderColor: '#00000066',
          cornerColor: '#119bd6',
          transparentCorners: false,
          hash: obj?.hash,
          lockScalingFlip: true,
        })
        // sel.setControlsVisibility({ mtr: false })
        sel.setControlsVisibility({ mt: false, mb: false, mr: false, ml: false, mtr: false })
        sel.on('scaling', () => {
          applyLastObjectPropertiesToAll(sel)
        })
        canvas.setActiveObject(sel)
        canvas.requestRenderAll()
        canvas.renderAll()
      }
      templateEditorStore.selectedAddedField = { ...field }
      templateEditorStore.showOptionsBar = true
    }
    else {
      canvas._objects.forEach((obj) => {
        if (obj.hash === field.hash) {
          if (field.page !== templateEditorStore.activePageForCanvas) {
            templateEditorStore.activePageForCanvas = field.page
            setTimeout(() => {
              canvas.setActiveObject(obj)
              canvas.renderAll()
            }, 500)
          }
          else {
            canvas.setActiveObject(obj)
            canvas.renderAll()
          }

          templateEditorStore.selectedAddedField = { ...field }
          templateEditorStore.showOptionsBar = true
          templateEditorStore.lastScaledTextOptions = { x: obj.scaleX, y: obj.scaleY }

          if (obj.text && obj.id !== 'Lorem ipsum') {
            activeTextStyles.fill = obj.fill ? obj.fill : '#000000'
            activeTextStyles.fontFamily = obj.fontFamily ? obj.fontFamily : 'Arial'
            activeTextStyles.fontSize = obj.fontSize ? obj.fontSize : 32
            activeTextStyles.underline = obj.underline ? obj.underline : false
            activeTextStyles.textAlign = obj.textAlign ? obj.textAlign : 'center'
            activeTextStyles.fontStyle = obj.fontStyle ? obj.fontStyle : 'normal'
            activeTextStyles.fontWeight = obj.fontWeight ? obj.fontWeight : 300
          }
        }
      })
    }
  }
}
function applyLastObjectPropertiesToAll(sel) {
  const canvas = canvasService.getCanvas()
  const objects = sel.getObjects()
  if (objects.length === 0)
    return

  const lastObject = objects[0]
  const { width, height, scaleX, scaleY } = lastObject

  objects.forEach((obj) => {
    if (obj?.fieldType === 'checkboxIdNoIcon') {
      const myImg = objects?.filter(f => obj?.checkboxHash === f?.checkboxIdentifierHash)[0]
      obj.set({ left: myImg?.left + (myImg?.width * myImg?.scaleX) - 13, top: myImg?.top + (myImg.height * myImg?.scaleY) - 13 })
      return
    }

    obj.scaleToHeight(height * scaleY)
    obj.setCoords() // Update object's coordinates
  })

  canvas.requestRenderAll()
}
</script>
