<template>
  <div class="flex h-full min-h-screen w-52  space-x-6 relative mb-12">
    <div class="w-full">
      <Button v-if="showAddedFields === true" icon="pi pi-angle-left" class="w-full mb-6 justify-left gap-2" @click="showAddedFields = false">
        <i class="pi pi-plus"></i>
        Add new field
      </Button>
      <Button v-else icon="pi pi-angle-left" class="w-full mb-6 justify-left gap-2" @click="showAddedFields = true">
        <i class="pi pi-angle-left"></i>
        Fields list
      </Button>

      <div class="flex w-full mb-0">
      </div>

      <template v-for="(field, index) in templateEditorStore.addedFields">
        <div v-if="showAddedFields === true" :key="index" class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 mb-3 hover:bg-blue-200" @click="console.log('hurrah', templateEditorStore.selectedAddedField, templateEditorStore.showOptionsBar);templateEditorStore.selectedAddedField = field;templateEditorStore.showOptionsBar = true">
          {{ field.name }}
        </div>
      </template>

      <div v-if="showAddedFields === false" class="transition-all duration-200 ease-linear grid grid-cols-1 gap-2 w-full h-max flex-none">
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="showFormFields ? showFormFields = false : showFormFields = true">
          <!-- <i class="pi pi-user mr-1 text-primaryBlue "></i> -->
          <img :src="FormFieldIcon" class="h-6" />
          Form Fields
          <i class="pi pi-sort-down transition-all duration-300" :class="{ '-rotate-90': !showFormFields }"></i>
        </div>
        <div v-if="showFormFields" class="flex flex-col gap-2">
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'text')">
            Text
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'multiline-text')">
            Multiline-text
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'number')">
            Number
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'signature')">
            Signature
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'checkbox')">
            Checkbox
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'date')">
            Date
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'time')">
            Time
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'image')">
            Image
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('form-field', 'list')">
            List
          </div>
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="showDataFieldOptions ? showDataFieldOptions = false : showDataFieldOptions = true">
          <!-- <i class="pi pi-image mr-1 font-semibold text-primaryBlue"></i> -->
          <img :src="dataFieldIcon" class="h-6" />
          Data fields
          <i class="pi pi-sort-down transition-all duration-300" :class="{ '-rotate-90': !showDataFieldOptions }"></i>
        </div>
        <div v-if="showDataFieldOptions" class="flex flex-col gap-2">
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('data-fields', 'name')">
            Name
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('data-fields', 'email')">
            Email
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('data-fields', 'age')">
            Age
          </div>
        </div>

        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="showImageOptions ? showImageOptions = false : showImageOptions = true">
          <!-- <i class="pi pi-image mr-1 font-semibold text-primaryBlue"></i> -->
          <img :src="imageIcon" class="h-6" />
          Image
          <i class="pi pi-sort-down transition-all duration-300" :class="{ '-rotate-90': !showImageOptions }"></i>
        </div>
        <div v-if="showImageOptions" class="flex flex-col gap-2">
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('image', 'fixed-image')">
            Fixed image
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('image', 'dataset-image')">
            Dataset image
          </div>
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="selectField('text')">
          <!-- <i class="pi pi-pencil mr-1 text-primaryBlue"></i> -->
          <img :src="textIcon" class="h-6" />
          Text
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="showTimestamp ? showTimestamp = false : showTimestamp = true">
          <!-- <i class="pi pi-clock  mr-1 text-primaryBlue"></i> -->
          <img :src="timestampicon" class="h-6" />
          Timestamp
          <i class="pi pi-sort-down transition-all duration-300" :class="{ '-rotate-90': !showTimestamp }"></i>
        </div>
        <div v-if="showTimestamp" class="flex flex-col gap-2">
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('timestamp', 'date')">
            Date
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="selectField('timestamp', 'time')">
            Time
          </div>
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="selectField('checkbox')">
          <!-- <i
            class="pi pi-check-square mr-1 text-primaryBlue"
          ></i> -->
          <img :src="checkboxIcon" class="h-6" />
          Checkbox
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="selectField('radio')">
          <!-- <i
            class="pi pi-circle mr-1 text-primaryBlue"
          ></i> -->
          <img :src="radioIcon" class="h-6" />
          Radio
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2 " @click="selectField('dropdown')">
          <!-- <i
            class="pi pi-caret-down  mr-1 text-primaryBlue"
          ></i> -->
          <img :src="dropdownIcon" class="h-6" />
          Dropdown
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2 " @click="selectField('signature')">
          <!-- <i
            class="pi pi-caret-down  mr-1 text-primaryBlue"
          ></i> -->
          <img :src="signatureIcon" class="h-6" />
          Signature
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { templateEditorStore } from '../store/templateEditorStore.ts'
import FormFieldIcon from '../../../../assets/icons/template-editor/template-editor-form-field-icon.svg'
import imageIcon from '../../../../assets/icons/template-editor/template-editor-image-icon.svg'
import dropdownIcon from '../../../../assets/icons/template-editor/template-editor-dropdown-icon-2.svg'
import timestampicon from '../../../../assets/icons/template-editor/template-editor-timestamp-icon-2.svg'
import textIcon from '../../../../assets/icons/template-editor/template-editor-text-icon.svg'
import signatureIcon from '../../../../assets/icons/template-editor/template-editor-signature-icon.svg'
import checkboxIcon from '../../../../assets/icons/template-editor/template-editor-checkbox-icon.svg'
import radioIcon from '../../../../assets/icons/template-editor/template-editor-radio-icon-2.svg'
import dataFieldIcon from '../../../../assets/icons/template-editor/template-editor-data-fields-icon.svg'

const showAddedFields = ref(true)
const showFormFields = ref(false)
const showTimestamp = ref(false)
const showImageOptions = ref(false)
const showDataFieldOptions = ref(false)

watch(showAddedFields, () => templateEditorStore.showOptionsBar = false)

function selectField(field, subField) {
  templateEditorStore.activeTemplateField = field
  if (field === 'form-field')
    templateEditorStore.activeFormField = subField
  else if (field === 'data-fields')
    templateEditorStore.activeDataField = subField
  else if (field === 'timestamp')
    templateEditorStore.activeTimestampField = subField
  else if (field === 'image')
    templateEditorStore.activeImageOption = subField

  templateEditorStore.showOptionsBar = true
}
</script>

<style lang="scss" scoped></style>
