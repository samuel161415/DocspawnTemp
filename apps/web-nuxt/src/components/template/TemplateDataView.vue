
<template>
    <div class="mt-14 rounded-lg pb-2">
        <DataView :value="filteredTemplates" :layout="layout">
            <template #header>
                <div class="flex justify-between">
                    <div class="flex flex-wrap justify-center space-x-5 mt-2">
                        <p class="text-lg font-poppins cursor-pointer font-normal hover:text-primaryBlue" :class="filterOption === '' ? 'text-primaryBlue' : 'text-surface-500 '" @click="filterOption = ''">
                            All 
                        </p> 
                        <span class="mr-2 text-lg text-surface-500 font-medium"> / </span>
                        <p class="text-lg font-poppins font-normal cursor-pointer hover:text-primaryBlue" :class="filterOption === 'favorites'? 'text-primaryBlue' : 'text-surface-500'" @click="filterOption = 'favorites'">
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
                    <div class="flex space-x-4">

                        <div class="flex space-x-2">
                            <span class="relative flex">
                                <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-700"
                                    style="color: rgb(117, 119, 120);" ></i>
                                <InputText
                                    v-model="searchQuery"
                                    placeholder="Search"
                                    class="pl-10 font-normal font-poppins rounded-lg text-surface-500 border-gray-300 w-64"
                                />
                            </span>
                        </div>
                        <DataViewLayoutOptions v-model="layout" />
                    </div>
                </div>
            </template>

            <template #list="slotProps">
                <div class="">
                    <div v-for="(item, index) in slotProps.items" :key="index"  class="w-full py-2"
                        @dragover.prevent="item.templateType !== 'form to doc' && handleDragOver(item, index)"
                        @dragenter.prevent="item.templateType !== 'form to doc' && handleDragEnter(item, index)"
                        @dragleave.prevent="item.templateType !== 'form to doc' && handleDragLeave(item, index)"
                        @drop.prevent="item.templateType !== 'form to doc' && handleFileDrop(item, $event)">

                        <div :class="{ 'drag-over': isDragging[index] }" class="flex flex-col sm:flex-row sm:items-center px-4 py-2 gap-2  rounded-lg bg-surface-50">
                            <div class="md:w-[10rem] relative cursor-pointer" @click="handleTemplatePreview(item)">
                                <img class="block xl:block mx-auto rounded-md w-32 h-28" :src="`${item.image}`" :alt="item.name" />
                            </div>
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div class="ml-2">
                                        <p class="text-lg sm:text-sm md:text-base lg:text-lg font-poppins text-surface-600 mt-1 ">{{ item.name }}</p>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center">
                                    <div class="flex space-x-8 mr-5">
                                        <i class="pi pi-file-edit text-surface-500 cursor-pointer" style="font-size: 1.3rem" v-tooltip.top="'Edit template'"></i>
                                        <i class="pi pi-file text-surface-500 cursor-pointer" v-tooltip.top="'Access data'" style="font-size: 1.3rem"></i>
                                        <i class="pi pi-folder-open text-surface-500 cursor-pointer" v-tooltip.top="'Access document'" style="font-size: 1.3rem"></i>
                                        <i :class="[ favoriteStates[index] ? 'pi pi-star-fill text-warning' : 'pi pi-star hover:text-warning', 'cursor-pointer text-surface-500']" v-tooltip.top="'Set as favorites'" style="font-size: 1.3rem"></i>
                                    </div>
                                    
                                    <div class="flex flex-row-reverse md:flex-row">
                                        <Button v-if="item.templateType === 'form to doc'" label="Fill form"  class="flex-auto md:flex-initial white-space-nowrap w-80 h-16" @click="handleFillForm"></Button>
                                        <Button v-else label="Drag or upload a file"  class="flex-auto md:flex-initial white-space-nowrap w-80 h-16"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #grid="slotProps">
                <div class="flex flex-wrap ">
                    <div v-for="(item, index) in slotProps.items" :key="index" 
                        class="w-full sm:w-1/3 md:w-4/12 xl:w-1/5 px-2 py-4 "
                        
                        @dragover.prevent="item.templateType !== 'form to doc' && handleDragOver(item, index)"
                        @dragenter.prevent="item.templateType !== 'form to doc' && handleDragEnter(item, index)"
                        @dragleave.prevent="item.templateType !== 'form to doc' && handleDragLeave(item, index)"
                        @drop.prevent="item.templateType !== 'form to doc' && handleFileDrop(item, $event)">

                        <div :class="{ 'drag-over': isDragging[index] }" class="px-6 sm:px-4 md:px-4 w-11/12 h-[20rem] lg:px-6 py-1 dark:border-surface-700 dark:bg-surface-900 rounded-lg flex flex-col bg-surface-50">
                            <div class="flex pt-4" :class="favoriteStates[index]? 'justify-between': 'justify-end'">
                                <i v-if="favoriteStates[index]" :class="[ favoriteStates[index] ? 'pi pi-star-fill text-warning' : 'pi pi-star hover:text-warning', 'cursor-pointer']"></i>
                                <i class="pi pi-ellipsis-v text-surface-500 cursor-pointer" @click="toggle"></i>
                            </div>
                            <div class="surface-50 flex justify-center rounded-md px-3">
                                <div class="relative mx-auto cursor-pointer" @click="handleTemplatePreview(item)"> 
                                    <img class="rounded-md w-full h-28" :src="`${item.image}`" :alt="item.name" style="max-width: 300px"/>           
                                </div>
                            </div>

                            <div class="mt-2">
                                <div class="flex flex-row text-center justify-center items-center gap-2 h-24 ">
                                    <p class="text-lg sm:text-sm md:text-base lg:text-lg font-poppins text-surface-500 truncate">{{ item.name }}</p>
                                </div>
                                <div class="flex flex-col">
                                    <Button v-if="item.templateType === 'form to doc'" label="Fill form"  class="flex-auto cursor-pointer font-poppins" @click="handleFillForm"></Button>
                                    <Button v-else label="Drag or upload file"  class="flex-auto white-space-nowrap font-poppins cursor-pointer"></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>

        <FormEditorPreview 
            v-model:visible="previewFormVisible"
            :mobile="mobile"
            :formTitle="formTitle"
            :formDescription="formDescription"
            :isCollapsed="isCollapsed"
            @cancel="previewFormVisible = false"
        />
         <OverlayPanel ref="op">
            <div class="flex flex-col justify-start w-48 h-44">
                <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">Edit template</p>
                <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">Access data</p>
                <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">Access document</p>
                <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">Set as favorites</p>
            </div>
        </OverlayPanel>

        <TemplatePreview v-if="visible" v-model:visible="visible" @cancel="visible = false" :template="currentTemplate" @outsideClick="handleOutsideClick"/>
    </div>
