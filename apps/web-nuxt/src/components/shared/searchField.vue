<template>
  <!-- <span class="relative flex">
    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-700"
      style="color: rgb(117, 119, 120);"></i>
    <Chips inputStyle="pl-5" class="w-40 pr-5" v-model="searchValue" />
  </span> -->


  <span class="relative flex">
    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-700"
      style="color: rgb(117, 119, 120);"></i>
    <InputText placeholder="Search" v-model="props.filters['global'].value"
      class="pl-10 font-normal rounded-xl border-gray-300" />
  </span>


</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },

})
</script>
