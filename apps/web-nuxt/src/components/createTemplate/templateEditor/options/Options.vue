<template>
  <div class="flex-1 h-full overflow-auto">
    <div v-if="templateEditorStore.showOptionsBar" icon="pi pi-angle-left" class="w-full mb-6 justify-left gap-2 h-[62px] rounded-md text-lg text-primary-500 bg-primary-50 flex items-center justify-center gap-2 transition-all ease-linear duration-75">
      <p class="font-poppins">
        {{ $t('Cp_templateEditor_options.field_options') }}
      </p>
    </div>
    <div v-else icon="pi pi-angle-left" class="w-full mb-6 justify-left gap-2 h-[62px] rounded-md text-lg text-primary-500 bg-primary-50 flex items-center justify-center gap-2 transition-all ease-linear duration-75">
      <p class="font-poppins">
        {{ $t('Cp_templateEditor_options.template_options') }}
      </p>
    </div>
    <div class="transition-all duration-200 ease-linear rounded-md min-h-max pb-6 bg-surface-50 px-5 py-2 overflow-hidden">
      <div v-if="templateEditorStore.showOptionsBar === false">
        <TemplateOptions @save-template="emit('saveTemplate')" />
      </div>
      <div v-else-if="templateEditorStore.showOptionsBar === true && templateEditorStore.selectedAddedField?.fieldType !== ''">
        <p v-if="templateEditorStore.selectedAddedField?.fieldType === ''" class="text-md text-gray-400 text-primaryBlue font-thin font-poppins">
          {{ $t('Cp_templateEditor_options.no_template_field_selected') }}
        </p>
        <p v-if="templateEditorStore.selectedAddedField?.fieldType !== ''" class="font-poppins text-lg justify-center text-center text-gray-400 text-primaryBlue font-thin my-3">
          <span v-if="templateEditorStore.selectedAddedField?.fieldType === 'Static text' || templateEditorStore.selectedAddedField?.fieldType === 'Static date' || templateEditorStore.selectedAddedField?.fieldType === 'Static time' || templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form image' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' ">
            {{ $t(`Cp_templateEditor_options.${templateEditorStore?.selectedAddedField?.fieldType.replace(' ', '_').toLowerCase()}`) }}
          </span>
          <span v-else-if="templateEditorStore.selectedAddedField?.fieldType === 'Form checkbox group'">
            {{ $t('Cp_templateEditor_options.checkbox_group') }} {{ templateEditorStore?.selectedAddedField?.groupPosition }}
          </span>
          <span v-else>
            {{ templateEditorStore?.selectedAddedField?.name }}
          </span>
        </p>
        <div v-if="templateEditorStore?.selectedAddedField?.fieldType !== 'Form checkbox group'" class="mb-6">
          <TextFormatting />
          <p v-if="(activeDataField === 'Lorem ipsum' && templateEditorStore.selectedAddedField?.fieldType === 'Data field')" class="font-poppins text-sm text-red-500 mt-2">
            {{ $t('Cp_templateEditor_options.styles_applied_on_select') }}
          </p>
          <p v-if="((templateEditorStore.selectedAddedField?.name === 'Lorem ipsum' || templateEditorStore.selectedAddedField?.name === 'Add field name') && (['Form text', 'Form long text', 'Form date', 'Form time']?.includes(templateEditorStore?.selectedAddedField?.fieldType)))" class="font-poppins text-sm text-red-500 mt-2">
            {{ $t('Cp_templateEditor_options.styles_applied_on_add_name') }}
          </p>
        </div>

        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Dataset date' || templateEditorStore.selectedAddedField?.fieldType === 'Dataset image'" class="w-full">
          <p class="mb-1 font-poppins text-surface-500">
            {{ $t('Cp_templateEditor_options.select_field') }}
          </p>

          <div v-if="!activeDataField || activeDataField === 'Lorem ipsum'" class="my-3 flex text-red gap-2">
            <font-awesome-icon icon="fa-duotone fa-triangle-exclamation" size="lg" style="--fa-primary-color: #ffffff; --fa-secondary-color: #ff0000; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins">
              {{ $t('Cp_templateEditor_options.select_field') }}
            </p>
          </div>
          <div class="p-0 flex justify-content-center">
            <Dropdown v-model="activeDataField" :options="templateEditorStore.selectedAddedField?.fieldType !== 'Dataset image' ? templateEditorStore.datasetData.selectedKeys : templateEditorStore?.datasetData?.urlKeys?.filter((d) => templateEditorStore.datasetData.selectedKeys?.includes(d))" filter :placeholder="$t('Cp_templateEditor_options.select_data_field')" class="w-full md:w-full">
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <p class="font-poppins">
                    {{ slotProps.value }}
                  </p>
                </div>
                <span v-else>
                  <p class="font-poppins">{{ slotProps.placeholder }}</p>
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <p class="font-poppins">
                    {{ slotProps.option }}
                  </p>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>

        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form text' || templateEditorStore.selectedAddedField?.fieldType === 'Form long text' || templateEditorStore.selectedAddedField?.fieldType === 'Form image' || templateEditorStore.selectedAddedField?.fieldType === 'Form date' || templateEditorStore.selectedAddedField?.fieldType === 'Form time' || templateEditorStore.selectedAddedField?.fieldType === 'Form list' || templateEditorStore.selectedAddedField?.fieldType === 'Form checkbox group'" class="">
          <FormOptions />
        </div>

        <div
          v-if="templateEditorStore.selectedAddedField?.fieldType === 'Dataset date'
          // || templateEditorStore.selectedAddedField?.fieldType === 'Form image'
          " class="my-6"
        >
          <p class="font-poppins text-md text-surafce-600 mb-2">
            {{ $t('Cp_templateEditor_options.select_format') }}
          </p>
          <Dropdown v-model="selectedDateFormat" :options="dateFormats" option-label="name" :placeholder="$t('Cp_templateEditor_options.select_format')" class="w-full md:w-full" />
        </div>
        <div
          v-if="templateEditorStore.selectedAddedField?.fieldType === 'Dataset image'
          // || templateEditorStore.selectedAddedField?.fieldType === 'Form image'
          " class="mb-6"
        >
          <p class="font-poppins text-surface-500 mt-4 mb-2">
            {{ $t('Cp_templateEditor_options.image_proportion') }}
          </p>
          <div class="flex flex-col flex-wrap gap-4 mt-2">
            <div v-tooltip.top="'Image height will be fixed but width will adapt the proportion'" class="flex items-center">
              <RadioButton v-model="datasetImageProportionOption" input-id="ingredient1" name="imageProprtion" value="fitToHeight" />
              <label for="ingredient1" class="ml-2 font-poppins">{{ $t('Cp_templateEditor_options.fit_to_height') }}</label>
            </div>
            <div v-tooltip.top="'Width will be fixed but height will adapt the proportion'" class="flex items-center">
              <RadioButton v-model="datasetImageProportionOption" input-id="ingredient2" name="imageProprtion" value="fitToWidth" />
              <label for="ingredient2" class="ml-2 font-poppins">{{ $t('Cp_templateEditor_options.fit_to_width') }}</label>
            </div>
          </div>
        </div>

        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Static image'" class="">
          <div class="mt-4">
            <h1 class="font-poppins">
              {{ $t('Cp_templateEditor_options.upload_image') }}
            </h1>
            <input class="border border-gray-300 p-1 mt-2 w-full text-sm" type="file" @change="getFile" />
            <img v-if="fileUrl" id="output" accept="image/*" class="mt-5 object-cover h-auto w-full" :src="fileUrl" />
          </div>
        </div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Static text'" class="">
          <div class="flex flex-col mt-4">
            <p class="font-poppins text-md text-surface-600 mb-2">
              {{ $t('Cp_templateEditor_options.add_text') }}
            </p>
            <InputText id="username" v-model="constantTextValue" aria-describedby="username-help" />
            <p id="username-help" class="font-poppins text-xs mt-2">
              {{ $t('Cp_templateEditor_options.static_text_help') }}
            </p>
          </div>
        </div>

        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Static time'" class="w-full pt-4">
          <p class="font-poppins text-md text-surface-600 mb-2">
            {{ $t('Cp_templateEditor_options.select_format') }}
          </p>
          <Dropdown v-model="selectedTimeFormat" :options="timeFormats" option-label="label" :placeholder="$t('Cp_templateEditor_options.select_format')" class="w-full md:w-full" />
          <p id="username-help" class="font-poppins text-xs mt-2">
            {{ $t('Cp_templateEditor_options.static_time_help') }}
          </p>
        </div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Static date'" class="w-full pt-4">
          <p class="font-poppins text-md text-surafce-600 mb-2">
            {{ $t('Cp_templateEditor_options.select_format') }}
          </p>
          <Dropdown v-model="selectedDateFormat" :options="dateFormats" option-label="name" :placeholder="$t('Cp_templateEditor_options.select_format')" class="w-full md:w-full" />
          <p id="username-help" class="font-poppins text-xs mt-2">
            {{ $t('Cp_templateEditor_options.static_date_help') }}
          </p>
        </div>

        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'checkbox'" class=""></div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'radio'" class=""></div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'dropdown'" class=""></div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'signature'" class="">
          <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'signature'" class="w-full pt-4 font-poppins">
            {{ $t('Cp_templateEditor_options.draw_signature') }}
            <div class="mt-3 bg-white h-32 w-full border border-blue-300 rounded-md"></div>
            <Button text class="mt-2 w-full font-poppins">
              {{ $t('Cp_templateEditor_options.save_signature') }}
            </Button>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-md text-gray-400 text-primaryBlue font-thin font-poppins">
          {{ $t('Cp_templateEditor_options.field_options') }}
        </p>
        <p class="font-poppins mt-3">
          {{ $t('Cp_templateEditor_options.no_field_selected') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTimestampFormats } from '../../../../composables/useTimestampFormats'
import FormOptions from './FormOptions.vue'
import TextFormatting from './TextFormatting.vue'
import ElementRotation from './ElementRotation.vue'
import TemplateOptions from './TemplateOptions.vue'
import ImageOptions from './ImageOptions.vue'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'
import uploadFileToBackend from '~/services/uploadFileToBackend'

const emit = defineEmits(['saveTemplate'])

const activeDataField = ref()
const selectedTimeFormat = ref()
const selectedDateFormat = ref()
const constantTextValue = ref(null)
const fileUrl = ref()
const { timeFormats, dateFormats } = useTimestampFormats()
const fieldName = ref(null)
const datasetImageProportionOption = ref('fitToHeight')

// onMounted(() => {

// })
watch(() => templateEditorStore.showOptionsBar, () => {
  // updating dataset image proportion
  const canvas = canvasService.getCanvas()
  const activeObj = canvas?.getActiveObject()
  if (canvas && activeObj?.hash) {
    const spfield = templateEditorStore?.addedFields?.filter(a => a?.hash === activeObj?.hash)[0]

    if (spfield) {
      if (spfield?.imageProportionMethod) {
        datasetImageProportionOption.value = spfield?.imageProportionMethod
      }
      else {
        datasetImageProportionOption.value = 'fitToHeight'
        const fields = templateEditorStore?.addedFields?.map((a) => {
          if (a?.hash === activeObj?.hash)
            return { ...a, imageProportionMethod: 'fitToHeight' }
          else
            return a
        })
        templateEditorStore.addedFields = fields
      }
    }
  }
})
watch(datasetImageProportionOption, (newVal) => {
  const canvas = canvasService.getCanvas()
  const activeObj = canvas?.getActiveObject()
  if (canvas && activeObj) {
    const fields = templateEditorStore?.addedFields?.map((a) => {
      if (a?.hash === activeObj?.hash)
        return { ...a, imageProportionMethod: newVal }

      else return a
    })
    templateEditorStore.addedFields = fields
  }
})

async function getFile(e) {
  const file = e.target.files[0]
  const url = await uploadFileToBackend(file)
  fileUrl.value = url
  const canvas = canvasService.getCanvas()
  const activeObj = canvas.getActiveObject()
  if (canvas) {
    const objs = canvas._objects
    canvas.objects = objs.map((obj) => {
      if (obj.hash === activeObj.hash) {
        const originalHeight = obj.height * obj.scaleY
        const originalWidth = obj.width * obj.scaleX

        obj.setSrc(url, () => {
          obj.scaleToWidth(originalWidth)
          obj.scaleToHeight(originalHeight)
          canvas.renderAll()
        })
      }
      return obj
    })
    canvas.renderAll()
  }
}

watch(constantTextValue, () => {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObj = canvas.getActiveObject()
    if (activeObj) {
      if (constantTextValue.value)
        activeObj.set({ ...activeObj.styles, fill: activeTextStyles.fill[0] === '#' ? activeTextStyles.fill : `#${activeTextStyles.fill}`, fontFamily: activeTextStyles.fontFamily, fontSize: activeTextStyles.fontSize, underline: activeTextStyles.underline, charSpacing: activeTextStyles.charSpacing, textAlign: activeTextStyles.textAlign, fontStyle: activeTextStyles.fontStyle, fontWeight: activeTextStyles.fontWeight, text: constantTextValue.value, id: constantTextValue.value })
      else
        activeObj.set({ text: 'Add text', fill: '#ff0000', id: 'Lorem ipsum' })
    }
    canvas.renderAll()
    const allFs = templateEditorStore.addedFields
    templateEditorStore.addedFields = allFs.map((f) => {
      if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
        return { ...f, name: constantTextValue.value ? constantTextValue.value : 'Add text', id: constantTextValue.value ? constantTextValue.value : 'Lorem ipsum' }
      else return f
    })
  }
})
watch(selectedTimeFormat, () => {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObj = canvas.getActiveObject()
    if (activeObj)
      activeObj.set({ text: selectedTimeFormat.value?.name ? selectedTimeFormat.value?.name : 'HH:MM:SS', id: selectedTimeFormat.value?.name ? selectedTimeFormat.value?.name : 'HH:MM:SS' })
    canvas.renderAll()
    const allFs = templateEditorStore.addedFields
    templateEditorStore.addedFields = allFs.map((f) => {
      if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
        return { ...f, name: selectedTimeFormat.value?.name ? selectedTimeFormat.value?.name : 'HH:MM:SS', id: selectedTimeFormat.value?.name ? selectedTimeFormat.value?.name : 'HH:MM:SS' }
      else return f
    })
  }
})
watch(selectedDateFormat, () => {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    const activeObj = canvas.getActiveObject()
    if (activeObj) {
      if (activeObj.fieldType !== 'Dataset date')
        activeObj.set({ text: selectedDateFormat.value?.name ? selectedDateFormat.value?.name : 'MM/DD/YYYY', id: selectedDateFormat.value?.name ? selectedDateFormat.value?.name : 'MM/DD/YYYY' })
    }
    canvas.renderAll()
    const allFs = templateEditorStore.addedFields
    templateEditorStore.addedFields = allFs.map((f) => {
      if (f?.hash === templateEditorStore?.selectedAddedField?.hash) {
        if (f?.fieldType === 'Dataset date')
          return { ...f, dateFormat: selectedDateFormat.value?.name ? selectedDateFormat.value?.name : 'MM/DD/YYYY' }
        else
          return { ...f, name: selectedDateFormat.value?.name ? selectedDateFormat.value?.name : 'MM/DD/YYYY', id: selectedDateFormat.value?.name ? selectedDateFormat.value?.name : 'MM/DD/YYYY' }
      }
      else { return f }
    })
  }
})

