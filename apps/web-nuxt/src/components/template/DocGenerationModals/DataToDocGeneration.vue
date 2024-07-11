<template>
  <Dialog v-model:visible="visible" :draggable="false" modal header="Edit Profile" class="w-max">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="text-lg text-primary-600 font-poppins font-normal">Data To Doc generation</span>
      </div>
    </template>

    <div class="flex justify-center  space-x-8 h-3/4  w-[92vw]">
      <div class=" w-5/12 h-full mt-4">
        <p class="font-poppins text-surface-600 text-lg font-semibold">
          Data selection
        </p>
        <div class="w-full ">
          <EditDatasetTable
            v-if="template?.dataset_data?.keys?.length > 0"
            :data-source-file-complete-j-s-o-n="allData"
            :data-source-column-names="template?.dataset_data?.keys"
            :data-source-selected-rows="selectedRows"
            @change-selected-rows="handleChangeSelectedRows"
          />
        </div>
        <Button contained class="w-full" :disabled="selectedRows?.length < 1" @click="generateDocs">
          Generate Documents
        </Button>
      </div>
      <CanvasPreview :template="template" :selected-rows="selectedRows" />
    </div>
    <Dialog v-model:visible="showGeneratedDocsModal" modal header="Generating docs" :style="{ width: '25rem' }">
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
          <!-- <p>{{ doc }}</p> -->
        </div>
      </div>
    </Dialog>
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
  //   selectedRows.value = props?.value?.dataset_data?.allEntries
  selectedColumns.value = props?.template?.dataset_data?.selectedKeys
  allData.value = props?.template?.dataset_data?.allEntries?.map((f, i) => {
    return { ...f, auto_index_by_docspawn: i + 1 }
  })
})

function handleChangeSelectedRows(data) {
  selectedRows.value = data
}

async function generateDocs() {
  isGeneratingDoc.value = true
  showGeneratedDocsModal.value = true

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
    toast.add({ severity: 'success', summary: 'Info', detail: 'Docs Generated successfully', life: 4000 })
  }
  catch (error) {
    // console.error('Error:', error)
    isGeneratingDoc.value = false
    toast.add({ severity: 'error', summary: 'Info', detail: 'Unable to generate the docs', life: 5000 })
  }
}
</script>
