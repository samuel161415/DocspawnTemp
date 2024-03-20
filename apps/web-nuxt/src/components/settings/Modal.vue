<template>
    <Dialog v-model:visible="visible" modal header="Create List " :style="{  width: '40rem' }">
      
      <div class="px-5">

        <div class="flex flex-col align-items-center gap-3 mb-5">
          <label for="listname" class="font-semibold w-6rem text-lg">List Name</label>
          <InputText id="listname" class="flex-auto" v-model="listName" placeholder="List name" autocomplete="off" />
        </div>

        <div class="flex flex-col align-items-center gap-2 mb-3">
          <label for="listitems" class="font-semibold w-6rem text-lg ">List Items</label>
          <span class="text-sm text-surface-500">Multiple entries are allowed <br/> (Comma separated entries)</span>
          <Textarea id="listItems"v-model="listItem" rows="3" cols="30" placeholder="List Item"/>
        </div>
       
        <Button 
          label="Add" 
          icon="pi pi-plus" 
          @click="handleAdd" 
          class="text-white bg-primaryBlue my-2" /> 

          <DataTable 
            :value="listItems" 
            :reorderableColumns="true"  
            @rowReorder="onRowReorder" 
            tableStyle="min-width: 30rem">
                <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" />
                <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field">
         
                  <template #body="{data}">
                    
                    <div v-if="col.field === 'action' " class="flex justify-center">
                      <i class="pi pi-trash text-primaryBlue cursor-pointer" @click="deleteItem(data)"></i>
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
    const items = listItem.value.split(/[\n,]+/)
                .map(item => item.trim())
                .filter(item => item !== '')
                .map(item => ({ name: item }));
    
    listItems.value = listItems.value.concat(items);
    
  };

  const handleCreateList = () => {

    if (listName.value === '') {
      emit('error')
    }
    else if (listName.value !== '' && listItems.value.length > 0){
        
        listItems.value = listItems.value.map((item) => {
          return item
        });

        emit('createList', { listName: listName.value, listItems: listItems.value });

        listName.value = '';
        listItem.value = '';
        listItems.value = [];

        emit('success')
        emit('cancel');
    }
  };
  
  const handleCancel = () => {
    visible.value = false;

    listName.value = '';
    listItem.value = '';
    listItems.value = [];
    
    emit('cancel');
  };

  const deleteItem = (data) => {
    listItems.value = listItems.value.filter(item => item.name !== data.name);
  };

  // data table
  const columns = ref([
    {field: 'name', header: 'Name'},
    {field: 'action', header: 'Action'},
  ]);

  const onRowReorder = (event) => {
    listItems.value = event.value;
      
  };
  </script>
  