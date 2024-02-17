<template>
    <div class="flex flex-col md:flex-row  justify-between mt-2 space-y-2 md:space-y-0">
      <div class="flex flex-col md:flex-row space-x-0  md:space-x-2 space-y-2 md:space-y-0">
        <div v-if="hasFilterActions" class="">
          <Button 
            type="button"
            label="Form to Doc" 
            class="p-7 rounded-xl border-1 border-primaryPurple mr-2 hover:bg-primaryPurple hover:text-white"
            :class="[typefilter === 'Form to Doc' ? 'bg-primaryPurple border-primaryPurple text-white' : 'bg-white text-primaryPurple']"
            icon="pi pi-filter"
            :outlined="typefilter !== 'Form to Doc'"
            raised 
            @click="filterData('Form to Doc')"
          />
                    
          <Button 
            type="button"
            label="Data to Doc" 
            class="p-7 rounded-xl text-primaryPink border-1 border-primaryPink  hover:bg-primaryPink hover:text-white"
            :class="[typefilter === 'Data to Doc' ? 'bg-primaryPink border-primaryPink text-white' : 'bg-white text-primaryPink border-primaryPink']"
            icon="pi pi-filter" 
            :outlined="typefilter !== 'Data to Doc'"
            raised 
            @click="filterData('Data to Doc')"
          />
        </div>
      </div>
      <div class="flex flex-col md:flex-row space-x-0 space-y-2 md:space-y-0 md:space-x-2">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          raised
          class="p-7  rounded-xl w-1/2 md:w-24 raised bg-primaryPurple border-primaryPurple"
          @click="clearFilter"
        />
        <span class="relative flex-shrink-0">
          <i
            class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-700"
            style="color: rgb(117, 119, 120);"
          ></i>
          <InputText
            v-model="filters['global'].value"
            placeholder="Keyword Search"
            class="pl-10 font-normal rounded-xl border-gray-300"
          />
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref, defineEmits } from 'vue';
  
  const props = defineProps(['hasFilterActions', 'filters', 'typefilter']);
  const emit = defineEmits();
  
  function filterData(type) {
    emit('filterData', type);
  }
  
  function clearFilter() {
    emit('clearFilter');
  }
  </script>
  