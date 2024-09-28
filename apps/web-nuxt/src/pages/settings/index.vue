<template>
  <div class="h-full w-full bg-white overflow-scroll no-scrollbar rounded-lg ml-4">
    <div class="px-8 py-8 w-full">
      <div class="py-2 mx-3">
        <p class="font-semibold text-surface-600 font-poppins text-2xl mb-5">
          General settings
        </p>

        <div id="my-profile" class="flex justify-between">
          <div class="mt-5">
            <p class="text-surface-600 font-poppins text-xl font-medium">
              My profile
            </p>
            <p class="text-surface-500 font-poppins text-lg mt-2">
              Your personal information and account security settings.
            </p>
          </div>
        </div>
        <div class="flex justify-between">
          <div class="mt-5 w-full">
            <p class="text-surface-600 font-poppins text-lg font-normal">
              Full name
            </p>
            <span class="relative flex">
              <i
                class="pi pi-user absolute top-1/3 my-2 left-3 text-surface-400 dark:text-surface-600"
                style="color: rgb(117, 119, 120);"
              ></i>
              <InputText v-model="fullName" type="text" class="mt-3 rounded-lg pl-10" style="width: 98%;" />
            </span>

            <p class="text-surface-600 font-poppins text-lg font-normal mt-5">
              Email
            </p>
            <span class="relative flex">
              <i
                class="pi pi-envelope absolute top-1/3 my-2 left-3 text-surface-400 dark:text-surface-600"
                style="color: rgb(117, 119, 120);"
              ></i>
              <InputText v-model="email" type="text" class="mt-3 rounded-lg pl-10" style="width: 98%;" />
            </span>
          </div>

          <!-- avatar -->

          <div class="w-64 mt-5">
            <p class="text-surface-600 flex font-poppins text-lg font-normal justify-center">
              Avatar
            </p>
            <div class="mt-2 relative flex  cursor-pointer hover:opacity-40 ml-4 justify-center" @mouseenter="showCamera = true" @mouseleave="showCamera = false" @click="uploadImage">
              <Avatar v-if="avatarImage" :image="avatarImage" class="text-xl mt-1 rounded-full border object-fill" size="xlarge" shape="circle" style="background-color: #009EE2; color: #fff; font-weight: 600; font-size: x-large; border-radius: 100%; height: 141px; width: 141px;" />
              <Avatar v-else label="AD" :image="avatarImage" class=" text-xl mt-1 rounded-full border object-fill" size="xlarge" shape="circle" style="background-color: #009EE2; color: #fff; font-weight: 600; font-size: xx-large; border-radius: 100%; height: 141px; width: 141px;" />
              <i v-show="showCamera" class="pi pi-camera absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-black text-4xl"></i>
            </div>
          </div>
        </div>

        <div class="mt-5">
          <p class="text-surface-600 font-poppins text-lg font-normal">
            Password
          </p>
          <div class="flex justify-between mt-3">
            <!-- password -->
            <span class="relative flex w-full">
              <i class="pi pi-lock  absolute top-1/3 z-50 left-3 text-surface-400 dark:text-surface-600" style="color: rgb(117, 119, 120);"></i>
              <Password v-model="password" style="width: 100%; height: 44px;" toggle-mask>
                <template #header>
                  <h6>Pick a password</h6>
                </template>
                <template #footer>
                  <Divider />
                  <div class="">
                    <p class=" p-0 mb-1">Suggestions</p>
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
          </div>
        </div>

        <!-- confirm password  -->
        <div v-if="isTyping && password !== ''" class="mt-5">
          <p class="text-surface-600 font-poppins text-lg font-normal">
            Password confirmation
          </p>
          <div class="flex justify-between mt-3">
            <!-- password -->
            <span class="relative flex w-full">
              <i class="pi pi-lock  absolute top-1/3 z-50 left-3 text-surface-400 dark:text-surface-600" style="color: rgb(117, 119, 120);"></i>
              <Password v-model="confirmPassword" style="width: 98%; height: 44px;" toggle-mask>
                <template #header>
                  <h6>Pick a password</h6>
                </template>
                <template #footer>
                  <Divider />
                  <div class="">
                    <p class="p-0 mb-1">Suggestions</p>
                    <ul class="p-0 pl-2 m-0 ml-2 list-disc leading-6" style="line-height: 1.5">
                      <li>Password must match</li>
                    </ul>
                  </div>
                </template>
              </Password>
            </span>

            <Button
              label="Change password"
              class="text-white border-success bg-success hover:bg-success hover:border-success w-60"
              severity="success"
              :disabled="!validPassword"
              @click="openConfirmationModal = true"
            />
          </div>
        </div>

        <div id="language-region" :class="{ 'mt-5': isTyping && password != '', 'mt-28': !isTyping || password === '' }">
          <div class="">
            <p class="text-surface-600 font-poppins text-xl font-medium">
              Language & Region
            </p>
            <p class="text-surface-500 font-poppins text-lg font-normal mt-2">
              Customize your language and region.
            </p>
          </div>

          <div class="mt-5">
            <p class="text-surface-600 font-poppins text-lg font-normal">
              Language
            </p>
            <LanguageDropDown />
            <!-- <Dropdown v-model="selectedLanguage" :options="language" option-label="name" placeholder="English" style="width: 100%; height: 44px;" class="flex justify-center mt-3 font-poppins" /> -->
          </div>

          <div class="mt-5">
            <p class="text-surface-600 font-poppins text-lg font-normal">
              Timezone
            </p>
            <Dropdown v-model="selectedTimeZone" :options="cities" option-label="name" placeholder="Asian/Kuala Lumpur" style="width: 100%; height: 44px;" class="flex justify-center mt-3 font-poppins" />
          </div>

          <div class="flex mt-5">
            <Checkbox v-model="notifyTimeZone" input-id="notifyTimeZone" name="notifyTimeZone" value="notifyTimeZone" :binary="true" />
            <label for="notifyTimeZone" class="ml-4 text-surface-500 font-poppins text-lg font-normal"> Notify me of timezone changes </label>
          </div>
        </div>

        <!-- time & date -->
        <div id="time-date-format" class="mt-20 mb-48">
          <div class="">
            <p class="text-surface-600 font-poppins text-xl font-medium">
              Time & Date format
            </p>
            <p class="text-surface-500 font-poppins text-lg font-normal mt-2">
              Select the way times & dates are displayed.
            </p>
          </div>

          <p class="text-surface-600 font-poppins text-lg mt-5">
            Start of the calendar week
          </p>
          <div class="mt-3 flex justify-between w-1/2">
            <div class="flex w-1/2">
              <RadioButton v-model="selectedDay" input-id="Sunday" name="Sunday" value="Sunday" />
              <label for="Sunday" class="text-surface-500 font-poppins text-lg ml-2">Sunday</label>
            </div>

            <div class="flex w-1/2">
              <RadioButton v-model="selectedDay" input-id="Monday" name="Monday" value="Monday" />
              <label for="Monday" class="text-surface-500 font-poppins text-lg ml-2">Monday</label>
            </div>
          </div>

          <p class="text-surface-600 font-poppins text-lg mt-5">
            Time format
          </p>
          <div class="mt-3 flex justify-between w-1/2">
            <div class="flex w-1/2">
              <RadioButton v-model="hours" input-id="24-hour" name="24-hour" value="24-hour" />
              <label for="24-hour" class="text-surface-500 font-poppins text-lg ml-2">24 hour</label>
            </div>

            <div class="flex w-1/2">
              <RadioButton v-model="hours" input-id="12-hour" name="12-hour" value="12-hour" />
              <label for="12-hour" class="text-surface-500 font-poppins text-lg ml-2">12 hour</label>
            </div>
          </div>

          <p class="text-surface-600 font-poppins text-lg mt-5">
            Date format
          </p>

          <div class="mt-3 flex justify-between w-1/2">
            <div class="flex w-1/2">
              <RadioButton v-model="date_format" input-id="mm/dd/yyyy" name="mm/dd/yyyy" value="mm/dd/yyyy" />
              <label for="mm/dd/yyyy" class="text-surface-500 font-poppins text-lg ml-2">mm/dd/yyyy</label>
            </div>

            <div class="flex w-1/2">
              <RadioButton v-model="date_format" input-id="dd/mm/yyyy" name="dd/mm/yyyy" value="dd/mm/yyyy" />
              <label for="dd/mm/yyyy" class="text-surface-500 font-poppins text-lg ml-2">dd/mm/yyyy</label>
            </div>
          </div>

          <div class="flex mt-2">
            <RadioButton v-model="date_format" input-id="yyyy/mm/dd" name="yyyy/mm/dd" value="yyyy/mm/dd" />
            <label for="yyyy/mm/dd" class="text-surface-500 font-poppins text-lg ml-2">yyyy/mm/dd</label>
          </div>
        </div>
      </div>
    </div>

    <Dialog v-model:visible="openConfirmationModal" group="headless" modal :style="{ width: '29rem' }">
      <template #container>
        <div class="bg-white rounded-lg px-5 py-14 ">
          <i class="pi pi-exclamation-triangle = mr-2"></i>
          <span class="mt-2 font-poppins text-base text-surface-600">Are you sure you want to change your password?</span>
          <div class="flex justify-end gap-2 mt-3 px-2">
            <Button label="No" outlined severity="secondary" size="small" text @click="openConfirmationModal = false" />
            <Button label="Yes" severity="success" size="small" @click="openConfirmationModal = false" />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'
import LanguageDropDown from '~/components/layout/LanguageDropDown.vue'

const confirm = useConfirm()
const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const notifyTimeZone = ref(false)
const showCamera = ref(false)
const isTyping = ref(false)
const selectedLanguage = ref()
const selectedTimeZone = ref()
const avatarImage = ref('')
const openConfirmationModal = ref(false)
const validPassword = ref(false)
const hours = ref('')
const date_format = ref('')
const selectedDay = ref('')

watch(password, () => {
  isTyping.value = true
})

watch(confirmPassword, () => {
  validPassword.value = password.value.length >= 8 && /[a-z]/.test(password.value) && /[A-Z]/.test(password.value) && /\d/.test(password.value) && password.value === confirmPassword.value
})
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
])

const language = ref([
  { name: 'English', code: 'EN' },
  { name: 'French', code: 'F' },
  // { name: 'Chinese', code: 'C' },
])

function uploadImage() {
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = 'image/*'
  fileInput.style.display = 'none'

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      avatarImage.value = reader.result
    }

    if (file)
      reader.readAsDataURL(file)
  })

  document.body.appendChild(fileInput)
  fileInput.click()
}

function requireConfirmation(event) {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: 'Are you sure you want to change your password?',
  })
}
</script>
