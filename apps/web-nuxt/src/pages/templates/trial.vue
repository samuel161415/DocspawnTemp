<template>
    <div class="h-full w-full bg-secondary overflow-y-scroll no-scrollbar">
      <div class="px-8 py-7 flex flex-col gap-2 bg-white">
        <BreadcrumbComponent :home="home" :items="items" />
     
        <div
          class="w-full mt-2 flex items-center justify-between bg-white rounded-lg border-none pl-4"
        >
          <TabMenu
            class="w-full border-none"
            v-model:activeIndex="active"
            :model="mainSteps"
          />
          <div class="flex items-center border-b-2 p-[2.5px] pr-3 gap-2">
            <Button
              @click="active = 0"
              rounded
              label="1"
              class="w-[43px]"
              :outlined="active !== 0"
            />
            <Button
              @click="active = 1"
              rounded
              label="2"
              class="w-[43px]"
              :outlined="active !== 1"
            />
            <Button
              @click="active = 2"
              rounded
              label="3"
              class="w-[43px]"
              :outlined="active !== 2"
            />
            <Button
              @click="active = 3"
              rounded
              label="4"
              class="w-[43px]"
              :outlined="active !== 3"
            />
          </div>
        </div>
        <div class="mt-5 w-full rounded-lg">
          <div class="w-full pl-4">
            <GeneralInfo v-if="active === 0" />
            <TemplateEditor v-if="active === 1" />
            <FormEditor v-if="active === 2" />
            <DeliveryOptions v-if="active === 3" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import GeneralInfo from "../../components/createTemplate/GeneralInfo.vue";
  import DeliveryOptions from "~/components/createTemplate/DeliveryOptions.vue";
  import FormEditor from "~/components/createTemplate/formEditor/FormEditor.vue";
  import TemplateEditor from "~/components/createTemplate/TemplateEditor.vue";
  import BreadcrumbComponent from "~/components/shared/BreadcrumbComponent.vue";
  import { home } from '~/composables/useBreadcrumb.js'
  
  const active = ref(0);
  
  const items = ref([
    { label: "Templates", route: "/templates" },
    { label: "Create New Template", route: "/templates/create" },
  ]);
  
  const mainSteps = ref([
    { label: "General Information", icon: "pi pi-info-circle" },
    { label: "Template Editor", icon: "pi pi-id-card" },
    { label: "Form Editor", icon: "pi pi-file-edit" },
    { label: "Delivery Options", icon: "pi pi-inbox" },
  ]);
  </script>
  <style scoped>
  /* Your CSS here */
  </style>
  