<template>
  <div class="box overflow-hidden z-1 px-3 py-5 table-container">
    <div class="flex flex-col  gap-2 left-0 md:mb-14">
      <p class="text-surface-600 text-left text-lg mb-2">
        Select a template to display data.
      </p>
      <TreeSelect
        v-model="selectedTemplate"
        :options="NodeData"
        placeholder="Select Template"
        class="md:w-[20rem] w-full"
        selection-mode="single"
      />
    </div>

    <DataTableHeader v-if="filteredData.length > 0 " :title="props.title" :info="props.info" :export-file="props.exportFile" @export-c-s-v="exportCSVHandler" />

    <div class="mt-10">
      <DataTable
        ref="dataTableRef"
        v-model:filters="filters"
        :value="filteredData"
        show-gridlines
        :paginator="filteredData.length > 0"
        responsive-layout="scroll"
        :rows="25"
        :row-hover="true"
        data-key="id"
        filter-display="menu"
        overlay-visible
        striped-rows
        csv-separator
        :global-filter-fields="['filled_on', 'text_filled']"
        paginator-template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        :current-page-report-template="`p. {first} /  ${Math.ceil(filteredData.length / 25)}`"
        :rows-per-page-options="[25, 50, 100]"
        @update:filters="onFilterChange"
      >
        <template #header>
          <DataTableFilters
            :filters="filters"
            :has-filter-actions="props.hasFilterActions"
            :typefilter="typefilter"
            @filter-data="filterData"
            @clear-filter="clearFilter"
          />

          <div class="text-left mt-7 w-3/4 sm:w-full text-sm">
            <MultiSelect
              v-model="selectedColumns"
              :options="columns"
              option-label="header"
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
          :key="`${column.field}_${index}`"
          :field="column.field"
          :header="column.header"
          :data-type="column.data_type"
          :style="column.style"
          :filter-field="column.filterField"
          :show-filter-match-modes="column.showFilterMatchModes"
          :filter-menu-style="{ width: '14rem' }"
        >
          <template #body="{ data }">
            <div v-if="column.header === 'Image'">
              <div class=" flex justify-content-center">
                <Button icon="pi pi-eye" outlined text @click="toggleDialog(index, data[column.field])" />
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
          <Image :src="currentImage" alt="Image" class="flex w-5/6 h-5/6 justify-center items-center" />
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTableHeader from '../dataTableComponent/DataTableHeader.vue'
import DataTableFilters from '~/components/dataTableComponent/DataTableFilters.vue'
import formatDate from '~/utils'
import { accountData } from '@/composables/useAccountData'

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

const emit = defineEmits()

const runtimeConfig = useRuntimeConfig()

const typefilter = ref('')

const dataTableRef = ref()

const currentImage = ref(null)

const dialogVisible = ref(false)

const selectedRowData = ref(null)

const selectedTemplate = ref()

const templatefiltered = ref([])

const filteredData = ref(templatefiltered)

// const NodeData = [
//   {
//     key: 'Form to doc',
//     label: 'Form to doc',
//     data: 'Form to doc',
//     icon: 'pi pi-fw pi-inbox',
//     selectable: false,
//     children: [
//       {
//         key: 'FORM',
//         label: 'FORM',
//         data: 'FORM',
//       },
//       {
//         key: 'APPLICATION FORM',
//         label: 'APPLICATION FORM',
//         data: 'APPLICATION FORM',
//       },
//     ],
//   },
//   {
//     key: 'Table to doc',
//     label: 'Table to doc',
//     data: 'Table to doc',
//     icon: 'pi pi-fw pi-calendar',
//     selectable: false,
//     children: [
//       { key: 'INVOICE FORM', label: 'INVOICE FORM', data: 'INVOICE FORM' },
//       { key: 'PDF FORM', label: 'PDF FORM', data: 'PDF FORM' },
//     ],
//   },
// ]
const NodeData = ref()
const templates = ref([])
watch(NodeData, () => {
  console.log('Node Data', NodeData.value)
})

onMounted(async () => {
  try {
    // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates/${accountData?.accountType}`)
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)
    const data = await response.json()
    console.log('templates', data)

    if (data?.length > 0) {
      templates.value = data
      const templateData = data
      const formToDoc = []
      const dataToDoc = []
      templateData?.forEach((d) => {
        if (d?.use_case === 'Data to doc')
          dataToDoc.push({ key: d?.id, label: d?.name, data: d?.name })
        else
          formToDoc.push({ key: d?.id, label: d?.name, data: d?.name })
      })
      console.log('template  data at data library', templateData)
      NodeData.value = [
        {
          key: 'Form to doc',
          label: 'Form to doc',
          data: 'Form to doc',
          icon: 'pi pi-fw pi-inbox',
          selectable: false,
          children: formToDoc,
        },
        {
          key: 'Table to doc',
          label: 'Table to doc',
          data: 'Table to doc',
          icon: 'pi pi-fw pi-calendar',
          selectable: false,
          children: dataToDoc,
        },
      ]
    }
    // console.log('response of fetching templates', data)
  }
  catch (error) {
    console.error('Error fetching templates:', error)
  }
})
const filters = ref(props.filters)

const selectedColumns = ref(props.columns)

function onToggle(val) {
  selectedColumns.value = props.columns.filter(col => val.includes(col))
}

watch(selectedTemplate, (selectedTemplate) => {
  console.log('selecte dtemplate', selectedTemplate)
  // here in template filter data objects of selected template will be present
  //   {
  //   "id": 6,
  //   "image": "https://cdn1.vectorstock.com/i/1000x1000/73/95/clean-application-form-for-admission-document-vector-31097395.jpg",
  //   "templateName": "FORM",
  //   "text_filled": "Sed Do Eiusmod",
  //   "type": "Form to Doc",
  //   "filled_on": "Mon Apr 22 2024 05:00:00 GMT+0500 (Pakistan Standard Time)"
  // }

  // templatefiltered.value = props.data.filter((item) => {
  //   const templateName = item.templateName
  //   console.log('templateName', templateName)
  //   console.log('selectedTemplate[templateName]', selectedTemplate[templateName])
  //   return selectedTemplate[templateName]
  // })
  templatefiltered.value = templates.value.filter((item) => {
    const key = item.id
    console.log('key', key)
    console.log('selectedTemplate[key]', selectedTemplate[key])
    return selectedTemplate[key]
  })
  console.log('template filtered', templatefiltered.value)
})
watch(templatefiltered, (val) => {
  console.log('template filtered', templatefiltered.value)
})

function toggleDialog(data, img) {
  currentImage.value = img
  selectedRowData.value = data
  dialogVisible.value = !dialogVisible.value
}

function filterData(type) {
  typefilter.value = type
}

function onFilterChange(updatedFilters) {
  emit('update:filters', updatedFilters)
}

function getPlaceholder(header) {
  return `Search by ${header}`
}

function exportCSVHandler() {
  if (dataTableRef.value)
    dataTableRef.value.exportCSV()
}

function clearFilter() {
  Object.keys(filters.value).forEach((key) => {
    filters.value[key] = ''
  })
}
</script>

<style scoped>
::v-deep .p-datatable-header {
    border-radius: 0.4rem 0.4rem 0 0!important;
}
/* Bottom Left Would Be: */
::v-deep .p-datatable-table > tbody > tr:last-of-type > td:first-of-type {
    border-radius:  0  0  0 0.5rem!important;
}

/* Bottom Right Would Be: */
::v-deep .p-datatable-table > tbody > tr:last-of-type > td:last-of-type {
    border-radius:  0  0 0.5rem 0 !important;
}
</style>
