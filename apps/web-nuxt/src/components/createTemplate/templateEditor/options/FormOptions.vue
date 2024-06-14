<template>
  <div>
    <div class="flex flex-col  mt-4">
      <p class="font-poppins text-md text-surface-600 mb-2">
        Field name
      </p>
      <InputText v-model="fieldName" />
    </div>
    <div class="flex flex-col  mt-4">
      <p class="font-poppins text-md text-surface-600 mb-2">
        Field description
      </p>
      <Textarea v-model="fieldDescription" rows="3" />
      <p id="username-help" class="font-poppins text-xs mt-2">
        It is an optional. But using it will replace field name in final form view.
      </p>
    </div>
    <div class="flex items-center mt-6 gap-4">
      <Checkbox v-model="isRequired" :binary="true" />
      <p class="font-poppins text-md text-surface-600 ">
        Required
      </p>
    </div>
    <!-- <Accordion unstyled="true" class="mt-4 font-poppins ">
      <AccordionTab
        header-class="text-surface-500 "
        header="Advanced options"
      > -->
    <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form time'" class="w-full pt-4 mb-4">
      <p class="font-poppins text-md text-surface-500 mb-2">
        Select Format
      </p>
      <Dropdown v-model="selectedTimeFormat" :options="timeFormats" option-label="name" placeholder="Select time format" class="w-full md:w-full" />
    </div>
    <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form date'" class="w-full pt-4 mb-4">
      <p class="font-poppins text-md text-surafce-500 mb-2">
        Select Format
      </p>
      <Dropdown v-model="selectedDateFormat" :options="dateFormats" option-label="name" placeholder="Select date format" class="w-full md:w-full" />
    </div>
    <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form text'" class="mt-4">
      <div class="flex items-center gap-2  cursor-pointer text-primary-600 mt-6" @click="showAdvancedOptions = !showAdvancedOptions">
        <p class=" font-poppins text-md ">
          Advanced options
        </p>
        <font-awesome-icon icon="fa-solid fa-caret-right transition-all duration-300 text-surface-600" size="lg" :class="{ 'rotate-90': showAdvancedOptions }" />
      </div>
      <div v-if="showAdvancedOptions">
        <p class="font-poppins text-md text-surface-600 mt-4 mb-2 ">
          Accepted characters
        </p>
        <div class="flex flex-col gap-3">
          <div v-for="option in characterAcceptionOptions" :key="option" class="flex items-center">
            <RadioButton v-model="selectedCharacterAcception" :input-id="option" name="dynamic" :value="option" />
            <label :for="option" class="ml-2 font-poppins">{{ option }}</label>
          </div>
        </div>
        <div v-if="selectedCharacterAcception === 'Numbers'" class="flex items-center mt-6 gap-4">
          <Checkbox v-model="allowDecimals" :binary="true" />
          <p class="font-poppins text-md text-surface-600 ">
            Allow decimals
          </p>
        </div>

        <!-- <p class="font-poppins text-md text-surface-600 ">
          Field validations
        </p> -->

        <div class="flex flex-col  mt-6">
          <div class="mb-2 flex items-center gap-2">
            <p class="font-poppins text-md text-surface-600 ">
              Min. field length
            </p>
            <div v-tooltip.top="'Minimum character length'">
              <font-awesome-icon icon="fa-duotone fa-square-question" size="lg" />
            </div>
          </div>

          <InputNumber v-model="minFieldLength" input-id="integeronly1" :use-grouping="false" @input="changeMinLength" />
        </div>
        <div class="flex flex-col  mt-4">
          <div class="mb-2 flex items-center gap-2">
            <p class="font-poppins text-md text-surface-600 ">
              Max. field length
            </p>
            <div v-tooltip.top="'Maximum character length'">
              <font-awesome-icon icon="fa-duotone fa-square-question" size="lg" />
            </div>
          </div>

          <InputNumber v-model="maxFieldLength" input-id="integeronly2" :use-grouping="false" @input="changeMaxLength" />
        </div>
      </div>
    <!-- </AccordionTab>
    </Accordion> -->
    </div>

    <div v-if="templateEditorStore.activeFormField === 'time'" class="w-full pt-4 mt-2">
      <Dropdown v-model="selectedTimeFormat" :options="timeFormats" option-label="name" placeholder="Select time format" class="w-full md:w-full p-1" />
    </div>

    <div v-if="templateEditorStore.activeFormField === 'date'" class="w-full pt-4 mt-2">
      <Dropdown v-model="selectedDateFormat" :options="dateFormats" option-label="name" placeholder="Select date format" class="w-full md:w-full p-1" />
    </div>

    <div v-if="templateEditorStore.activeFormField === 'image'" class="w-full pt-4">
      <ImageOptions />
    </div>
  </div>
</template>

