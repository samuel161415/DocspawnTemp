<template>
  <div class="w-full space-y-4">
    <p class="font-medium text-surface-600 text-lg font-poppins">
      {{ title }}
    </p>
    <div
      class="py-12 px-8 cursor-pointer rounded-lg border border-dashed hover:border-primary-600 max-w-lg mb-8 relative h-64"
      :class="dragging ? 'border-primary-600' : 'border-dashed'"
      @click="!selectedFile && triggerFileInput()"
      @drop.prevent=" handleDrop"
      @dragover.prevent=" handleDragOver"
      @dragenter.prevent=" handleDragEnter"
      @dragleave.prevent=" handleDragLeave"
    >
      <div v-if="selectedFile && !dragging" class="pointer-parent  index-10 h-full flex flex-col items-center justify-center gap-4 ">
        <p class="text-surface-500 font-poppins text-lg">
          {{ $t('Cp_createTemplate_generalUpload.selected_file') }}:  {{ selectedFile.name }}
        </p>
        <Button text :label="$t('Cp_createTemplate_generalUpload.remove_file')" severity="danger" class="mt-2 pointer-auto font-poppins text-lg" @click="clearFile" />
      </div>

      <div v-else-if="!dragging" class="flex flex-col items-center justify-center gap-4  h-full">
        <FontAwesomeIcon :icon="fad.faAdd" size="2xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; width: 60px; height: 50px;" />

        <p class="flex justify-center text-lg text-center font-poppins text-surface-500">
          {{ $t('Cp_createTemplate_generalUpload.drag_and_drop') }}
        </p>
      </div>

      <div v-else-if="dragging" class="pointer-parent absolute inset-0 flex flex-col justify-center items-center border-dashed border-2 border-gray-400 px-6 sm:px-4 md:px-4 w-full h-full lg:px-6 py-1 dark:border-surface-700 dark:bg-surface-900 rounded-lg bg-white">
        <FontAwesomeIcon :icon="fad.faUpload" size="2xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; width: 60px; height: 50px;" />
        <p class="text-primaryBlue font-bold font-poppins text-lg text-center mt-5">
          {{ $t('Cp_createTemplate_generalUpload.drop_your_data_here') }}
        </p>
        <p class="text-black font-poppins text-base text-center mt-2">
          {{ $t('Cp_createTemplate_generalUpload.supported_file_formats') }}: <br /> .csv, .xls, .xlsx
        </p>
      </div>
      <input ref="fileInput" type="file" :accept="acceptedFileTypes" class="hidden" @change="handleFileSelect" />
    </div>
    <!-- <div v-if="selectedFile" class="file-info">
      <p class="text-surface-600">
        {{ selectedFile.name }}
      </p>
      <Button label="Remove File" severity="danger" class="mt-2" @click="clearFile" />
    </div> -->
    <div v-if="error" class="error-message">
      <p class="text-red-600">
        {{ error }}
      </p>
      <button class="reselect-btn" @click="clearFile">
        {{ $t('Cp_createTemplate_generalUpload.reselect_file') }}
      </button>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fad } from '@fortawesome/pro-duotone-svg-icons'

const props = defineProps({
  title: String,
  isBackground: Boolean,
})

const emit = defineEmits(['upload'])

const acceptedFileTypes = computed(() => {
  return props.isBackground ? 'application/pdf' : '.xls,.xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
})

const fileInput = ref(null)
const selectedFile = ref(null)
const error = ref(null)
const dragging = ref(false)
const toast = useToast()

function triggerFileInput() {
  fileInput.value.click()
}

function handleFileSelect(event) {
  const file = event.target.files[0]
  validateAndEmitFile(file)
}

function handleDrop(event) {
  dragging.value = false
  const file = event.dataTransfer.files[0]
  validateAndEmitFile(file)
}

function handleDragOver(event) {
  dragging.value = true
}

function handleDragEnter(event) {
  dragging.value = true
}

function handleDragLeave(event) {
  dragging.value = false
}

