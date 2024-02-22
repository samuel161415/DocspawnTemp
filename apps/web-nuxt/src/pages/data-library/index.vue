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
            <span class="text-color" :class="[item.icon]" />
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

      <div class="flex flex-wrap flex-column md:flex-row md:align-items-center gap-2 mt-10 mx-8">
        <div class=" flex justify-center">
          <TreeSelect v-model="selectedValue" :options="NodeData" selectionMode="multiple" placeholder="Select Item" class="md:w-[20rem] w-full" />
        </div>

      </div>

      <div  class="flex flex-col justify-center text-center mt-5 space-y-2 ">
        <div class=" p-2 mt-5">
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
import { dataLibraryData, NodeData }  from '../../services/sampleData'
import DataList from '~/components/dataLibrary/DataList.vue';

const home = ref({
  icon: 'pi pi-home',
  route: '/',
})

const exportFile = ref(true)

const showData = ref(false)

const selectedValue = ref(null)

const filteredDataList = ref([])

const filteredData = computed(() => {
  if (!selectedValue.value) {
    return []; 
  }

  return dataLibraryData.filter(item => {
    const type = item.type;
    const templateName = item.templateName;

    return selectedValue.value[type] || selectedValue.value[templateName];
  });
  
});

watch(filteredData, (filteredData) => {
  filteredDataList.value = filteredData;
})

const title = ref('All data related to form.')

const info = ref('Here you have data of every time the form is filled.')

function handleShowData() {
  showData.value = !showData.value
}

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
const hasFilterActions = ref(false);

const items = ref([{ label: 'Data Library', route: '/data-library' }])
</script>

