<template>
  <div>
    <div v-if="templateEditorStore?.selectedAddedField?.fieldType !== 'Form checkbox group'">
      <div class="flex flex-col mt-4">
        <p class="font-poppins text-md text-surface-600 mb-2">
          {{ $t('Cp_templateEditor_formOptions.field_name') }}
        </p>
        <InputText v-model="fieldName" />
      </div>
      <div class="flex flex-col mt-4">
        <p class="font-poppins text-md text-surface-600 mb-2">
          {{ $t('Cp_templateEditor_formOptions.field_description') }}
        </p>
        <Textarea v-model="fieldDescription" rows="3" />
        <p id="username-help" class="font-poppins text-xs mt-2">
          {{ $t('Cp_templateEditor_formOptions.field_description_note') }}
        </p>
      </div>
    </div>

    <div class="flex items-center mt-6 gap-4">
      <Checkbox v-model="isRequired" :binary="true" />
      <p class="font-poppins text-md text-surface-600">
        {{ $t('Cp_templateEditor_formOptions.required') }}
      </p>
    </div>

    <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form list'" class="w-full pt-4 mb-4">
      <p class="font-poppins text-md text-surface-500 mb-2 mt-4">
        {{ $t('Cp_templateEditor_formOptions.select_list') }}
      </p>
      <p class="my-2 font-poppins">
        {{ $t('Cp_templateEditor_formOptions.selected_list', { selectedList: selectedList?.id ? selectedList?.title : $t('Cp_templateEditor_formOptions.not_selected') }) }}
      </p>
      <Button :label="$t('Cp_templateEditor_formOptions.click_to_select')" contained class="btn px-2" @click="visibleListSelection = true" />
      <Dialog v-model:visible="visibleListSelection" modal :header="$t('Cp_templateEditor_formOptions.list_selection')" :style="{ width: '50vw' }">
        <div class="w-full h-200">
          <list :from-template-editor="true" :selected-list-for-template-editor="selectedList" @close-template-editor-popup="visibleListSelection = false" @handle-select-list="(list) => selectedList = list" />
        </div>
      </Dialog>
    </div>

    <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form time'" class="w-full pt-4 mb-4">
      <p class="font-poppins text-md text-surface-500 mb-2">
        {{ $t('Cp_templateEditor_formOptions.select_format') }}
      </p>
      <Dropdown v-model="selectedTimeFormat" :options="timeFormats" option-label="name" :placeholder="$t('Cp_templateEditor_formOptions.select_format')" class="w-full md:w-full" />
    </div>

    <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form date'" class="w-full pt-4 mb-4">
      <p class="font-poppins text-md text-surafce-500 mb-2">
        {{ $t('Cp_templateEditor_formOptions.select_format') }}
      </p>
      <Dropdown v-model="selectedDateFormat" :options="dateFormats" option-label="name" :placeholder="$t('Cp_templateEditor_formOptions.select_format')" class="w-full md:w-full" />
    </div>

    <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form text'" class="mt-4">
      <div class="flex items-center gap-2 cursor-pointer text-primary-600 mt-6" @click="showAdvancedOptions = !showAdvancedOptions">
        <p class="font-poppins text-md">
          {{ $t('Cp_templateEditor_formOptions.advanced_options') }}
        </p>
        <font-awesome-icon icon="fa-light fa-caret-right transition-all duration-300 text-surface-600" size="lg" :class="{ 'rotate-90': showAdvancedOptions }" />
      </div>
      <div v-if="showAdvancedOptions">
        <p class="font-poppins text-md text-surface-600 mt-4 mb-2">
          {{ $t('Cp_templateEditor_formOptions.accepted_characters') }}
        </p>
        <div class="flex flex-col gap-3">
          <div v-for="option in characterAcceptionOptions" :key="option" class="flex items-center">
            <RadioButton v-model="selectedCharacterAcception" :input-id="option" name="dynamic" :value="option" />
            <label :for="option" class="ml-2 font-poppins">{{ option }}</label>
          </div>
        </div>
        <div v-if="selectedCharacterAcception === 'Numbers'" class="flex items-center mt-6 gap-4">
          <Checkbox v-model="allowDecimals" :binary="true" />
          <p class="font-poppins text-md text-surface-600">
            {{ $t('Cp_templateEditor_formOptions.allow_decimals') }}
          </p>
        </div>

        <div class="flex flex-col mt-6">
          <div class="mb-2 flex items-center gap-2">
            <p class="font-poppins text-md text-surface-600">
              {{ $t('Cp_templateEditor_formOptions.min_field_length') }}
            </p>
            <div v-tooltip.top="$t('Cp_templateEditor_formOptions.min_character_length_tooltip')">
              <font-awesome-icon icon="fa-duotone fa-square-question" size="lg" />
            </div>
          </div>
          <InputNumber v-model="minFieldLength" input-id="integeronly1" :use-grouping="false" @input="changeMinLength" />
        </div>

        <div class="flex flex-col mt-4">
          <div class="mb-2 flex items-center gap-2">
            <p class="font-poppins text-md text-surface-600">
              {{ $t('Cp_templateEditor_formOptions.max_field_length') }}
            </p>
            <div v-tooltip.top="$t('Cp_templateEditor_formOptions.max_character_length_tooltip')">
              <font-awesome-icon icon="fa-duotone fa-square-question" size="lg" />
            </div>
          </div>
          <InputNumber v-model="maxFieldLength" input-id="integeronly2" :use-grouping="false" @input="changeMaxLength" />
        </div>
      </div>
    </div>

    <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form checkbox group'" class="w-full pt-0">
      <CheckboxOptions />
    </div>

    <div v-if="templateEditorStore.activeFormField === 'time'" class="w-full pt-4 mt-2">
      <Dropdown v-model="selectedTimeFormat" :options="timeFormats" option-label="name" :placeholder="$t('Cp_templateEditor_formOptions.select_format')" class="w-full md:w-full p-1" />
    </div>

    <div v-if="templateEditorStore.activeFormField === 'date'" class="w-full pt-4 mt-2">
      <Dropdown v-model="selectedDateFormat" :options="dateFormats" option-label="name" :placeholder="$t('Cp_templateEditor_formOptions.select_format')" class="w-full md:w-full p-1" />
    </div>

    <div v-if="templateEditorStore.activeFormField === 'image'" class="w-full pt-4">
      <ImageOptions />
    </div>
  </div>
