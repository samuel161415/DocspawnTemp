<template>
     <div class="h-full w-full flex overflow-scroll">
        <div class="px-8 py-5 rounded-r-md bg-white  w-full">
            
            <div class="mt-5 mr-12 ml-3">
                <p class="font-semibold text-surface-700 text-xl mb-5">List</p>
            
                <div class="flex justify-end mt-10 md:mr-5">
                    <Button 
                        icon="pi pi-plus" 
                        label="Create New List" 
                        class="p-button-success" 
                        @click="visible = true" />
                </div>
    
                <div >
                    <DataTableComponent
                        :data="newListData"
                        :filters="filters"
                        :columns="colomnData"
                        :has-actions-column="hasActionsColumn"
                        :has-filter-actions="hasFilterActions"
                        icon1="pi pi-file-edit"
                        icon2="pi pi-trash"
                    />
                </div>
            </div>
        </div>
        
        <!-- components -->
        <Toast />
        <Modal 
            v-model:visible="visible" 
            @createList="handleCreateList" 
            @cancel="visible=false" 
            @error="showError" 
            @success="showSuccess"
            />
    </div>
  </template>
  
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import Modal from '~/components/settings/Modal.vue';
import DataTableComponent from '~/components/dataTableComponent/DataTableComponent.vue'
import { useToast } from "primevue/usetoast";

const toast = useToast();

const router = useRouter();

const colomnData = ref([
  { field: 'listName', header: 'List Name', filterField: 'list', showFilterMatchModes: false, filterMenuStyle: { width: '14rem' }, data_type: 'text' },
  { field: 'listItems', header: 'Items', filterField: 'items', showFilterMatchModes: false, filterMenuStyle: { width: '18rem' }, },
 
])
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  list: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  }, 
},
)

const hasActionsColumn = ref(true);
const hasFilterActions = ref(false);

const visible = ref(false);

const newListData = ref([]);

const handleCreateList = (data) => {

    const { listName, listItems } = data;
    newListData.value.push({ listName, listItems });
}

const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'List successfully created.', life: 3000 });
};

const showError = () => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Fill all the required fields.', life: 3000 });
};
</script>

  