function validateAndEmitFile(file) {
  const isValidType = props.isBackground
    ? file?.type === 'application/pdf'
    : file?.type === 'text/csv' || file?.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

  if (isValidType) {
    selectedFile.value = file
    error.value = null
    emit('upload', file)
  }
  else {
    selectedFile.value = null
    const errorMessage = props?.isBackground ? 'Invalid file type selected. Please select a valid file. e.g .pdf' : 'Invalid file type selected. Please select a valid file. e.g .csv, .xlsx'
    toast.add({ severity: 'error', summary: 'Invalid file format', detail: errorMessage, life: 10000 })
  }
}

function clearFile() {
  setTimeout(() => {
    selectedFile.value = null
  }, 100)

  error.value = null
  fileInput.value.value = ''
  emit('upload', null)
}
</script>

<style scoped>
.dropzone {
  width: 100%;
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.dropzone:hover {
  border-color: #888;
}

.hidden {
  display: none;
}

.file-info {
  margin-top: 10px;
}

.reselect-btn {
  background-color: #f3f4f6;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  transition: background-color 0.3s;
}

.reselect-btn:hover {
  background-color: #e5e7eb;
}

.error-message {
  margin-top: 10px;
  color: #ef4444;
}

.text-red-600 {
  color: #e3342f;
}

.pointer-parent,.pointer-parent *{

  pointer-events: none;
}
.pointer-auto{
  pointer-events: auto;
}
</style>

<!-- <template>
  <div class="w-full space-y-4">
    <p class="font-medium text-surface-600 text-lg font-poppins">
      {{ title }}
    </p>
    <div class="  py-12 px-8 cursor-pointer rounded-lg  border border-dashed  hover:border-primary-600 max-w-lg mb-8" @click="triggerFileInput" @drop.prevent="handleDrop" @dragover.prevent>
      <p class="flex justify-center text-lg text-center font-poppins text-surface-500">
        Drag and drop file here to upload or click to select a file.
      </p>
      <input ref="fileInput" type="file" :accept="acceptedFileTypes" class="hidden" @change="handleFileSelect" />
    </div>
    <div v-if="selectedFile" class="file-info">
      <p class="text-surface-600">
        {{ selectedFile.name }}
      </p>
      <button class="reselect-btn" @click="clearFile">
        Reselect File
      </button>
    </div>
    <div v-if="error" class="error-message">
      <p class="text-red-600">
        {{ error }}
      </p>
      <button class="reselect-btn" @click="clearFile">
        Reselect File
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  title: String,
  isBackground: Boolean,
})

const emit = defineEmits(['upload'])

const acceptedFileTypes = computed(() => {
  return props.isBackground ? 'application/pdf' : '.xls,.xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
})

const fileInput = ref(null)
const selectedFile = ref(null)
const error = ref(null)

function triggerFileInput() {
  fileInput.value.click()
}

function handleFileSelect(event) {
  const file = event.target.files[0]
  validateAndEmitFile(file)
}

function handleDrop(event) {
  const file = event.dataTransfer.files[0]
  validateAndEmitFile(file)
}

function validateAndEmitFile(file) {
  const isValidType = props.isBackground
    ? file?.type === 'application/pdf'
    : file?.type === 'text/csv' || file?.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

  if (isValidType) {
    selectedFile.value = file
    error.value = null
    emit('upload', file)
  }
  else {
    selectedFile.value = null
    error.value = props?.isBackground ? 'Invalid file type selected. Please select a valid file. e.g .pdf' : 'Invalid file type selected. Please select a valid file. e.g .csv, .xlsx'
  }
}

function clearFile() {
  selectedFile.value = null
  error.value = null
  fileInput.value.value = ''
  emit('upload', null)
}
</script>

<style scoped>
.dropzone {
  width: 100%;
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.dropzone:hover {
  border-color: #888;
}

.hidden {
  display: none;
}

.file-info {
  margin-top: 10px;
}

.reselect-btn {
  background-color: #f3f4f6;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  transition: background-color 0.3s;
}

.reselect-btn:hover {
  background-color: #e5e7eb;
}

.error-message {
  margin-top: 10px;
  color: #ef4444;
}

.text-red-600 {
  color: #e3342f;
}
</style> -->
