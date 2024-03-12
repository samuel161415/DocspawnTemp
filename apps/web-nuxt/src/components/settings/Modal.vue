<template>
    <Dialog v-model:visible="visible" modal header="Create List " :style="{  width: '35rem' }">
     
      
      <div class="px-5">

          <div class="flex flex-col align-items-center gap-3 mb-5">
            <label for="listname" class="font-semibold w-6rem text-lg">List Name</label>
            <InputText id="listname" class="flex-auto" v-model="listName" placeholder="List name" autocomplete="off" />
          </div>
          <div class="flex flex-col align-items-center gap-2 mb-3">
            <label for="listitems" class="font-semibold w-6rem text-lg ">List Items</label>
            <span class="text-sm text-surface-500">Multiple entries are allowed <br/> Enter after each entry</span>
            <Chips v-model="listItems" separator="," inputClass="bg-primaryBlue text-blue"/>
          </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" outlined @click="handleCancel" class="text-primaryblue" />
        <Button label="Create List" icon="pi pi-check" class="bg-primaryblue border-primaryBlue text-white mr-5" @click="handleCreateList" />
      </template>

    </Dialog>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import { useToast } from "primevue/usetoast";
  const toast = useToast();
  
  const emit = defineEmits(['createList', 'cancel', 'error', 'success']);
  
  const visible = ref(false);
  const listName = ref('');
  const listItems = ref([]);
 
  const handleCreateList = () => {

    if (listName.value === '') {
      emit('error')
    }
    else if (listName.value !== '' && listItems.value.length > 0){
        // set listItems array to [{name: 'item1', code: 'item1'}] format
        listItems.value = listItems.value.map((item) => {
          return { name: item, code: item }
        });
        console.log(listItems.value);
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
  
  </script>
  