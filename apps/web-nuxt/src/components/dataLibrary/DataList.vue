<template>
  <div v-show="componentLoading">
    <div class="h-[200px] flex justify-center border-none">
      {{ $t('Cp_dataLibraryList.loading_data') }} ...
    </div>
  </div>
  <div v-show="!componentLoading" class="box overflow-hidden z-1 px-3 py-5 table-container">
    <!-- <DataTableHeader
        v-if="filteredData.length > 0"
        :title="props.title"
        :info="props.info"
        :export-file="props.exportFile"
        @export-c-s-v="exportCSVHandler"
      /> -->

    <div class="mt-0">
      <DataTable
        ref="dataTableRef"
        v-model:filters="filters"
        v-model:selection="selectedRows"
        :value="filteredData"
        show-gridlines
        :paginator="filteredData.length > 0"
        responsive-layout="scroll"
        :rows="10"
        :row-hover="true"
        data-key="id"
        filter-display="menu"
        overlay-visible
        striped-rows
        csv-separator
        :global-filter-fields="selectedColumns?.map(f => f?.hash || f?.field)"
        paginator-template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"

        class="custom-data-table"

        @update:filters="onFilterChange"
      >
        <!-- :current-page-report-template="`p. {first} / ${Math.ceil(filteredData.length / 2)}`"
        :rows-per-page-options="[2, 25, 50, 100]" -->
        <!-- <template #header> -->
        <div class="mb-2">
          <div class="flex justify-between items-end mb-4 ">
            <div class="flex flex-col gap-2 left-0 ">
              <p class="font-poppins font-normal text-surface-500 text-left text-lg ">
                {{ $t('Cp_dataLibraryList.select_data_to_display') }}
              </p>

              <Dropdown
                v-model="selectedTemplate"
                :options="NodeData"
                option-label="label"
                option-group-label="label"
                option-group-children="children"
                filter
                filter-placeholder="Search templates"
                placeholder="Select a Template"
                class="md:w-[20rem] w-full font-poppins  py-0 h-[45px] flex items-center"
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
                    <div>{{ slotProps.option.label || slotProps.option.view_name }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>
            <div class="flex items-center gap-2">
              <Button
                type="button"
                icon="pi pi-bookmark"
                :label="selectedTemplate?.view_name ? $t('Cp_dataLibraryList.save_changes') : $t('Cp_dataLibraryList.save_view')"
                class="flex  rounded-lg bg-primaryBlue text-white  text-xs md:text-sm  font-poppins h-[45px] border-none"
                @click="selectedTemplate?.view_name ? showUpdateViewModal = true : showSaveViewModal = true"
              />
              <Dialog v-model:visible="showSaveViewModal" header="Save Personalized View" :modal="true" class="w-[300px] md:w-[300px]">
                <div class="p-field flex flex-col gap-2">
                  <label for="viewName">{{ $t('Cp_dataLibraryList.enter_view_name') }}</label>
                  <InputText id="viewName" v-model="viewToBeSavedName" />
                </div>
                <div class="p-d-flex p-jc-end w-full mt-2 flex gap-1">
                  <Button outlined :label="$t('Cp_dataLibraryList.cancel')" class="w-full" @click="showSaveViewModal = false" />
                  <Button :disabled="!viewToBeSavedName" :label="$t('Cp_dataLibraryList.save')" class="w-full" @click="savePersonlizedView" />
                </div>
              </Dialog>
              <Dialog v-model:visible="showUpdateViewModal" :header="`Update ${selectedTemplate?.view_name}` " :modal="true" class="w-[300px] md:w-[300px]">
                <div class="p-field flex flex-col gap-2">
                  <label for="viewName">{{ $t('Cp_dataLibraryList.want_changes_to') }} {{ selectedTemplate?.view_name }}?</label>
                </div>
                <div class="p-d-flex p-jc-end w-full mt-2 flex gap-1">
                  <Button outlined :label="$t('Cp_dataLibraryList.cancel')" class="w-full" @click="showUpdateViewModal = false" />
                  <Button :label=" $t('Cp_dataLibraryList.save')" class="w-full" @click="saveView(selectedTemplate?.view_name)" />
                </div>
              </Dialog>
              <Button
                v-if="exportFile"
                type="button"
                icon="pi pi-download"
                :label=" $t('Cp_dataLibraryList.export_csv')"
                class="flex  rounded-lg bg-primaryBlue text-white  text-xs md:text-sm  font-poppins h-[45px] border-none"
                :disabled="selectedRows.length < 1"
                @click="exportCSVHandler"
              />

              <DataTableFilters
                :filters="filters"
                :has-filter-actions="props.hasFilterActions"
                :typefilter="typefilter"
                @filter-data="filterData"
                @clear-filter="clearFilter"
              />
            </div>
          </div>

          <MultiSelect
            v-model="selectedColumns"
            :options="allColumns"
            option-label="field"
            option-group-label="label"
            option-group-children="children"
            filter
            filter-by="field"
            filter-placeholder="Search fields"
            display="chip"
            :placeholder="$t('Cp_dataLibraryList.select_columns')"
            class="font-poppins font-normal text-surface-600 w-full md:w-full my-5 py-1 custom-multiselect static-chip h-[45px] flex items-center"
          >
            <template #optiongroup="slotProps">
              <div class="flex items-center">
                <!-- <font-awesome-icon :icon="slotProps.option.icon" size="lg" class="mr-2 text-surface-500" /> -->
                <div class="font-poppins text-surface-600">
                  {{ slotProps.option.label }}
                </div>
              </div>
            </template>
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
                {{ option.header }}
                <!-- <span class="font-poppins text-xs font-semibold ml-1">({{ option?.isNormalField ? 'Form' : option?.isLegacyField ? 'Legacy' : 'System' }})</span> -->
              </div>
            </template>
          </MultiSelect>
        </div>
        <!-- </template> -->
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
        <Column selection-mode="multiple" header-style="width: 3rem" />
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
                <img v-if="data[column.hash || column.field]" :src="data[column.hash || column.field]" :alt="column.field" class="h-24 rounded cursor-pointer" @click="toggleDialog(index, data[column.hash || column.field])" />
                <p v-else>
                  N/A
                </p>
              </div>
            </div>
            <div v-else-if="column.field === 'date_created' || column.data_type === 'date'" class="font-poppins whitespace-nowrap">
              <p v-if="data[column.hash || column.field]">
                <i class="pi pi-calendar text-primaryBlue font-bold mr-4 text-xl"></i>
                {{ formatDateForInput(data[column.hash || column.field], column?.format || 'DD/MM/YYYY') }}
                {{ column.field === 'date_created' ? formatTimeForInput(data[column.hash || column.field], 'HH:MM:SS XM') : '' }}
              </p>
              <p v-else>
                N/A
              </p>
            </div>
            <div v-else-if="column.data_type === 'time'" class="font-poppins whitespace-nowrap">
              <p v-if="data[column.hash || column.field]">
                <i class="pi pi-clock text-primaryBlue font-bold mr-4 text-xl"></i>
                {{ formatTimeForInput(data[column.hash || column.field], column?.format || 'HH:MM:SS XM') }}
              </p>
              <p v-else>
                N/A
              </p>
            </div>
            <div v-else class="flex font-poppins">
              <p v-if="data[column.hash || column.field]">
                {{ data[column.hash || column.field] }}
              </p>
              <p v-else>
                N/A
              </p>
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

          <template v-else-if="column.data_type !== 'image' && column.data_type !== 'time'" #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class="p-column-filter w-full"
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
        class="custom-dialog max-h-[50vh]"
      >
        <div class="flex flex-col justify-center items-center h-full">
          <img :src="currentImage" alt="Image" class="w-auto h-4/5 object-contain " />
        </div>
      </Dialog>
    </div>
  </div>
  <Toast />
</template>

<script setup>
import { ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
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

const { t } = useI18n()

const toast = useToast()

const showSaveViewModal = ref(false)
const showUpdateViewModal = ref(false)
const viewToBeSavedName = ref('')
const selectedRows = ref([])

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

const filters = ref(props.filters)
const allColumns = ref()
const selectedColumns = ref()
// const globalFilterFields = ref([])

const componentLoading = ref(true)
onMounted(async () => {
  setTimeout(() => {
    componentLoading.value = false
  }, 2000)
  // setInterval(() => console.log('filter global mode akk', filters.value), 5000)
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
        /** ******* fetching personalized views */
      let personalizedViews = []
      try {
        // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
        const response = await fetch(`${runtimeConfig.public.BASE_URL}/data-library/personalized-views/${accountData?.accountType}`)
        if (!response.ok)
          throw new Error(`Network response was not ok ${response.statusText}`)
        const data = await response.json()

        if (data?.length > 0)
          personalizedViews = data?.map((d) => { return { ...d, key: d?.id, label: d?.view_name } })
      }
      catch (error) {
        console.error('Error fetching templates:', error)
      }
      /** */
      NodeData.value = [
        {
          key: 'Form to doc',
          label: t('Cp_dataLibraryList.form_to_doc'),
          data: 'Form to doc',
          icon: 'pi pi-fw pi-inbox',
          selectable: false,
          children: formToDoc,
        },
        {
          key: 'Data to doc',
          label: t('Cp_dataLibraryList.data_to_doc'),
          data: 'Data to doc',
          icon: 'pi pi-fw pi-calendar',
          selectable: false,
          children: dataToDoc,
        },
        {
          key: 'Personalized views',
          label: t('Cp_dataLibraryList.personalized_views'),
          data: 'Personalized views',
          icon: 'pi pi-fw pi-calendar',
          selectable: false,
          children: personalizedViews,
        },
      ]
    }
    // console.log('response of fetching templates', data)
  }
  catch (error) {
    console.error('Error fetching templates:', error)
  }
})

