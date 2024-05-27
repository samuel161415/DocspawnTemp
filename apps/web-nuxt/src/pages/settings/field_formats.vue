<template>
    <div class="h-full w-full ml-4 overflow-scroll no-scrollbar rounded-lg">
           
        <div class="px-8 py-8 rounded-r-md bg-white h-full w-full">
       
            <div class="py-2 mr-12 ml-3">
                <p class="font-semibold text-surface-600 text-2xl mb-4">Formatting option</p>
                <div class="text-lg text-surface-500 " id="date-formats">
                    <p>
                        Date Formats
                    </p>
                    <DateFormats />
                </div>
               
                <div class="text-lg text-surface-500" id="checkbox-formats">
                    <p>
                        Checkbox Formats
                    </p>
                    <CheckboxFormats />
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import DateFormats from "~/components/settings/fieldFormats/DateFormats.vue";
  import CheckboxFormats from "~/components/settings/fieldFormats/CheckboxFormats.vue";


  </script>

  
