<template>
  <div class="flex-1 h-full overflow-auto  ">
    <div v-if="templateEditorStore.showOptionsBar " icon="pi pi-angle-left" class="w-full mb-6 justify-left gap-2 h-[62px] rounded-md text-lg text-primary-500  bg-primary-50   flex items-center justify-center gap-2  transition-all ease-linear duration-75 ">
      <p class="font-poppins  ">
        Field options
      </p>
    </div>
    <div v-else icon="pi pi-angle-left" class="w-full mb-6 justify-left gap-2 h-[62px] rounded-md text-lg text-primary-500  bg-primary-50   flex items-center justify-center gap-2  transition-all ease-linear duration-75 ">
      <p class="font-poppins ">
        Template options
      </p>
    </div>
    <div
      class="transition-all duration-200 ease-linear rounded-md min-h-max pb-6   bg-surface-50 px-5 py-2  overflow-hidden"
    >
      <div v-if="templateEditorStore.showOptionsBar === false">
        <p class="font-poppins">
          Coming soon
        </p>
      </div>
      <div v-else-if="templateEditorStore.showOptionsBar === true && templateEditorStore.selectedAddedField?.fieldType !== ''">
        <p v-if="templateEditorStore.selectedAddedField?.fieldType === ''" class="text-md text-gray-400 text-primaryBlue font-thin font-poppins">
          No template field is selected
        </p>
        <p v-if="templateEditorStore.selectedAddedField?.fieldType !== ''" class=" font-poppins text-lg justify-center  text-center text-gray-400 text-primaryBlue font-thin my-3">
          <span v-if="templateEditorStore.selectedAddedField?.fieldType === 'Fixed text'">
            {{ templateEditorStore?.selectedAddedField?.fieldType }}
          </span>
          <span v-else>
            {{ templateEditorStore?.selectedAddedField?.name }}
          </span>
        </p>
        <div class="mb-6">
          <TextFormatting v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Fixed text'" />
          <p v-if="activeDataField === 'Lorem ipsum' && templateEditorStore.selectedAddedField?.fieldType === 'Data field' " class="font-poppins text-sm text-red-500 mt-2">
            Styles will be applied once you select a data field
          </p>
        </div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field' || templateEditorStore.selectedAddedField?.fieldType === 'Dataset image'" class="w-full ">
          <p class="mb-1 font-poppins">
            Datafield
          </p>

          <div v-if="!activeDataField || activeDataField === 'Lorem ipsum'" class="my-3 flex text-red gap-2">
            <font-awesome-icon icon="fa-duotone fa-triangle-exclamation" size="lg" style="--fa-primary-color: #ffffff; --fa-secondary-color: #ff0000; --fa-secondary-opacity: 0.6;" />
            <p class="font-poppins">
              Select a field
            </p>
          </div>
          <div class="p-0 flex justify-content-center">
            <Dropdown v-model="activeDataField" :options="templateEditorStore.datasetData.keys" filter placeholder="Select data field" class="w-full md:w-14rem">
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

        <div v-else-if="templateEditorStore.selectedAddedField?.fieldType !== 'Fixed text'" class="w-full pt-4">
          <p class="mb-1 font-poppins">
            Field name
          </p>
          <InputText v-model="fieldName" :value="fieldName" class="h-11 w-full" type="text" />
        </div>

        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'form-field'" class="">
          <FormOptions />
        </div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Data field'" class="">
        </div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'image'" class="">
          <div class="mt-4 ">
            <h1 class="font-poppins">
              Upload image
            </h1>
            <input
              class="border border-gray-300 p-1 mt-2 w-full text-sm"
              type="file"
              @change="getFile"
            />
            <img v-if="fileUrl" id="output" accept="image/*" class="mt-5 object-cover h-auto w-full" :src="fileUrl" />
          </div>
        </div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'Fixed text'" class="">
          <div class="flex flex-col gap-2 mt-4">
            <InputText id="username" v-model="constantTextValue" aria-describedby="username-help" />
            <small id="username-help" class="font-poppins">This text will be constant for all documents</small>
          </div>
        </div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'timestamp'" class="">
          <div v-if="templateEditorStore.activeTimestampField === 'time'" class="w-full pt-4">
            <Dropdown v-model="selectedTimeFormat" :options="timeFormats" option-label="name" placeholder="Select time format" class="w-full md:w-14rem" />
          </div>
          <div v-if="templateEditorStore.activeTimestampField === 'date'" class="w-full pt-4">
            <Dropdown v-model="selectedDateFormat" :options="dateFormats" option-label="name" placeholder="Select date format" class="w-full md:w-14rem" />
          </div>
        </div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'checkbox'" class="">
        </div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'radio'" class="">
        </div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'dropdown'" class="">
        </div>
        <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'signature'" class="">
          <div v-if="templateEditorStore.selectedAddedField?.fieldType === 'signature'" class="w-full pt-4 font-poppins">
            Draw signature
            <div class="mt-3 bg-white h-32 w-full border border-blue-300 rounded-md"></div>
            <Button text class="mt-2 w-full font-poppins ">
              Save signature
            </Button>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-md text-gray-400 text-primaryBlue font-thin font-poppins">
          Field options
        </p>
        <p class="font-poppins mt-3">
          No field is selected.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTimestampFormats } from '../../../../composables/useTimestampFormats'
