<template>
  <div class="h-full w-full flex overflow-scroll">
       
       <div class="mx-2 mt-4 px-8 py-5  rounded-md bg-white  w-full">
           <Breadcrumb class="border-none rounded-none" :home="home" :model="items">
           <template #item="{ item, props }">
               <router-link
               v-if="item.route"
               v-slot="{ href, navigate }"
               :to="item.route"
               custom
               >
               <a :href="href" v-bind="props.action" @click="navigate">
                   <span class="text-color" :class="[item.icon]" />
                   
                   <span
                   class="text-lg text-primary-500 dark:text-primary-400 font-normal"
                   >{{ item.label }}</span>
               </a>
               </router-link>
               <a v-else :href="item.url" :target="item.target" v-bind="props.action">
               <span class="text-surface-700 dark:text-surface-0/80">{{
                   item.label
               }}</span>
               </a>
           </template>
           </Breadcrumb>
       </div>
   </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const home = ref({
  icon: "pi pi-home",
  route: "/",
});

const items = ref([{ label: "Settings", route: "/settings" }, {label: "Workspace", route: "/settings/workspace"}]);
</script>
<style>
/* Your CSS here */
</style>