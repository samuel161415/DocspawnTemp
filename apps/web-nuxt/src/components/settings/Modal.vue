<template>
    <Dialog v-model:visible="visible" modal header=" " :style="{  width: '35rem' }">
      <template #header>
        <div class="inline-flex align-items-center justify-content-center gap-2 mb-5">   
          <span class="font-semibold text-xl white-space-nowrap mt-4 pl-5">Add List Info</span>
        </div>
      </template>
      <div class="px-8">

          <div class="flex flex-col align-items-center gap-3 mb-5">
            <label for="listname" class="font-medium w-6rem text-lg">List Name</label>
            <InputText id="listname" class="flex-auto" v-model="listName" autocomplete="off" />
          </div>
          <div class="flex flex-col align-items-center gap-3 mb-3">
            <label for="listitems" class="font-medium w-6rem text-lg ">List Items</label>
            <span class="text-sm text-surface-500">Multiple entries are allowed <br/> Enter after each entry</span>
            <Chips v-model="listItems" separator="," inputClass="bg-primaryBlue text-blue"/>
          </div>
      </div>
      <template #footer>
        <Button label="Cancel" outlined @click="handleCancel" class="text-primaryblue" />
        <Button label="Create List" class="bg-primaryblue text-white mr-8" @click="handleCreateList" />
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
  