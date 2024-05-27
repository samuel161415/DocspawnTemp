<template>
  <div class="h-full w-full bg-white overflow-scroll no-scrollbar rounded-lg ml-4">
    <div class="px-8 py-8  w-full">

      <div class="py-2 mr-12 ml-3">
        <p class="font-semibold text-surface-600 text-2xl mb-5">General</p>

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

const router = useRouter();

</script>

<style>
/* Your CSS here */
</style>
