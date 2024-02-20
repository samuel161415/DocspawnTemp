<template>
  <div class="box overflow-hidden z-1 p-5 table-container shadow-sm">
    <DataTableHeader :title="props.title" :info="props.info" :exportFile="props.exportFile" @exportCSV="exportCSVHandler" />
    <div>
      <DataTable
        ref="dataTableRef"
        v-model:filters="filters"
        :value="filteredData"
        show-gridlines
        paginator
        responsive-layout="scroll"
        :rows="5"
        :row-hover="true"
        data-key="id"
        filter-display="menu"
        overlay-visible
        striped-rows
        csv-separator
        :global-filter-fields="['type', 'template_name', 'created_by', 'date']"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
        @update:filters="onFilterChange"
      >
        <template #header>
          <DataTableFilters :filters="filters" :hasFilterActions="props.hasFilterActions" :typefilter="typefilter" @filterData="filterData" @clearFilter="clearFilter" />
        </template>

        <template #empty>
          No data found.
        </template>
        <template #loading>
          Loading data. Please wait.
        </template>
        <Column
          v-for="column in props.columns"
          :key="column.field"
          :field="column.field"
          :header="column.header"
          :style="column.style"
          :filter-field="column.filterField"
          :show-filter-match-modes="column.showFilterMatchModes"
          :filter-menu-style="{ width: '14rem' }"
          :data-type="column.data_type"
        >
          <template #body="{ data }">
            <div v-if="column.header === 'Date'" > {{ formatDate(data[column.field]) }}</div>
            <div v-else class="flex ">
              <i v-if="column.header === 'Created By'" class="pi pi-users text-primaryPurple font-bold mr-4 text-xl"></i>
              {{  data[column.field] }}
            </div>
          </template>
          <template v-if="column.header === 'Date'" #filter="{ filterModel }">
            
            <Calendar
              v-model="filterModel.value"
              date-format="mm/dd/yy"
              placeholder="mm/dd/yyyy"
              mask="99/99/9999"
            />
          </template>
          <template v-else #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class="p-column-filter"
              :placeholder="getPlaceholder(column.header)"
            />
          </template>
        </Column>

        <template v-if="props.hasActionsColumn">
          <Column header="Actions">
            <template #body>
              <div class="flex space-x-2">
                <Button
                  rounded
                  text
                  :icon="props.icon1"
                  class="text-primaryPurple mr-2 text-xl rounded-xl"
                  @click="showDataInModal"
                />
                <Button
                  rounded
                  :icon="props.icon2"
                  text
                  class="text-primaryPurple text-xl rounded-xl"
                  @click="downloadDataAsPdf"
                />
              </div>
            </template>
          </Column>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import DataTableHeader from './DataTableHeader.vue'
import DataTableFilters from './DataTableFilters.vue';
import formatDate from '~/utils';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  filters: {
    type: Object,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  hasActionsColumn: {
    type: Boolean,
    required: true,
  },
  hasFilterActions: {
    type: Boolean,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  info: {
    type: String,
    required: false,
  },
  icon1: {
    type: String,
    required: false,
  },
  icon2: {
    type: String,
    required: false,
  },
  exportFile: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits();

const filters = ref(props.filters)

const filteredData = ref(props.data)

const typefilter = ref('')

const dataTableRef = ref()

function onFilterChange(updatedFilters) {
  emit('update:filters', updatedFilters)
}

function getPlaceholder(header) {
  return `Search by ${header}`;
}

function exportCSVHandler() {
  if (dataTableRef.value) {
    dataTableRef.value.exportCSV();
  }
}

function filterData(type) {
  typefilter.value = type
  
  if(type === ''){
    filteredData.value= props.data
  }else{

    filteredData.value= props.data.filter((item) => item.type === type)
  }
  
}

function showDataInModal() {
  emit('showModal', true)
}

function downloadDataAsPdf() {
  emit('downloadPdf', true)
}

function clearFilter() {
  filterData('')
  typefilter.value = '';  

  Object.keys(filters.value).forEach((key) => {
    console.log("her", key)
    filters.value[key] = '';
  });
}
</script>
