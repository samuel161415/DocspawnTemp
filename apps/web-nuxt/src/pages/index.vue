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
          <!--  -->
          <div>
            <div class="flex flex-wrap ">
                <div v-for="(item, index) in filteredTemplates" :key="index" 
                    class="w-full sm:w-1/3 md:w-4/12 xl:w-1/5 px-2 py-4"
                    @dragover.prevent="item.templateType !== 'form to doc' && handleDragOver(item, index)"
                    @dragenter.prevent="item.templateType !== 'form to doc' && handleDragEnter(item, index)"
                    @dragleave.prevent="item.templateType !== 'form to doc' && handleDragLeave(item, index)"
                    @drop.prevent="item.templateType !== 'form to doc' && handleFileDrop(item, $event)">

                    <div v-if="isDragging[index]" class="flex justify-center items-center border-dashed border-2 border-gray-400 px-6 sm:px-4 md:px-4 w-11/12 h-[20rem] lg:px-6 py-1 dark:border-surface-700 dark:bg-surface-900 rounded-lg flex-col bg-white">
                        <font-awesome-icon :icon="fad.faUpload" size="2xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; width: 60px; height: 50px;" />
                        <p class="text-primaryBlue font-bold font-poppins text-lg text-center mt-5">Drop your data here</p>
                        <p class="text-black font-poppins text-base text-center mt-2">Supported file formats: <br/> .csv, .xls, .xlsx</p>
                    </div>

                    <div v-else class="px-6 sm:px-4 md:px-4 w-11/12 h-[20rem] lg:px-6 py-1 dark:border-surface-700 dark:bg-surface-900 rounded-lg flex flex-col bg-surface-50">
                        
                        <div class="flex pt-4" :class="item.isFavorite ? 'justify-between': 'justify-end'">
                            <i :class="[item.isFavorite ? 'pi pi-star-fill text-warning' : 'pi pi-star hover:text-warning', 'cursor-pointer']"></i>
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
                                <Button v-else label="Select or drop file"  class="flex-auto white-space-nowrap font-poppins cursor-pointer" @click="uploadFile"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
          <!-- <Toast /> -->
          <Toast position="top-right">
              <template #message="slotProps">
                  <div class="flex  items-start space-x-2">
                      <div class="mt-1">
                          <font-awesome-icon :icon="fal.faFileCircleXmark" size="lg" style="color: #c8432f;" />
                      </div>
                      <div class="">
                          <div class="font-bold text-lg font-poppins text-error ">{{ slotProps.message.summary }}</div>
                          <div class="font-normal text-base font-poppins text-error">{{ slotProps.message.detail }}</div>
                      </div>
                      
                  </div>
              </template>
          </Toast>
          </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import TemplateGridView from "~/components/template/TemplateGridView.vue";
import TemplateDataView from "~/components/template/TemplateDataView.vue";
import { templateData } from '~/services/templates.js';
import FormEditorPreview from "~/components/createTemplate/formEditor/FormEditorPreview.vue";
import TemplatePreview from "~/components/template/TemplatePreview.vue";
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';


const toast = useToast();
const favoritedTemplates = templateData.filter(template => template.isFavorite === true);
const searchQuery = ref("");
const favoriteStates = reactive({});
const currentTemplate = ref();
const visible = ref(false);
const previewFormVisible = ref(false);
const filterOption = ref('');
const fileTypeCheck = ref(false);

const filteredTemplates = computed(() => {
    return favoritedTemplates.filter(template => template.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const handleTemplatePreview = (template) =>{
    visible.value = true;
    currentTemplate.value = template;
};

const op = ref();

const toggle = (event) => {
    op.value.toggle(event);
}

// default favorite state
templateData.forEach((template, index) => {
    favoriteStates[index] = template.isFavorite;
});

const isDragging = ref(new Array(templateData.length).fill(false));

const showError = () => {
    toast.add({ severity: 'error', summary: 'Invalid file format', detail: 'Please upload a .csv, .xls or .xlsx file', life: 3000 });
};

const handleOutsideClick = () => {
    visible.value = false;
};

const handleFillForm = () => {
    previewFormVisible.value = true;
};

const handleDragOver = (item, index) => {
  isDragging.value.splice(index, 1, true); // Update drag state for the specific card
};

const handleDragEnter = (item, index) => {
  isDragging.value.splice(index, 1, true);
};

const handleDragLeave = (item, index) => {
  event.preventDefault(); // Might be used to change some visual feedback
  isDragging.value.splice(index, 1, false);
};

const handleFileDrop = (template, event) => {
    const files = event.dataTransfer.files;
   
    if (!files[0]){
        isDragging.value.fill(false);
        showError();
    }
    else{

        const fileName = files[0].name;
        const fileType = fileName.split('.').pop();
        
        if (fileType === 'xlsx' || fileType === 'xls' || fileType === 'csv') {
            fileTypeCheck.value = true;
            handleFileUpload(files); 
        } else {
            fileTypeCheck.value = false;
            showError();
        }
        isDragging.value.fill(false);
    }
};

const handleFileUpload = (files) => {
    // file upload logic here
    console.log('Uploading files', files);
};

const uploadFile = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
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