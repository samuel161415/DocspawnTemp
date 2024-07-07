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
  </Dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import CanvasPreview from './CanvasPreview'
import EditDatasetTable from './DatasetTable'

const props = defineProps({
  template: {
    type: Array,
    required: true,
    default: () => {},
  },
})

const template = ref()
const visible = ref(false)
const selectedRows = ref([])
const selectedColumns = ref([])
const allData = ref([])

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

function generateDocs() {
  console.log('generate docs')
}
</script>
