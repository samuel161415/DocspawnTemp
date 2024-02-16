<template>
  <div class="h-full w-full bg-stone-100 overflow-scroll">
    <Breadcrumb class="border-none rounded-none" :home="home" :model="items">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span class="text-color" :class="[item.icon]"></span>
            <span
              class="text-primary-500 dark:text-primary-400 font-semibold"
            >{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-surface-700 dark:text-surface-0/80">{{
            item.label
          }}</span>
        </a>
      </template>
    </Breadcrumb>

    <div class="mx-4 mt-4 px-8 py-5 shadow rounded-md bg-white">
      <div class="font-semibold text-2xl mb-7 mt-5">
        Documents Library
      </div>
      <div class="flex flex-col md:flex-row md:justify-end space-y-4 md:space-y-0 md:space-x-4 px-5">
        <div>
          <p class="text-base text-primaryBlue font-medium mb-2 px-5 tracking-wide">
            Sort By
          </p>
          <Dropdown
            v-model="sortBy"
            :options="sortMethod"
            option-label="name"
            placeholder="Newer First"
            class="w-full md:w-[12rem] border-blue-300 bg-blue-50 text-gray-600 font-medium hover:border-primaryBlue rounded-full px-4"
          />
        </div>
        <div>
          <p class="text-base text-primaryBlue font-medium mb-2 px-4 tracking-wide">
            Filter By
          </p>
          <Dropdown
            v-model="filterBy"
            :options="filterMethod"
            option-label="name"
            placeholder="All"
            class="w-full md:w-[12rem] border-blue-300 bg-blue-50 text-gray-600 font-medium hover:border-primaryBlue rounded-full px-4"
          />
        </div>
      </div>
      <DataTableComponent
        :data="documentLibraryData"
        :filters="filters"
        :columns="colomnData"
        :has-actions-column="hasActionsColumn"
        icon1="pi pi-eye"
        icon2="pi pi-download"
        :export-file="exportFile"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import DataTableComponent from '../../components/DataTableComponent.vue'
import { documentLibraryData } from '../../services/sampleData'

// import { useRouter } from 'vue-router'

// const router = useRouter()
const home = ref({
  icon: 'pi pi-home',
  route: '/',
})
const exportFile = ref(false)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  template_name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  type: { value: null, matchMode: FilterMatchMode.IN },
  date: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  no_documents: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  status: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
},
)

const colomnData = ref([
  { field: 'type', header: 'Type', filterField: 'type', showFilterMatchModes: false, filterMenuStyle: { width: '14rem' }, data_type: 'text' },
  { field: 'template_name', header: 'Template Name', filterField: 'template_name', showFilterMatchModes: false, filterMenuStyle: { width: '14rem' }, data_type: 'text' },
  { field: 'no_documents', header: 'No. of Documents', filterField: 'no_documents', data_type: 'numeric' },
  { field: 'date', header: 'Date', style: 'min-width: 12rem', data_type: 'date' },
])

const hasActionsColumn = ref(true)

const sortBy = ref()
const sortMethod = ref([
  { name: 'Newer First' },
  { name: 'Old First' },
])

const filterBy = ref()
const filterMethod = ref([
  { name: 'All' },
  { name: 'Form to Doc' },
  { name: 'Data to Doc' },
])
const items = ref([{ label: 'Document Library', route: '/document-library' }])
</script>
