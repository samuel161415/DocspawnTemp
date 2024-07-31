// checked image
// https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/cb212f15-9a46-420d-b091-6f9f8096a048_yes1.png
// unchecked image
// https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png

<template>
  <div class="mt-8">
    <div class="flex justify-between items-center">
      <p class="font-poppins text-surface-600">
        {{ $t('Cp_templateEditor_checkboxOptions.checked_design') }}
      </p>
      <img src="https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/cb212f15-9a46-420d-b091-6f9f8096a048_yes1.png" alt="checked" class="w-12 h-auto" />
    </div>
    <div class="flex justify-between items-center mt-2">
      <p class="font-poppins text-surface-600">
        {{ $t('Cp_templateEditor_checkboxOptions.unchecked_design') }}
      </p>
      <img src="https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png" alt="unchecked" class="w-12 h-auto" />
    </div>
  </div>
  <div class="flex flex-col mt-4">
    <p class="font-poppins text-md text-surface-600 mb-2">
      {{ $t('Cp_templateEditor_checkboxOptions.checkbox_description') }}
    </p>
    <Textarea v-model="fieldDescription" rows="3" />
  </div>
  <div class="mt-4">
    <div class="flex flex-col w-full">
      <label class="font-poppins my-2 text-surface-600">
        {{ $t('Cp_templateEditor_checkboxOptions.min_no_of_options') }}
      </label>
      <InputNumber v-model="minOptions" mode="decimal" show-buttons :min="0" :max="100" class="custom-input-number" />
    </div>
    <div class="flex flex-col w-full">
      <label class="font-poppins my-2 text-surface-600">
        {{ $t('Cp_templateEditor_checkboxOptions.max_no_of_options') }}
      </label>
      <InputNumber v-model="maxOptions" mode="decimal" show-buttons :min="0" :max="100" class="custom-input-number" />
    </div>
    <div class="flex flex-col w-full">
      <label class="font-poppins my-2 text-surface-600 mt-8">
        {{ $t('Cp_templateEditor_checkboxOptions.no_of_checkboxes') }}: <span class="text-primary-600">{{ noOfCheckboxes }}</span>
      </label>
    </div>
  </div>
  <Button outline class="w-full mt-2" outlined @click="selectAllInGroup">
    {{ $t('Cp_templateEditor_checkboxOptions.select_all_checkboxes') }}
  </Button>
  <Button class="w-full mt-2" @click="addCheckboxToGroup">
    {{ $t('Cp_templateEditor_checkboxOptions.add_checkbox_to_group') }}
  </Button>
  <div class="mt-4">
    <div
      v-for="(item, index) in templateEditorStore.addedFields.filter(f => f?.hash === templateEditorStore.selectedAddedField?.hash)[0]?.checkboxes" :key="index" class="my-2"
    >
      <p class="font-poppins text-surface-600">
        {{ $t('Cp_templateEditor_checkboxOptions.checkbox_text', { index: index + 1 }) }}
      </p>
      <div class="w-full flex mt-1 border rounded-lg">
        <InputText class="flex-1 rounded rounded-r-none border-0" :value="item.text" @input="(e) => changeTextOfCheckboxOption(e, index + 1)" />
        <Button v-if="noOfCheckboxes !== 1" v-tooltip.top="'Delete checkbox'" class="w-12 bg-white" outlined small @click="deleteCheckboxById(index + 1)">
          <font-awesome-icon icon="fa-light fa-xmark" size="lg" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { uuid } from 'vue-uuid'
import canvasService from '@/composables/useTemplateCanvas'

