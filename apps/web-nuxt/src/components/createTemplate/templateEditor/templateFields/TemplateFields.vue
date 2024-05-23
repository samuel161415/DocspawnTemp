<template>
  <div class="flex h-full  w-52  space-x-6 relative mb-12 overflow-auto pr-2 ">
    <div class="w-full">
      <Button v-if="showAddedFields === true" icon="pi pi-angle-left" class="w-full mb-6 justify-left gap-2" @click="showAddedFields = false">
        <i class="pi pi-plus"></i>
        Add new field
      </Button>
      <Button v-else icon="pi pi-angle-left" class="w-full mb-6 justify-left gap-2" @click="showAddedFields = true">
        <i class="pi pi-angle-left"></i>
        Fields list
      </Button>

      <template v-for="(field, index) in templateEditorStore.addedFields">
        <div v-if="showAddedFields === true" :key="index" class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 mb-3 " :class="{ 'bg-white text-primaryBlue border  border-[#009ee2] border  border-[#009ee2]': templateEditorStore.selectedAddedField.hash === field.hash }" @click="selectAddedField(field)">
          {{ field.name }}
          <p class="text-xs">
            on page {{ field.page }}
          </p>
        </div>
      </template>

      <div v-if="showAddedFields === false" class="transition-all duration-200 ease-linear grid grid-cols-1 gap-2 w-full h-max flex-none">
        <!-- <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="showFormFields ? showFormFields = false : showFormFields = true">
          <i class="pi pi-user mr-1 text-primaryBlue "></i>
          Form Fields
          <i class="pi pi-sort-down transition-all duration-300" :class="{ '-rotate-90': !showFormFields }"></i>
        </div> -->
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
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" :class="{ 'bg-white text-primaryBlue border  border-[#009ee2]': templateEditorStore.activeTemplateField === 'data-fields' }" @click="selectField('data-fields')">
          <font-awesome-icon icon="fa-duotone fa-file-spreadsheet" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
          Data field
        </div>

        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="showImageOptions ? showImageOptions = false : showImageOptions = true">
          <font-awesome-icon icon="fa-duotone fa-image" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />

          Image
          <i class="pi pi-sort-down transition-all duration-300" :class="{ '-rotate-90': !showImageOptions }"></i>
        </div>
        <div v-if="showImageOptions" class="flex flex-col gap-2">
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" :class="{ 'text-primaryBlue bg-white': templateEditorStore.activeTemplateField === 'fixed-image' }" @click="selectField('fixed-image')">
            Fixed image
          </div>
          <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 ml-5" :class="{ 'text-primaryBlue bg-white border  border-[#009ee2]': templateEditorStore.activeTemplateField === 'dataset-image' }" @click="selectField('dataset-image')">
            Dataset image
          </div>
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="selectField('text')">
          <font-awesome-icon icon="fa-duotone   fa-text" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2cc; --fa-secondary-opacity: 0.6;" />
          Text
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="showTimestamp ? showTimestamp = false : showTimestamp = true">
          <font-awesome-icon icon="fa-duotone fa-clock" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
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
          <font-awesome-icon icon="fa-duotone fa-square-check" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
          Checkbox
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2" @click="selectField('radio')">
          <font-awesome-icon icon="fa-duotone fa-circle-dot" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
          Radio
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2 " @click="selectField('dropdown')">
          <font-awesome-icon icon="fa-duotone fa-square-caret-down" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
          Dropdown
        </div>
        <div class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 flex items-center gap-2 " @click="selectField('signature')">
          <font-awesome-icon icon="fa-duotone fa-file-signature" size="lg" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
          Signature
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { templateEditorStore } from '../store/templateEditorStore.ts'
import { activeTextStyles } from '../store/activeTextStyles'

const showAddedFields = ref(true)
const showFormFields = ref(false)
const showTimestamp = ref(false)
const showImageOptions = ref(false)

watch(showAddedFields, () => templateEditorStore.showOptionsBar = false)

function selectField(field) {
  templateEditorStore.activeTemplateField = field
  // templateEditorStore.selectedAddedField = { name: 'Lorem ipsum', type: field }
  templateEditorStore.fieldToAdd = { name: 'Lorem ipsum', type: field }
  // if (field === 'form-field')
  //   templateEditorStore.activeFormField = subField
  // else if (field === 'data-fields')
  //   templateEditorStore.activeDataField = subField
  // else if (field === 'timestamp')
  //   templateEditorStore.activeTimestampField = subField
  // else if (field === 'image')
  //   templateEditorStore.activeImageOption = subField

  templateEditorStore.showOptionsBar = true
}

function selectAddedField(field) {
  if (field.page !== templateEditorStore.activePageForCanvas)
    return

  templateEditorStore.canvas._objects.forEach((obj) => {
    if (obj.hash === field.hash) {
      templateEditorStore.canvas.setActiveObject(obj)
      templateEditorStore.selectedAddedField = field
      templateEditorStore.showOptionsBar = true
      templateEditorStore.canvas.renderAll()
    }
  })
}
</script>

<style lang="scss" scoped></style>
