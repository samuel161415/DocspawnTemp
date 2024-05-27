<template>
  <div class=" w-full bg-secondary overflow-y-scroll no-scrollbar">
      <div class="px-8 py-7 flex flex-col gap-2 bg-white ">
          <FirstStep v-if="!createNewTemplate" @updateCreateNewTemplate="createNewTemplate = $event"/>
          <div v-if="createNewTemplate" class="">

            <h2 class="font-semibold text-surface-600 text-2xl mt-2 px-5">Template creation</h2>
            <div class="flex items-center justify-center -mt-2 rounded-lg border-none">
                <Stepper v-model:activeStep="active" >
                    <StepperPanel>
                      <template #header="{ index, clickCallback }">
                        <button class="bg-transparent border-none inline-flex flex-column gap-2 " v-tooltip.top="'General information'" @click="clickCallback">
                          <font-awesome-icon v-if="active >= index" :icon="['fad', 'square-info']" class="w-12 h-12" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2;" />
                          <font-awesome-icon v-else-if="index > active"  :icon="['fad', 'square-info']"  class="w-12 h-12" style="--fa-primary-color: #949494; --fa-secondary-color: #ababab;"   />
                        </button>
                      </template>
                      <template #content="{ nextCallback }">
                        <div class="mb-32">
                          <div class="flex justify-center mx-24">
                            <GeneralInfo  @updateData="handleUpdateData"/>
                          </div>
                          <div class="flex justify-center mb-6 space-x-8 mt-4">
                            <Button label="Cancel" outlined icon="pi pi-times" severity="error" class="bg-error hover:bg-red-100 border-error hover:border-error text-error" @click="requireConfirmation($event)"/>
                            <Button label="Next" icon="pi pi-arrow-right" :disabled="!isStep1Valid" iconPos="right" @click="nextCallback" class="bg-primaryBlue border-primaryBlue px-5"/>
                          </div>
                        </div>
                      </template>
                    </StepperPanel>
  
                    <StepperPanel header="Template editor">
                      <template #header="{ index, clickCallback }">
                        <button :disabled="!isStep1Valid" class="bg-transparent border-none inline-flex flex-column gap-2" v-tooltip.top="'Template editor'" @click="clickCallback">
                          <font-awesome-icon  v-if="active >= index"  :icon="['fad', 'file-invoice']" class="w-12 h-12" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2;" />
                          <font-awesome-icon v-else-if="index > active" :icon="['fad', 'file-invoice']" class="w-12 h-12" style="--fa-primary-color: #949494; --fa-secondary-color: #ababab;" />
                        </button>
                      </template>
                      <template #content="{ prevCallback, nextCallback }">
                          <div class=" mx-6">
                            <TemplateEditor />
                          </div>
                          <div class="flex pt-4 justify-center mt-24 mx-52 space-x-8">
                            <Button label="Back" outlined icon="pi pi-arrow-left" class="bg-primaryBlue px-5" @click="prevCallback" />
                            <Button label="Next" icon="pi pi-arrow-right" :disabled="!isStep2Valid" iconPos="right" @click="nextCallback" class="bg-primaryBlue border-primaryBlue px-5"/>
                          </div>
                      </template>
                    </StepperPanel>
  
                    <StepperPanel header="Form editor">
                      <template #header="{ index, clickCallback }">
                        <button :disabled="!isStep2Valid"  class="bg-transparent border-none inline-flex flex-column gap-2" v-tooltip.top="'Form editor'" @click="clickCallback">
                          <font-awesome-icon v-if="active >= index"  :icon="['fad', 'file-signature']" class="w-12 h-12" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2;" />
                          <font-awesome-icon v-else-if="index > active" :icon="['fad', 'file-signature']" class="w-12 h-12" style="--fa-primary-color: #949494; --fa-secondary-color: #ababab;" />
                        </button>
                      </template>
                      <template #content="{ prevCallback, nextCallback }">
                          <div class="mx-10">
                              <FormEditor  @updateData="handleUpdateData"/>
                          </div>
                          <div class="flex pt-4 justify-center mb-14 mx-52">
                              <Button label="Back" outlined icon="pi pi-arrow-left" class="bg-primaryBlue mr-4 px-5"
                                  @click="prevCallback" />
                              <Button label="Next" icon="pi pi-arrow-right" :disabled="!isStep3Valid" iconPos="right" @click="nextCallback" class="bg-primaryBlue border-primaryBlue px-5"/>
                          </div>
                      </template>
                    </StepperPanel>
  
                    <StepperPanel header="Delivery options">
                      <template #header="{ index, clickCallback }">
                        <button :disabled="!isStep3Valid" class="bg-transparent border-none inline-flex flex-column gap-2" v-tooltip.top="'Delivery options'" @click="clickCallback">
                          <font-awesome-icon v-if="active >= index" :icon="['fad', 'sliders']" class=" w-10 h-11" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2;" />
                          <font-awesome-icon v-else-if="index > active" :icon="['fad', 'sliders']" class=" w-10 h-11" style="--fa-primary-color: #949494; --fa-secondary-color: #ababab;" />
                        </button>
                      </template>
                      <template #content="{ prevCallback }">
                        <div class="flex mx-7">
                          <DeliveryOptions />
                        </div>
                        <div class="flex pt-4 justify-center mb-5 mx-52">
                          <Button label="Back" outlined icon="pi pi-arrow-left" class="bg-primaryBlue px-5"  @click="prevCallback" />
                        </div>
                      </template>
                    </StepperPanel>
                </Stepper>
            </div>
          </div>
      </div>
      
      <!-- buttons -->
      <!-- <ConfirmPopup group="headless">
        <template #container="{ message, acceptCallback, rejectCallback }">
          <div class="rounded-full p-3">
            <i class="pi pi-exclamation-triangle text-error mr-2"></i>
            <span class="mt-2 font-poppins text-base text-surface-500">{{ message.message }}</span>
            <div class="flex justify-end gap-2 mt-3">
              <Button label="Yes" @click="acceptCallback" text severity="error"size="small" class="text-error"></Button>
              <Button label="No" outlined @click="rejectCallback" severity="secondary" size="small" text></Button>
            </div>
          </div>
        </template>
      </ConfirmPopup> -->
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import GeneralInfo from "../../components/createTemplate/generalInfo/GeneralInfo.vue";
import DeliveryOptions from "~/components/createTemplate/DeliveryOptions.vue";
import FormEditor from "~/components/createTemplate/formEditor/FormEditor.vue";
import TemplateEditor from "~/components/createTemplate/TemplateEditor.vue";
import FirstStep from "~/components/createTemplate/FirstStep.vue";

const confirm = useConfirm();
const toast = useToast();
const createNewTemplate = ref(false);

const active = ref(0);

// step 1 - general info
const templateName = ref('');
const useCase = ref('');
const templateFileUploaded = ref(false);
const dataSourceFileUploaded = ref(false);

// step 2 - form editor
const formEditor = ref(true);

// step 3 - template editor
const templateTitle = ref('');
const templateDescription = ref('');

const items = ref([
{ label: "Templates", route: "/templates" },
{ label: "Create new template", route: "/templates/create" },
]);

const isStep1Valid = ref(false);
const isStep2Valid = ref(true);
const isStep3Valid = ref(false);

const requireConfirmation = (event) => {
    confirm.require({
        target: event.currentTarget,
        group: 'headless',
        message: 'Your modifications will be lost. Are you sure?',
    });
};

const handleUpdateData = ({isValid, step}) => {
  if(step === 1) {
    isStep1Valid.value = isValid;
  } else if(step === 2) {
    isStep2Valid.value = isValid;
  } else if(step === 3) {
    isStep3Valid.value = isValid;
  }
};

</script>

<style scoped>
.p-stepper {
  flex-basis: 50rem;
}
</style>
