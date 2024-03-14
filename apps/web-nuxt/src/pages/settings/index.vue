<template>
  <div class="h-full w-full bg-white overflow-scroll">
       <div class="flex flex-col w-full">
       </div>
  
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MenuBar from "~/components/settings/MenuBar.vue";

const router = useRouter();
const home = ref({
  icon: "pi pi-home",
  route: "/",
});

const items = ref([{ label: "Settings", route: "/settings" }]);
</script>
<style>
/* Your CSS here */
</style>
