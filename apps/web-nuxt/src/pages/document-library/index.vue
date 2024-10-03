<template>
  <div class="h-full w-full bg-white rounded-lg overflow-scroll no-scrollbar">
    <div class="px-8 py-8 h-full">
      <h2 class="font-semibold text-surface-600 text-2xl px-3 py-2">
        {{ $t("Cp_documents_library.doc_library") }}
      </h2>

      <DataTableComponent
        :data="documentLibraryData"
        :filters="filters"
        :columns="colomnData"
        :has-actions-column="hasActionsColumn"
        :has-filter-actions="hasFilterActions"
        icon1="pi pi-eye"
        icon2="pi pi-download"
        :export-file="exportFile"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import DataTableComponent from '../../components/dataTableComponent/DataTableComponent.vue'

// import { accountData } from '@/composables/useAccountData'
import { useAuth } from '@/composables/useAuth'

const { token, setToken, fetchUserDetails, user, setUser } = useAuth()

// import { documentLibraryData } from '../../services/sampleData'

const exportFile = ref(false)
const documentLibraryData = ref([])

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  type: { value: null, matchMode: FilterMatchMode.IS },
  template_name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  created_by: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  date: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  no_documents: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
},
)

const colomnData = ref([
  { field: 'created_by', header: 'Created by', filterField: 'created_by', showFilterMatchModes: false, filterMenuStyle: { width: '14rem' }, data_type: 'text' },
  { field: 'template_name', header: 'Template name', filterField: 'template_name', showFilterMatchModes: false, filterMenuStyle: { width: '14rem' }, data_type: 'text' },
  { field: 'no_documents', header: 'No. of documents', filterField: 'no_documents', data_type: 'numeric' },
  { field: 'date', header: 'Date', filterField: 'date', data_type: 'date', filterMenuStyle: { width: '14rem' } },
  { field: 'total_execution_time', header: 'Execution time', filterField: 'total_execution_time', data_type: 'total_execution_time' },
  { field: 'total_processing_time', header: 'Processing time', filterField: 'total_processing_time', data_type: 'total_processing_time' },
])

const hasActionsColumn = ref(true)
const hasFilterActions = ref(true)

const items = ref([{ label: 'Document library', route: '/document-library' }])
const runtimeConfig = useRuntimeConfig()
onMounted(async () => {
  // sample data
  // {
  //   id: 1,
  //   type: "Form to Doc",
  //   template_name: "INVOICE FORM",
  //   no_documents: 1,
  //   date: new Date("2024-01-01"),
  //   created_by: "John Doe"
  // },
  try {
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/generate-documents/${user?.value?.email}`)
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)

    const data = await response.json()
    console.log('document library data', data)
    const dataToUse = data?.generatedDocs?.map((d) => {
      return { id: d?.batch_id, total_execution_time: d?.total_execution_time, total_processing_time: d?.total_processing_time, created_by: 'Docspawn user', no_documents: d?.docs?.length, urls: d?.docs, date: new Date(d?.created_at), type: d?.template_data?.use_case === 'Data to doc' ? 'Data to Doc' : 'Form to Doc', template_name: d?.template_data?.name }
    })?.sort((a, b) => b.date - a.date)
    documentLibraryData.value = dataToUse
  }
  catch (error) {
    console.error('Error fetching generated-docs:', error)
  }
})
</script>
