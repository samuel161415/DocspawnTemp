<template>
  <div class="h-full w-full bg-white rounded-lg overflow-scroll no-scrollbar">
    <div class="px-8 py-8 flex flex-col gap-2 ">

      <div class="px-3 py-2">
          <h2 class="font-semibold text-surface-600 text-2xl">Templates</h2>
          
          <div class="mt-14">
            <div class="flex w-full items-center justify-between mb-4">
    
            <Button 
              icon="pi pi-plus" 
              label="Create new template" 
              outlined
              class="text-success border-success hover:bg-green-50 hover:border-success h-[40px] w-[200px]"
              @click="router.push('/templates/create')" />

            <div class="flex space-x-5 ">
              <span class="space-x-3 cursor-pointer" @click="handleDisplayformat('list')">
                <i  :class="[ displayFormat != 'list' ? '  text-[#4b5563]' : 'pi pi-list text-primaryBlue', 'pi pi-list text-lg font-bold mt-1' ]"></i>
                <span class="text-lg font-poppins font-normal hover:text-primaryBlue"
                  :class="displayFormat === 'list' ? 'text-primaryBlue' : 'text-surface-500'">
                  List view 
                </span> 
              </span>

              <span class="space-x-3 cursor-pointer" @click="handleDisplayformat('grid')">
                <font-awesome-icon v-if="displayFormat === 'grid'" :icon="['fad', 'grid-2']" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; --fa-secondary-opacity: 1;" />
                <font-awesome-icon v-else :icon="['fad', 'grid-2']" style="--fa-primary-color: #4b5563; --fa-secondary-color: #4b5563; --fa-secondary-opacity: 0.9;" />
                <span class="text-lg font-poppins font-normal hover:text-primaryBlue"
                  :class="displayFormat === 'grid' ? 'text-primaryBlue' : 'text-surface-500'" >
                  Grid view 
                </span> 
              </span>
            </div>
          </div>

          <!-- filters -->
          <div class="flex my-4 justify-between">

            <div class="flex space-x-5 mt-4">
              <p class="text-lg font-poppins cursor-pointer font-normal hover:text-primaryBlue" :class="filterOption === '' ? 'text-primaryBlue' : 'text-surface-500 '" @click="filterOption = ''">
                All 
              </p> 
              <span class="mr-2 text-lg text-surface-500 font-medium"> / </span>
              <p class="text-lg font-poppins font-normal cursor-pointer hover:text-primaryBlue" :class="filterOption === 'favorites'? 'text-primaryBlue' : 'text-surface-500'" @click="filterOption = 'favorites'">
                <!-- <i class="pi pi-star mr-1" ></i> -->
                Favorites 
              </p>
              <span class="mr-2 text-lg text-surface-500 font-medium"> / </span>
              <p class="text-lg font-poppins font-normal cursor-pointer hover:text-primaryBlue" :class=" filterOption === 'form to doc' ? 'text-primaryBlue' : 'text-surface-500'" @click="filterOption = 'form to doc'">
                Form to doc 
              </p>
              <span class="mr-2 text-lg text-surface-500 font-medium"> / </span>
              <p class="text-lg font-poppins font-normal cursor-pointer hover:text-primaryBlue" :class="filterOption=== 'data to doc'? 'text-primaryBlue' :  'text-surface-500'" @click="filterOption = 'data to doc'">
                Data to doc 
              </p>
              <span class="mr-2 text-lg text-surface-500 font-medium"> / </span>
              <p class="text-lg font-poppins font-normal cursor-pointer hover:text-primaryBlue" :class="filterOption=== 'table to doc' ? 'text-primaryBlue' :  'text-surface-500' " @click="filterOption = 'table to doc'">
                Table to doc 
              </p>
            </div>

            <!-- search -->
            <div class="-mt-1">
              <span class="relative">
                <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-500 dark:text-surface-600"></i>
                <InputText
                  v-model="searchQuery"
                  placeholder="Search"
                  class="pl-10 text-lg text-surface-500 w-64 font-poppins font-normal border border-t-0 border-l-0 border-r-0 border-b-1 border-surface-500 dark:border-surface-200 rounded-none focus:ring-0 "
                />
              </span>
            </div>
          </div>

          <!-- templates -->
          <div v-if="displayFormat === 'grid'">
            <TemplateGridView :templates="filteredTemplates" />
          </div>

          <div v-if="displayFormat === 'list'">
            <TemplateListView :templates="filteredTemplates"/>  
          </div>
        </div>
      </div>

      <FormEditorPreview 
        v-model:visible="visible"
        :mobile="mobile"
        :formTitle="formTitle"
        :formDescription="formDescription"
        :isCollapsed="isCollapsed"
      />

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import TemplateGridView from "~/components/template/TemplateGridView.vue";
import TemplateListView from "~/components/template/TemplateListView.vue";
import { home } from '~/composables/useBreadcrumb.js'
import { templateData } from '~/services/templates.js';
import FormEditorPreview from "~/components/createTemplate/formEditor/FormEditorPreview.vue";

const router = useRouter();

const items = ref([{ label: "Templates", route: "/templates" }]);
const searchQuery = ref("");
const displayFormat = ref("grid");
const filterOption = ref('')

const filteredTemplates = computed(() => {
  let filtered = templateData;

  // Filter by type
  switch (filterOption.value) {
    case 'favorites':
      filtered = filtered.filter(template => template.isFavorite === true);
      break;
    case 'form to doc':
      filtered = filtered.filter(template => template.templateType === 'form to doc');
      break;
    case 'data to doc':
      filtered = filtered.filter(template => template.templateType === 'data to doc');
      break;
    case 'table to doc':
      filtered = filtered.filter(template => template.templateType === 'table to doc');
      break;
  }

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(template => template.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }

  return filtered;
});

const handleDisplayformat = (format) => {
  displayFormat.value = format;
};

</script>
<style>
/* Your CSS here */
</style>
