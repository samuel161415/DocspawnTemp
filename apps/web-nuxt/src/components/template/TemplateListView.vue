<template>
    <div class="mt-14">
        <!-- list view -->
        
        <div v-for="(template, index) in props.templates" :key="template.id" class="h-[62px] rounded-lg shadow-sm w-full my-4 border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:scale-40 ">
           <div class="flex space-x-2 justify-between">
                <div class="flex items-center w-[450px]">
                    <img class="w-12 h-14 rounded-lg ml-8" :src="template.image" alt="template image" />
                    <p class="flex justify-center items-center text-lg text-surface-500 font-poppins font-normal ml-8">{{ template.name }}</p>
                </div>
                <div class="flex justify-center items-center text-center ml-6 space-x-6">
                    <i class="pi pi-cog text-surface-500 cursor-pointer"></i>
                    <i :class="[ favoriteStates[index] ? 'pi pi-star-fill text-warning' : 'pi pi-star hover:text-warning', 'cursor-pointer']" @click="handleclickFavorite(template, index)"></i>
                    <i class="pi pi-file-edit text-surface-500 cursor-pointer"></i>
                </div>
                <div v-if="template.templateType === 'form to doc'" class="flex justify-center items-center text-center bg-primary-50 align-center rounded-r-lg h-[60px] w-80" @click="handleFillForm">
                    <p class="font-poppins text-surface-600 text-lg font-normal p-2">Fill up a form</p>  
                </div>
                <div v-else class="flex justify-center items-center cursor-move bg-green-50 px-5 h-[60px] w-80 rounded-r-lg text-center">
                    <p class="text-lg text-surface-600 font-poppins font-normal">Drag or upload file</p>  
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
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import FormEditorPreview from "~/components/createTemplate/formEditor/FormEditorPreview.vue";

const props = defineProps({
  templates: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const previewFormVisible = ref(false);
const favoriteStates = reactive({});

// default favorite state
props.templates.forEach((template, index) => {
    favoriteStates[index] = template.isFavorite;
});

const handleclickFavorite = (template, index) => {
    favoriteStates[index] = !favoriteStates[index];
    template.isFavorite = !template.isFavorite;
};

const handleFillForm = () => {
    previewFormVisible.value = true;
};

</script>
