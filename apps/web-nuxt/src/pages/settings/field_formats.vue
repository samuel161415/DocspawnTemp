<template>
    <div class="h-full w-full overflow-scroll">
           
        <div class="mx-2  px-8 py-5  rounded-md bg-white  w-full">
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
                    class="text-lg text-primary-500 dark:text-primary-400 font-thin"
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

            <div class="text-lg text-surface-500" id="date-formats">
                <p>
                    Date Formats
                </p>
                <DateFormats />
            </div>
            <div class="" id="list-formats">
                <P class="text-lg text-surface-500 ">
                    List Formats
                </P>
                <ListFormats />
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
  import ListFormats from "~/components/settings/fieldFormats/ListFormats.vue";
  import CheckboxFormats from "~/components/settings/fieldFormats/CheckboxFormats.vue";

  const router = useRouter();
  const home = ref({
    icon: "pi pi-home",
    route: "/",
  });
  
  const items = ref([{ label: "Settings", route: "/settings" }, {label: "Field Formats", route: "/settings/field-formats"}]);
  </script>
  <style>
  /* Your CSS here */
  </style>
  
