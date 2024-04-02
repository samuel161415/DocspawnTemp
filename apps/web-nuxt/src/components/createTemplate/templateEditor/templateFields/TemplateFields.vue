<template>
  <div class="flex h-full min-h-screen w-52  space-x-6 relative mb-12">
    <div class="w-full">
      <div class="flex w-full mb-0">
      </div>
      <div class="transition-all duration-200 ease-linear grid grid-cols-1 gap-2 w-full h-max flex-none">
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="showFormFields ? showFormFields = false : showFormFields = true">
          <!-- <i class="pi pi-user mr-1 text-primaryBlue "></i> -->
          <img :src="FormFieldIcon" class="h-6" />
          Form Fields
          <i class="pi pi-sort-down transition-all duration-300" :class="{ '-rotate-90': !showFormFields }"></i>
        </div>
        <div v-if="showFormFields" class="flex flex-col gap-2">
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'form-field';templateEditorStore.activeFormField = 'text'">
            Text
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'form-field';templateEditorStore.activeFormField = 'multiline-text'">
            Multiline-text
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'form-field';templateEditorStore.activeFormField = 'number'">
            Number
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'form-field';templateEditorStore.activeFormField = 'signature'">
            Signature
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'form-field';templateEditorStore.activeFormField = 'checkbox'">
            Checkbox
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'form-field';templateEditorStore.activeFormField = 'date'">
            Date
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'form-field';templateEditorStore.activeFormField = 'time'">
            Time
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'form-field';templateEditorStore.activeFormField = 'image'">
            Image
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'form-field';templateEditorStore.activeFormField = 'list'">
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
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'data-fields';templateEditorStore.activeDataField = 'name'">
            Name
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'data-fields';templateEditorStore.activeDataField = 'email'">
            Email
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'data-fields';templateEditorStore.activeDataField = 'age'">
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
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'image';templateEditorStore.activeImageOption = 'fixed-image'">
            Fixed image
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'image';templateEditorStore.activeImageOption = 'dataset-image'">
            Dataset image
          </div>
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="templateEditorStore.activeTemplateField = 'text'">
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
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'timestamp';templateEditorStore.activeTimestampField = 'date'">
            Date
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" @click="templateEditorStore.activeTemplateField = 'timestamp';templateEditorStore.activeTimestampField = 'time'">
            Time
          </div>
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click=";templateEditorStore.activeTemplateField = 'checkbox'">
          <!-- <i
            class="pi pi-check-square mr-1 text-primaryBlue"
          ></i> -->
          <img :src="checkboxIcon" class="h-6" />
          Checkbox
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="templateEditorStore.activeTemplateField = 'radio'">
          <!-- <i
            class="pi pi-circle mr-1 text-primaryBlue"
          ></i> -->
          <img :src="radioIcon" class="h-6" />
          Radio
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2 " @click="templateEditorStore.activeTemplateField = 'dropdown'">
          <!-- <i
            class="pi pi-caret-down  mr-1 text-primaryBlue"
          ></i> -->
          <img :src="dropdownIcon" class="h-6" />
          Dropdown
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2 " @click="templateEditorStore.activeTemplateField = 'signature'">
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
import { templateEditorStore } from '../store/templateEditorStore.js'
import FormFieldIcon from '../../../../assets/icons/template-editor/template-editor-form-field-icon.svg'
import imageIcon from '../../../../assets/icons/template-editor/template-editor-image-icon.svg'
import dropdownIcon from '../../../../assets/icons/template-editor/template-editor-dropdown-icon-2.svg'
import timestampicon from '../../../../assets/icons/template-editor/template-editor-timestamp-icon-2.svg'
import textIcon from '../../../../assets/icons/template-editor/template-editor-text-icon.svg'
import signatureIcon from '../../../../assets/icons/template-editor/template-editor-signature-icon.svg'
import checkboxIcon from '../../../../assets/icons/template-editor/template-editor-checkbox-icon.svg'
import radioIcon from '../../../../assets/icons/template-editor/template-editor-radio-icon-2.svg'
import dataFieldIcon from '../../../../assets/icons/template-editor/template-editor-data-fields-icon.svg'

const showFormFields = ref(false)
const showTimestamp = ref(false)
const showImageOptions = ref(false)
const showDataFieldOptions = ref(false)
</script>

  <style lang="scss" scoped></style>
