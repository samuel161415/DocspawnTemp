<template>
  <div class="h-full w-full bg-stone-100">
    <Breadcrumb class="border-none rounded-none" :home="home" :model="items">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']" />
            <span
              class="text-primary-500 dark:text-primary-400 font-semibold"
              >{{ item.label }}</span
            >
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-surface-700 dark:text-surface-0/80">{{
            item.label
          }}</span>
        </a>
      </template>
    </Breadcrumb>
    <div class="">
      <Datatable />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const home = ref({
  icon: "pi pi-home",
  route: "/",
});
const items = ref([{ label: "Data Table", route: "/datatable" }]);
</script>
<style>
/* Your CSS here */
</style>
