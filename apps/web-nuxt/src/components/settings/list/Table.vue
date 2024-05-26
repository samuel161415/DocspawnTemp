<template>
    
    <DataTable 
        v-model:filters="filters"
        striped-rows 
        show-gridlines 
        :value="tableData.sublists" 
        @rowReorder="onRowReorder" 
        paginator
        :rows="6"
        :rowReorder="true"
        :global-filter-fields="['title']"
        tableStyle="min-width: 50rem; border-radius:20%;"
        class="rounded-md p-datatable-header p-datatable-wrapper"
        >
        <!-- DataTable content -->
        <template #empty>
            <p class="flex text-center">No data</p>
        </template>

        <template #header :style="{ borderRadius: '1.5rem' }">
            <div class="flex flex-row ">
                <p class="font-semibold text-lg self-center">
                    {{ tableData.title }}
                </p>
                <div class="ms-auto">
                    <span class="relative flex">
                        <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-400 "
                            style="color: rgb(117, 119, 120);"></i>
                        <InputText v-model="filters['global'].value" placeholder="Keyword search"
                            class="pl-10 font-normal rounded-xl border-gray-300" />
                    </span>
                </div>
            </div>
        </template>

        <Column field="index" :body-style="{ margin: '0rem', padding: '0rem' }" rowReorder style="width: 3%">
            <template #rowreordericon>
                <i class="pi pi-ellipsis-v cursor-move p-8 " data-pc-section="rowreordericon" ></i>
            </template>
        </Column>

        <Column field="title" header="List elements" :headerStyle="{ height: '4.5rem' }">
            <template #body="{ data, field }">
                <div class="flex items-center space-x-4">
                    <font-awesome-icon v-if="data?.sublists.length > 0" :icon="['fat', 'list-tree']" style="color: #3d3d3d;"/>
                    <font-awesome-icon v-else :icon="['fat', 'list-tree']" style="color: #00000000;"/>
                    <p class="font-poppins">{{data[field]}}</p>
                </div>
            </template>
        </Column>

        <Column header="Actions" icon="pi pi-trash" header-style="text-center" style="width: 5%">
            <template #body="{ data }">
                <div class="flex space-x-8">
                    <i class="pi pi-pencil text-success text-lg custom-icon cursor-pointer" @click="handleEditItem(data)"></i>
                    <i class="pi pi-trash text-error text-lg cursor-pointer" @click="handleOpenDelete(data)"></i>
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    tableData: Object,
    filters: Object,
});
const emit = defineEmits();

const filters = ref(props.filters)

const onRowReorder = (event) => {
    emit('row-reorder', event.value);
};

const handleEditItem = (data) => {
    emit('edit-item', data);
}

const handleOpenDelete = (data) => {
    emit('open-delete', data);
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