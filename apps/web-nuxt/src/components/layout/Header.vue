<template>
  <Menubar class="border-none px-3 bg-white menubar">
    <template #start>
      <NuxtLink to="/">
        <img src="../assets/Logo.png" class="w-40 h-auto" />
      </NuxtLink>
    </template>
    <template #end>
      <div v-if="$route.path == '/signup'" class="flex items-center gap-4">
        <p>Already have an account?</p>
        <Button
          link
          class="text-[#009ee2] text-sm"
          label="Sign in"
          @click="router.push('/signin')"
        />
      </div>
      <div v-else class="flex items-center gap-4">
        <Button
          v-if="!selectedLanguage"
          v-tooltip.bottom="'Select Language'"
          type="button"
          icon="pi pi-globe"
          class="p-4 border-none"
          rounded
          outlined
          size="large"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          @click="toggleMenu"
        />
        <Button
          v-else
          type="button"
          rounded
          v-tooltip.bottom="'Change Language'"
          outlined
          aria-haspopup="true"
          class="border-none bg-transparent"
          aria-controls="overlay_menu"
          @click="toggleMenu"
        >
          <img
            alt="flag button"
            :src="
              selectedLanguage === 'french'
                ? frenchFlag
                : selectedLanguage === 'chinees'
                  ? chineesFlag
                  : engFlag
            "
            style="width: 20px; height: 13.4px"
          />
        </Button>

        <Menu ref="menu" :popup="true" :model="items">
          <template #item="{ item, props }">
            <div class="w-[50px]" v-bind="props.action" @click="props.action">
              <img
                :alt="item.label"
                :src="item.flag"
                style="width: 20px; height: 13.4px"
              />
            </div>
          </template>
        </Menu>

        <NuxtLink to="/signin">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
            size="large"
          />
        </NuxtLink>
      </div>
    </template>
  </Menubar>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import engFlag from '../assets/usa.png'
import chineesFlag from '../assets/china.png'
import frenchFlag from '../assets/france.png'

const menu = ref(null)
const selectedLanguage = ref(null)
const router = useRouter()
const items = ref([
  {
    command: () => {
      selectedLanguage.value = 'english'
    },
    flag: engFlag,
  },
  {
    command: () => {
      selectedLanguage.value = 'french'
    },
    flag: frenchFlag,
  },
  {
    command: () => {
      selectedLanguage.value = 'chinees'
    },
    flag: chineesFlag,
  },
])
function toggleMenu(event) {
  menu.value.toggle(event)
}
</script>

<style scoped>
/* .p-menubar-root-list {
  box-shadow: none !important;
} */
</style>
