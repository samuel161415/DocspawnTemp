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
    <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form text'" class="mt-4">
      <p class="font-poppins text-md text-surface-600 mb-2">
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

const fieldName = ref('')
const fieldDescription = ref('')
const allowDecimals = ref(false)
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

onMounted(() => {
  const sF = templateEditorStore.selectedAddedField
  if (sF?.name && sF?.name !== 'Lorem ipsum' && sF?.name !== 'Add field name')
    fieldName.value = sF?.name
  if (sF?.fieldDescription)
    fieldDescription.value = sF?.fieldDescription
  if (sF?.allowDecimals)
    allowDecimals.value = sF?.allowDecimals
  if (sF?.minCharAllowed)
    minFieldLength.value = sF?.minCharAllowed
  if (sF?.maxCharAllowed)
    maxFieldLength.value = sF?.maxCharAllowed
  if (sF?.characterAcception)
    selectedCharacterAcception.value = sF?.characterAcception
})
watch(() => templateEditorStore.selectedAddedField, () => {
  const sF = templateEditorStore.selectedAddedField
  if (sF?.name && sF?.name !== 'Lorem ipsum' && sF?.name !== 'Add field name')
    fieldName.value = sF?.name
  if (sF?.fieldDescription)
    fieldDescription.value = sF?.fieldDescription
  if (sF?.allowDecimals)
    allowDecimals.value = sF?.allowDecimals
  if (sF?.minCharAllowed)
    minFieldLength.value = sF?.minCharAllowed
  if (sF?.maxCharAllowed)
    maxFieldLength.value = sF?.maxCharAllowed
  if (sF?.characterAcception)
    selectedCharacterAcception.value = sF?.characterAcception
})

watch(fieldName, () => {
  const activeObj = templateEditorStore.canvas.getActiveObject()
  if (activeObj) {
    if (fieldName.value)
      activeObj.set({ ...activeObj.styles, fill: activeTextStyles.fill[0] === '#' ? activeTextStyles.fill : `#${activeTextStyles.fill}`, fontFamily: activeTextStyles.fontFamily, fontSize: activeTextStyles.fontSize, underline: activeTextStyles.underline, textAlign: activeTextStyles.textAlign, fontStyle: activeTextStyles.fontStyle, fontWeight: activeTextStyles.fontWeight, text: fieldName.value, id: fieldName.value })
    else
      activeObj.set({ text: 'Add field name', fill: '#ff0000', id: 'Lorem ipsum' })
  }
  templateEditorStore.canvas.renderAll()
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, name: fieldName.value ? fieldName.value : 'Add field name', id: fieldName.value ? fieldName.value : 'Lorem ipsum' }
    else return f
  })
})
watch(fieldDescription, () => {
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, fieldDescription: fieldDescription.value }
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
</script>

  <style lang="scss" scoped>
.fields_in_form_fields_options{
height:38px;
width:100%;
}
</style>
