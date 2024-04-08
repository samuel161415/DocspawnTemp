<template>
  <div class="flex items-center gap-4" v-tooltip.bottom="'Select Language'">
    <Button v-if="!selectedLanguage" type="button" icon="pi pi-globe" class="p-4 border-none" rounded outlined
      size="large"  @click="toggleMenu" aria-haspopup="true"
      aria-controls="overlay_menu" />
    <Button v-else type="button" @click="toggleMenu" rounded outlined aria-haspopup="true"
      class="border-none bg-transparent" aria-controls="overlay_menu" >
      <img alt="flag button" 
        :src="selectedLanguage === 'french'
        ? frenchFlag
        : selectedLanguage === 'chinees'
          ? chineesFlag
          : engFlag
      " style="width: 20px; height: 13.4px" /></Button>

    <Menu ref="menu" :popup="true" :model="languageLists">
      <template #item="{ item, props }">
        <div class="flex p-2 cursor-pointer" @click="setLanguage(item.label)" >
          <img :alt="item.label" :src="item.flag" style="width: 20px; height: 13.4px" />
          <p class="pl-3">{{ item.label }}</p>
        </div>
      </template>
    </Menu>

  </div>
</template>

<script setup>
import { ref } from "vue";
import engFlag from "../../assets/usa.png";
import chineesFlag from "../../assets/china.png";
import frenchFlag from "../../assets/france.png";
import { useRouter } from "vue-router";
import { languageLists } from '../../composables/useLanguageDropDownItems';
const router = useRouter();

const menu = ref(null);
const selectedLanguage = ref('french');

const items = ref([
  {
    command: () => {
      selectedLanguage.value = "english";
    },
    flag: engFlag,
    label: "English",
  },
  {
    command: () => {
      selectedLanguage.value = "french";
    },
    flag: frenchFlag,
    label: "French",
  },
  {
    command: () => {
      selectedLanguage.value = "chinees";
    },
    flag: chineesFlag,
    label: "Chinees",
  },
]);

// set selected language
const setLanguage = (language) => {
  selectedLanguage.value = language.toLowerCase();
};

const toggleMenu = (event) => {
  menu.value.toggle(event);
};
</script>
