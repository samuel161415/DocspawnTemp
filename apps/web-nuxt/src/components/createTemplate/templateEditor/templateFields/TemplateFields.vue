<template>
  <ConfirmPopup group="confirmFieldDeletion" />
  <div class="flex-1 h-full overflow-auto pr-1" :style="{ minWidth: '200px' }">
    <div class="w-full">
      <div
        v-if="templateEditorStore.ShowAddedFieldsinTemplateFields === true"
        icon="pi pi-angle-left"
        class="w-full mb-6 justify-left gap-2 h-[62px] text-lg rounded-md text-primary-500 cursor-pointer bg-primary-50 flex items-center justify-center gap-2 transition-all ease-linear duration-75 hover:border hover:border-primaryBlue"
        @click="templateEditorStore.ShowAddedFieldsinTemplateFields = false"
      >
        <i class="pi pi-plus"></i>
        <p class="font-poppins">
          {{ $t('Cp_createTemplate_editorTemplateFields.add_new_field') }}
        </p>
      </div>
      <div
        v-else
        icon="pi pi-angle-left"
        class="w-full mb-6 justify-left gap-2 h-[62px] rounded-md text-lg text-primary-500 cursor-pointer bg-primary-50 flex items-center justify-center gap-2 transition-all ease-linear duration-75 hover:border hover:border-primaryBlue"
        @click="templateEditorStore.ShowAddedFieldsinTemplateFields = true"
      >
        <i class="pi pi-angle-left"></i>
        <p class="font-poppins">
          {{ $t('Cp_createTemplate_editorTemplateFields.fields_list') }}
        </p>
      </div>

      <ShowAddedFields v-if="templateEditorStore.ShowAddedFieldsinTemplateFields" @select-added-field="selectAddedField" />
      <div v-if="templateEditorStore.ShowAddedFieldsinTemplateFields === false" class="transition-all duration-200 ease-linear grid grid-cols-1 gap-2 w-full h-max flex-none">
        <AddTextboxButton />
        <ShowDataFields :show-fields-to-add="showFieldsToAdd" @select-field="selectField" @set-show-fields-to-add="() => showFieldsToAdd === 'Datafield' ? showFieldsToAdd = '' : showFieldsToAdd = 'Datafield'" />
        <ShowFormFields :show-fields-to-add="showFieldsToAdd" @select-field="selectField" @set-show-fields-to-add="() => showFieldsToAdd === 'Formfield' ? showFieldsToAdd = '' : showFieldsToAdd = 'Formfield'" />
        <ShowStaticFields :show-fields-to-add="showFieldsToAdd" @select-field="selectField" @set-show-fields-to-add="() => showFieldsToAdd === 'Staticfield' ? showFieldsToAdd = '' : showFieldsToAdd = 'Staticfield'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ShowAddedFields from './ShowAddedFields.vue'
import AddTextboxButton from './AddTextboxButton.vue'
import ShowDataFields from './ShowDataFields.vue'
import ShowFormFields from './ShowFormFields.vue'
import ShowStaticFields from './ShowStaticFields.vue'
import { templateEditorStore } from '@/composables/useTemplateEditorData'
import canvasService from '@/composables/useTemplateCanvas'
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
const runtimeConfig = useRuntimeConfig()

const showFieldsToAdd = ref('')// either Datafield, Formfield or Staticfield

onMounted(() => {
  if (templateEditorStore?.templateToEdit?.id)
    templateEditorStore.ShowAddedFieldsinTemplateFields = true
})
watch(() => templateEditorStore.ShowAddedFieldsinTemplateFields, () => {
  templateEditorStore.activeTemplateField = false
})

watch(() => templateEditorStore.fieldToAdd, (val) => {
  if (!val?.id)
    showFieldsToAdd.value = ''
})