import FormOptions from './FormOptions.vue'
import TextFormatting from './TextFormatting.vue'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'

const activeDataField = ref()
const selectedTimeFormat = ref()
const selectedDateFormat = ref()
const constantTextValue = ref(null)
const fileUrl = ref()
const { timeFormats, dateFormats } = useTimestampFormats()
const fieldName = ref(null)

function getFile(e) {
  const file = e.target.files[0]
  fileUrl.value = URL.createObjectURL(file)
}

watch(constantTextValue, () => {
  const activeObj = templateEditorStore.canvas.getActiveObject()
  if (activeObj)
    activeObj.set({ text: constantTextValue.value ? constantTextValue.value : 'Fixed text' })
  templateEditorStore.canvas.renderAll()
  const allFs = templateEditorStore.addedFields
  templateEditorStore.addedFields = allFs.map((f) => {
    if (f?.hash === templateEditorStore?.selectedAddedField?.hash)
      return { ...f, name: constantTextValue.value ? constantTextValue.value : 'Fixed text' }
    else return f
  })
})

watch(activeDataField, () => {
  if (templateEditorStore.canvas) {
    templateEditorStore.activeDataField = activeDataField.value

    templateEditorStore.addedFields = templateEditorStore.addedFields.map((field) => {
      if (field.hash === templateEditorStore.selectedAddedField.hash)
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
        if (activeDataField.value === 'Lorem ipsum')
          obj.set({ text: activeDataField.value === 'Lorem ipsum' ? obj.text : activeDataField.value, id: activeDataField.value === 'Lorem ipsum' ? obj.id : activeDataField.value })
        else
          obj.set({ ...activeObject.styles, fill: activeTextStyles.fill[0] === '#' ? activeTextStyles.fill : `#${activeTextStyles.fill}`, fontFamily: activeTextStyles.fontFamily, fontSize: activeTextStyles.fontSize, underline: activeTextStyles.underline, textAlign: activeTextStyles.textAlign, fontStyle: activeTextStyles.fontStyle, fontWeight: activeTextStyles.fontWeight, text: activeDataField.value === 'Lorem ipsum' ? obj.text : activeDataField.value, id: activeDataField.value === 'Lorem ipsum' ? obj.id : activeDataField.value })
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
    if (newVal) {
      fieldName.value = newVal.name

      if (newVal?.fieldType === 'Data field' || newVal?.fieldType === 'Dataset image')
        activeDataField.value = newVal.name
      if (newVal?.fieldType === 'Fixed text')
        constantTextValue.value = newVal.name
    }
  },
)
</script>
