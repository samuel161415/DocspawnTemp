// checked image
// https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/cb212f15-9a46-420d-b091-6f9f8096a048_yes1.png
// unchecked image
// https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png

<template>
  <div class="mt-8">
    <div class="flex flex-col justify-center gap-2">
      <p class="font-poppins text-surface-600">
        {{ $t('Cp_templateEditor_checkboxOptions.checked_design') }}
      </p>
      <Dropdown
        v-model="selectedChecked"

        :options="checkedOptions"
        option-label="design"
        placeholder="Select an Image"
        class="w-full md:w-full"
      >
        <!-- Custom template for each dropdown item -->
        <template #option="slotProps">
          <div class="flex align-items-center">
            <img :alt="slotProps.option.id" :src="slotProps.option.design" class="mr-2 w-8 " />
          </div>
        </template>

        <!-- Custom template for the selected item -->
        <template #value="{ value }">
          <div class="flex items-center">
            <img :src="value?.design" alt="" class="w-12 h-12 mr-2" />
            <!-- <span>{{ value?.id }}</span> -->
          </div>
        </template>
      </Dropdown>
      <!-- <img src="https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/cb212f15-9a46-420d-b091-6f9f8096a048_yes1.png" alt="checked" class="w-12 h-auto" /> -->
    </div>
    <div class="flex flex-col justify-center gap-2 mt-4">
      <p class="font-poppins text-surface-600">
        {{ $t('Cp_templateEditor_checkboxOptions.unchecked_design') }}
      </p>
      <Dropdown
        v-model="selectedUnchecked"
        :options="uncheckedOptions"
        option-label="design"
        placeholder="Select an Image"
        class="w-full md:w-full "
      >
        <!-- Custom template for each dropdown item -->
        <template #option="slotProps">
          <div class="flex align-items-center">
            <img :alt="slotProps.option.id" :src="slotProps.option.design" class="mr-2 w-8" />
          </div>
        </template>

        <!-- Custom template for the selected item -->
        <template #value="{ value }">
          <div class="flex items-center">
            <img :src="value?.design" alt="" class="w-12 h-12 mr-2" />
            <!-- <span>{{ value?.id }}</span> -->
          </div>
        </template>
      </Dropdown>
      <!-- <img src="https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png" alt="unchecked" class="w-12 h-auto" /> -->
    </div>
  </div>
  <div v-if="props?.isCheckbox">
    <div class="flex flex-col justify-center gap-2 mt-3">
      <p class="font-poppins text-surface-600">
        Checked content
      </p>

      <MultiSelect
        v-model="selectedCheckedContent" :options="contentOptions" filter placeholder="Select content"
        :max-selected-labels="3" class="w-full md:w-full min-h-12"
      >
        <!-- Custom template for each dropdown item -->

        <!-- Custom template for the selected item -->
        <template #value="{ value }">
          <div class="flex items-center">
            <!-- <img :src="value?.design" alt="" class="w-12 h-12 mr-2" /> -->
            <span>{{ value }}</span>
          </div>
        </template>
      </MultiSelect>
      <!-- <img src="https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/cb212f15-9a46-420d-b091-6f9f8096a048_yes1.png" alt="checked" class="w-12 h-auto" /> -->
    </div>
    <div class="flex flex-col justify-center gap-2 mt-4">
      <p class="font-poppins text-surface-600">
        Unchecked content
      </p>

      <MultiSelect
        v-model="selectedUncheckedContent" :options="contentOptions" filter placeholder="Select content"
        :max-selected-labels="3" class="w-full md:w-full min-h-12"
      >
        <!-- Custom template for the selected item -->
        <template #value="{ value }">
          <div class="flex items-center">
            <!-- <img :src="value?.design" alt="" class="w-12 h-12 mr-2" /> -->
            <span>{{ value }}</span>
          </div>
        </template>
      </MultiSelect>
      <!-- <img src="https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png" alt="unchecked" class="w-12 h-auto" /> -->
    </div>
  </div>
  <div v-if="!props?.isCheckbox">
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
        <InputNumber v-model="minOptions" mode="decimal" show-buttons :min="1" :max="noOfCheckboxes" class="custom-input-number" />
      </div>
      <div class="flex flex-col w-full">
        <label class="font-poppins my-2 text-surface-600">
          {{ $t('Cp_templateEditor_checkboxOptions.max_no_of_options') }}
        </label>
        <p v-if="optionSelectionError" class="text-red-400 text-sm mb-2">
          Max. options should be equal to or greater than Min.
        </p>
        <InputNumber v-model="maxOptions" mode="decimal" show-buttons :min="1" :max="noOfCheckboxes" class="custom-input-number" />
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { uuid } from 'vue-uuid'
import canvasService from '@/composables/useTemplateCanvas'

