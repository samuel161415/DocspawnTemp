<template>

  <div class="w-full h-full items-center mx-8">
    <p class="font-semibold text-surface-600 text-2xl flex text-center justify-center">General information</p>
    <!--  -->
    <div class="flex ml-8 mt-8">
      <div class="rounded-lg flex-auto flex py-4 ">

        <div class="w-full space-y-4">
          <p class="font-poppins text-surface-600">Template name <span class="text-error">*</span></p>
          <InputText type="text" class="w-80" placeholder="Template name"/>
        </div>

      </div>
    </div>
    <p class="font-poppins text-surface-600 ml-8 mt-8 text-base">Select your use case</p>
    <div class="flex ml-8 mt-3">

      <div class="flex flex-col gap-4">
        <TemplateOption
          v-for="option in options"
          :key="option.label"
          :label="option.label"
          :is-current="currentData === option.label"
          :is-selected="selectedTemplate === option.label"
          @select="handleSelectTemplate"
          @hover="setIsHovered"
        />
      </div>
      <div class="border surface-border rounded-lg flex-auto flex px-6 py-4 ml-8 font-medium">
        <p class="font-poppins text-surface-600 text-lg">
          {{ currentData !== ''? currentData: selectedTemplate }}
        </p>
      </div>
    </div>

    <!-- uploads -->
    <div class="rounded-lg flex ml-8 mt-8 space-x-6">
      <div class="w-full space-y-4">
        <p class="font-poppins text-surface-600">Upload your template </p>

        <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept=".pdf,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :maxFileSize="1000000">
          <template #empty>
            <p class="flex justify-center text-center font-poppins  text-surface-500">Drag and drop files to here to upload.</p>
          </template>
        </FileUpload>
      </div>

      <div v-if="selectedTemplate === 'Table to doc'" class="w-full space-y-4">
        <p class="font-poppins text-surface-600">Upload your data source </p>

        <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept=".pdf,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :maxFileSize="1000000">
          <template #empty>
            <p class="flex justify-center text-center font-poppins text-surface-500">Drag and drop files to here to upload.</p>
          </template>
        </FileUpload>
      </div>
    </div>

    <!-- buttons -->
    <ConfirmPopup group="headless">
        <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="rounded-full p-3">
                <i class="pi pi-exclamation-triangle text-error mr-2"></i>
                <span class="mt-2 font-poppins text-base text-surface-500">{{ message.message }}</span>
                <div class="flex justify-end gap-2 mt-3">
                    <Button label="Yes" @click="acceptCallback" text size="small" class="text-error"></Button>
                    <Button label="No" outlined @click="rejectCallback" severity="secondary" size="small" text></Button>
                </div>
            </div>
        </template>
    </ConfirmPopup>
    <Button label="Cancel" outlined class="bg-primaryBlue px-5 mt-6 mx-52" @click="requireConfirmation($event)"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import TemplateOption from './Options.vue';

const confirm = useConfirm();
const toast = useToast();

const isHovered = ref(false);
const currentData = ref("Content I");
const selectedTemplate = ref('');

const emit = defineEmits();

const options = ref([
  { label: 'Data to doc' },
  { label: 'Form to doc' },
  { label: 'Table to doc' }
]);

const setIsHovered = (label, hovered) => {
  currentData.value = hovered ? label : '';
};

const handleSelectTemplate = (label) => {
  selectedTemplate.value = label;
};

const requireConfirmation = (event) => {
    confirm.require({
        target: event.currentTarget,
        group: 'headless',
        message: 'Your modifications will be lost. Are you sure?',
        accept: () => {
            toast.add({severity:'info', summary:'Confirmed', detail:'You have accepted', life: 3000});
        },
        reject: () => {
            toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
        }
    });
}
</script>