function onToggle(val) {
  selectedColumns.value = allColumns.value.filter(col => val.includes(col))
}
watch(selectedTemplate, async (selectedTemplate) => {
  if (selectedTemplate.view_name) {
    filters.value = selectedTemplate?.filters
    filteredData.value = selectedTemplate?.filtered_data
    allColumns.value = selectedTemplate?.all_columns
    selectedColumns.value = selectedTemplate?.selected_columns
    selectedRows.value = selectedTemplate?.selected_rows
    templatefiltered.value = selectedTemplate?.template_filtered
    return
  }
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

  const columnsToAdd = [...formFields?.map((k) => {
    if (k?.fieldType === 'Form image')
      return { isNormalField: true, hash: k?.hash, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, data_type: 'image' }
    else if (k?.fieldType === 'Form date')
      return { isNormalField: true, hash: k?.hash, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, filterField: k?.name ? k?.name : k?.id, data_type: 'date', format: k?.dateFormat, style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }
    else if (k?.fieldType === 'Form time')
      return { isNormalField: true, hash: k?.hash, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, filterField: k?.name ? k?.name : k?.id, data_type: 'time', format: k?.timeFormat, style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }
    else
      return { isNormalField: true, hash: k?.hash, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, filterField: k?.name ? k?.name : k?.id, data_type: 'text', style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }
  }), { isSystemField: true, field: 'date_created', header: 'Date created', filterField: 'date_created', data_type: 'date', style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }]

  selectedColumns.value = columnsToAdd
  const columsnToAddWithLegacyFields = [...columnsToAdd, ...legacyFields?.map((k) => {
    if (k?.fieldType === 'Form image')
      return { hash: k?.hash, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, data_type: 'image', isLegacyField: true }
    else if (k?.fieldType === 'Form date')
      return { hash: k?.hash, isLegacyField: true, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, filterField: k?.name ? k?.name : k?.id, data_type: 'date', format: k?.dateFormat, style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }
    else if (k?.fieldType === 'Form time')
      return { hash: k?.hash, isLegacyField: true, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, filterField: k?.name ? k?.name : k?.id, data_type: 'time', format: k?.timeFormat, style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }
    else
      return { hash: k?.hash, isLegacyField: true, field: k?.name ? k?.name : k?.id, header: k?.name ? k?.name : k?.id, filterField: k?.name ? k?.name : k?.id, data_type: 'text', style: 'min-width: 7rem', filterMenuStyle: { width: '14rem' } }
  })]
  allColumns.value = columsnToAddWithLegacyFields
  /** * experimenting with all columns to convert into a group */
  const systemFieldsToAdd = columsnToAddWithLegacyFields?.filter(f => f?.isSystemField)
  const formFieldsToAdd = columsnToAddWithLegacyFields?.filter(f => f?.isNormalField)
  const legacyFieldsToAdd = columsnToAddWithLegacyFields?.filter(f => f?.isLegacyField)
  allColumns.value = [
    {
      key: 'Form fields',
      label: t('Cp_dataLibraryList.form_fields'),
      data: 'Form fields',
      icon: 'fa-light fa-file-invoice',
      selectable: false,
      children: formFieldsToAdd,
    },
    {
      key: 'System fields',
      label: t('Cp_dataLibraryList.system_fields'),
      data: 'System fields',
      icon: 'fa-light fa-window',
      selectable: false,
      children: systemFieldsToAdd,
    },

  ]
  if (legacyFieldsToAdd.length > 0) {
    allColumns.value = [
      ...allColumns.value,
      {
        key: 'Legacy fields',
        label: t('Cp_dataLibraryList.legacy_fields'),
        data: 'Legacy fields',
        icon: 'fa-light fa-server',
        selectable: false,
        children: legacyFieldsToAdd,
      },
    ]
  }

  /** */

  /** ************ set filters */
  const filterToAdd = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date_created: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
  }
  // temp?.added_fields?.filter(f => f?.isFormField)
  columsnToAddWithLegacyFields
    ?.forEach((k) => {
      if (k?.data_type === 'image')
        console.log()
      else if (k?.data_type === 'date')
        filterToAdd[k?.field] = { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
      else if (k?.data_type === 'time')
        filterToAdd[k?.field] = { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.TIME_IS }] }
      else
        filterToAdd[k?.field] = { value: null, matchMode: FilterMatchMode.CONTAINS }
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
            // obj = { ...obj, [entry?.name ? entry?.name : entry?.id]: state, hash: entry?.hash }
            obj = { ...obj, [entry?.hash || entry?.name || entry?.id]: state, hash: entry?.hash }
          }
          else {
            // obj = { ...obj, [entry?.name ? entry?.name : entry?.id]: entry.state, hash: entry?.hash }
            obj = { ...obj, [entry?.hash || entry?.name || entry?.id]: entry.state, hash: entry?.hash }
          }
        })
        return {
          id: e.id,
          image: '',
          templateName: temp.name,
          date_created: new Date(e?.created_at).toUTCString(),
          type: 'Form to Doc',
          ...obj,

        }
      })

      templatefiltered.value = dataForTemplateEntries.sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
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
  if (dataTableRef.value) {
    // Get the selected rows
    const selectedRowsData = dataTableRef.value.selection
    console.log('selectedRowsdata', selectedRowsData)
    if (selectedRowsData.length > 0) {
      // Use the DataTable's exportCSV method with the selected rows data
      dataTableRef.value.exportCSV({ selectionOnly: true })
    }
    else {
      console.warn('No rows selected for export')
    }
  }
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