const noOfCheckboxes = ref(1)
const minOptions = ref(0)
const maxOptions = ref(1)
const fieldDescription = ref('')
const currentField = ref()
onMounted(() => {
  noOfCheckboxes.value = templateEditorStore.selectedAddedField?.checkboxes?.length >= 1 ? templateEditorStore.selectedAddedField?.checkboxes.length : 1
  minOptions.value = templateEditorStore.selectedAddedField?.minOptions >= 0 ? templateEditorStore.selectedAddedField?.minOptions : 0
  maxOptions.value = templateEditorStore.selectedAddedField?.maxOptions >= 0 ? templateEditorStore.selectedAddedField?.maxOptions : 0
  fieldDescription.value = templateEditorStore.selectedAddedField?.name ? templateEditorStore.selectedAddedField?.name : 0
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObject = canvas.getActiveObject()
    console.log('templateEditorStore.selectedAddedField', templateEditorStore.selectedAddedField)
    console.log('activeobjec id hash', activeObject?.id, activeObject?.hash)
    console.log('templateEditorStore.addedFields.filter(f => f?.hash === templateEditorStore.selectedAddedField?.hash)[0]?.checkboxes', templateEditorStore.addedFields.filter(f => f?.hash === templateEditorStore.selectedAddedField?.hash)[0])
    // currentField.value = templateEditorStore.addedFields.filter(f => f?.hash === activeObject?.hash)[0]
    console.log('current field value', currentField.value)
  }
})
watch(() => templateEditorStore.selectedAddedField, (val) => {
  noOfCheckboxes.value = val?.checkboxes?.length >= 1 ? val?.checkboxes.length : 1
  minOptions.value = val?.minOptions >= 0 ? val?.minOptions : 0
  maxOptions.value = val?.maxOptions >= 0 ? val?.maxOptions : 0
  fieldDescription.value = val?.name ? val?.name : 0
})
function changeTextOfCheckboxOption(e, item) {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObject = canvas.getActiveObject()

    templateEditorStore.addedFields = templateEditorStore.addedFields.map((f) => {
      if (f?.hash === activeObject?.hash) {
        return { ...f, checkboxes: f?.checkboxes?.map((c, i) => {
          if (i + 1 === item) {
            const objs = canvas.getObjects()
            objs.forEach((obj) => {
              if (obj?.fieldType === 'checkbox-tooltip' && obj?.checkboxHash === c?.checkboxIdentifierHash) {
                obj.set({ text: ` ${e.target.value} ` })
                canvas.renderAll()
              }
            })
            return { ...c, text: e.target.value }
          }
          else { return c }
        }) }
      }

      else { return f }
    })
  }
}

watch(fieldDescription, () => {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObj = canvas.getActiveObject()
    if (activeObj) {
      if (fieldDescription.value)
        activeObj.set({ ...activeObj.styles, fill: activeTextStyles.fill[0] === '#' ? activeTextStyles.fill : `#${activeTextStyles.fill}`, fontFamily: activeTextStyles.fontFamily, fontSize: activeTextStyles.fontSize, underline: activeTextStyles.underline, textAlign: activeTextStyles.textAlign, fontStyle: activeTextStyles.fontStyle, fontWeight: activeTextStyles.fontWeight, text: fieldDescription.value, id: fieldDescription.value })
      else
        activeObj.set({ text: 'Add description', fill: '#ff0000', id: 'Lorem ipsum' })
    }
    canvas.renderAll()
    const allFs = templateEditorStore.addedFields
    templateEditorStore.addedFields = allFs.map((f) => {
      if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
        return { ...f, name: fieldDescription.value ? fieldDescription.value : 'Add description', id: fieldDescription.value ? fieldDescription.value : 'Lorem ipsum' }
      else return f
    })
  }
})