watch(activeDataField, () => {
  const canvas = canvasService.getCanvas()
  if (canvas) {
    templateEditorStore.activeDataField = activeDataField.value

    templateEditorStore.addedFields = templateEditorStore.addedFields.map((field) => {
      if (field.hash === templateEditorStore.selectedAddedField.hash)
        return JSON.parse(JSON.stringify({ ...field, name: activeDataField.value }))
      else
        return JSON.parse(JSON.stringify(field))
    })

    templateEditorStore.selectedAddedField.name = activeDataField.value
    const activeObject = canvas.getActiveObject()

    const objs = canvas._objects
    canvas._objects = objs.filter((obj) => {
      if (obj.id === activeObject?.hash && obj.isAlertIcon && activeDataField.value !== 'Lorem ipsum')
        return false
      else
        return true
    },
    ).map((obj) => {
      if (obj === activeObject) {
        if (activeDataField.value === 'Lorem ipsum')
          obj.set({ text: activeDataField.value === 'Lorem ipsum' ? obj.text : activeDataField.value, id: activeDataField.value === 'Lorem ipsum' ? obj.id : activeDataField.value })
        else
          obj.set({ ...activeObject.styles, fill: activeTextStyles.fill[0] === '#' ? activeTextStyles.fill : `#${activeTextStyles.fill}`, fontFamily: activeTextStyles.fontFamily, fontSize: activeTextStyles.fontSize, underline: activeTextStyles.underline, charSpacing: activeTextStyles.charSpacing, textAlign: activeTextStyles.textAlign, fontStyle: activeTextStyles.fontStyle, fontWeight: activeTextStyles.fontWeight, text: activeDataField.value === 'Lorem ipsum' ? obj.text : activeDataField.value, id: activeDataField.value === 'Lorem ipsum' ? obj.id : activeDataField.value })
        return obj
      }
      else {
        return obj
      }
    })

    canvas.renderAll()
  }
})

watch(
  () => templateEditorStore.selectedAddedField,
  (newVal) => {
    if (newVal) {
      fieldName.value = newVal.name

      if (newVal?.fieldType === 'Data field' || newVal?.fieldType === 'Dataset image' || newVal?.fieldType === 'Dataset date')
        activeDataField.value = newVal.name
      if (newVal?.fieldType === 'Dataset date')
        selectedDateFormat.value = { name: newVal.dateFormat }
      if (newVal?.fieldType === 'Static text') {
        if (newVal.name === 'Lorem ipsum' || newVal.name === 'Add text')
          constantTextValue.value = ''
        else
          constantTextValue.value = newVal.name
      }
      if (newVal?.fieldType === 'Static date')
        selectedDateFormat.value = { name: newVal.name }
      if (newVal?.fieldType === 'Static time')
        selectedTimeFormat.value = timeFormats?.value?.filter(f => f?.name === newVal?.name)[0]
    }
  },
)
</script>
