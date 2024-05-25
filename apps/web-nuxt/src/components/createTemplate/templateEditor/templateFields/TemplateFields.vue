<template>
  <div class="flex h-full  w-52  space-x-6 relative mb-12 overflow-auto pr-2 ">
    <div class="w-full">
      <Button v-if="templateEditorStore.ShowAddedFieldsinTemplateFields === true" icon="pi pi-angle-left" class="w-full mb-6 justify-left gap-2" @click="templateEditorStore.ShowAddedFieldsinTemplateFields = false">
        <i class="pi pi-plus"></i>
        Add new field
      </Button>
      <Button v-else icon="pi pi-angle-left" class="w-full mb-6 justify-left gap-2" @click="templateEditorStore.ShowAddedFieldsinTemplateFields = true">
        <i class="pi pi-angle-left"></i>
        Fields list
      </Button>

      <template v-for="(field, index) in templateEditorStore.addedFields">
        <div v-if="templateEditorStore.ShowAddedFieldsinTemplateFields === true" :key="index" class="bg-blue-50 p-3 cursor-pointer rounded-md text-lg text-gray-600 mb-3 " :class="{ 'bg-white text-primaryBlue border  border-[#009ee2] border  border-[#009ee2]': templateEditorStore?.selectedAddedField?.hash === field?.hash }" @click="templateEditorStore?.selectedAddedField?.hash !== field?.hash && selectAddedField(field)">
          {{ field.name }}
          <p class="text-xs">
            on page {{ field.page }}
          </p>
          <div
            v-if="templateEditorStore.selectedAddedField.hash === field.hash" class="flex gap-3 mt-2"
          >
            <!-- <Button text class="text-xs border border-black"> -->
            <font-awesome-icon icon="fa-duotone fa-clone" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 0.6;" @click="duplicateField(field)" />
            <!-- </Button> -->
            <!-- <Button text class="text-xs border border-black"> -->
            <font-awesome-icon icon="fa-duotone fa-trash" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 0.6;" @click="showDeleteConfirmation = true;fieldToDelete = field" />
            <!-- </Button> -->
          </div>
        </div>
      </template>

      <div v-if="templateEditorStore.ShowAddedFieldsinTemplateFields === false" class="transition-all duration-200 ease-linear grid grid-cols-1 gap-2 w-full h-max flex-none">
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
  <Dialog v-model:visible="showDeleteConfirmation" modal header="Field Deletion" :style="{ width: '25rem' }">
    <span class="p-text-secondary block mb-2">Field to delete: {{ fieldToDelete?.name }}</span>
    <span class="p-text-primary block mb-5">Write "{{ fieldToDelete?.name }}" in the field to confirm</span>
    <div class="flex align-items-center gap-3 mb-3">
      <InputText
        id="username" class="flex-auto" autocomplete="off" :value="deleteText"
        @input="event => deleteText = event.target.value"
      />
    </div>

    <div class="flex justify-content-end gap-2 mt-1 justify-center">
      <Button type="button" label="Cancel" outlined @click="showDeleteConfirmation = false;deleteText = ''" />
      <Button :disabled="fieldToDelete.name !== deleteText" type="button" label="Save" @click="deleteField" />
    </div>
  </Dialog>
</template>

<script setup>
import { uuid } from 'vue-uuid'
import { templateEditorStore } from '../store/templateEditorStore.ts'
import { activeTextStyles } from '../store/activeTextStyles'

// const showAddedFields = ref(true)
const showFormFields = ref(false)
const showTimestamp = ref(false)
const showImageOptions = ref(false)
const fieldToDelete = ref(false)
const showDeleteConfirmation = ref(false)
const deleteText = ref('')

