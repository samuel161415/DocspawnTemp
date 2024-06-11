<template>
  <div class="h-full w-full bg-white overflow-scroll no-scrollbar rounded-lg ml-4">
    <div class="px-8 py-8 w-full">

      <div class="py-2 mr-12 ml-3">
        <p class="font-semibold text-surface-600 font-poppins text-2xl mb-5">General settings</p>

        <div class="flex justify-between">
          <div class="mt-5">
            <p class="text-surface-600 font-poppins text-xl font-medium" id="my-profile">My profile</p>
            <p class="text-surface-500 font-poppins text-lg mt-2">Your personal information and account security settings. </p>
          </div>
  
          <div class="my-5">
            <p class="text-surface-600 font-poppins text-lg font-normal">Avatar</p>
            <Avatar v-if="avatarImage" :image="avatarImage" class="mr-2 text-xl mt-1 cursor-pointer rounded-full" size="large" shape="circle" style="background-color: #009EE2; color: #fff; font-weight: 600; font-size: large; border-radius: 100%;"  @click="uploadImage"/>
            <Avatar v-else label="AD" :image="avatarImage" class="mr-2 text-xl mt-1 cursor-pointer rounded-full" size="large" shape="circle" style="background-color: #009EE2; color: #fff; font-weight: 600; font-size: large; border-radius: 100%;"  @click="uploadImage"/>
            
          </div>
        </div>

        <div class="mt-10">
          <p class="text-surface-600 font-poppins text-lg font-normal">Full name</p>
          <span class="relative flex">
              <i class="pi pi-user absolute top-2/4 left-3 text-surface-400 dark:text-surface-600"
                  style="color: rgb(117, 119, 120);"></i>
              <InputText type="text" v-model="fullName" class="w-full mt-3 rounded-lg pl-10" />
          </span>
        </div>

        <div class="mt-5">
          <p class="text-surface-600 font-poppins text-lg font-normal">Email</p>
          <span class="relative flex">
              <i class="pi pi-envelope absolute top-2/4  left-3 text-surface-400 dark:text-surface-600"
                  style="color: rgb(117, 119, 120);"></i>
              <InputText type="text" v-model="email" class="w-full mt-3 rounded-lg pl-10" />
          </span>
        </div>

        <div class="mt-5">
          <p class="text-surface-600 font-poppins text-lg font-normal">Password</p>
          <div class="flex justify-between mt-3">
            <!-- password -->
            <span class="relative flex w-full">
              <i class="pi pi-lock  absolute top-1/4 z-50 left-3 text-surface-400 dark:text-surface-600"
                  style="color: rgb(117, 119, 120);"></i>
              <Password v-model="password" style="width: 80%; height: 44px;" toggleMask>
                  <template #header>
                      <h6>Pick a password</h6>
                  </template>
                  <template #footer>
                      <Divider />
                      <div class="">
                        <p class="mt-2 p-0 mb-2">Suggestions</p>
                        <ul class="p-0 pl-2 m-0 ml-2 list-disc leading-6" style="line-height: 1.5">
                            <li>At least one lowercase</li>
                            <li>At least one uppercase</li>
                            <li>At least one numeric</li>
                            <li>Minimum 8 characters</li>
                        </ul>
                    
                      </div>
                  </template>
              </Password>
          </span>
         
            <Button 
                label="Save password" 
                class="text-white border-success bg-success hover:bg-success hover:border-success w-60"
                severity="success"
                />
          </div>
        </div>
        <!--  -->

        <div class="mt-28" id="language-region">
          <div class="">
            <p class="text-surface-600 font-poppins text-xl font-medium">Language & Region</p>
            <p class="text-surface-500 font-poppins text-lg font-normal mt-2">Customize your language and region.</p>
          </div>

          <div class="mt-7">
            <p class="text-surface-600 font-poppins text-lg font-normal">Language</p>
            <Dropdown v-model="selectedLanguage" :options="language" optionLabel="name" placeholder="English" style="width: 100%; height: 44px;" class="flex justify-center mt-3 font-poppins" />
          </div>

          <div class="mt-7">
            <p class="text-surface-600 font-poppins text-lg font-normal">Timezone</p>
            <Dropdown v-model="selectedTimeZone" :options="cities" optionLabel="name" placeholder="Asian/Kuala Lumpur"  style="width: 100%; height: 44px;" class="flex justify-center mt-3 font-poppins" />
          </div>

          <div class="flex mt-7">
              <Checkbox v-model="notifyTimeZone" inputId="notifyTimeZone" name="notifyTimeZone" value="notifyTimeZone" :binary="true" />
              <label for="notifyTimeZone" class="ml-4 text-surface-500 font-poppins text-lg font-normal"> Notify me of timezone changes </label>
          </div>
        </div>

        <!-- time & date -->
        <div class="mt-20 mb-48" id="time-date-format">
          <div class="">
            <p class="text-surface-600 font-poppins text-xl font-medium">Time & Date format</p>
            <p class="text-surface-500 font-poppins text-lg font-normal mt-2">Select the way times & dates are displayed.</p>
          </div>

          <p class="text-surface-600 font-poppins text-lg mt-8">Start of the calendar week</p>
          <div class="mt-3 flex justify-between w-1/2"> 

            <div class="flex w-1/2"> 
              <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
              <label for="ingredient1" class="text-surface-500 font-poppins text-lg ml-2">Sunday</label>
            </div>

            <div class="flex w-1/2"> 
              <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
              <label for="ingredient1" class="text-surface-500 font-poppins text-lg ml-2">Monday</label>
            </div>
          </div>

          <p class="text-surface-600 font-poppins text-lg mt-7">Time format</p>
          <div class="mt-3 flex justify-between w-1/2"> 

            <div class="flex w-1/2"> 
              <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
              <label for="ingredient1" class="text-surface-500 font-poppins text-lg ml-2">24 hour</label>
            </div>

            <div class="flex w-1/2"> 
              <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
              <label for="ingredient1" class="text-surface-500 font-poppins text-lg ml-2">12 hour</label>
            </div>
          </div>

          <p class="text-surface-600 font-poppins text-lg mt-7">Date format</p>
          
          <div class="mt-3 flex justify-between w-1/2">
            <div class="flex w-1/2">
              <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
              <label for="ingredient1" class="text-surface-500 font-poppins text-lg ml-2">mm/dd/yyyy</label>
            </div>

            <div class="flex w-1/2">
              <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
              <label for="ingredient1" class="text-surface-500 font-poppins text-lg ml-2">dd/mm/yyyy</label>
            </div>
          </div>

          <div class="flex mt-2">
            <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
            <label for="ingredient1" class="text-surface-500 font-poppins text-lg ml-2">yyyy/mm/dd</label>
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

const selectedLanguage = ref();
const selectedTimeZone = ref();
const avatarImage = ref('');

const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const language = ref([
    { name: 'English', code: 'EN' },
    { name: 'French', code: 'F' },
    { name: 'Chinese', code: 'C' },
]);

const uploadImage = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';
  
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      avatarImage.value = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
  
  document.body.appendChild(fileInput);
  fileInput.click();
};
</script>


