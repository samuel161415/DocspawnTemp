<template>
    <div class="mt-14">
        <div class="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  2xl:gap-x-4">
            <!-- card  -->
            <div v-for="(template, index) in props.templates" :key="template.id" class="group relative"
                @dragover.prevent="template.templateType !== 'form to doc' && handleDragOver"
                @dragenter.prevent="template.templateType !== 'form to doc' && handleDragEnter"
                @dragleave.prevent="template.templateType !== 'form to doc' && handleDragLeave"
                @drop.prevent="template.templateType !== 'form to doc' && handleFileDrop(template, $event)">
                <div class="w-60 h-72 bg-surface-50 rounded-lg cursor-pointer" >
                   
                    <!-- top section -->
                    <div class="p-4">
                        <div class="flex" :class="favoriteStates[index]? 'justify-between': 'justify-end'">
                            <i v-if="favoriteStates[index]" :class="[ favoriteStates[index] ? 'pi pi-star-fill text-warning' : 'pi pi-star hover:text-warning', 'cursor-pointer']"></i>
                            <i class="pi pi-ellipsis-v text-surface-500 cursor-pointer" @click="toggle"></i>
                        </div>
                        <!-- image -->
                        <div class="flex justify-center relative hover:opacity-60" @mouseenter="hoverStates[index] = true"
                            @mouseleave="hoverStates[index] = false">
                            <img class="w-1/2 h-28 mt-4" :src="template.image"/>
                            <div v-if="hoverStates[index]" class="mt-4" @click="handleTemplatePreview(template)">
                                <font-awesome-icon :icon="['fas', 'eye']" size="xl" class="absolute inset-0 m-auto"  style="color: #141414;" />
                            </div>
                        </div>
                        <!-- title -->
                        <div class="flex justify-center h-6 mt-1">
                            <p class="flex text-center justify-center text-lg text-surface-500 font-poppins font-normal">
                                {{ template.name }}
                            </p>
                        </div>
                    </div>
                 
                    <!-- footer -->
                    <hr class="mt-5 bg-surface-700" />
                    <div class="flex space-x-2 px-1 justify-center items-center align-center mt-3">
                        <p v-if="template.templateType === 'form to doc'" class="font-poppins text-surface-600 text-lg font-normal" @click="handleFillForm">Fill up a form</p>
                        <p v-else class="text-lg text-surface-600 font-poppins font-normal" @click="handleFileUpload">Drag or upload file</p>
                    </div>
                </div>
            </div>

            <OverlayPanel ref="op">
                <div class="flex flex-col justify-start w-48 h-44">
                    <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">Edit template</p>
                    <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">Access data</p>
                    <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">Access document</p>
                    <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">Set as favorites</p>
                </div>
            </OverlayPanel>

            <TemplatePreview v-if="visible" v-model:visible="visible" @cancel="visible = false" :template="currentTemplate"/>
        </div>

      <FormEditorPreview 
        v-model:visible="previewFormVisible"
        :mobile="mobile"
        :formTitle="formTitle"
        :formDescription="formDescription"
        :isCollapsed="isCollapsed"
        @cancel="previewFormVisible = false"
      />
    </div>
</template>

<script setup>
import { ref } from "vue";
import TemplatePreview from './TemplatePreview.vue';
import FormEditorPreview from "~/components/createTemplate/formEditor/FormEditorPreview.vue";
import { thumbnails } from '../../services/templates';

const visible = ref(false);
const previewFormVisible = ref(false);
const currentTemplate = ref();

const props = defineProps({
  templates: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// const showEyeIcon = ref(false);
const hoverStates = reactive({});
const favoriteStates = reactive({});

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
}

const handleclickFavorite = (template, index) => {
    favoriteStates[index] = !favoriteStates[index];
    template.isFavorite = !template.isFavorite;
};

const op = ref();

const toggle = (event) => {
    op.value.toggle(event);
}

const handleFillForm = () => {
    previewFormVisible.value = true;
};

const handleDragOver = (event) => {
    event.preventDefault(); //  to allow drop
};

const handleDragEnter = (event) => {
    event.preventDefault(); //  to allow drop
};

const handleDragLeave = (event) => {
    event.preventDefault(); // Might be used to change some visual feedback
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

        handleFileUpload(files); // a method to handle file upload
    }
};

const handleFileUpload = (files) => {
    // Implement file upload logic here
    console.log('Uploading files', files);
};


</script>
