<template>
    <div class="h-full w-full ml-4 bg-white overflow-scroll no-scrollbar rounded-lg">
           
        <div class="px-8 py-8 ">
       
            <div class="py-2 mx-3">
                <p class="font-semibold text-surface-600 font-poppins text-2xl mb-5">Custom formatting</p>
                
                <div id="custom-formatting">
                    <p class="text-surface-500 font-poppins text-lg">Customize the formats that will be use in the template editor </p>
                    <CoustomFormatting />
                </div>

                <div class="mt-14 mb-48" id="checkbox-formats">
                    <p class="font-medium text-surface-600 font-poppins text-xl mb-5">Checkbox formats</p>
                    <CheckboxFormats />
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import DateFormats from "~/components/settings/formattingOptions/DateFormats.vue";
  import CheckboxFormats from "~/components/settings/formattingOptions/CheckboxFormats.vue";
  import CoustomFormatting from "~/components/settings/formattingOptions/CoustomFormatting.vue";

  </script>

  
