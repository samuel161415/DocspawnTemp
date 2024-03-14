<template>
    <Dialog v-model:visible="visible" modal header="Create List " :style="{  width: '40rem' }">
     
      
      <div class="px-5">

        <div class="flex flex-col align-items-center gap-3 mb-5">
          <label for="listname" class="font-semibold w-6rem text-lg">List Name</label>
          <InputText id="listname" class="flex-auto" v-model="listName" placeholder="List name" autocomplete="off" />
        </div>

        <div class="flex flex-col align-items-center gap-2 mb-3">
          <label for="listitems" class="font-semibold w-6rem text-lg ">List Items</label>
          <span class="text-sm text-surface-500">Multiple entries are allowed <br/> ( Comma separated entries)</span>
          <InputText id="listItems" v-model="listItem" class="flex-auto" placeholder="List Item" autocomplete="off" />
        </div>
       
        <Button 
          label="Add" 
          icon="pi pi-plus" 
          @click="handleAdd" 
          class="text-white bg-primaryBlue my-2" /> 

          <DataTable 
            :value="products" 
            :reorderableColumns="true" 
            @columnReorder="onColReorder" 
            @rowReorder="onRowReorder" 
            tableStyle="min-width: 30rem">
                <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" />
                <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field">
         
                  <template #body="{data}">
                    
                    <div v-if="col.field === 'action' " class="flex justify-center">
                      <i class="pi pi-trash text-primaryBlue" @click="deleteItem(data)"></i>
                    
                    </div>
                    <div v-else>
                      {{ data[col.field] }}
                    </div>
                  </template>
                </Column>
            </DataTable>
      </div>
      

      <template #footer>
        <Button 
          label="Cancel" 
          icon="pi pi-times" 
          outlined 
          @click="handleCancel" 
          class="text-primaryblue" />
        <Button label="Create List" icon="pi pi-check" class="bg-primaryblue border-primaryBlue text-white mr-5" @click="handleCreateList" />
      </template>

    </Dialog>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useToast } from "primevue/usetoast";
  const toast = useToast();
  
  const emit = defineEmits(['createList', 'cancel', 'error', 'success']);
  
  const visible = ref(false);
  const listName = ref('');
  const listItem = ref('');
  const listItems = ref([]);
 
  const handleAdd = () => {
    const trial = listItem.value.split(',')
  };

  const handleCreateList = () => {

    if (listName.value === '') {
      emit('error')
    }
    else if (listName.value !== '' && listItems.value.length > 0){
        // set listItems array to [{name: 'item1', code: 'item1'}] format
        listItems.value = listItems.value.map((item) => {
          return { name: item, code: item }
        });
        emit('createList', { listName: listName.value, listItems: listItems.value });
        listName.value = '';
        listItems.value = [];

        emit('success')
        emit('cancel');
    }
  };
  
  const handleCancel = () => {

    visible.value = false;
    emit('cancel');
  };

  // data table
  const columns = ref([
    {field: 'name', header: 'Name'},
    {field: 'action', header: 'Action'},
]);
const products = ref([
  {
    id: '1000',
    name: 'Bamboo Watch',
    
  },
  {
    id: '1001',
    name: 'Black Watch',
    
  },
  {
    id: '1002',
    name: 'Blue Watch',
    
  },
  {
    id: '1003',
    name: 'Brown Watch',
    
  },
  {
    id: '1004',
    name: 'Green Watch',
    
  },
  {
    id: '1005',
    name: 'Orange Watch',
    
  },
  {
    id: '1006',
    name: 'Pink Watch',
    
  },
  {
    id: '1007',
    name: 'Purple Watch',
    
  },
  {
    id: '1008',
    name: 'Red Watch',
    
  },
  {
    id: '1009',
    name: 'Silver Watch',
    
  },
  {
    id: '1010',
    name: 'White Watch',
    
  },
  {
    id: '1011',
    name: 'Yellow Watch',
    
  },
]);

  
  </script>
  