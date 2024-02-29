<template>

      <div class="flex justify-between">
        <div class="text-left">
          <p class="text-lg md:text-xl font-medium text-left">
            {{ title }}
          </p>
          <p class="text-xs md:text-sm lg:text-sm xl:text-base mt-2 font-normal text-gray-500">
            {{ info }}
          </p>
        </div>
        
        <div>

          <Button
            v-if="exportFile"
            type="button"
            icon="pi pi-download"
            label="Export CSV"
            class="flex p-1 md:p-3 rounded-lg bg-primaryBlue text-white mb-5 text-xs md:text-sm ml-2"
            @click="exportCSVHandler"
          />
        </div>
      </div>

  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
  
  const props = defineProps(['title', 'info', 'exportFile']);
  const emit = defineEmits();
  
  function exportCSVHandler() {
    emit('exportCSV');
  }
  </script>
  