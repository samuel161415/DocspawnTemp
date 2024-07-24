<template>
  <div class="box overflow-hidden z-1 px-3 py-5 table-container">
    <DataTableHeader
      v-if="filteredData.length > 0"
      :title="props.title"
      :info="props.info"
      :export-file="props.exportFile"
      @export-c-s-v="exportCSVHandler"
    />

    <div class="mt-4">
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
        :current-page-report-template="`p. {first} / ${Math.ceil(filteredData.length / 25)}`"
        :rows-per-page-options="[25, 50, 100]"
        class="custom-data-table"
        @update:filters="onFilterChange"
      >
        <template #header>
          <div class="flex justify-between items-center  ">
            <div class="flex items-center gap-2 left-0 ">
              <p class="font-poppins font-normal text-surface-500 text-left text-lg ">
                <!-- {{ $t('Cp_dataLibraryList.select_template') }} -->
                Select what to display:
              </p>
              <!-- <TreeSelect
        v-model="selectedTemplate"
        :options="NodeData"
        :placeholder="$t('Cp_dataLibraryList.select_template')"
        class="md:w-[20rem] w-full font-poppins"
        selection-mode="single"
      /> -->
              <Dropdown
                v-model="selectedTemplate"
                :options="NodeData"
                option-label="label"
                option-group-label="label"
                option-group-children="children"
                placeholder="Select a Template"
                class="md:w-[20rem] w-full font-poppins ml-3 py-0"
                filter
                filter-placeholder="Search templates"
              >
                <template #optiongroup="slotProps">
                  <div class="flex items-center">
                    <font-awesome-icon icon="fa-duotone fa-folder" size="sm" class="mr-2" />
                    <div>{{ slotProps.option.label }}</div>
                  </div>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center pl-5">
                    <font-awesome-icon icon="fa-duotone fa-file" size="sm" class="mr-2" />
                    <div>{{ slotProps.option.label }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>
            <div class="flex items-center gap-2">
              <DataTableFilters
                :filters="filters"
                :has-filter-actions="props.hasFilterActions"
                :typefilter="typefilter"
                @filter-data="filterData"
                @clear-filter="clearFilter"
              />
            </div>
          </div>

          <!-- <MultiSelect
            v-model="selectedColumns"
            :options="allColumns"
            option-label="header"
            display="chip"
            :placeholder="$t('Cp_dataLibraryList.select_columns')"
            class="font-poppins w-full md:w-full my-5 py-1 custom-multiselect static-chip"
          >
            <template #chip="{ value }">
              <div class="custom-chip" :class="[getChipClass(value)]">
                <span class="option-label">{{ value.header }}</span>
              </div>
            </template>
          </MultiSelect> -->
          <MultiSelect
            v-model="selectedColumns"
            :options="allColumns"
            option-label="header"
            display="chip"
            :placeholder="$t('Cp_dataLibraryList.select_columns')"
            class="font-poppins font-normal text-surface-600 w-full md:w-full my-5 py-1 custom-multiselect static-chip"
          >
            <template #chip="{ value }">
              <div class="custom-chip" :class="[getChipClass(value)]">
                <span class="text-surface-600">{{ value.header }}</span>
              </div>
              <!-- <div :class="getChipClass(value)" class="p-multiselect-token">
                <span class="p-multiselect-token-label">{{ value.header }}</span>
              </div> -->
            </template>
            <template #removetokenicon="{ class: iconClass, item, onClick, removeCallback }">
              <span
                :class="[iconClass, getIconWrapperClass(item)]"

                @click="handleRemoveChip($event, item, onClick, removeCallback)"
              >
                <!-- @click="onClick($event, item) && removeCallback($event, item)" -->
                <font-awesome-icon
                  icon="fa-duotone fa-circle-xmark" size="lg" class="duotone-icon "
                  :class="getIconClass(item)"
                />
              </span>
            </template>
            <!-- :class="getOptionClass(option)" class="custom-option" -->
            <template #option="{ option, index }">
              <div>
                {{ option.header }} <span class="font-poppins text-xs font-semibold ml-1">({{ option?.isNormalField ? 'Form' : option?.isLegacyField ? 'Legacy' : 'System' }})</span>
              </div>
            </template>
          </MultiSelect>

          <div class="flex justify-end">
            <Button
              v-if="exportFile"
              type="button"
              icon="pi pi-download"
              label="Export CSV"
              class="flex p-1 md:p-3 rounded-lg bg-primaryBlue text-white  text-xs md:text-sm ml-2 font-poppins"
              @click="exportCSVHandler"
            />
          </div>
        </template>
        <template #empty>
          <div class="font-poppins flex justify-center">
            {{ $t('Cp_dataLibraryList.select_template') }}
          </div>
        </template>
        <template #loading>
          <div class="font-poppins flex justify-center">
            {{ $t('Cp_dataLibraryList.loading_data') }}
          </div>
        </template>
        <Column
          v-for="(column, index) of selectedColumns"
          :key="`${column.field}_${index}`"
          :field="column.field"

          :data-type="column.data_type"
          :style="column.style"
          :filter-field="column.filterField"
          :show-filter-match-modes="column.showFilterMatchModes"
          :filter-menu-style="{ width: '14rem' }"
          header-class="font-poppins"
        >
          <template #header>
            <p class="whitespace-nowrap font-semibold text-lg text-surface-600 ">
              {{ column.header }}
            </p>
          </template>
          <template #body="{ data }">
            <div v-if="column.data_type === 'image'">
              <div class="flex justify-content-center">
                <img v-if="data[column.field]" :src="data[column.field]" :alt="column.field" class="h-24 rounded cursor-pointer" @click="toggleDialog(index, data[column.field])" />
                <p v-else>
                  N/A
                </p>
              </div>
            </div>
            <div v-else-if="column.field === 'filled_on' || column.data_type === 'date'" class="font-poppins whitespace-nowrap">
              <i class="pi pi-calendar text-primaryBlue font-bold mr-4 text-xl"></i>
              {{ formatDateForInput(data[column.field], column?.format || 'DD/MM/YYYY') }}
              {{ column.field === 'filled_on' ? formatTimeForInput(data[column.field], 'HH:MM:SS XM') : '' }}
            </div>
            <div v-else-if="column.data_type === 'time'" class="font-poppins whitespace-nowrap">
              <i class="pi pi-clock text-primaryBlue font-bold mr-4 text-xl"></i>
              {{ formatTimeForInput(data[column.field], column?.format || 'HH:MM:SS XM') }}
            </div>
            <div v-else class="flex font-poppins">
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

      <!-- <Dialog v-model:visible="dialogVisible" maximizable draggable header=" " :style="{ width: '18rem' }">
        <div class="flex flex-col justify-center items-center">
          <Image :src="currentImage" alt="Image" class="flex w-5/6 h-5/6 justify-center items-center" />
        </div>
      </Dialog> -->

      <Dialog
        v-model:visible="dialogVisible"
        maximizable
        draggable
        header=" "
        :modal="true"
        :dismissable-mask="true"
        class="custom-dialog"
      >
        <div class="flex flex-col justify-center items-center h-full">
          <img :src="currentImage" alt="Image" class="w-5/6 h-5/6 object-contain" />
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import DataTableHeader from '../dataTableComponent/DataTableHeader.vue'
import DataTableFilters from '~/components/dataTableComponent/DataTableFilters.vue'
import formatDate from '~/utils'
import { formatDateForInput, formatTimeForInput } from '~/utils/dateFunctions'
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
// by defaul have to set the last geennrated one- just by checjing the geberated doc

const templatefiltered = ref([])

const filteredData = ref(templatefiltered)

const NodeData = ref()
const templates = ref([])

onMounted(async () => {
  try {
    // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates/${accountData?.accountType}`)
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)
    const data = await response.json()

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
      /**  setting default template */
      // at backned when ever doc gnenerated we update template

      const filtered = templateData?.filter(d => d?.use_case === 'Form to doc')
      const sorted = filtered?.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      if (sorted[0])
        selectedTemplate.value = { key: sorted[0]?.id, label: sorted[0]?.name, data: sorted[0]?.name }
      /** */
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
          key: 'Data to doc',
          label: 'Data to doc',
          data: 'Data to doc',
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
const allColumns = ref()
const selectedColumns = ref()

function onToggle(val) {
  selectedColumns.value = allColumns.value.filter(col => val.includes(col))
}
watch(selectedTemplate, async (selectedTemplate) => {
  const temp = templates.value.filter((item) => {
    const key = item.id
    return selectedTemplate.key === key
  })[0]
  const formFields = temp?.added_fields?.filter(f => f?.isFormField)
  /** * here have to found legacy fields and add those also to selectedColumns */
  let legacyFields = []
  try {
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates/legacy-fields/${temp?.id}`)

    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)
    const data = await response.json()

    if (data?.length > 0)
      legacyFields = data
  }
  catch (error) {
    console.error('Error fetching templates:', error)
  }
  /** */

  const columnsToAdd = [{ isSystemField: true, field: 'filled_on', header: 'Filled on', filterField: 'filled_on', data_type: 'date', style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }, ...formFields?.map((k) => {
    if (k?.fieldType === 'Form image')
      return { isNormalField: true, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, data_type: 'image' }
    else if (k?.fieldType === 'Form date')
      return { isNormalField: true, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, filterField: k?.id, data_type: 'date', format: k?.dateFormat, style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }
    else if (k?.fieldType === 'Form time')
      return { isNormalField: true, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, filterField: k?.id, data_type: 'time', format: k?.timeFormat, style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }
    else
      return { isNormalField: true, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, filterField: k?.id, data_type: 'text', style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }
  })]

  selectedColumns.value = columnsToAdd
  const columsnToAddWithLegacyFields = [...columnsToAdd, ...legacyFields?.map((k) => {
    if (k?.fieldType === 'Form image')
      return { field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, data_type: 'image', isLegacyField: true }
    else if (k?.fieldType === 'Form date')
      return { isLegacyField: true, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, filterField: k?.id, data_type: 'date', format: k?.dateFormat, style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }
    else if (k?.fieldType === 'Form time')
      return { isLegacyField: true, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, filterField: k?.id, data_type: 'time', format: k?.timeFormat, style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }
    else
      return { isLegacyField: true, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, filterField: k?.id, data_type: 'text', style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }
  })]
  allColumns.value = columsnToAddWithLegacyFields

  /** ************ set filters */
  const filterToAdd = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filled_on: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
  }
  temp?.added_fields?.filter(f => f?.isFormField)?.forEach((k) => {
    if (k?.fieldType === 'Form image')
      console.log()
    else if (k?.fieldType === 'Form date')
      filterToAdd[k?.name ? k?.name : k?.id] = { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
    else if (k?.fieldType === 'Form time')
      filterToAdd[k?.name ? k?.name : k?.id] = { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.TIME_IS }] }
    else filterToAdd[k?.name ? k?.name : k?.id] = { value: null, matchMode: FilterMatchMode.CONTAINS }
  })
  filters.value = filterToAdd

  /** *** fetch form entries value */
  try {
    // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/form-entries/${temp?.id}`)

    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)
    const data = await response.json()

    if (data?.length > 0) {
      const dataForTemplateEntries = data?.map((e, i) => {
        let obj = {}
        e?.entries?.forEach((entry) => {
          if (entry.fieldType === 'Form checkbox group') {
            let state = ''
            entry.checkboxes.forEach((e) => {
              state = `${state}${e.text}: ${e.state ? '1' : '0'}; `
            })
            obj = { ...obj, [entry?.name ? entry?.name : entry?.id]: state }
          }
          else { obj = { ...obj, [entry?.name ? entry?.name : entry?.id]: entry.state } }
        })
        return {
          id: e.id,
          image: '',
          templateName: temp.name,
          filled_on: new Date(e?.created_at).toUTCString(),
          type: 'Form to Doc',
          ...obj,

        }
      })

      templatefiltered.value = dataForTemplateEntries.sort((a, b) => new Date(b.filled_on) - new Date(a.filled_on))
    }

    // console.log('response of fetching templates', data)
  }
  catch (error) {
    console.error('Error fetching templates:', error)
  }
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

function getChipClass(chipVal) {
  if (chipVal?.isSystemField)
    return 'gray-chip'
  else if (chipVal?.isLegacyField)
    return 'orange-chip'
  else
    return 'cyan-chip'
}
function getIconClass(chipVal) {
  if (chipVal?.isSystemField)
    return 'gray-icon-duotone'
  else if (chipVal?.isLegacyField)
    return 'orange-icon-duotone'
  else
    return 'cyan-icon-duotone'
}
function getIconWrapperClass(chipVal) {
  if (chipVal?.isSystemField)
    return 'gray-icon-wrapper'
  else if (chipVal?.isLegacyField)
    return 'orange-icon-wrapper'
  else
    return 'cyan-icon-wrapper'
}
function handleRemoveChip(event, item, onClick, removeCallback) {
  event.stopPropagation()
  onClick(event, item)
  removeCallback(event, item)
}
</script>

<style scoped>
.custom-multiselect ::v-deep .p-multiselect-label-container {

  background-color: #ffffff !important; /* Replace with your desired background color */

}
.custom-multiselect ::v-deep .p-multiselect-token {
  /* background-color: #009ee222; */
  background-color: transparent;
  padding:0px;
  margin-right:12px;
  color: #009ee2; /* Replace with your desired text color */

}

.custom-multiselect ::v-deep .p-multiselect-token-label {
  color: inherit; /* Ensure the text color inherits from the parent */
}

/* Optionally, you can also style the close icon if present */
.custom-multiselect ::v-deep .p-multiselect-token-icon {
  /* color: #009ee2;  */
  color: #000000;
}
.gray-chip {
  background-color: #abadaf33; /* Red background */
  /* color: #; */
   /* Red text */

  padding:6px;
  border-top-left-radius: 42px;
  border-bottom-left-radius: 42px;
}

.orange-chip {
  background-color: #f1d4b133; /* Green background */
  /* color: #dc9239; */
   /* Green text */
  padding:6px;
  border-top-left-radius: 42px;
  border-bottom-left-radius: 42px;

}
.cyan-chip{
  background-color: #bae7f355; /* Green background */
  /* color: #53c2e1; */
   /* Green text */
  padding:6px;
  border-top-left-radius: 42px;
  border-bottom-left-radius: 42px;

}
.gray-icon-wrapper {
  background-color: #abadaf33; /* Red background */
  padding:4px;
  border-top-right-radius: 42px;
  border-bottom-right-radius: 42px;

  cursor:pointer;

}
.orange-icon-wrapper {
  background-color: #f1d4b133; /* Green background */
  padding:4px;
  border-top-right-radius: 42px;
  border-bottom-right-radius: 42px;
  cursor:pointer;

}
.cyan-icon-wrapper{
  background-color: #bae7f355; /* Green background */
  padding:4px;
  border-top-right-radius: 42px;
  border-bottom-right-radius: 42px;
  cursor:pointer;

}

.gray-icon-duotone.duotone-icon {
  --fa-primary-color: #333;
  /* --fa-secondary-color: #abadaf; */
  /* --fa-secondary-color: #52555a; */
  --fa-secondary-color: transparent;

}
.orange-icon-duotone.duotone-icon {
  --fa-primary-color: #333;
  /* --fa-secondary-color: #dc9239; */
  /* --fa-secondary-color: #a5681e; */
  --fa-secondary-color: transparent;

}
.cyan-icon-duotone.duotone-icon {
  --fa-primary-color: #333;
  /* --fa-secondary-color: #53c2e1; */
  /* --fa-secondary-color: #24a2c4; */
  --fa-secondary-color: transparent;

}
::v-deep .p-datatable {
  background-color: white !important;
  border: none !important;
}

::v-deep .p-datatable-header,
::v-deep .p-datatable-footer {
  background-color: white !important;
  border: none !important;
}

::v-deep .p-datatable-thead > tr > th,
::v-deep .p-datatable-tbody > tr > td,
::v-deep .p-datatable-tfoot > tr > td {
  /* border: none !important; */
  border-right:none!important;
  border-left:none!important;
  background-color: #ffffff !important;
}
::v-deep .p-datatable-thead > tr > th{

  background-color: #e0f6ff !important;
  /* background-color: #009ee233 !important; */
  border-right:2px solid #ffffff!important;
  border-radius: 4px;
}

::v-deep .p-datatable-tbody > tr {
  background-color: white !important;
}

::v-deep .p-datatable-tbody > tr:nth-child(odd) {
  background-color: #f9f9f9 !important; /* For striped rows effect */
}

::v-deep .p-datatable-gridlines .p-datatable-tbody > tr > td {
  /* border-right: none !important; */
  /* border-bottom: none !important; */
}

.custom-dialog .p-dialog {
  @apply w-10/12 md:w-7/12;
}

.custom-dialog .p-dialog-mask {
  @apply bg-black bg-opacity-50 backdrop-blur-sm;
}
</style>
