<template>
  
  <div class="h-full w-full bg-secondary overflow-scroll ">
 
      <div class="mx-4 mt-4 px-8 py-5  rounded-md bg-white ">
        <Breadcrumb class="border-none rounded-none" :home="home" :model="items">
          <template #item="{ item, props }">
            <router-link
              v-if="item.route"
              v-slot="{ href, navigate }"
              :to="item.route"
              custom
            >
              <a :href="href" v-bind="props.action" @click="navigate">
                <span class="text-color" :class="[item.icon]" />
                <span
                  class="text-lg text-primary-500 dark:text-primary-400 font-semibold"
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
  
        <div  class="flex flex-col justify-center text-center space-y-2 ">
          <div class="p-2 mt-5">

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

const home = ref({
  icon: 'pi pi-home',
  route: '/',
})

const items = ref([{ label: 'Data Library', route: '/data-library' }]);

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
  {field: 'filled_on', header: 'Filled On', filterField: 'filled_on', data_type: 'date', style: 'min-width: 7rem',  filterMenuStyle: { width: '14rem' } },
  {field: 'image', header: 'Image', data_type: 'text'},
  {field: 'text_filled', header: 'Text Filled', filterField: 'text_filled', data_type: 'text', style: 'min-width: 10rem', showFilterMatchModes: false, filterMenuStyle: { width: '14rem' } },
])

const hasActionsColumn = ref(false)
const hasFilterActions = ref(false)

</script>