function addCheckboxToGroup() {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    let activeObject = canvas.getActiveObject()

    if (activeObject?._objects?.length > 0) {
      const rev = activeObject?._objects?.reverse()
      rev?.forEach((r) => {
        if (activeObject?.checkboxIdentifierHash)
          return
        if (r?.id !== 'checkboxIdNoIcon') {
          activeObject = r
          canvas.discardActiveObject()
          canvas.renderAll()
        }
      })
    }

    fabric.Image.fromURL(
      'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png'
      , (myImg) => {
        const uniqueHashForEle = uuid.v1()
        myImg.set({
          cornerStyle: 'circle',
          borderColor: '#00000066',
          cornerColor: '#119bd6',
          transparentCorners: false,

          left: activeObject?.left + (activeObject?.width * activeObject?.scaleX),
          top: activeObject?.top,
          scaleX: activeObject?.scaleX,
          scaleY: activeObject?.scaleY,
          width: activeObject?.width,
          height: activeObject?.height,
          id: activeObject?.id,
          hash: activeObject?.hash,
          checkboxIdentifierHash: uniqueHashForEle,
          fieldType: activeObject?.fieldType,
          pageNo: templateEditorStore?.activePageForCanvas,
          displayGuide: false,
          lockScalingFlip: true,
        })
        // myImg.setControlsVisibility({ mtr: false })
        myImg.setControlsVisibility({ mt: false, mb: false, mr: false, ml: false, mtr: false })

        templateEditorStore.addedFields = templateEditorStore.addedFields.map((f) => {
          if (f?.hash === activeObject?.hash)
            return { ...f, checkboxes: [...f?.checkboxes, { text: '', id: f?.checkboxes.length + 1, checkboxIdentifierHash: uniqueHashForEle }] }

          else return f
        })

        noOfCheckboxes.value = noOfCheckboxes.value + 1
        const allFields = []
        templateEditorStore.addedFields.forEach((f) => {
          allFields.push(JSON.parse(JSON.stringify(f)))
        })

        //   allFields.push(fieldToAdd)
        templateEditorStore.addedFields = allFields
        canvas.renderAll()
        templateEditorStore.fieldToAdd = {}
        const tooltip = new fabric.Text(' Enter label ', {
          left: myImg.left + (myImg.width * myImg.scaleX),
          top: myImg.top - 10,
          fill: '#fff',
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
          //   visible: false,
          //   opacity: true,
          // })
          // console.log('creating tooltip text', tooltip)

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
            console.log('mouseout myImg tooltip', myImg.tooltip)
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
        /** ********* adding info icon */
        const { colorsForCheckboxGroup } = templateEditorStore?.selectedAddedField
        fabric.Image.fromURL(
          `https://placehold.co/100/${colorsForCheckboxGroup?.light}/${colorsForCheckboxGroup?.dark}?font=roboto&text=${noOfCheckboxes.value}`
          , (icon) => {
            icon.set({

              left: myImg?.left + (myImg?.width * myImg?.scaleX) - 13,
              top: myImg?.top + (myImg.height * myImg?.scaleY) - 13,
              scaleX: 20 / icon.width,
              scaleY: 20 / icon.height,
              id: 'checkboxIdNoIcon',
              checkboxHash: myImg?.checkboxIdentifierHash,
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
        canvas.setActiveObject(myImg)
        canvas.renderAll()
        // selectAllInGroup()
      },
    )
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
    // obj.set({
    //   scaleX,
    //   scaleY,
    //   width,
    //   height,

    // })
    // obj.scaleToWidth(width * scaleX)
    obj.scaleToHeight(height * scaleY)
    obj.setCoords() // Update object's coordinates
  })

  canvas.requestRenderAll()
}
function selectAllInGroup() {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObject = canvas.getActiveObject()
    canvas.discardActiveObject()
    const sel = new fabric.ActiveSelection(canvas.getObjects()?.filter(f => f?.hash === activeObject?.hash || f?.checkboxGroupHash === activeObject?.hash), {
      canvas,
      cornerStyle: 'circle',
      borderColor: '#00000066',
      cornerColor: '#119bd6',
      transparentCorners: false,
      hash: activeObject?.hash,
      lockScalingFlip: true,
    })
    // myImg.setControlsVisibility({ mtr: false })
    sel.setControlsVisibility({ mt: false, mb: false, mr: false, ml: false, mtr: false })
    sel.on('scaling', () => {
      applyLastObjectPropertiesToAll(sel)
    })
    canvas.setActiveObject(sel)
    canvas.requestRenderAll()
  }
}

function deleteCheckboxById(id) {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeField = templateEditorStore?.addedFields?.filter(f => f?.hash === templateEditorStore?.selectedAddedField?.hash)[0]

    const hashToDel = activeField?.checkboxes[id - 1]?.checkboxIdentifierHash

    if (hashToDel) {
      // removing from canvas
      canvas.getObjects()?.forEach((obj) => {
        if (obj?.checkboxIdentifierHash === hashToDel || obj?.checkboxHash === hashToDel) {
          canvas?.remove(obj)
          canvas.renderAll()
        }
      })

      // removing from added fields
      const checkboxes = activeField?.checkboxes

      // Find the index of the checkbox with the given id
      const index = checkboxes.findIndex(checkbox => checkbox.id === id)

      // If found, remove the element from the array
      if (index !== -1) {
        checkboxes.splice(index, 1)

        // Reassign the ids of the remaining elements in ascending order
        for (let i = 0; i < checkboxes.length; i++)
          checkboxes[i].id = i + 1
        templateEditorStore.selectedAddedField = { ...activeField, checkboxes }
        templateEditorStore.addedFields.map((f) => {
          if (activeField?.hash === f?.hash)
            return { ...f, checkboxes }
          else
            return f
        })
        noOfCheckboxes.value = noOfCheckboxes?.value - 1
        /** ** now updating info number image of each box */
        const { colorsForCheckboxGroup } = templateEditorStore?.selectedAddedField
        checkboxes.forEach((c) => {
          canvas.getObjects()?.forEach((obj) => {
            if (obj?.checkboxHash === c?.checkboxIdentifierHash) {
              obj.setSrc(`https://placehold.co/100/${colorsForCheckboxGroup?.light}/${colorsForCheckboxGroup?.dark}?font=roboto&text=${c?.id}`, () => {
                // obj.scaleToWidth(originalWidth)
                // obj.scaleToHeight(originalHeight)
                canvas.renderAll()
              })
            }
            if (obj?.checkboxIdentifierHash === c?.checkboxIdentifierHash) {
              const activeObject = canvas?.getActiveObject()
              if (!activeObject)
                canvas.setActiveObject(obj)
            }
          })
        })
      }
      else {
        // console.log(`Checkbox with id ${id} not found.`)
      }
    }
  }
}
</script>

  <style scoped>
  .custom-input-number .p-inputnumber-input {
    width: 2rem; /* Equivalent to w-8 in Tailwind */
  }
  </style>
