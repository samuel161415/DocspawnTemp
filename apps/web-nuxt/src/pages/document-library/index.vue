<template>
  <div class="h-full w-full bg-secondary overflow-scroll">
    
    <div class="px-8 py-8 shadow rounded-md bg-white h-full">

      <h2 class="font-semibold text-surface-600 text-2xl px-3 py-2">Document Library</h2>
    
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
import { documentLibraryData } from '../../services/sampleData'

const exportFile = ref(false)

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
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
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
])

const hasActionsColumn = ref(true)
const hasFilterActions = ref(true);

const items = ref([{ label: 'Document library', route: '/document-library' }])
</script>