async function selectField(field, option) {
  // clear refs in case of Data field
  // showDatasetOptions.value = false
  // selectedDatasetOption.value = ''

  const canvas = canvasService.getCanvas()
  if (canvas) {
    canvas.discardActiveObject()
    canvas.renderAll()
    templateEditorStore.activeTemplateField = field
    if (field === 'Data field' || field === 'Dataset image') {
      templateEditorStore.fieldToAdd = { name: option || 'Select a data field', type: field, id: option || 'Lorem ipsum' }
    }
    else if (field === 'Dataset date') {
      templateEditorStore.fieldToAdd = { name: option || 'Select a date field', type: field, id: option || 'Lorem ipsum', dateFormat: 'MM/DD/YYYY' }
    }
    else if (field === 'Dataset checkbox') {
      const allCheckboxes = await fetchCheckboxOptions()
      let yesDesign
      = allCheckboxes?.filter(f => f?.type === 'checked' && f?.default)[0]?.design
      if (!yesDesign)
        yesDesign = allCheckboxes?.filter(f => f?.type === 'checked')[0]?.design
      if (!yesDesign)
        yesDesign = 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/cb212f15-9a46-420d-b091-6f9f8096a048_yes1.png'
      let noDesign
      = allCheckboxes?.filter(f => f?.type === 'unchecked' && f?.default)[0]?.design
      if (!noDesign)
        noDesign = allCheckboxes?.filter(f => f?.type === 'unchecked')[0]?.design
      if (!noDesign)
        noDesign = 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png'

      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum', designs: {
        yes: yesDesign,
        no: noDesign,
      }, contentFields: { yes: [], no: [] } }
    }
    else if (field === 'Static text') {
      templateEditorStore.fieldToAdd = { name: option || 'Add text', type: field, id: option || 'Lorem ipsum' }
    }
    else if (field === 'Static date') {
      templateEditorStore.fieldToAdd = { name: 'MM/DD/YYYY', type: field, id: 'MM/DD/YYYY' }
    }
    else if (field === 'Static time') {
      templateEditorStore.fieldToAdd = { name: 'HH:MM:SS', type: field, id: 'HH:MM:SS' }
    }
    else if (field === 'Static image') {
      templateEditorStore.fieldToAdd = { name: 'Select image', type: field, id: 'Lorem ipsum' }
    }
    else if (field === 'Form text') {
      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum' }
    }
    else if (field === 'Form long text') {
      templateEditorStore.fieldToAdd = { name: option || 'Long-text', type: field, id: option || 'Lorem ipsum' }
    }
    else if (field === 'Form image') {
      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum' }
    }
    else if (field === 'Form date') {
      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum', dateFormat: 'MM/DD/YYYY' }
    }
    else if (field === 'Form time') {
      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum', timeFormat: 'HH:MM:SS' }
    }
    else if (field === 'Form list') {
      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum' }
    }
    else if (field === 'Form checkbox group') {
      const allCheckboxes = await fetchCheckboxOptions()
      let yesDesign
      = allCheckboxes?.filter(f => f?.type === 'checked' && f?.default)[0]?.design
      if (!yesDesign)
        yesDesign = allCheckboxes?.filter(f => f?.type === 'checked')[0]?.design
      if (!yesDesign)
        yesDesign = 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/cb212f15-9a46-420d-b091-6f9f8096a048_yes1.png'
      let noDesign
      = allCheckboxes?.filter(f => f?.type === 'unchecked' && f?.default)[0]?.design
      if (!noDesign)
        noDesign = allCheckboxes?.filter(f => f?.type === 'unchecked')[0]?.design
      if (!noDesign)
        noDesign = 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/4cc552c3-7ae4-407f-a7f3-33f3a47aa9d8_No3.png'

      templateEditorStore.fieldToAdd = { name: option || 'Add field name', type: field, id: option || 'Lorem ipsum', designs: {
        yes: yesDesign,
        no: noDesign,
      } }
    }
    else { templateEditorStore.fieldToAdd = { name: field, type: field, id: field } }
    templateEditorStore.showOptionsBar = true
  }
}

async function fetchCheckboxOptions() {
  if (!user?.value?.email)
    return
  try {
    const response = await fetch(
      `${runtimeConfig.public.BASE_URL}/checkboxOptions/${user?.value?.email}`,
    )
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)
    const data = await response.json()

    // if (data?.length > 0)
    //   console.log('checkboxOptions', data)

    return data
  }
  catch (error) {
    console.error('Error fetching templates:', error)
  }
}
</script>