</template>

<script setup>
import { ref } from "vue";
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import FormEditorPreview from "~/components/createTemplate/formEditor/FormEditorPreview.vue";
import TemplatePreview from './TemplatePreview.vue';
import { thumbnails } from '../../services/templates';


const props = defineProps({
  templates: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const isDragging = ref(new Array(props.templates.length).fill(false));
const layout = ref('grid');
const hoverStates = reactive({});
const favoriteStates = reactive({});
const currentTemplate = ref();
const visible = ref(false);
const previewFormVisible = ref(false);
const filterOption = ref('')
const searchQuery = ref("");

// default favorite state
props.templates.forEach((template, index) => {
    favoriteStates[index] = template.isFavorite;
});

// default favorite state based on template changes
watch(() => props.templates, (newVal) => {
    newVal.forEach((template, index) => {
        favoriteStates[index] = template.isFavorite;
    });
});

const handleTemplatePreview = (template) =>{
    visible.value = true;
    currentTemplate.value = template;
};

const op = ref();

const toggle = (event) => {
    op.value.toggle(event);
}

const filteredTemplates = computed(() => {
  let filtered = props.templates;

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

const handleOutsideClick = () => {
    visible.value = false;
};

const handleFillForm = () => {
    previewFormVisible.value = true;
};


const handleDragOver = (item, index) => {
  console.log('drag handleDragOver');
  isDragging.value.splice(index, 1, true); // Update drag state for the specific card
};

const handleDragEnter = (item, index) => {
  console.log('drag handleDragEnter');
  isDragging.value.splice(index, 1, true);
};

const handleDragLeave = (item, index) => {
  event.preventDefault(); // Might be used to change some visual feedback
  isDragging.value.splice(index, 1, false);
};

const handleFileDrop = (template, event) => {
    const files = event.dataTransfer.files;

    if (files.length > 0) {
        const file = files[0];

        // change template name to file name
        template.name = file.name;

        // split file name to get the file type
        const fileParts = file.name.split('.');
        
        const thumbnail = thumbnails[0];
        if (thumbnail[fileParts[fileParts.length - 1]]) {
            template.image = thumbnail[fileParts[fileParts.length - 1]];
        }

        handleFileUpload(files); 
    }
    isDragging.value.fill(false);
};

const handleFileUpload = (files) => {
    // Implement file upload logic here
    console.log('Uploading files', files);
};

</script>

<style scoped>
.drag-over {
    border: 2px dashed #747474; 
    opacity: 0.4; /* Opacity to indicate drop area */
}

</style>
