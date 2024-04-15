<template>
    <div class="h-full w-full overflow-scroll">
           
        <div class="px-8 py-5 rounded-r-md bg-white h-full w-full">
            <BreadcrumbComponent :home="home" :items="items" />

            <div class="text-lg text-surface-500 " id="date-formats">
                <p>
                    Date Formats
                </p>
                <DateFormats />
            </div>
           
            <div class="text-lg text-surface-500" id="checkbox-formats">
                <P>
                    Checkbox Formats
                </P>
                <CheckboxFormats />
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import DateFormats from "~/components/settings/fieldFormats/DateFormats.vue";
  import CheckboxFormats from "~/components/settings/fieldFormats/CheckboxFormats.vue";
  import BreadcrumbComponent from "~/components/shared/BreadcrumbComponent.vue";
  import { home } from '~/composables/useBreadcrumb.js'

  const router = useRouter();
  
  const items = ref([{ label: "Settings", route: "/settings" }, {label: "Formatting options", route: "/settings/field-formats"}]);
  </script>
  <style>
  /* Your CSS here */
  </style>
  
