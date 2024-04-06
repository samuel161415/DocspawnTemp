<template>
  <div class="h-full w-full bg-secondary overflow-scroll">
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
    <div class="py-5 px-8 flex flex-col gap-2">
      <h1 class="text-4xl font-bold">Generate PDF Documents in minutes</h1>
      <h2 class="text-xl text-stone-500">
        With DocSpawn, work smarter, not harder!
      </h2>
      <Button
        severity="primary"
        @click="router.push('/templates/create')"
        class="bg-primaryBlue mt-8 w-[200px] text-white"
        label="Create New Template"
        icon="pi pi-file"
      />
      <div class="overflow-scroll h-full">
        <TemplateView :templates="dummyData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import TemplateView from "~/components/shared/TemplateView.vue";

const router = useRouter();
const home = ref({
  icon: "pi pi-home",
  route: "/",
});

const items = ref([{ label: "Templates", route: "/templates" }]);
const dummyData = [
  {
    name: "Test1",
    docCreated: 2,
    createdOn: "Mon Jan 29 2024",
    modifiedOn: "Mon Jan 29 2024",
  },
  {
    name: "Test2",
    docCreated: 0,
    createdOn: "Mon Jan 29 2024",
    modifiedOn: "Mon Jan 29 2024",
  },
  {
    name: "Test3",
    docCreated: 3,
    createdOn: "Mon Jan 29 2024",
    modifiedOn: "Mon Jan 29 2024",
  },
];
</script>
<style>
/* Your CSS here */
</style>
