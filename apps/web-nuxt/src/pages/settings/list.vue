<template>
     <div class="h-full w-full  overflow-scroll">
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
            
            <div class=" flex justify-end mt-10 md:mr-5">
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

const home = ref({
icon: "pi pi-home",
route: "/",
});
const items = ref([{ label: "Settings", route: "/settings" }, {label: "List", route: "/settings/list"}]);

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

const handleModalClose = () => {
    visible.value = false;
};

const newListData = ref([]);

const handleCreateList = (data) => {

    const { listName, listItems } = data;
    newListData.value.push({ listName, listItems });
}

const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
};

const showError = () => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Fill all the required fields', life: 3000 });
};
</script>

  
