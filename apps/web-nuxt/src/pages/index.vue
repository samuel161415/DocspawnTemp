<template>
    <div class="h-full w-full bg-white rounded-lg overflow-scroll no-scrollbar">
      <div class="px-8 py-8 flex flex-col gap-2 ">
          <div class="flex justify-between px-3 pt-2">
            <h2 class="font-semibold text-surface-600 text-2xl">Favorite templates</h2>
            <span class="relative flex ">
                  <i
                    class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-700"
                    style="color: rgb(117, 119, 120);"
                  ></i>
                  <InputText
                    v-model="searchQuery"
                    placeholder="Search"
                    class="pl-10 font-normal rounded-lg border-gray-300 w-64"
                  />
                </span>
          </div>
          <TemplateGridView :templates="filteredTemplates" />
      </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import TemplateGridView from "~/components/template/TemplateGridView.vue";
import { templateData } from '~/services/templates.js';

const favoritedTemplates = templateData.filter(template => template.isFavorite === true);
const searchQuery = ref("");

const filteredTemplates = computed(() => {
    return favoritedTemplates.filter(template => template.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
</script>