function savePersonlizedView() {
  if (viewName.value.trim()) {
    saveView(viewName.value)
    showSaveViewModal.value = false
    viewToBeSavedName.value = ''
  }
}
async function saveView(name) {
  const objToSend = {
    account_type: accountData?.accountType,
    view_name: name,
    filters: JSON.stringify(filters.value),
    template_filtered: JSON.stringify(templatefiltered.value),
    filtered_data: JSON.stringify(filteredData.value),
    all_columns: JSON.stringify(allColumns.value),
    selected_columns: JSON.stringify(selectedColumns.value),
    selected_rows: JSON.stringify(selectedRows.value),
  }
  // console.log('obj to send', obj_to_send)
  try {
    if (selectedTemplate.value?.view_name) {
      showUpdateViewModal.value = false

      // logic for save changes in view
      // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
      const response = await fetch(`${runtimeConfig.public.BASE_URL}/data-library/personalized-views/${selectedTemplate.value?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(objToSend), // Serialize the object to JSON string
      })
      if (!response.ok)
        throw new Error(`Network response was not ok ${response.statusText}`)
      const data = await response.json()

      toast.add({ severity: 'success', summary: 'Personalized view', detail: 'View updated successfully!', life: 5000 })
      NodeData.value = NodeData.value?.map((n) => {
        if (n?.key === 'Personalized views') {
          return { ...n, children: n?.children?.map((c) => {
            if (c?.key === selectedTemplate?.value?.id)
              return { ...data[0], key: data[0]?.id, label: data[0]?.view_name }

            else
              return c
          }) }
        }

        else { return n }
      })
    }
    else {
      // logic for creating new view
      // console.log('${runtimeConfig.public.BASE_URL}/templates', `${runtimeConfig.public.BASE_URL}/templates`)
      const response = await fetch(`${runtimeConfig.public.BASE_URL}/data-library/personalized-views`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(objToSend), // Serialize the object to JSON string
      })
      if (!response.ok)
        throw new Error(`Network response was not ok ${response.statusText}`)
      const data = await response.json()

      toast.add({ severity: 'success', summary: 'Personalized view', detail: 'View saved successfully!', life: 5000 })
      NodeData.value = NodeData.value?.map((n) => {
        if (n?.key === 'Personalized views')
          return { ...n, children: [...n?.children, { ...data[0], key: data[0]?.id, label: data[0]?.view_name }] }
        else
          return n
      })
    }
  }
  catch (error) {
    console.error('Error fetching templates:', error)
  }
}
</script>

  <style scoped>
  .custom-multiselect ::v-deep .p-multiselect-label-container {

    background-color: #ffffff !important; /* Replace with your desired background color */
    border-radius: 4px;
    /* height:45px; */

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
    padding-left: 10px;
    padding-right: 0px;
  }

  .orange-chip {
    background-color: #f1d4b133; /* Green background */
    /* color: #dc9239; */
     /* Green text */
    padding:6px;
    padding-left: 10px;
    padding-right: 0px;
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
    padding-left: 10px;
    padding-right: 0px;

  }
  .gray-icon-wrapper {
    background-color: #abadaf33; /* Red background */
    padding:4.2px;
    border-top-right-radius: 42px;
    border-bottom-right-radius: 42px;

    cursor:pointer;

  }
  .orange-icon-wrapper {
    background-color: #f1d4b133; /* Green background */
    padding:4.2px;
    border-top-right-radius: 42px;
    border-bottom-right-radius: 42px;
    cursor:pointer;

  }
  .cyan-icon-wrapper{
    background-color: #bae7f355; /* Green background */
    padding:4.2px;
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
    border-top:none!important;
    border-bottom:none!important;
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
