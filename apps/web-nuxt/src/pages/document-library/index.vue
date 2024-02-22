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
              class=" text-xl text-primary-500 dark:text-primary-400 font-semibold"
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

    <div class="mx-4 mt-4 px-8 pt-14 pb-5 shadow rounded-md bg-white">
    
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
import { ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import DataTableComponent from '../../components/dataTableComponent/DataTableComponent.vue'
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
  { field: 'created_by', header: 'Created By', filterField: 'created_by', showFilterMatchModes: false, filterMenuStyle: { width: '14rem' }, data_type: 'text' },
  { field: 'template_name', header: 'Template Name', filterField: 'template_name', showFilterMatchModes: false, filterMenuStyle: { width: '14rem' }, data_type: 'text' },
  { field: 'no_documents', header: 'No. of Documents', filterField: 'no_documents', data_type: 'numeric' },
  { field: 'date', header: 'Date', filterField: 'date', data_type: 'date', filterMenuStyle: { width: '14rem' } },
])

const hasActionsColumn = ref(true)
const hasFilterActions = ref(true);

const items = ref([{ label: 'Document Library', route: '/document-library' }])
</script>
