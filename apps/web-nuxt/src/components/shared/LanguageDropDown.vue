<template>
    <div  class="flex items-center gap-4">
        <Button
            v-if="!selectedLanguage"
            type="button"
            icon="pi pi-globe"
            class="p-4 border-none"
            rounded
            outlined
            size="large"
            v-tooltip.bottom="'Select Language'"
            @click="toggleMenu"
            aria-haspopup="true"
            aria-controls="overlay_menu"
        />
        <Button
            v-else
            type="button"
            @click="toggleMenu"
            rounded
            outlined
            aria-haspopup="true"
            class="border-none bg-transparent"
            aria-controls="overlay_menu"
            v-tooltip.bottom="'Change Language'"
        >
              <img
                alt="flag button"
                :src="
                  selectedLanguage === 'french'
                    ? frenchFlag
                    : selectedLanguage === 'chinese'
                    ? chineesFlag
                    : engFlag
                "
                style="width: 20px; height: 13.4px"
            /></Button>

            <Menu ref="menu" :popup="true" :model="items">
              <template #item="{ item, props }">
                <div class="w-[50px]" @click="props.action" v-bind="props.action">
                  <img
                    :alt="item.label"
                    :src="item.flag"
                    style="width: 20px; height: 13.4px"
                  />
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

const router = useRouter();

const menu = ref(null);
const selectedLanguage = ref('french');

const items = ref([
  {
    command: () => {
      selectedLanguage.value = "english";
    },
    flag: engFlag,
  },
  {
    command: () => {
      selectedLanguage.value = "french";
    },
    flag: frenchFlag,
  },
  {
    command: () => {
      selectedLanguage.value = "chinees";
    },
    flag: chineesFlag,
  },
]);
const toggleMenu = (event) => {
  menu.value.toggle(event);
};
</script>