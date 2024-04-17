<template>
  <div class="h-full w-full bg-secondary overflow-scroll">
    <div class="px-8 py-7 flex flex-col gap-2 bg-white">
      <BreadcrumbComponent :home="home" :items="items" />
      <div >
        <div class="px-5 mt-5">

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
        </div>
        <div class="overflow-scroll h-full">
          <TemplateView :templates="dummyData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import TemplateView from "~/components/shared/TemplateView.vue";
import BreadcrumbComponent from "~/components/shared/BreadcrumbComponent.vue";
import { home } from '~/composables/useBreadcrumb.js'

const router = useRouter();

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
