<template>
  <div class="h-full w-full bg-white overflow-scroll">
    <div class="px-8 py-5 rounded-r-md bg-white  w-full">
      <BreadcrumbComponent :home="home" :items="items" />

      <div class="mt-4 px-2">

        <p class="text-surface-500">Settings</p>
        <p class="text-surface-500">Time Zone</p>
        <p class="text-surface-500">Dark Mode</p>
      </div>
    </div>
  
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BreadcrumbComponent from "~/components/shared/BreadcrumbComponent.vue";
import { home } from '~/composables/useBreadcrumb.js'

const router = useRouter();


const items = ref([{ label: "Settings", route: "/settings" }]);
</script>
<style>
/* Your CSS here */
</style>
