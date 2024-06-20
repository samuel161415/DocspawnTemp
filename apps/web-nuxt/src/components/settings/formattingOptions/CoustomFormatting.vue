<template>
    <div class="mt-5">
         <!-- time -->
        <div >
            <p class="text-surface-600 font-poppins text-lg font-normal mb-3" >Time format</p>

            <MultiSelect v-model="selectedTimeFormats" display="chip" :options="timeFormat" optionLabel="name" placeholder="Select time formats"
                :maxSelectedLabels="7" class="w-full min-h-[44px]" />
        </div>
         <!-- date -->
         <div class="mt-5">
            <p class="text-surface-600 font-poppins text-lg font-normal mb-3" id="my-profile">Date format</p>

            <MultiSelect v-model="selectedDateFormats" display="chip" :options="dateFormats" optionLabel="name"  placeholder="Select date formats"
                :maxSelectedLabels="7" class="w-full h-[44px]" />
        </div>

         <!-- number -->
         <div class="mt-5">
            <p class="text-surface-600 font-poppins text-lg font-normal mb-3" id="my-profile">Numbers</p>

            <MultiSelect v-model="selectedNumberFormats" display="chip" :options="cities" optionLabel="name"  placeholder="Select numbers"
                :maxSelectedLabels="7" class="w-full h-[44px]" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const selectedCities = ref();
const selectedTimeFormats = ref();
const selectedDateFormats = ref();
const selectedNumberFormats = ref();

const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const timeFormat = ref([
   { name: 'HH:MM:SS',},
   { name: 'HH:MM:SS XM',},
   { name: 'HH:MM',},
   { name: 'HH:MM XM',},

]);

const dateFormats = ref([
    { name: 'DD/MM/YYYY',},
    { name: 'MM/DD/YYYY',},
    { name: 'YYYY/MM/DD',},
    { name: 'DD/MM/YY',},
    { name: 'MM/DD/YY',},
    { name: 'YY/MM/DD',},
    { name: 'DD/MM/YYYY',},
    { name: 'MM/DD/YYYY',},
    { name: 'YYYY/MM/DD',},
    { name: 'DD/MM/YY',},
    { name: 'MM/DD/YY',},
    { name: 'YY/MM/DD',},
]);
</script>