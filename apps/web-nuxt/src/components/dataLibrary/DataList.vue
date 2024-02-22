<template>
  <div class="box overflow-hidden z-1 p-5 table-container shadow-sm">
    <DataTableHeader :title="props.title" :info="props.info" :exportFile="props.exportFile" @exportCSV="exportCSVHandler" />

    <div class="mt-10">
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
            :global-filter-fields="['filled_on', 'text_filled']"
            paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
            @update:filters="onFilterChange"
        >
          <template #header>
       
            <DataTableFilters
              :filters="filters"
              :hasFilterActions="props.hasFilterActions"
              :typefilter="typefilter"
              @filterData="filterData"
              @clearFilter="clearFilter"
            />

            <div class="text-left mt-7 w-3/4 sm:w-full text-sm">
              <MultiSelect
                v-model="selectedColumns"
                :options="columns"
                optionLabel="header"
                display="chip"
                placeholder="Select Columns"
              />
            </div>

          </template>
          <template #empty>
            Select a template to display data.
          </template>
          <template #loading>
            Loading data. Please wait.
          </template>
          <Column
            v-for="(column, index) of selectedColumns"
            :field="column.field"
            :header="column.header"
            :key="column.field + '_' + index"
            :data-type="column.data_type"
            :style="column.style"
            :filter-field="column.filterField"
            :show-filter-match-modes="column.showFilterMatchModes"
            :filter-menu-style="{ width: '14rem' }"
          >
          <template #body="{ data }">
            <div v-if="column.header === 'Image'">
             
              <div class=" flex justify-content-center">
                  <Button icon="pi pi-eye" outlined text  @click="toggleDialog(index, data[column.field])"/>       
              </div>
            </div>
            <div v-else-if="column.header === 'Filled On'">
              <i class="pi pi-calendar text-primaryPurple font-bold mr-4 text-xl"></i>
              {{ formatDate(data[column.field]) }}
            </div>
            <div v-else class="flex ">
              
              {{ data[column.field] }}
            </div>
          </template>

          <template v-if="column.data_type === 'date'" #filter="{ filterModel }">
            <Calendar
              v-model="filterModel.value"
              date-format="mm/dd/yy"
              placeholder="mm/dd/yyyy"
              mask="99/99/9999"
            />
          </template>

          <template v-else-if="column.header !== 'Image'" #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class="p-column-filter"
              :placeholder="getPlaceholder(column.header)"
            />
          </template>
        </Column>
        </DataTable>

        <!-- image preview -->
        <Dialog v-model:visible="dialogVisible" maximizable draggable header=" " :style="{ width: '18rem' }">
          
          <div class="flex flex-col justify-center items-center">
              <Image :src="currentImage" alt="Image"  class="flex w-5/6 h-5/6 justify-center items-center" />  
          </div>

        </Dialog>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTableFilters from '~/components/dataTableComponent/DataTableFilters.vue';
import DataTableHeader from '../dataTableComponent/DataTableHeader.vue';
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

const selectedColumns = ref(props.columns);

const onToggle = (val) => {
  selectedColumns.value = props.columns.filter((col) => val.includes(col));
};

const filters = ref(props.filters)

const filteredData = ref(props.data)

const typefilter = ref('');

const dataTableRef = ref()

const currentImage = ref(null);

const dialogVisible = ref(false);

const selectedRowData = ref(null);

const toggleDialog = (data, img) => {

  currentImage.value = img;
  selectedRowData.value = data;
  dialogVisible.value = !dialogVisible.value;
};

const filterData = (type) => {
  typefilter.value = type;
};

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

const clearFilter = () => {

  Object.keys(filters.value).forEach((key) => {
    filters.value[key] = '';
  });

};
</script>