import { useAuth } from '@/composables/useAuth'

const props = defineProps(['isCheckbox', 'checkboxDatafield'])

const noOfCheckboxes = ref(1)
const minOptions = ref(1)
const maxOptions = ref(1)
const fieldDescription = ref('')
const currentField = ref()
const selectedChecked = ref()
const selectedUnchecked = ref()
const optionSelectionError = ref(false)

const contentOptions = ref()
const selectedCheckedContent = ref()
const selectedUncheckedContent = ref()

const { user } = useAuth()

const runtimeConfig = useRuntimeConfig()
const checkedOptions = ref([])
const uncheckedOptions = ref([])

async function fetchCheckboxOptions() {
  if (!user?.value?.email)
    return
  try {
    // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
    const response = await fetch(
      `${runtimeConfig.public.BASE_URL}/checkboxOptions/${user?.value?.email}`,
    )
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)
    const rawData = await response.json()
    const data = rawData?.filter(f => f?.active === 'yes')

    if (data?.length > 0) {
      checkedOptions.value = data?.filter(f => f?.type === 'checked')
      const def = checkedOptions.value?.filter(c => c?.default)[0]
      if (templateEditorStore?.selectedAddedField?.designs?.yes)
        selectedChecked.value = checkedOptions.value?.filter(c => c?.design === templateEditorStore?.selectedAddedField?.designs?.yes)[0]

      else if (def)
        selectedChecked.value = def
      else
      // selectedChecked.value = { id: 1, design: 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/cb212f15-9a46-420d-b091-6f9f8096a048_yes1.png' }
        selectedChecked.value = checkedOptions.value[0]

      uncheckedOptions.value = data?.filter(f => f?.type === 'unchecked')
      const def2 = uncheckedOptions.value?.filter(c => c?.default)[0]

      if (templateEditorStore?.selectedAddedField?.designs?.no)
        selectedUnchecked.value = uncheckedOptions.value?.filter(c => c?.design === templateEditorStore?.selectedAddedField?.designs?.no)[0]
      else if (def2)
        selectedUnchecked.value = def2
      else
      // selectedUnchecked.value = { id: 2, design: 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png' }
        selectedUnchecked.value = uncheckedOptions.value[0]
    }

    // console.log('response of fetching templates', data)
  }
  catch (error) {
    console.error('Error fetching templates:', error)
  }
}