</template>

<script setup>
import ImageOptions from '../../../../components/createTemplate/templateEditor/options/ImageOptions.vue'
import CheckboxOptions from '../../../../components/createTemplate/templateEditor/options/CheckboxOptions.vue'
import { useTimestampFormats } from '../../../../composables/useTimestampFormats'
import { templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'
import list from '@/components/settings/list/list.vue'

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
const visibleListSelection = ref(false)
const selectedList = ref()
watch(selectedList, () => {
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, selectedList: selectedList.value }
    else return f
  })
})

const selectedCharacterAcception = ref('Text')
const characterAcceptionOptions = ref([
  'Text',
  'Text + numbers',
  'Numbers',
])

function fillUpOptions() {
  const sF = templateEditorStore.selectedAddedField
  console.log('sf', sF)
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
    selectedDateFormat.value = sF?.dateFormat ? { name: sF?.dateFormat } : { name: 'MM/DD/YYYY' }
  if (sF?.fieldType === 'Form time')
    selectedTimeFormat.value = sF?.timeFormat ? { name: sF?.timeFormat } : { name: 'HH:MM:SS' }
  if (sF?.fieldType === 'Form list')
    selectedList.value = sF?.selectedList ? sF?.selectedList : {}
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
      if (activeObj.fieldType === 'Form long text') {
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
      return { ...f, minCharAllowed: Number.parseInt(length) }
    else return f
  })
}

function changeMaxLength() {
  const length = event.target.value
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, maxCharAllowed: Number.parseInt(length) }
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
  console.log('selected time format', selectedTimeFormat.value)
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, timeFormat: selectedTimeFormat.value?.name ? selectedTimeFormat.value?.name : selectedTimeFormat.value }
    else return f
  })
})
watch(selectedDateFormat, () => {
  console.log('selected date format', selectedDateFormat.value)
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, dateFormat: selectedDateFormat.value?.name ? selectedDateFormat.value?.name : selectedDateFormat.value }
    else return f
  })
})
// /******************* */
const selectedCity = ref()
const countries = ref([
  {
    name: 'Australia',
    code: 'AU',
    states: [
      { cname: 'Sydney', code: 'A-SY' },
      { cname: 'Newcastle', code: 'A-NE' },

      {
        name: 'Queensland',
        cities: [
          { cname: 'Brisbane', code: 'A-BR' },
          { cname: 'Townsville', code: 'A-TO' },
        ],
      },
    ],
  },
  {
    name: 'Canada',
    code: 'CA',
    states: [
      {
        name: 'Quebec',
        cities: [
          { cname: 'Montreal', code: 'C-MO' },
          { cname: 'Quebec City', code: 'C-QU' },
        ],
      },
      {
        name: 'Ontario',
        cities: [
          { cname: 'Ottawa', code: 'C-OT' },
          { cname: 'Toronto', code: 'C-TO' },
        ],
      },
    ],
  },
  {
    name: 'United States',
    code: 'US',
    states: [
      {
        name: 'California',
        cities: [
          { cname: 'Los Angeles', code: 'US-LA' },
          { cname: 'San Diego', code: 'US-SD' },
          { cname: 'San Francisco', code: 'US-SF' },
        ],
      },
      {
        name: 'Florida',
        cities: [
          { cname: 'Jacksonville', code: 'US-JA' },
          { cname: 'Miami', code: 'US-MI' },
          { cname: 'Tampa', code: 'US-TA' },
          { cname: 'Orlando', code: 'US-OR' },
        ],
      },
      {
        name: 'Texas',
        cities: [
          { cname: 'Austin', code: 'US-AU' },
          { cname: 'Dallas', code: 'US-DA' },
          { cname: 'Houston', code: 'US-HO' },
        ],
      },
    ],
  },
  { cname: 'Wollongong', code: 'A-WO' },
])
</script>

  <style lang="scss" scoped>
.fields_in_form_fields_options{
height:38px;
width:100%;
}
</style>
