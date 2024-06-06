<template>
  
  <div class="h-full w-full bg-white rounded-lg overflow-scroll no-scrollbar">
 
      <div class="px-8 py-8 h-full">
  
        <h2 class="font-semibold text-surface-600 text-2xl px-3 py-2">Data Library</h2>
    
        <div  class="flex flex-col justify-center text-center space-y-2 ">
          <div class="mt-6">

            <DataList  
                :data="dataLibraryData"
                :filters="filters"
                :title="title"
                :info="info"
                :columns="columns"
                :has-actions-column="hasActionsColumn"
                :has-filter-actions="hasFilterActions"
                :export-file="true" />
          </div> 
        </div>
      </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { dataLibraryData }  from '../../services/sampleData'
import DataList from '~/components/dataLibrary/DataList.vue';
import BreadcrumbComponent from '~/components/shared/BreadcrumbComponent.vue';
import { home } from '~/composables/useBreadcrumb.js'

const items = ref([{ label: 'Data library', route: '/data-library' }]);

const title = ref('All data related to form.')

const info = ref('Here you have data of every time the form is filled.')

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  filled_on: { 
    operator: FilterOperator.AND, 
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  text_filled: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const columns = ref([
  {field: 'filled_on', header: 'Filled on', filterField: 'filled_on', data_type: 'date', style: 'min-width: 7rem',  filterMenuStyle: { width: '14rem' } },
  {field: 'image', header: 'Image', data_type: 'text'},
  {field: 'text_filled', header: 'Text filled', filterField: 'text_filled', data_type: 'text', style: 'min-width: 10rem', showFilterMatchModes: false, filterMenuStyle: { width: '14rem' } },
])

const hasActionsColumn = ref(false)
const hasFilterActions = ref(false)

</script>