<template>
  <div class="box overflow-hidden z-1 p-5 table-container shadow-sm">
    <div class="flex justify-between">
      <div class="text-left">
        <p class="text-lg md:text-xl lg:text-2xl xl:text-2xl font-medium text-left">
          {{ props.title }}
        </p>
        <p class="text-xs md:text-sm lg:text-sm xl:text-base mt-2 font-normal text-gray-500">
          {{ props.info }}
        </p>
      </div>
      <Button
        v-if="exportFile"
        type="button"
        icon="pi pi-download"
        label="Export CSV"
        class="flex p-3 rounded-lg bg-primaryBlue text-white mb-5"
        @click="exportCSVHandler"
      />
    </div>
    <div class="border border-gray-100">
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
        :global-filter-fields="props.columns.map(column => column.field)"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
        @update:filters="onFilterChange"
      >
        <template #header>
          <div class="flex flex-col md:flex-row  justify-between mt-2 space-y-2 md:space-y-0">
            <div class="flex flex-col md:flex-row space-x-0  md:space-x-2 space-y-2 md:space-y-0">
              <div v-if="props.hasFilterActions" class="">
                <Button 
                  type="button"
                  label="Form to Doc" 
                  class="p-7 rounded-xl bg-primaryBlue hover:bg-primaryBlue mr-2"
                  icon="pi pi-filter"
                  raised 
                  @click="filterData('Form to Doc')"/>
                  
                  <Button 
                  type="button"
                  label="Data to Doc" 
                  class="p-7 rounded-xl bg-primaryPink  hover:bg-primaryPink "
                  icon="pi pi-filter" 
                  raised 
                  @click="filterData('Data to Doc')"/>
              </div>

              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="Clear"
                outlined
                raised
                class="p-7  rounded-xl w-1/2 md:w-24 raised text-primaryBlue border-primaryBlue hover:bg-blue-50"
                @click="clearFilter()"
              />
            </div>
            <span class="relative flex-shrink-0">
              <i
                class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-700"
                style="color: rgb(117, 119, 120);"
              ></i>
              <InputText
                placeholder="Keyword Search"
                class="pl-10 font-normal rounded-xl border-gray-300"
              />
            </span>
          </div>
        </template>
        <template #empty>
          No customers found.
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
            <div class="flex ">
              <i v-if="column.header === 'Created By'" class="pi pi-users text-primaryBlue font-bold mr-4 text-xl"></i>
              {{ data[column.field] }}
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
                  class="text-primaryPink bg-pink-200 mr-2 text-xl rounded-xl"
                  @click="showDataInModal"
                />
                <Button
                  rounded
                  :icon="props.icon2"
                  text
                  class="text-primaryBlue bg-blue-200 text-xl rounded-xl"
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

const filters = ref(props.filters)

const filteredData = ref(props.data)

const typefilter = ref('')

const dataTableRef = ref()

function onFilterChange(updatedFilters) {
  emit('update:filters', updatedFilters)
}

function getPlaceholder(header) {
  return `Search by ${header}`
}

function filterData(type) {

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

function exportCSVHandler() {
  if (dataTableRef.value)
    dataTableRef.value.exportCSV()
}

function clearFilter() {
  filterData('')
}
</script>
