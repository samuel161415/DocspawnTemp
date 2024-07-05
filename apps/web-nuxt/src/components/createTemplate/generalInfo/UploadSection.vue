<template>
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
</style>
