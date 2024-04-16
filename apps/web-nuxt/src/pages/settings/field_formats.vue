<template>
    <div class="h-full w-full overflow-scroll">
           
        <div class="px-8 py-5 rounded-r-md bg-white h-full w-full">
       
            <div class="mt-5 mr-12 ml-3">
                <p class="font-semibold text-surface-700 text-xl mb-5">Formatting option</p>
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

  