watch(() => props?.checkboxDatafield, (newVal) => {
  console.log('change in checkbox data field')
  if (templateEditorStore?.selectedAddedField?.fieldType === 'Dataset checkbox') {
    selectedCheckedContent.value = []
    selectedUncheckedContent.value = []
    templateEditorStore.addedFields = templateEditorStore?.addedFields?.map((f) => {
      if (f?.hash === templateEditorStore?.selectedAddedField?.hash) {
        templateEditorStore.selectedAddedField = { ...f, contentFields: { yes: [], no: [] } }
        return { ...f, contentFields: { yes: [], no: [] } }
      }
      else { return f }
    })
  }
})
watch(() => templateEditorStore.selectedAddedField, (val, oldVal) => {
  if (val?.fieldType === 'Form checkbox group') {
    selectedChecked.value = checkedOptions.value?.filter(c => c?.design === templateEditorStore?.selectedAddedField?.designs?.yes)[0]
    selectedUnchecked.value = uncheckedOptions.value?.filter(c => c?.design === templateEditorStore?.selectedAddedField?.designs?.no)[0]
  }
  if (val?.fieldType === 'Dataset checkbox') {
    // if ((val?.hash === oldVal?.hash) && (val?.name !== oldVal?.name)) {
    //   selectedCheckedContent.value = []
    //   selectedUncheckedContent.value = []
    // }
    // else
    if (templateEditorStore.selectedAddedField?.contentFields?.yes && templateEditorStore.selectedAddedField?.contentFields?.no) {
      selectedCheckedContent.value = templateEditorStore.selectedAddedField?.contentFields?.yes
      selectedUncheckedContent.value = templateEditorStore.selectedAddedField?.contentFields?.no
    }
    else {
      selectedCheckedContent.value = []
      selectedUncheckedContent.value = []
    }
  }
})
function setContentOptions() {
  const arrayofData = []
  templateEditorStore.datasetData.allEntries?.forEach((entry) => {
    const val = entry[templateEditorStore?.activeDataField]
    if (val && !arrayofData?.includes(val))
      arrayofData.push(val)
  })

  contentOptions.value = arrayofData
}
watch(() => templateEditorStore?.activeDataField, (val) => {
  setContentOptions()
})
watch(selectedCheckedContent, (val) => {
  templateEditorStore.addedFields = templateEditorStore.addedFields?.map((field) => {
    if (field?.hash === templateEditorStore.selectedAddedField.hash) {
      templateEditorStore.selectedAddedField = { ...field, contentFields: { ...field?.contentFields, yes: val } }
      return { ...field, contentFields: { ...field?.contentFields, yes: val } }
    }
    return field
  })
})
watch(selectedUncheckedContent, (val) => {
  templateEditorStore.addedFields = templateEditorStore.addedFields?.map((field) => {
    if (field?.hash === templateEditorStore.selectedAddedField.hash) {
      templateEditorStore.selectedAddedField = { ...field, contentFields: { ...field?.contentFields, no: val } }
      return { ...field, contentFields: { ...field?.contentFields, no: val } }
    }
    return field
  })
})
watch(minOptions, (val) => {
  if (val > maxOptions.value)
    optionSelectionError.value = true
  else
    optionSelectionError.value = false

  templateEditorStore.addedFields = templateEditorStore.addedFields?.map((field) => {
    if (field?.hash === templateEditorStore.selectedAddedField.hash) {
      templateEditorStore.selectedAddedField = { ...field, minOptions: val }
      return { ...field, minOptions: val }
    }
    return field
  })
})
watch(maxOptions, (val) => {
  if (val < minOptions.value)
    optionSelectionError.value = true
  else
    optionSelectionError.value = false

  templateEditorStore.addedFields = templateEditorStore.addedFields?.map((field) => {
    if (field?.hash === templateEditorStore.selectedAddedField.hash) {
      templateEditorStore.selectedAddedField = { ...field, maxOptions: val }
      return { ...field, maxOptions: val }
    }
    return field
  })
})
onMounted(() => {
  noOfCheckboxes.value = templateEditorStore.selectedAddedField?.checkboxes?.length >= 1 ? templateEditorStore.selectedAddedField?.checkboxes.length : 1
  minOptions.value = templateEditorStore.selectedAddedField?.minOptions >= 0 ? templateEditorStore.selectedAddedField?.minOptions : 1
  maxOptions.value = templateEditorStore.selectedAddedField?.maxOptions >= 0 ? templateEditorStore.selectedAddedField?.maxOptions : 1
  fieldDescription.value = templateEditorStore.selectedAddedField?.name ? templateEditorStore.selectedAddedField?.name : 0
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObject = canvas.getActiveObject()
    // currentField.value = templateEditorStore.addedFields.filter(f => f?.hash === activeObject?.hash)[0]
  }
  fetchCheckboxOptions()
  setContentOptions()
  if (templateEditorStore.selectedAddedField?.contentFields) {
    selectedCheckedContent.value = templateEditorStore.selectedAddedField?.contentFields?.yes
    selectedUncheckedContent.value = templateEditorStore.selectedAddedField?.contentFields?.no
  }
})

