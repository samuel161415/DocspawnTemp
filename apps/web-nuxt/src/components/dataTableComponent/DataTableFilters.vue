<template>
    <div class="flex flex-col md:flex-row  justify-between mt-2 space-y-2 md:space-y-0">
      <div class="flex flex-col md:flex-row space-x-0  md:space-x-2 space-y-2 md:space-y-0">
        <div v-if="hasFilterActions" class="">
          <Button 
            type="button"
            label="Form to Doc" 
            class="px-7 py-2 flex rounded-xl border-1 border-primaryPurple mr-2 hover:bg-primaryPurple hover:text-white"
            :class="[typefilter === 'Form to Doc' ? 'bg-primaryPurple border-primaryPurple text-white' : 'bg-white text-primaryPurple']"
            :outlined="typefilter !== 'Form to Doc'"
            raised 
            @click="filterData('Form to Doc')"
            @mouseenter="formToDocActive = true"
            @mouseleave="typefilter !== 'Form to Doc' ? formToDocActive = false : formToDocActive = true"
          >
          <img :src="formToDocActive? formToDocWhiteIcon : formToDoc" alt="Form to Doc" class="w-6 h-5" /> <p>Form to Doc</p>
        </Button>
                    
          <Button 
            type="button"
            label="Data to Doc" 
            class="px-7 rounded-xl text-primaryPink border-1 border-primaryPink  hover:bg-primaryPink hover:text-white"
            :class="[typefilter === 'Data to Doc' ? 'bg-primaryPink border-primaryPink text-white' : 'bg-white text-primaryPink border-primaryPink']"
            :icon="dataToDoc" 
            :outlined="typefilter !== 'Data to Doc'"
            raised 
            @click="filterData('Data to Doc')"
            @mouseenter="dataToDocActive = true"
            @mouseleave="typefilter !== 'Data to Doc' ? dataToDocActive = false: dataToDocActive = true"
          >
          <img :src="dataToDocActive? dataToDocWhiteIcon : dataToDoc" alt="Data to Doc" class="w-6 h-5" /> <p>Data to Doc</p>
        </Button>
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
  import formToDoc from '@/assets/icons/form2doc_icon.svg';
  import dataToDoc from '../../assets/icons/data2doc_icon.svg';
  import formToDocWhiteIcon from '../../assets/icons/formToDocWhiteIcon.svg';
  import dataToDocWhiteIcon from '../../assets/icons/data2docwhite_icon.svg';

  const props = defineProps(['hasFilterActions', 'filters', 'typefilter']);
  const emit = defineEmits();

  const formToDocActive = ref(false);
  
  const dataToDocActive = ref(false);

  const currentFilter = ref('');

  function filterData(type) {
  
    formToDocActive.value = type === 'Form to Doc';
    dataToDocActive.value = type === 'Data to Doc';
    console.log(formToDocActive.value, dataToDocActive.value, type, currentFilter.value, 'filterData')
    if (currentFilter.value !== '' ) {
      type = '' 
    }
    emit('filterData', type);
  
    currentFilter.value = type;
  }
  
  watch([formToDocActive, dataToDocActive], () => {
    // Update classes or perform any other necessary actions
    console.log("formToDocActive:", formToDocActive.value);
    console.log("dataToDocActive:", dataToDocActive.value);
  });

  function clearFilter() {
    
    emit('clearFilter');
  }
  </script>
  