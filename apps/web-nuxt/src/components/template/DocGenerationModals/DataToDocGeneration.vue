<template>
  <Dialog v-model:visible="visible" :draggable="false" modal :header="$t('Cp_dataToDoc_generation.header')" class="w-max">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="text-lg text-primary-600 font-poppins font-normal">{{ $t('Cp_dataToDoc_generation.header') }}</span>
      </div>
    </template>

    <div class="flex justify-center space-x-8 h-3/4 w-[92vw]">
      <div class="w-6/12 h-full mt-0">
        <div class="mb-0 h-[58px] w-200 flex items-center justify-between px-3 mb-0 rounded-md bg-primary-50">
          <p class="text-surface-600 capitalize text-[18px] text-[rgb(75,85,99)] font-semibold font-poppins form-title-preview text-center w-full">
            {{ template?.name }} - {{ $t('Cp_dataToDoc_generation.template_selected_data') }}
          </p>
        </div>
        <div class="w-full">
          <EditDatasetTable
            v-if="template?.dataset_data?.keys?.length > 0"
            :data-source-file-complete-j-s-o-n="allData"
            :data-source-column-names="template?.dataset_data?.keys"
            :data-source-selected-rows="selectedRows"
            @change-selected-rows="handleChangeSelectedRows"
          />
        </div>
        <div :class="`w-full flex ${mobile ? 'justify-center' : 'justify-center'} mt-5`">
          <Button contained severity="success" :label="$t('Cp_dataToDoc_generation.spawn_documents')" class="w-max font-poppins font-normal text-[16px] leading-[25px]" :disabled="selectedRows?.length < 1 || isGeneratingDoc" @click="generateDocs" />
        </div>
      </div>
      <CanvasPreview :template="template" :selected-rows="selectedRows" />
    </div>
    <!-- Commented out for future use -->
    <!-- <Dialog v-model:visible="showGeneratedDocsModal" modal header="Generating docs" :style="{ width: '25rem' }">
      <div v-if="isGeneratingDoc" class="w-300 flex py-6 justify-center items-center">
        <p>currently generating</p>
        <ProgressSpinner />
      </div>
      <div v-else>
        <p>Generated:</p>
        <div v-for="(doc, i) in allGeneratedDocs" :key="i" class="flex gap-6 items-center py-2">
          <p>{{ i }}</p>
          <Button class="w-max px-3">
            <a :href="doc" target="_blank">Download</a>
          </Button>
        </div>
      </div>
    </Dialog> -->
    <Toast position="top-right" group="bc" :style="{ width: 'max-content' }" @close="onClose">
      <template #message="slotProps">
        <div class="flex flex-col items-start flex-auto w-max ">
          <div class="flex items-center gap-2">
            <font-awesome-icon icon="fa-bold fa-check" size="lg" />
            <span class="font-bold">{{ $t('Cp_dataToDoc_generation.operation_complete') }}</span>
          </div>
          <div class="font-normal text-lg mt-1 font-poppins text-md">
            {{ allGeneratedDocs?.length }} {{ allGeneratedDocs?.length > 1 ? 'Documents' : 'Document' }} {{ $t('Cp_dataToDoc_generation.documents_generated') }}
          </div>
          <div class="flex gap-2 mt-4">
            <Button size="small" :label="$t('Cp_dataToDoc_generation.download_all')" class="font-poppins whitespace-nowrap" severity="success" @click="downlaodAllDocuments()" />
            <Button outlined size="small" class="font-poppins whitespace-nowrap" :label="$t('Cp_dataToDoc_generation.open_document_library')" severity="success" @click="navigateDocumentLibrary()" />
          </div>
        </div>
      </template>
    </Toast>
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
  </Dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import ProgressSpinner from 'primevue/progressspinner'
import CanvasPreview from './CanvasPreview'
import EditDatasetTable from './DatasetTable'

const props = defineProps({
  template: {
    type: Array,
    required: true,
    default: () => {},
  },
})

const runtimeConfig = useRuntimeConfig()

const router = useRouter()
const toast = useToast()

const template = ref()
const visible = ref(false)
const selectedRows = ref([])
const selectedColumns = ref([])
const allData = ref([])
const isGeneratingDoc = ref(false)
const showGeneratedDocsModal = ref(false)
const allGeneratedDocs = ref([])

onMounted(() => {
  template.value = props?.template
  console.log('template', template.value)
  //   selectedRows.value = props?.value?.dataset_data?.allEntries
  selectedColumns.value = props?.template?.dataset_data?.selectedKeys
  let dataToSet = props?.template?.dataset_data?.allEntries?.map((f, i) => {
    return { ...f, auto_index_by_docspawn: i + 1 }
  })
  if (template.value?.dataset_start_line > 1)
    dataToSet = dataToSet?.filter((_, i) => i >= template.value?.dataset_start_line)

  allData.value = dataToSet
})

function handleChangeSelectedRows(data) {
  selectedRows.value = data
}

async function generateDocs() {
  isGeneratingDoc.value = true
  showGeneratedDocsModal.value = true
  toast.add({ severity: 'success', summary: 'Generating documents', detail: 'Your request is being processed', life: 10000, group: 'ac' })

  const objToSend = {
    finalData: selectedRows.value,
  }
  try {
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/generate-documents/dataToDoc/${templateEditorStore?.templateToGenerateDocs?.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify(objToSend), // Serialize the object to JSON string
    })
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)

    const data = await response.json()
    isGeneratingDoc.value = false
    allGeneratedDocs.value = data?.generatedDocs
    // toast.add({ severity: 'success', summary: 'Info', detail: 'Docs Generated successfully', life: 4000 })
    showGeneratedDocToast()
  }
  catch (error) {
    // console.error('Error:', error)
    isGeneratingDoc.value = false
    toast.add({ severity: 'error', summary: 'Info', detail: 'Unable to generate the docs', life: 5000 })
  }
}

function showGeneratedDocToast() {
  if (!visible.value) {
    toast.add({ severity: 'success', summary: 'Can you send me the report?', group: 'bc' })
    visible.value = true
  }
}

function onReply() {
  toast.removeGroup('bc')
  visible.value = false
}

function onClose() {
  visible.value = false
}

function downlaodAllDocuments() {
  // console.log('all generated docs', allGeneratedDocs.value)
  allGeneratedDocs.value?.forEach((url, index) => {
    fetch(url)
      .then(response => response.blob())
      .then((blob) => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = `file_${index + 1}.pdf` // Adjust the file name as needed
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(objectUrl)
      })
      .catch((error) => {
        console.error(`Error downloading file ${index + 1}:`, error)
      })
  })
}
function navigateDocumentLibrary() {
  router.push('document-library')
}
</script>
