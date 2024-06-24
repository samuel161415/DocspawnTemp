<template>
    <div class="mt-5">
         <!-- time -->
        <div >
            <p class="text-surface-600 font-poppins text-xl font-medium mb-2" >Time format</p>
            <p class="text-surface-500 font-poppins text-lg mb-2">Customize the time formats available for timestamps and time selections in forms. </p>
            <MultiSelect v-model="selectedTimeFormats" display="chip" :options="timeFormat" optionLabel="name" placeholder="Select time formats"
                :maxSelectedLabels="7" class="w-full min-h-[44px]" />
        </div>
         <!-- date -->
         <div class="mt-5">
            <p class="text-surface-600 font-poppins text-xl font-medium mb-2" id="my-profile">Date format</p>
            <p class="text-surface-500 font-poppins text-lg mb-2">Customize the date formats available for timestamps and date selections in forms. </p>
            <MultiSelect v-model="selectedDateFormats" display="chip" :options="dateFormats" optionLabel="name"  placeholder="Select date formats"
                :maxSelectedLabels="7" class="w-full h-[44px]" />
        </div>

         <!-- number -->
         <div class="mt-5">
            <p class="text-surface-600 font-poppins text-xl font-medium mb-2" id="my-profile">Numbers</p>
            <p class="text-surface-500 font-poppins text-lg mb-2">Customize the number formats available for numeric entries in forms. </p>
            <MultiSelect v-model="selectedNumberFormats" display="chip" :options="cities" optionLabel="name"  placeholder="Select numbers"
                :maxSelectedLabels="7" class="w-full h-[44px]" />
        </div>

        <Toast position="top-right">
            <template #message="slotProps">
                <div class="flex  items-start space-x-2">
                    <div class="mt-1">
                        <font-awesome-icon :icon="fal.faFileCircleXmark" size="lg" style="color: #c8432f;" />
                    </div>
                    <div class="">
                        <div class="font-bold text-lg font-poppins text-error ">{{ slotProps.message.summary }}</div>
                        <div class="font-normal text-base font-poppins text-error">{{ slotProps.message.detail }}</div>
                    </div>
                    
                </div>
            </template>
        </Toast>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { fal } from '@fortawesome/pro-light-svg-icons';

const toast = useToast();
const selectedCities = ref();
const selectedTimeFormats = ref();
const selectedDateFormats = ref();
const selectedNumberFormats = ref();

const showError = () => {
    toast.add({ severity: 'error', summary: 'Invalid file format', detail: 'Please upload a .csv, .xls or .xlsx file', life: 3000 });
};

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