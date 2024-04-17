<script setup>
import { ref } from 'vue';
import BreadcrumbComponent from '~/components/shared/BreadcrumbComponent.vue';
import { home } from '~/composables/useBreadcrumb.js'

const items = ref([{ label: 'Data Table', route: '/datatable' }])
</script>

<template>
  <div class="h-full w-full bg-stone-100">
    <BreadcrumbComponent :home="home" :items="items" />
    <div class="">
      <Datatable />
    </div>
  </div>
</template>

<style>
/* Your CSS here */
</style>
