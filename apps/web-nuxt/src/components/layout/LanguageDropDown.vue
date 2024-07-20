<template>
  <div v-tooltip.bottom="'Select Language'" class="flex items-center gap-4 ">
    <Button
      v-if="!selectedLanguage" type="button" icon="pi pi-globe" class="p-4 border-none" rounded outlined
      size="large" aria-haspopup="true" aria-controls="overlay_menu"
      @click="toggleMenu"
    />
    <Button
      v-else type="button" rounded outlined aria-haspopup="true" class="border-none bg-transparent"
      aria-controls="overlay_menu" @click="toggleMenu"
    >
      <img
        alt="flag button"
        :src="selectedLanguage === 'french'
          ? frenchFlag
          : selectedLanguage === 'chinees'
            ? chineesFlag
            : engFlag
        " style="width: 20px; height: 13.4px"
      />
    </Button>

    <Menu ref="menu" :popup="true" :model="languageLists">
      <template #item="{ item, props }">
        <div class="flex p-2 cursor-pointer" @click="setLanguage(item.label)">
          <img :alt="item.label" :src="item.flag" style="width: 20px; height: 13.4px" />
          <p class="pl-3">
            {{ item.label }}
          </p>
        </div>
      </template>
    </Menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import engFlag from '../../assets/usa.png'
import chineesFlag from '../../assets/china.png'
import frenchFlag from '../../assets/france.png'
import { languageLists } from '../../composables/useLanguageDropDownItems'

const { locale } = useI18n()

const router = useRouter()

const menu = ref(null)
const selectedLanguage = ref('french')

const items = ref([
  {
    command: () => {
      selectedLanguage.value = 'english'
    },
    flag: engFlag,
    label: 'English',
  },
  {
    command: () => {
      selectedLanguage.value = 'french'
    },
    flag: frenchFlag,
    label: 'French',
  },
  // {
  //   command: () => {
  //     selectedLanguage.value = 'chinees'
  //   },
  //   flag: chineesFlag,
  //   label: 'Chinees',
  // },
])

// set selected language
function setLanguage(language) {
  console.log('language', language)
  selectedLanguage.value = language.toLowerCase()
  const forLocale = language === 'English' ? 'en' : 'fr'
  locale.value = forLocale
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined')
    localStorage.setItem('locale', forLocale)
}
onMounted(() => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    if (savedLocale === 'en')
      selectedLanguage.value = 'english'
    else
      selectedLanguage.value = 'french'
  }
})

function toggleMenu(event) {
  menu.value.toggle(event)
}
</script>