watch(() => templateEditorStore.selectedAddedField, (val) => {
  noOfCheckboxes.value = val?.checkboxes?.length >= 1 ? val?.checkboxes.length : 1
  minOptions.value = val?.minOptions >= 0 ? val?.minOptions : 1
  maxOptions.value = val?.maxOptions >= 0 ? val?.maxOptions : 1
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
    // let defaultUncheckedDesign = uncheckedOptions.value?.filter(f => f?.type === 'unchecked' && f?.default)[0]?.design
    // if (!defaultUncheckedDesign)
    //   defaultUncheckedDesign = uncheckedOptions.value?.filter(f => f?.type === 'unchecked')[0]?.design
    // if (!defaultUncheckedDesign)
    //   defaultUncheckedDesign = 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png'
    fabric.Image.fromURL(
      // defaultUncheckedDesign
      templateEditorStore?.selectedAddedField?.designs?.no
      , (myImg) => {
        const uniqueHashForEle = uuid.v1()
        myImg.set({
          cornerStyle: 'circle',
          borderColor: '#00000066',
          cornerColor: '#119bd6',
          transparentCorners: false,

          left: activeObject?.left + (activeObject?.width * activeObject?.scaleX),
          top: activeObject?.top,
          scaleX: (activeObject.width * activeObject.scaleX) / (myImg.width), // ?.scaleX,
          scaleY: (activeObject.height * activeObject.scaleY) / (myImg.height), // activeObject?.scaleY,
          // width: activeObject?.width,
          // height: activeObject?.height,
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
watch(selectedChecked, (val) => {
  const canvas = canvasService.getCanvas()
  // commenting this because we will set check to either yes or no, if while insertion we are using yes, then yes else no

  // const allCheckBoxesObjects = canvas?.getObjects()?.filter(f => f?.hash === templateEditorStore?.selectedAddedField?.hash && f?.fieldType === 'Form checkbox group')
  // allCheckBoxesObjects.forEach((obj) => {
  //   if (val?.design) {
  //     const scaleXToBe = (obj.width * obj.scaleX)
  //     const scaleYToBe = (obj.height * obj.scaleY)
  //     obj.setSrc(val?.design, (myImg) => {
  //       obj.set({
  //         scaleX: scaleXToBe / (myImg.width),
  //         scaleY: scaleYToBe / (myImg.height),
  //       })

  //       canvas.renderAll()
  //     })
  //   }
  // })
  templateEditorStore.addedFields = templateEditorStore?.addedFields?.map((field) => {
    if (field?.hash === templateEditorStore.selectedAddedField.hash) {
      const updated = { ...field, designs: { ...field?.designs, yes: val?.design } }
      templateEditorStore.selectedAddedField = updated
      return updated
    }
    else { return field }
  })
})
watch(selectedUnchecked, (val) => {
  const canvas = canvasService.getCanvas()
  // commenting this because we will set check to either yes or no, if while insertion we are using yes, then yes else no
  const allCheckBoxesObjects = canvas?.getObjects()?.filter(f => f?.hash === templateEditorStore?.selectedAddedField?.hash && (f?.fieldType === 'Form checkbox group' || (props?.isCheckbox && f?.fieldType === 'Dataset checkbox')))
  allCheckBoxesObjects.forEach((obj) => {
    if (val?.design) {
      const scaleXToBe = (obj.width * obj.scaleX)
      const scaleYToBe = (obj.height * obj.scaleY)
      obj.setSrc(val?.design, (myImg) => {
        obj.set({
          scaleX: scaleXToBe / (myImg.width),
          scaleY: scaleYToBe / (myImg.height),
        })

        canvas.renderAll()
      })
    }
  })
  templateEditorStore.addedFields = templateEditorStore?.addedFields?.map((field) => {
    if (field?.hash === templateEditorStore.selectedAddedField.hash) {
      const updated = { ...field, designs: { ...field?.designs, no: val?.design } }
      templateEditorStore.selectedAddedField = updated
      return updated
    }
    else { return field }
  })
})
</script>

  <style scoped>
  .custom-input-number .p-inputnumber-input {
    width: 2rem; /* Equivalent to w-8 in Tailwind */
  }
  </style>