<script setup>
import ImageOptions from '../../../../components/createTemplate/templateEditor/options/ImageOptions.vue'
import { useTimestampFormats } from '../../../../composables/useTimestampFormats'
import { templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'

const showAdvancedOptions = ref(false)
const fieldName = ref('')
const fieldDescription = ref('')
const allowDecimals = ref(false)
const isRequired = ref(false)
const minFieldLength = ref(2)
const maxFieldLength = ref(50)
const { timeFormats, dateFormats } = useTimestampFormats()
const selectedTimeFormat = ref()
const selectedDateFormat = ref()

const selectedCharacterAcception = ref('Text')
const characterAcceptionOptions = ref([
  'Text',
  'Text + numbers',
  'Numbers',
])

function fillUpOptions() {
  const sF = templateEditorStore.selectedAddedField
  if (sF?.name !== 'Lorem ipsum' && sF?.name !== 'Add field name')
    fieldName.value = sF?.name
  else
    fieldName.value = ''

  isRequired.value = !!sF?.isRequired
  if (sF?.fieldDescription)
    fieldDescription.value = sF?.fieldDescription

  if (sF?.fieldType === 'Form text') {
    if (sF?.allowDecimals)
      allowDecimals.value = sF?.allowDecimals
    if (sF?.minCharAllowed)
      minFieldLength.value = sF?.minCharAllowed
    if (sF?.maxCharAllowed)
      maxFieldLength.value = sF?.maxCharAllowed
    if (sF?.characterAcception)
      selectedCharacterAcception.value = sF?.characterAcception
  }

  if (sF?.fieldType === 'Form date')
    selectedDateFormat.value = sF?.dateFormat ? sF?.dateFormat : 'MM/DD/YYYY'
  if (sF?.fieldType === 'Form time')
    selectedTimeFormat.value = sF?.timeFormat ? sF?.timeFormat : 'HH:MM:SS'
}

onMounted(() => {
  fillUpOptions()
})
watch(() => templateEditorStore.selectedAddedField, () => {
  fillUpOptions()
})

watch(fieldName, () => {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObj = canvas.getActiveObject()
    if (activeObj) {
      if (activeObj.fieldType === 'Form multiline') {
        if (fieldName.value)
          activeObj.set({ ...activeObj.styles, fill: activeTextStyles.fill[0] === '#' ? activeTextStyles.fill : `#${activeTextStyles.fill}`, fontFamily: activeTextStyles.fontFamily, fontSize: activeTextStyles.fontSize, underline: activeTextStyles.underline, textAlign: activeTextStyles.textAlign, fontStyle: activeTextStyles.fontStyle, fontWeight: activeTextStyles.fontWeight, id: fieldName.value })
        else
          activeObj.set({ fill: '#ff0000', id: 'Lorem ipsum' })
      }
      else {
        if (fieldName.value)
          activeObj.set({ ...activeObj.styles, fill: activeTextStyles.fill[0] === '#' ? activeTextStyles.fill : `#${activeTextStyles.fill}`, fontFamily: activeTextStyles.fontFamily, fontSize: activeTextStyles.fontSize, underline: activeTextStyles.underline, textAlign: activeTextStyles.textAlign, fontStyle: activeTextStyles.fontStyle, fontWeight: activeTextStyles.fontWeight, text: fieldName.value, id: fieldName.value })
        else
          activeObj.set({ text: 'Add field name', fill: '#ff0000', id: 'Lorem ipsum' })
      }
    }
    canvas.renderAll()
    const allFs = templateEditorStore.addedFields
    templateEditorStore.addedFields = allFs.map((f) => {
      if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
        return { ...f, name: fieldName.value ? fieldName.value : 'Add field name', id: fieldName.value ? fieldName.value : 'Lorem ipsum' }
      else return f
    })
  }
})
watch(fieldDescription, () => {
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, fieldDescription: fieldDescription.value }
    else return f
  })
})
watch(isRequired, () => {
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, isRequired: isRequired.value }
    else return f
  })
})
watch(selectedCharacterAcception, () => {
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, characterAcception: selectedCharacterAcception.value }
    else return f
  })
})

function changeMinLength() {
  const length = event.target.value
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, minCharAllowed: length }
    else return f
  })
}

function changeMaxLength() {
  const length = event.target.value
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, maxCharAllowed: length }
    else return f
  })
}
watch(allowDecimals, () => {
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, allowDecimals: allowDecimals.value }
    else return f
  })
})
watch(selectedTimeFormat, () => {
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, timeFormat: selectedTimeFormat.value }
    else return f
  })
})
watch(selectedDateFormat, () => {
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, dateFormat: selectedDateFormat.value }
    else return f
  })
})
</script>

  <style lang="scss" scoped>
.fields_in_form_fields_options{
height:38px;
width:100%;
}
</style>
