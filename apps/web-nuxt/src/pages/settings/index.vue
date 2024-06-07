<template>
  <div class="h-full w-full bg-white overflow-scroll no-scrollbar rounded-lg ml-4">
    <div class="px-8 py-8 w-full">

      <div class="py-2 mr-12 ml-3">
        <p class="font-semibold text-surface-600 font-poppins text-2xl mb-5">My Settings</p>

        <div class="mt-5">
          <p class="text-surface-600 font-poppins text-xl font-medium" id="my-profile">Profile</p>
          <p class="text-surface-500 font-poppins text-base mt-2">Your personal information and account security settings. </p>
        </div>

        <div class="mt-8 space-y-4">
          <p class="text-surface-600 font-poppins text-lg font-medium">Avatar</p>
          <Avatar label="AD" class="mr-2 text-2xl" size="xlarge" shape="circle" style="background-color: #009EE2; color: #fff; width: 100px; height: 100px; font-weight: 600; font-size: xx-large;"/>
          <p class="text-surface-600 font-poppins text-lg font-medium">Adam D.</p>
        </div>

        <div class="mt-5">
          <p class="text-surface-600 font-poppins text-lg font-medium">Full Name</p>
          <span class="relative flex">
              <i class="pi pi-user absolute top-2/4 -mt-1 left-3 text-surface-400 dark:text-surface-600 text-gray-400 "
                  style="color: rgb(117, 119, 120);"></i>
              <InputText type="text" v-model="fullName" class="w-4/6 mt-3 rounded-lg pl-8" />
          </span>
        </div>

        <div class="mt-5">
          <p class="text-surface-600 font-poppins text-lg font-medium">Email</p>
          <span class="relative flex">
              <i class="pi pi-envelope absolute top-2/4 -mt-1 left-3 text-surface-400 dark:text-surface-600 text-gray-400 "
                  style="color: rgb(117, 119, 120);"></i>
              <InputText type="text" v-model="email" class="w-4/6 mt-3 rounded-lg pl-8" />
          </span>
        </div>

        <div class="mt-5">
          <p class="text-surface-600 font-poppins text-lg font-medium">Password</p>
          <span class="relative flex">
              <i class="pi pi-lock absolute top-2/4 -mt-1 left-3 text-surface-400 dark:text-surface-600 text-gray-400 "
                  style="color: rgb(117, 119, 120);"></i>
              <InputText type="password" v-model="password" class="w-4/6 mt-3 rounded-lg pl-8" />
             
          </span>
        </div>

        <div class="mt-28" id="language-region">
          <div class="">
            <p class="text-surface-600 font-poppins text-xl font-medium">Language & Region</p>
            <p class="text-surface-500 font-poppins text-base mt-2">Customize your language and region.</p>
          </div>

          <div class="mt-7">
            <p class="text-surface-600 font-poppins text-lg font-medium">Language</p>
            <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="English" style="width: 66.666667%; height: 44px;" class="flex justify-center mt-3" />
          </div>

          <div class="mt-7">
            <p class="text-surface-600 font-poppins text-lg font-medium">Timezone</p>
            <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Asian/Kuala Lumpur"  style="width: 66.666667%; height: 44px;" class="flex justify-center mt-3" />
          </div>

          <div class="flex mt-7">
              <Checkbox v-model="notifyTimeZone" inputId="notifyTimeZone" name="notifyTimeZone" value="notifyTimeZone" :binary="true" />
              <label for="ingredient1" class="ml-2 text-surface-600 font-poppins text-lg"> Notify me of Timezone changes </label>
          </div>
        </div>

        <!-- time & date -->
        <div class="mt-20 mb-48" id="time-date-format">
          <div class="">
            <p class="text-surface-600 font-poppins text-xl font-medium">Time & Date format</p>
            <p class="text-surface-500 font-poppins text-base mt-2">Select the way times & dates are displayed.</p>
          </div>


          <p class="text-surface-600 font-poppins text-lg mt-8">Start of the calender week</p>
          <div class="flex mt-2">
            <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
            <label for="ingredient1" class="text-surface-600 font-poppins text-lg ml-2">Sunday</label>
          </div>

          <div class="flex mt-2">
            <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
            <label for="ingredient1" class="text-surface-600 font-poppins text-lg ml-2">Monday</label>
          </div>
          
          <p class="text-surface-600 font-poppins text-lg mt-7">Time format</p>

          <div class="flex mt-2">
            <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
            <label for="ingredient1" class="text-surface-600 font-poppins text-lg ml-2">24 hour</label>
          </div>
          <div class="flex mt-2">
            <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
            <label for="ingredient1" class="text-surface-600 font-poppins text-lg ml-2">12 hour</label>
          </div>

          <p class="text-surface-600 font-poppins text-lg mt-7">Date format</p>

          <div class="flex mt-2">
            <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
            <label for="ingredient1" class="text-surface-600 font-poppins text-lg ml-2">mm/dd/yyyy</label>
          </div>
          <div class="flex mt-2">
            <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
            <label for="ingredient1" class="text-surface-600 font-poppins text-lg ml-2">dd/mm/yyyy</label>
          </div>
          <div class="flex mt-2">
            <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
            <label for="ingredient1" class="text-surface-600 font-poppins text-lg ml-2">yyyy/mm/dd</label>
          </div>

        </div>
      </div>
    </div>
  
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const fullName = ref('');
const email = ref('');
const password = ref('');
const notifyTimeZone = ref(false)

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
</script>


