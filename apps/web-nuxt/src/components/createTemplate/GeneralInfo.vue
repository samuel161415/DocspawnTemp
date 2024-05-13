<template>
  
  <div class="w-full items-center mx-8">
    <p class="font-semibold text-surface-600 text-2xl flex text-center justify-center">General information</p>
    <div class="flex ml-8">
      <Stepper orientation="vertical">
          <StepperPanel header="">
              <template #content="{ nextCallback }">
                <div class="w-11/12">
                  <div class="flex">
                    <div class="flex flex-col gap-4">
                        <div
                         @mouseenter="setIsHovered('Data to doc', true)" @mouseleave="setIsHovered('', false)" 
                         class="p-5 rounded-lg shadow-sm w-80 border  font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:scale-105"
                         :class="currentData === 'Data to doc' ? 'border-primaryBlue bg-primary-50':'border-surface-100 bg-surface-50'"
                         >
                          <p class="font-poppins text-surface-600 text-lg">Data to doc</p>
                        </div>
                        <div 
                          @mouseenter="setIsHovered('Form to doc', true)" 
                          @mouseleave="setIsHovered('', false)" 
                          :class="currentData === 'Form to doc' ? 'border-primaryBlue bg-primary-50':'border-surface-100 bg-surface-50'"
                          class="p-5 rounded-lg shadow-sm w-80 border font-poppins text-surface-500 cursor-pointer transition-transform duration-300 hover:scale-105">
                          <p class="font-poppins text-surface-600 text-lg">Form to doc</p>
                        </div>
                        <div 
                          @mouseenter="setIsHovered('Table to doc', true)" 
                          @mouseleave="setIsHovered('', false)" 
                          :class="currentData === 'Table to doc' ? 'border-primaryBlue bg-primary-50':'border-surface-100 bg-surface-50'"
                          class="p-5 rounded-lg shadow-sm w-80 border  cursor-pointer transition-transform duration-300 hover:scale-105">
                          <p class="font-poppins text-surface-600 text-lg">Table to doc</p>
                        </div>
                    </div>
                    <div class="border surface-border rounded-lg flex-auto flex px-6 py-4 mx-8 font-medium">
                      <p class="font-poppins text-surface-600 text-lg">
                        {{ currentData }}
                      </p>
                    </div>
                  
                  </div>
                  <div class="flex py-4 justify-end mr-8">
                      <Button label="Next" @click="nextCallback" class="px-5" icon="pi pi-arrow-right" iconPos="right" />
                  </div>
                </div>
              </template>
          </StepperPanel>
          <StepperPanel header="">
              <template #content="{ prevCallback, nextCallback }">
                <div class="w-4/5">
                  <div class="flex ">
                    <div class="rounded-lg flex-auto flex px-6 py-4 mx-8 font-medium justify-center items-center">
               
                      <div class="w-[700px] space-y-4">
                        <p class="font-poppins text-surface-600">Enter template name</p>

                        <InputText type="text" v-model="value" class="w-[500px]"/>
                      </div>
                    
                    </div>
                  </div>
                  <div class="flex py-4 mx-8 justify-between">
                      <Button label="Back" outlined icon="pi pi-arrow-left" class="bg-primaryBlue px-5 ml-6" @click="prevCallback" />
                      <Button label="Next" @click="()=> {nextCallback(); NextStep();}" icon="pi pi-arrow-right" iconPos="right" class="bg-primaryBlue px-5"/>
                  </div>
                </div>
              </template>
          </StepperPanel>
          <StepperPanel header="">
              <template #content="{ prevCallback }">
                <div class="w-4/5">
                  <div class="flex">
                    <div class="rounded-lg flex-auto flex px-6 font-medium justify-center items-center">
                        <div class="w-[700px] space-y-4 ml-8">
                          <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
                              <template #empty>
                                  <p class="flex justify-center text-center">Drag and drop files to here to upload.</p>
                              </template>
                          </FileUpload>
                        </div>

                    </div>
                  </div>
                  <div class="flex py-4 ml-8">
                      <Button label="Back" outlined icon="pi pi-arrow-left" class="bg-primaryBlue px-5 ml-8" @click="prevCallback" />
                     
                    </div>
                </div>
              </template>
          </StepperPanel>
      </Stepper>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isHovered = ref(false);
const currentData = ref("Content I");
const selectedTemplate = ref(false);

const emit = defineEmits();
const prevData = ref("");
const setIsHovered = (data, show) => {
  isHovered.value = show;
  const prevData = currentData;
  if (show) {
    prevData.value = currentData.value; 
    currentData.value = data;
  } else {
    currentData.value = prevData.value; 
  }
  
}; 

const NextStep = () => {
  emit('update:enableNext', true);
};

</script>
