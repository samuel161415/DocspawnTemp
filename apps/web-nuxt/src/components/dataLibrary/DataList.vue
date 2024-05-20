<template>
  <div class="box overflow-hidden z-1 p-5 table-container">

    <div class="flex flex-col  gap-2 left-0 md:mb-14">
      <p class="text-surface-600 text-left text-lg mb-2">Select a template to display data.</p>
      <TreeSelect 
        v-model="selectedValue" 
        :options="NodeData" 
        placeholder="Select Template" 
        class="md:w-[20rem] w-full"
        selectionMode="single" />
    </div>
    
    <DataTableHeader v-if="filteredData.length > 0 " :title="props.title" :info="props.info" :exportFile="props.exportFile" @exportCSV="exportCSVHandler" />

    <div class="mt-10" v-if="filteredData.length > 0 ">
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
            <div class="flex justify-center">
              Select a template to display data.
            </div>
          </template>
          <template #loading>
            <div class="flex justify-center">
              Loading data. Please wait.
            </div>
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
            <div v-else-if="column.field === 'filled_on'">
              <i class="pi pi-calendar text-primaryBlue font-bold mr-4 text-xl"></i>
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

const emit = defineEmits();

const typefilter = ref('');

const dataTableRef = ref()

const currentImage = ref(null);

const dialogVisible = ref(false);

const selectedRowData = ref(null);

const selectedValue = ref()

const templatefiltered = ref([])

const filteredData = ref(templatefiltered)

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
});

const NodeData = [
  {
      key: 'Form to doc',
      label: 'Form to doc',
      data: 'Form to doc',
      icon: 'pi pi-fw pi-inbox',
      selectable: false,
      children: [
          {
              key: 'FORM',
              label: 'FORM',
              data: 'FORM',
          },
          {
              key: 'APPLICATION FORM',
              label: 'APPLICATION FORM',
              data: 'APPLICATION FORM',
          }
      ]
  },
  {
      key: 'Table to doc',
      label: 'Table to doc',
      data: 'Table to doc',
      icon: 'pi pi-fw pi-calendar',
      selectable: false,
      children: [
          { key: 'INVOICE FORM', label: 'INVOICE FORM',  data: 'INVOICE FORM' },
          { key: 'PDF FORM', label: 'PDF FORM',  data: 'PDF FORM' },
         ]
  },];

const filters = ref(props.filters)

const selectedColumns = ref(props.columns);

const onToggle = (val) => {
  selectedColumns.value = props.columns.filter((col) => val.includes(col));
};

watch(selectedValue, (selectedValue) => {

  templatefiltered.value = props.data.filter(item => {
    const templateName = item.templateName;
    return selectedValue[templateName];
  });

});

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
