<template>
  <div class="flex-initial w-60 ">
    <div
      v-if="templateEditorStore.showOptionsBar === true"

      class="transition-all duration-200 ease-linear rounded-md min-h-full   bg-blue-50 p-3  overflow-hidden"
    >
      <p v-if="templateEditorStore.activeTemplateField === ''" class="text-md text-gray-400 text-primaryBlue font-thin">
        No template field is selected
      </p>
      <p v-if="templateEditorStore.activeTemplateField !== ''" class="text-md text-gray-400 text-primaryBlue font-thin">
        Field options
      </p>

      <p v-if="templateEditorStore.selectedAddedField.name">
        {{ templateEditorStore.selectedAddedField.name }}
      </p>
      <p v-if="templateEditorStore.selectedAddedField.fieldType">
        ({{ templateEditorStore.selectedAddedField.fieldType }})
      </p>

      <hr />

      <div v-if="templateEditorStore.activeTemplateField === 'data-fields' || templateEditorStore.activeTemplateField === 'dataset-image'" class="w-full pt-4">
        <p class="mb-1">
          Datafield key
        </p>
        <div v-if="!activeDataField || activeDataField === 'Lorem ipsum'" class="my-3 flex text-red gap-2">
          <font-awesome-icon icon="fa-duotone fa-triangle-exclamation" size="lg" style="--fa-primary-color: #ffffff; --fa-secondary-color: #ff0000; --fa-secondary-opacity: 0.6;" />
          <p>Select a field</p>
        </div>
        <!-- <InputText v-model="fieldName" disabled="" :value="templateEditorStore.activeDataField" class="h-11 w-full" type="text" /> -->
        <div class="p-0 flex justify-content-center">
          <Dropdown v-model="activeDataField" :options="templateEditorStore.datasetData.keys" filter placeholder="Select data field" class="w-full md:w-14rem">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>{{ slotProps.value }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
      </div>
      <div v-else class="w-full pt-4">
        <p class="mb-1">
          Field name
        </p>
        <InputText v-model="fieldName" :value="fieldName" class="h-11 w-full" type="text" />
      </div>

      <!-- specific options -->
      <div v-if="templateEditorStore.activeTemplateField === 'form-field'" class="">
        <FormOptions />
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'data-fields'" class="">
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'image'" class="">
        <!-- <ImageOptions /> -->
        <div class="mt-4 ">
          <h1>Upload image</h1>
          <input
            class="border border-gray-300 p-1 mt-2 w-full text-sm"
            type="file"
            @change="getFile"
          />
          <img v-if="fileUrl" id="output" accept="image/*" class="mt-5 object-cover h-auto w-full" :src="fileUrl" />
        </div>
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'text'" class="">
        <div class="flex flex-col gap-2 mt-4">
          <InputText id="username" v-model="constant_text_value" aria-describedby="username-help" />
          <small id="username-help">This text will be constant for all documents</small>
        </div>
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'timestamp'" class="">
        <div v-if="templateEditorStore.activeTimestampField === 'time'" class="w-full pt-4">
          <Dropdown v-model="selectedTimeFormat" :options="timeFormats" option-label="name" placeholder="Select time format" class="w-full md:w-14rem" />
        </div>
        <div v-if="templateEditorStore.activeTimestampField === 'date'" class="w-full pt-4">
          <Dropdown v-model="selectedDateFormat" :options="dateFormats" option-label="name" placeholder="Select date format" class="w-full md:w-14rem" />
        </div>
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'checkbox'" class="">
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'radio'" class="">
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'dropdown'" class="">
      </div>
      <div v-if="templateEditorStore.activeTemplateField === 'signature'" class="">
        <div v-if="templateEditorStore.activeTemplateField === 'signature'" class="w-full pt-4">
          Draw signature
          <div class="mt-3 bg-white h-32 w-full border border-blue-300 rounded-md"></div>
          <Button text class="mt-2 w-full ">
            Save signature
          </Button>
        </div>
      </div>
      <TextFormatting v-if="templateEditorStore.selectedAddedField.fieldType === 'data-fields'" />
      <!-- <div class="flex gap-2   text-gray-400 items-center"> -->
      <!-- <p>Remove field</p> -->
      <!-- <div class="cursor-pointer"> -->
      <Button outlined severity="danger" class="px-3 w-full mt-6" @click="deleteFieldFromCanvas">
        Delete field
        <!-- <font-awesome-icon icon="fa-duotone fa-minus-circle" size="xl" style="--fa-primary-color: #ffffff; --fa-secondary-color: #ff0000; --fa-secondary-opacity: 0.6;" /> -->
      </Button>
      <!-- </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
import { templateEditorStore } from '../store/templateEditorStore.ts'
import { useTimestampFormats } from '../../../../composables/useTimestampFormats'
import { activeTextStyles } from '../store/activeTextStyles'
import ImageOptions from './ImageOptions.vue'
import FormOptions from './FormOptions.vue'
import TextFormatting from './TextFormatting.vue'

const activeDataField = ref()
const selectedTimeFormat = ref()
const selectedDateFormat = ref()
const constant_text_value = ref(null)
const fileUrl = ref()
const { timeFormats, dateFormats } = useTimestampFormats()
const fieldName = ref(null)

function getFile(e) {
  const file = e.target.files[0]
  fileUrl.value = URL.createObjectURL(file)
}

function deleteFieldFromCanvas() {
  const fieldId = templateEditorStore.activeDataField
  const object = templateEditorStore.canvas.getActiveObject()
  // if (object?.id)
  //   templateEditorStore.canvas.remove(object)
  // else
  templateEditorStore.canvas._objects = templateEditorStore.canvas._objects.filter((obj) => {
    if (obj?.hash === object?.hash || obj.id === object?.hash)
      return false
    else
      return true
  })

  const fieldsS = templateEditorStore.addedFields.filter(f => f?.name !== fieldId)
  templateEditorStore.addedFields = fieldsS.map(f => JSON.parse(JSON.stringify (f)))
  templateEditorStore.canvas.discardActiveObject()
  templateEditorStore.canvas.renderAll()
  templateEditorStore.showOptionsBar = false
}

watch(activeDataField, () => {
  if (templateEditorStore.canvas) {
    templateEditorStore.activeDataField = activeDataField.value

    templateEditorStore.addedFields = templateEditorStore.addedFields.map((field) => {
      if (field.name === templateEditorStore.selectedAddedField.name)
        return JSON.parse(JSON.stringify({ ...field, name: activeDataField.value }))
      else
        return JSON.parse(JSON.stringify(field))
    })

    templateEditorStore.selectedAddedField.name = activeDataField.value
    const activeObject = templateEditorStore.canvas.getActiveObject()

    const objs = templateEditorStore.canvas._objects
    templateEditorStore.canvas._objects = objs.filter((obj) => {
      if (obj.id === activeObject.hash && obj.isAlertIcon && activeDataField.value !== 'Lorem ipsum')
        return false
      else
        return true
    },
    ).map((obj) => {
      if (obj === activeObject) {
        obj.set({ text: activeDataField.value, id: activeDataField.value })
        return obj
      }
      else {
        return obj
      }
    })

    templateEditorStore.canvas.renderAll()
  }
})

watch(
  () => templateEditorStore.selectedAddedField,
  (newVal) => {
    fieldName.value = newVal.name

    if (newVal.fieldType === 'data-fields' || newVal.fieldType === 'dataset-image')
      activeDataField.value = newVal.name
  },
)
</script>