function duplicateField(field) {
  const alertIconUrl = 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/33538a37-c1a2-4b6e-93d8-ab8433a8f727_attention.png.png'

  // console.log('making duplicate of field', field)
  const objs = templateEditorStore.canvas._objects
  // console.log('objs', objs)
  objs.forEach((obj) => {
    if (obj.hash === field.hash) {
      if (obj?._element && !obj.stroke && !obj.isAlertIcon) {
        fabric.Image.fromURL(
          'https://placehold.co/300x200?text=DocSpawn'
          // templateEditorStore.datasetData.allEntries[0]['Anomaly 1']
          , (myImg) => {
            myImg.set({
              left: 20,
              top: 20,
              scaleX: obj.scaleX,
              scaleY: obj.scaleY,
              height: obj.height,
              width: obj.width,
              id: obj.id,
              hash: uuid.v1(),
              fieldType: obj.fieldType,
              pageNo: obj.pageNo,
              displayGuide: false,
            })

            if (obj?.id === 'Lorem ipsum') {
              fabric.Image.fromURL(
                alertIconUrl
                , (imgia) => {
                  imgia.set({
                    left: myImg.left + (myImg.width * myImg.scaleX),
                    top: myImg.top,
                    scaleX: 0.07,
                    scaleY: 0.07,
                    isAlertIcon: true,
                    id: myImg.hash,
                    pageNo: myImg.pageNo,
                    displayGuide: false,
                    selectable: false,
                  })
                  templateEditorStore.canvas.add(imgia)
                  templateEditorStore.canvas.renderAll()
                },
              )
            }

            /////////////////////////////////////////////////////
            const fieldToAdd = { fieldType: myImg.fieldType, name: myImg.id, hash: myImg.hash, page: myImg.pageNo,
            }
            const allFields = []
            templateEditorStore.addedFields.forEach((f) => {
              allFields.push(JSON.parse(JSON.stringify(f)))
            })
            allFields.push(fieldToAdd)

            templateEditorStore.addedFields = allFields
            templateEditorStore.canvas.renderAll()

            myImg.on('mouseover', (e) => {
              if (!templateEditorStore.activeAdvancedPointer)
                return
              templateEditorStore.canvas.add(new fabric.Line([100, 1000, 100, 5000], {
                left: e.target.left,
                top: 0,
                stroke: '#3978eb',
                id: e.target.hash,
                fieldType: myImg.fieldType,

              }))
              templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
                left: 0, // event.absolutePointer.x,
                top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY),

                stroke: '#3978eb',
                id: e.target.hash,
                fieldType: myImg.fieldType,
              }))
            })
            myImg.on('mouseout', (e) => {
              if (!templateEditorStore.activeAdvancedPointer)
                return

              const objs = templateEditorStore.canvas._objects
              templateEditorStore.canvas._objects = objs.filter((obj) => {
                if (obj?.stroke === '#3978eb' && obj?.id === e.target.hash && !e.target.displayGuide)
                  return false
                else
                  return true
              })

              templateEditorStore.canvas.renderAll()
            })

            // hoveredElement.value = null
            templateEditorStore.canvas.add(myImg)
            templateEditorStore.canvas.renderAll()
            setTimeout(() => selectAddedField({ ...fieldToAdd, obj: myImg }), 50)
          },
        )
      }
      else {
        const ele = new templateEditorStore.fabric.Text(
        `${obj.text}`,
        {
          // ...obj,
          top: 20,
          left: 20,
          fill: obj.fill,
          fontFamily: obj.fontFamily,
          fontSize: obj.fontSize,
          fontStyle: obj.fontStyle,
          underline: obj.underline,
          fontWeight: obj.fontWeight,
          textAlign: obj.textAlign,
          fieldType: field.fieldType,
          id: obj.id,
          name: field.name,
          hash: uuid.v1(),
          pageNo: obj.pageNo,
        },
        )
        templateEditorStore.canvas.add(ele)
        if (obj.id === 'Lorem ipsum') {
          fabric.Image.fromURL(
            alertIconUrl
            , (myImg) => {
              myImg.set({
                left: ele.left + (ele.width * ele.scaleX),
                top: ele.top,
                scaleX: 0.07,
                scaleY: 0.07,
                isAlertIcon: true,
                id: ele.hash,
                pageNo: templateEditorStore.activePageForCanvas,
                displayGuide: false,
                selectable: false,
              })
              templateEditorStore.canvas.add(myImg)
              templateEditorStore.canvas.renderAll()
            },
          )
        }
        const fieldToAdd = { fieldType: field.fieldType, name: field.name, hash: ele.hash, page: ele.pageNo, obj: ele }
        const allFields = []
        templateEditorStore.addedFields.forEach((f) => {
          allFields.push(JSON.parse(JSON.stringify(f)))
        })
        allFields.push(fieldToAdd)
        templateEditorStore.addedFields = allFields
        // templateEditorStore.selectedAddedField = fieldToAdd

        ele.on('mouseover', (e) => {
          if (!templateEditorStore.activeAdvancedPointer)
            return
          templateEditorStore.canvas.add(new fabric.Line([100, 1000, 100, 5000], {
            left: e.target.left,
            top: 0,
            stroke: '#3978eb',
            id: e.target.hash,
            fieldType: ele.fieldType,
          }))
          templateEditorStore.canvas.add(new fabric.Line([1000, 100, 2000, 100], {
            left: 0, // event.absolutePointer.x,
            top: e.target.top + (Number.parseFloat(e.target.height) * e.target.scaleY) - (1 * ((Number.parseFloat(e.target.height) * e.target.scaleY) / 5)),
            stroke: '#3978eb',
            id: e.target.hash,
            fieldType: ele.fieldType,
          }))
        })
        ele.on('mouseout', (e) => {
          if (!templateEditorStore.activeAdvancedPointer)
            return

          const objs = templateEditorStore.canvas._objects
          templateEditorStore.canvas._objects = objs.filter((obj) => {
            if (obj.stroke === '#3978eb' && obj?.id === e.target.hash && !e.target.displayGuide)
              return false
            else
              return true
          })

          templateEditorStore.canvas.renderAll()
        })

        // templateEditorStore.canvas.renderAll()
        templateEditorStore.canvas.setActiveObject(ele)
        templateEditorStore.canvas.renderAll()
        setTimeout(() => selectAddedField(fieldToAdd), 50)
      }
    }
  })
}

