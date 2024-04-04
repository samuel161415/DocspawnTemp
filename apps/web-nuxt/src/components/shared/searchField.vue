<template>
  <!-- <div class=" relative flex flex-wrap">
      <IconField iconPosition="left">
          <InputIcon class="pl-10" >
              <i class="pi pi-search" />
          </InputIcon>
          <Chips class="w-40" v-model="value1" />
      </IconField>
  </div> -->
  <span class="relative flex">
    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-700"
      style="color: rgb(117, 119, 120);"></i>
    <!-- <InputText v-model="filters['global'].value" placeholder="Keyword Search"
      class="pl-10 font-normal rounded-xl border-gray-300" /> -->
      <Chips inputStyle="{padding-left:}" class="w-40 pr-10" v-model="value1"/>
  </span>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(null);
</script>
