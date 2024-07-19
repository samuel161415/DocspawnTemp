<template>
  <div class="mt-14 rounded-lg pb-2 ">
    <DataView :value="filteredTemplates" :layout="layout">
      <template #header>
        <div class="flex justify-between space-x-2">
          <div class="flex flex-col md:flex-row flex-wrap justify-center space-x-5 mt-2">
            <p class="text-lg font-poppins cursor-pointer font-normal hover:text-primaryBlue" :class="filterOption === '' ? 'text-primaryBlue' : 'text-surface-500 '" @click="filterOption = ''">
              All
            </p>
            <span class="mr-2 text-lg text-surface-500 font-medium"> / </span>
            <p class="text-lg font-poppins font-normal cursor-pointer hover:text-primaryBlue" :class="filterOption === 'favorites' ? 'text-primaryBlue' : 'text-surface-500'" @click="filterOption = 'favorites'">
              Favorites
            </p>
            <span class="mr-2 text-lg text-surface-500 font-medium"> / </span>
            <p class="text-lg font-poppins font-normal cursor-pointer hover:text-primaryBlue" :class=" filterOption === 'form to doc' ? 'text-primaryBlue' : 'text-surface-500'" @click="filterOption = 'form to doc'">
              Form to doc
            </p>
            <span class="mr-2 text-lg text-surface-500 font-medium"> / </span>
            <p class="text-lg font-poppins font-normal cursor-pointer hover:text-primaryBlue" :class="filterOption === 'data to doc' ? 'text-primaryBlue' : 'text-surface-500'" @click="filterOption = 'data to doc'">
              Data to doc
            </p>
            <span class="mr-2 text-lg text-surface-500 font-medium"> / </span>
            <p class="text-lg font-poppins font-normal cursor-pointer hover:text-primaryBlue" :class="filterOption === 'table to doc' ? 'text-primaryBlue' : 'text-surface-500' " @click="filterOption = 'table to doc'">
              Table to doc
            </p>
          </div>
          <div class="flex space-y-2 lg:space-y-0 lg:space-x-4 flex-col lg:flex-row">
            <div class="flex space-x-2">
              <span class="relative flex">
                <i
                  class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-700"
                  style="color: rgb(117, 119, 120);"
                ></i>
                <InputText
                  v-model="searchQuery"
                  placeholder="Search"
                  class="pl-10 font-normal font-poppins rounded-lg text-surface-500 border-gray-300 w-64"
                />
              </span>
            </div>
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>
      <template #empty>
        <div v-show="!templatesLoading" class="flex   py-8">
          <!-- Adjust styling as needed -->
          <p class="text-lg text-surface-500 font-poppins ">
            No templates available.
          </p>
        </div>
      </template>

      <template #list="slotProps">
        <div v-show="!templatesLoading" class="flex flex-wrap">
          <div
            v-for="(item, index) in slotProps.items" :key="index" class="w-full py-2 pointer-parent"
            @dragover.prevent="item.use_case !== 'Form to doc' && handleDragOver(item, index)"
            @dragenter.prevent="item.use_case !== 'Form to doc' && handleDragEnter(item, index)"
            @dragleave.prevent="item.use_case !== 'Form to doc' && handleDragLeave(item, index)"
            @drop.prevent="item.use_case !== 'Form to doc' && handleFileDrop(item, $event)"
          >
            <div v-show="isDragging[index]" class="flex justify-center items-center border-dashed border-2 border-gray-400 flex-col h-[255px] md:h-[150px] sm:items-center px-4 py-2 gap-2 rounded-lg bg-surface-50 ">
              <font-awesome-icon :icon="fad.faUpload" size="2xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; width: 40px; height: 30px;" />
              <p class="text-primaryBlue font-bold font-poppins text-lg text-center mt-2">
                Drop your data here
              </p>
              <p class="text-black font-poppins text-base text-center">
                Supported file formats: .csv, .xls, .xlsx
              </p>
            </div>

            <div v-show="!isDragging[index]" class="flex flex-col sm:flex-row sm:items-center px-4 py-2 gap-2  rounded-lg bg-surface-5050">
              <div class="md:w-[10rem] relative cursor-pointer" @click="handleTemplatePreview(item)">
                <!-- <img class="block xl:block mx-auto rounded-md w-32 h-28" :src="`${item.image}`" :alt="item.name" /> -->
                <div class="h-max w-32 flex justify-center py-1">
                  <ImagePreview :preview-hash="item.image_preview_hash" :background-file-url="item.background_file_url" :filtered-templates="filteredTemplates" />
                </div>
              </div>
              <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4">
                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                  <div class="ml-2">
                    <p class="text-lg sm:text-sm md:text-base lg:text-lg font-poppins text-surface-600 mt-1 ">
                      {{ item.name }}
                    </p>
                  </div>
                </div>
                <div class="flex sm:flex-row sm:space-y-2 flex-col justify-center md:items-center ml-2 md:ml-0">
                  <div class="flex space-x-8 mr-5 mb-3 md:mb-0">
                    <i v-tooltip.top="'Edit template'" class="pointer-auto pi pi-file-edit text-surface-500 cursor-pointer" style="font-size: 1.3rem" @click="editTemplate(item)"></i>
                    <i v-tooltip.top="'Delete template'" class="pointer-auto pi pi-trash text-surface-500 cursor-pointer" style="font-size: 1.3rem" @click="confirmDelete(item)"></i>
                    <i v-tooltip.top="'Access data'" class="pointer-auto pi pi-file text-surface-500 cursor-pointer" style="font-size: 1.3rem"></i>
                    <i v-tooltip.top="'Access document'" class="pointer-auto pi pi-folder-open text-surface-500 cursor-pointer" style="font-size: 1.3rem"></i>
                    <i v-tooltip.top="'Set as favorites'" class="pointer-auto cursor-pointer text-surface-500" :class="[favoriteStates[index] ? 'pi pi-star-fill text-warning' : 'pi pi-star hover:text-warning']" style="font-size: 1.3rem"></i>
                  </div>

                  <div class="flex flex-row-reverse md:flex-row">
                    <Button v-if="item.templateType === 'form to doc'" label="Fill form" class="pointer-auto flex-auto md:flex-initial white-space-nowrap w-80 h-16" @click="handleFillForm(item)" />
                    <Button v-else label="Select or drop file" class="pointer-auto flex-auto md:flex-initial white-space-nowrap w-80 h-16" @click="(e) => { templateSelectedForUploadingFile = item ;uploadFile(e); }" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div v-show="!templatesLoading" class="flex flex-wrap ">
          <div
            v-for="(item, index) in slotProps.items" :key="index"
            class="w-full sm:w-1/3 md:w-4/12 xl:w-1/5 px-2 py-4 pointer-parent"
            @dragover.prevent="item.use_case !== 'Form to doc' && handleDragOver(item, index)"
            @dragenter.prevent="item.use_case !== 'Form to doc' && handleDragEnter(item, index)"
            @dragleave.prevent="item.use_case !== 'Form to doc' && handleDragLeave(item, index)"
            @drop.prevent="item.use_case !== 'Form to doc' && handleFileDrop(item, $event)"
          >
            <div v-show="isDragging[index]" class="flex justify-center items-center border-dashed border-2 border-gray-400 px-6 sm:px-4 md:px-4 w-11/12 h-[20rem] lg:px-6 py-1 dark:border-surface-700 dark:bg-surface-900 rounded-lg flex-col bg-white">
              <font-awesome-icon :icon="fad.faUpload" size="2xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; width: 60px; height: 50px;" />
              <p class="text-primaryBlue font-bold font-poppins text-lg text-center mt-5">
                Drop your data here
                {{ console.log('item', item) }}
              </p>
              <p class="text-black font-poppins text-base text-center mt-2">
                Supported file formats: <br /> .csv, .xls, .xlsx
              </p>
            </div>

            <div v-show="!isDragging[index]" class="px-6 sm:px-4 md:px-4 w-11/12 h-[20rem] lg:px-6 py-1 dark:border-surface-700 dark:bg-surface-900 rounded-lg flex flex-col bg-surface-50">
              <div class="flex pt-4 " :class="favoriteStates[index] ? 'justify-between' : 'justify-end'">
                <i v-if="favoriteStates[index]" class="cursor-pointer" :class="[favoriteStates[index] ? 'pi pi-star-fill text-warning' : 'pi pi-star hover:text-warning']"></i>
                <i class="pi pi-ellipsis-v text-surface-500 cursor-pointer pointer-auto" @click="(e) => { toggle(e);opItem = item }"></i>
              </div>
              <div class="surface-50 flex justify-center rounded-md px-3">
                <div class="relative mx-auto cursor-pointer" @click="handleTemplatePreview(item)">
                  <ImagePreview :preview-hash="item.image_preview_hash" :background-file-url="item.background_file_url" :filtered-templates="filteredTemplates" />
                </div>
              </div>

              <div class="mt-auto mb-3">
                <div class="flex flex-row text-center justify-center items-center gap-2 h-16 ">
                  <p class="text-lg sm:text-sm md:text-base lg:text-lg font-poppins text-surface-500 truncate">
                    {{ item.name }}
                  </p>
                </div>
                <div class="flex flex-col">
                  <Button v-if="item.use_case === 'Form to doc'" label="Fill form" class="pointer-auto flex-auto cursor-pointer font-poppins" @click="handleFillForm(item)" />
                  <Button
                    v-else label="Select or drop file" class="pointer-auto flex-auto white-space-nowrap font-poppins cursor-pointer" @click="(e) => {
                      templateSelectedForUploadingFile = item
                      uploadFile(e) ;

                    }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
    <template v-if="templatesLoading">
      <div v-if="layout === 'grid'" class=" flex flex-wrap">
        <GridSkeleton v-for="n in 3" :key="n" class=" " />
      </div>
      <div v-else class=" w-full">
        <ListSkeleton v-for="n in 3" :key="n" />
      </div>
    </template>

    <FormEditorPreview
      v-model:visible="previewFormVisible"
      :mobile="mobile"
      :form-title="formTitle"
      :all-form-fields="currentTemplateAllFormFields"
      :form-description="formDescription"
      :is-collapsed="isCollapsed"
      :is-generatable="true"
      :template-data="currentTemplate"
      @cancel="previewFormVisible = false"
      @update-generated-docs="updateGeneratedDocs"
    />

    <OverlayPanel ref="op">
      <div class="flex flex-col justify-start w-48 h-max">
        <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded" @click="editTemplate(opItem)">
          Edit template
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded" @click="confirmDelete(opItem);">
          Delete template
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">
          Access data
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">
          Access document
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">
          Set as favorites
        </p>
      </div>
    </OverlayPanel>
  </div>
  <TemplatePreview v-if="visible" v-model:visible="visible" :template="currentTemplate" @cancel="visible = false" @outside-click="handleOutsideClick" />
  <DataToDocGeneration v-if="visibleDataToDoc" v-model:visible="visibleDataToDoc" :template="currentTemplate" @cancel="visibleDataToDoc = false" @outside-click="handleOutsideClick" />
  <ConfirmDialog group="templating">
    <template #message="slotProps">
      <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
        <i :class="slotProps.message.icon" class="!text-6xl text-primary-500"></i>
        <p>{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmDialog>
  <!-- <Toast /> -->
  <Toast position="top-right">
    <template #message="slotProps">
      <div class="flex  items-start space-x-2">
        <div class="mt-1">
          <font-awesome-icon :icon="fal.faFileCircleXmark" size="lg" style="color: #c8432f;" />
        </div>
        <div class="">
          <div class="font-bold text-lg font-poppins text-error ">
            {{ slotProps.message.summary }}
          </div>
          <div class="font-normal text-base font-poppins text-error">
            {{ slotProps.message.detail }}
          </div>
        </div>
      </div>
    </template>
  </Toast>
  <!-- <Toast position="top-right" group="bc" @close="onClose">
    <template #message="slotProps">
      <div class="flex flex-col items-start flex-auto">
        <div class="flex items-center gap-2">
          <font-awesome-icon icon="fa-bold fa-check" size="lg" />
          <span class="font-bold font-poppins">Operation complete</span>
        </div>
        <div class="font-normal text-lg mt-1 font-poppins text-md">
          Document generated successfully
        </div>
        <div class="flex gap-2 mt-4">
          <Button size="small" label="Download " severity="success" class="font-poppins" @click="downloadAllDocuments()" />
          <Button outlined size="small" label="Open Document Library" class="font-poppins" severity="success" @click="navigateDocumentLibrary()" />
        </div>
      </div>
    </template>
  </Toast> -->
  <Toast position="top-right" group="ac" @close="onClose">
    <template #message="slotProps">
      <div class="flex flex-col items-start flex-auto">
        <div class="flex items-center gap-2">
          <font-awesome-icon icon="fa-bold fa-clock-rotate-left" size="lg" class="rotate-180" />
          <div>
            <p class="font-bold">
              {{ slotProps?.message?.summary }}
            </p>
            <p class="font-normal">
              {{ slotProps?.message?.detail }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </Toast>
</template>

<script setup>
import { ref } from 'vue'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'

import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { fad } from '@fortawesome/pro-duotone-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'
import ExcelJS from 'exceljs'
import Papa from 'papaparse'
import { useRouter } from 'vue-router'
import TemplatePreview from './TemplatePreview.vue'
import ImagePreview from './ImagePreview'
import GridSkeleton from './skeletons/GridSkeleton.vue'
import ListSkeleton from './skeletons/ListSkeleton.vue'
import DataToDocGeneration from './DocGenerationModals/DataToDocGeneration'
import FormEditorPreview from '~/components/createTemplate/formEditor/FinalPreview.vue'
import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'
import { docGenerationData } from '@/composables/useDocGenerationData'

const props = defineProps({
  templates: {
    type: Array,
    required: true,
    default: () => [],
  },
})
const emit = defineEmits(['deleteTemplate'])
const toast = useToast()
const confirm = useConfirm()
const router = useRouter()

// function navigateDocumentLibrary() {
//   router.push('document-library')
// }
const allGeneratedDocs = ref()

function updateGeneratedDocs(val) {
  allGeneratedDocs.value = val
}
// function downloadAllDocuments() {
// allGeneratedDocs=docGenerationData.generatedDocs
//   allGeneratedDocs?.value?.forEach((url, index) => {
//     fetch(url)
//       .then(response => response.blob())
//       .then((blob) => {
//         const a = document.createElement('a')
//         const objectUrl = URL.createObjectURL(blob)
//         a.href = objectUrl
//         a.download = `file_${index + 1}.pdf` // Adjust the file name as needed
//         document.body.appendChild(a)
//         a.click()
//         document.body.removeChild(a)
//         URL.revokeObjectURL(objectUrl)
//       })
//       .catch((error) => {
//         console.error(`Error downloading file ${index + 1}:`, error)
//       })
//   })
// }
// const confirm = useConfirm()
function confirmDelete(template) {
  confirm.require({
    group: 'templating',
    header: 'Confirmation',
    message: `Please confirm you want to delete template "${template?.name}""`,
    icon: 'pi pi-trash',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: () => {
      // console.log('template to delete', template)

      emit('deleteTemplate', template)

      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    },
  })
}

const templatesLoading = ref(true)
const layout = ref('grid')
const hoverStates = reactive({})
const favoriteStates = reactive({})
const currentTemplate = ref()
const visible = ref(false)
const visibleDataToDoc = ref(false)
const previewFormVisible = ref(false)
const isDragging = ref(Array.from({ length: props.templates.length }).fill(false))

const filterOption = ref('')
const searchQuery = ref('')
const fileTypeCheck = ref(false)

// template selected while manual file uploading
const templateSelectedForUploadingFile = ref()

onMounted(() => {
  setTimeout(() => {
    templatesLoading.value = false
  }, 2000)
})

// default favorite state
props.templates.forEach((template, index) => {
  favoriteStates[index] = template.isFavorite
})

const currentTemplateAllFormFields = ref('')
function handleFillForm(item) {
  previewFormVisible.value = true
  // console.log('template at handle fill form', item)
  currentTemplate.value = item
  currentTemplateAllFormFields.value = item.added_fields?.filter(f => f?.isFormField)
}
watch(currentTemplateAllFormFields, (val) => {
  console.log('currentTemplateAllFormFields', currentTemplateAllFormFields.value)
})
// default favorite state based on template changes
watch(() => props.templates, (newVal) => {
  newVal.forEach((template, index) => {
    favoriteStates[index] = template.isFavorite
  })
})

function handleTemplatePreview(template) {
  visible.value = true
  currentTemplate.value = template
}
function handleDataToDocGenerationPreview(template) {
  visibleDataToDoc.value = true
  currentTemplate.value = template
}

const op = ref()

function toggle(event) {
  op.value.toggle(event)
}

const filteredTemplates = computed(() => {
  let filtered = props.templates

  switch (filterOption.value) {
    case 'favorites':
      filtered = filtered.filter(template => template.isFavorite === true)
      break
    case 'form to doc':
      filtered = filtered.filter(template => template.use_case === 'Form to doc')
      break
    case 'data to doc':
      filtered = filtered.filter(template => template.use_case === 'Data to doc')
      break
    case 'table to doc':
      filtered = filtered.filter(template => template.use_case === 'table to doc')
      break
  }

  // Filter by search query
  if (searchQuery.value)
    filtered = filtered.filter(template => template.name.toLowerCase().includes(searchQuery.value.toLowerCase()))

  return filtered
})

function handleOutsideClick() {
  visible.value = false
  visibleDataToDoc.value = false
}

function editTemplate(temp) {
  templateEditorStore.templateToEdit = temp
  if (temp?.id) {
    templateEditorStore.addedFields = temp?.added_fields
    templateEditorStore.datasetData = temp?.dataset_data

    templateGeneralInformation.name = temp?.name
    templateGeneralInformation.useCase = temp?.use_case
    templateGeneralInformation.backgroundFileUrl = temp?.background_file_url
    templateGeneralInformation.datasetFileUrl = temp?.dataset_file_url

    templateDeliveryOptions.fileFormat = temp?.delivery_options.fileFormat
    templateDeliveryOptions.fileOutput = temp?.delivery_options.fileOutput
    templateDeliveryOptions.forceEntriesVerification = temp?.delivery_options.forceEntriesVerification
    templateDeliveryOptions.thirdPartyFormFilling = temp?.delivery_options.thirdPartyFormFilling
    templateDeliveryOptions.emailDeliveryOption = temp?.delivery_options.emailDeliveryOption
    templateDeliveryOptions.selectedEmails = temp?.delivery_options.selectedEmails
  }
  setTimeout(() => {
    router.currentRoute.value.path = '/templates/'
    router.push('update')
  }, 200)
}

// const entered = []
// function handleDragEnter(item, index) {
//   // console.log('entering', index, entered)
//   if (!entered.includes(index))
//     entered.push(index)

//   if (!isDragging.value[index]) {
//     isDragging.value.fill(false)
//     isDragging.value[index] = true
//   }
// }

// let timeout
// function handleDragLeave(event, index) {
//   // Check if the related target is still within the current element
//   // console.log('leaving', index)

//   clearInterval(timeout)
//   timeout = setInterval(() => {
//     console.log('running timeout')
//     console.log('entered', entered)
//     console.log('entered.includes(index)', entered.includes(index))

//     if (entered.includes(index)) {
//       isDragging.value[index] = true
//       entered.pop(index)
//     }
//     else {
//       isDragging.value[index] = false
//       clearInterval(timeout)
//     }
//     // clearTimeout(timeout)

//     // entered.pop(index)
//   }, 200)
//   // isDragging.value[index] = false
// }

function handleDragEnter(item, index) {
  // console.log('entering', index, entered)

  if (!isDragging.value[index]) {
    isDragging.value.fill(false)
    isDragging.value[index] = true
  }
}

function handleDragLeave(event, index) {
  // Check if the related target is still within the current element
  // console.log('leaving', index)
  isDragging.value[index] = false
}

function handleDragOver(item, index) {
  // You could simply set isDragging to true again if needed, or do nothing
  isDragging.value[index] = true
}
function showError() {
  toast.add({ severity: 'error', summary: 'Invalid file', detail: 'Please upload a .csv, .xls or .xlsx file', life: 10000 })
}
function handleFileDrop(template, event) {
  const files = event.dataTransfer.files

  if (!files[0]) {
    isDragging.value.fill(false)
    showError()
  }
  else {
    const fileName = files[0].name
    const fileType = fileName.split('.').pop()

    if (fileType === 'xlsx' || fileType === 'xls' || fileType === 'csv') {
      fileTypeCheck.value = true
      handleFileUpload(files[0], template)
    }
    else {
      fileTypeCheck.value = false
      showError()
    }
    isDragging.value.fill(false)
  }
}
function handleFileUpload(file, template) {
  const keysToCheck = template?.dataset_data?.selectedKeys
  console.log('keys to check', keysToCheck)
  if (!file) {
    console.error('No file provided')
    return
  }

  const reader = new FileReader()

  reader.onload = async (e) => {
    const arrayBuffer = e.target.result
    let headers = []

    if (file.type.includes('sheet') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
      // Handling Excel file using ExcelJS
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.load(arrayBuffer)
      const worksheet = workbook.worksheets[0]

      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber === 1) { // assuming first row is headers
          row.eachCell({ includeEmpty: true }, (cell) => {
            headers.push(cell.value)
          })
        }
      })
    }
    else if (file.type.includes('csv') || file.name.endsWith('.csv')) {
      // Handling CSV file using PapaParse
      Papa.parse(file, {
        complete(results) {
          headers = results.data[0]
          compareAndNotify(headers, keysToCheck, template)
        },
        header: false,
      })
      return
    }
    else {
      console.error('Unsupported file type')
      return
    }

    compareAndNotify(headers, keysToCheck, template)
  }

  // Reading data accordingly
  if (file.type.includes('sheet') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx'))
    reader.readAsArrayBuffer(file)
  else if (file.type.includes('csv') || file.name.endsWith('.csv'))
    reader.readAsText(file)
  else
    console.error('Unsupported file type')
}
function compareAndNotify(headers, keysToCheck, template) {
  const isAllKeysPresent = keysToCheck.every(key => headers.includes(key))

  if (isAllKeysPresent) {
    // You can use a toast or some UI element to notify the user
    toast.add({ severity: 'success', summary: 'Congrats', detail: 'All keys present', life: 3000 })
    handleDataToDocGenerationPreview(template)
  }
  else {
    toast.add({ severity: 'error', summary: 'Invalid file', detail: 'This file doesn\'t match the template data', life: 10000 })
  }
}

function uploadFile() {
  const template = templateSelectedForUploadingFile.value
  templateSelectedForUploadingFile.value = null
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  fileInput.style.display = 'none'

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]
    file
    && handleFileUpload(file, template)
    // const reader = new FileReader()

    // reader.onload = () => {
    //   avatarImage.value = reader.result
    // }

    // if (file)
    //   reader.readAsDataURL(file)
  })

  document.body.appendChild(fileInput)
  fileInput.click()
}
</script>

<style>
.pointer-parent *{

  pointer-events: none;
}
.pointer-auto{
  pointer-events: auto;
}
</style>