function deleteField() {
  showDeleteConfirmation.value = false
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

  const fieldsS = templateEditorStore.addedFields.filter(f => f?.hash !== templateEditorStore?.selectedAddedField?.hash)
  templateEditorStore.addedFields = fieldsS.map(f => JSON.parse(JSON.stringify (f)))
  templateEditorStore.canvas.discardActiveObject()
  templateEditorStore.canvas.renderAll()
  templateEditorStore.showOptionsBar = false
  deleteText.value = ''
}

// watch(showAddedFields, () => templateEditorStore.showOptionsBar = false)

function selectField(field) {
  templateEditorStore.canvas.discardActiveObject()
  templateEditorStore.canvas.renderAll()
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
  console.log('running select added field', field)
  if (field.page !== templateEditorStore.activePageForCanvas)
    return

  templateEditorStore.canvas._objects.forEach((obj) => {
    if (obj.hash === field.hash) {
      console.log('matced obj')
      templateEditorStore.canvas.setActiveObject(obj)
      templateEditorStore.selectedAddedField = { ...field, obj }
      templateEditorStore.showOptionsBar = true
      templateEditorStore.canvas.renderAll()
      if (obj.text) {
        activeTextStyles.fill = obj.fill ? obj.fill : '#000000'
        activeTextStyles.fontFamily = obj.fontFamily ? obj.fontFamily : 'Arial'
        activeTextStyles.fontSize = obj.fontSize ? obj.fontSize : 32
        activeTextStyles.underline = obj.underline ? obj.underline : false
        activeTextStyles.textAlign = obj.textAlign ? obj.textAlign : 'center'
        activeTextStyles.fontStyle = obj.fontStyle ? obj.fontStyle : 'normal'
        activeTextStyles.fontWeight = obj.fontWeight ? obj.fontWeight : 300
      }
    }
  })
}
watch(() => templateEditorStore.selectedAddedField, (newVal) => {
  console.log('selected added field', newVal)
})
</script>

<style lang="scss" scoped></style>
