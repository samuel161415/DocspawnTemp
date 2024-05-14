<template>
  <div class=" w-full bg-secondary overflow-y-scroll no-scrollbar">
      <div class="px-8 py-7 flex flex-col gap-2 bg-white ">
          <BreadcrumbComponent :home="home" :items="items" />

          <div class=" mt-5 flex items-center justify-center rounded-lg border-none ml-2 ">

              <Stepper v-model:activeStep="active">
                  <StepperPanel>
                    <template #header="{ index, clickCallback }">
                      <button class="bg-transparent border-none inline-flex flex-column gap-2 " v-tooltip.top="'General information'" @click="clickCallback">
                        <font-awesome-icon :icon="['fad', 'square-info']" class="w-12 h-12" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2;" />
                      </button>
                    </template>
                      <template #content="{ nextCallback }">
                        <div class="mb-32">

                          <div class="flex justify-center mt-6">
                              <GeneralInfo />
                          </div>
                          <div class="flex justify-end mb-6 mx-52 -mt-11">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" class="bg-primaryBlue px-5"/>
                          </div>
                        </div>
                      </template>
                  </StepperPanel>
                  <StepperPanel header="Template editor">
                    <template #header="{ index, clickCallback }">
                      <button class="bg-transparent border-none inline-flex flex-column gap-2" v-tooltip.top="'Template editor'" @click="clickCallback">
                        <font-awesome-icon  :icon="['fad', 'file-invoice']" class="w-12 h-12" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2;" />
                      </button>
                    </template>
                      <template #content="{ prevCallback, nextCallback }">
                          <div class=" mx-6 mt-5">
                              <TemplateEditor />
                          </div>
                          <div class="flex pt-4 justify-between mt-24 mx-52">
                              <Button label="Back" outlined icon="pi pi-arrow-left" class="bg-primaryBlue px-5"
                                  @click="prevCallback" />
                              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" class="bg-primaryBlue px-5"/>
                          </div>
                      </template>
                  </StepperPanel>
                  <StepperPanel header="Form editor">
                    <template #header="{ index, clickCallback }">
                      <button class="bg-transparent border-none inline-flex flex-column gap-2" v-tooltip.top="'Form editor'" @click="clickCallback">
                          <font-awesome-icon :icon="['fad', 'file-signature']" class="w-12 h-12" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2;" />
                      </button>
                    </template>
                      <template #content="{ prevCallback, nextCallback }">
                          <div class="mx-10 mt-5">
                              <FormEditor />
                          </div>
                          <div class="flex pt-4 justify-between mb-14 mx-52">
                              <Button label="Back" outlined icon="pi pi-arrow-left" class="bg-primaryBlue mr-4 px-5"
                                  @click="prevCallback" />
                              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" class="bg-primaryBlue px-5"/>
                          </div>
                      </template>
                  </StepperPanel>
                  <StepperPanel header="Delivery options">
                    <template #header="{ index, clickCallback }">
                      <button class="bg-transparent border-none inline-flex flex-column gap-2" v-tooltip.top="'Delivery options'" @click="clickCallback">
                       <font-awesome-icon :icon="['fad', 'sliders']" class=" w-12 h-12" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2;" />
                     
                      </button>
                    </template>
                    <template #content="{ prevCallback }">
                        <div class="flex mx-7 mt-7">
                            <DeliveryOptions />
                        </div>
                        <div class="flex pt-4 justify-content-start mb-5 mx-52">
                            <Button label="Back" outlined icon="pi pi-arrow-left" class="bg-primaryBlue px-5"
                                @click="prevCallback" />
                        </div>
                    </template>
                  </StepperPanel>
              </Stepper>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import GeneralInfo from "../../components/createTemplate/generalInfo/GeneralInfo.vue";
import DeliveryOptions from "~/components/createTemplate/DeliveryOptions.vue";
import FormEditor from "~/components/createTemplate/formEditor/FormEditor.vue";
import TemplateEditor from "~/components/createTemplate/TemplateEditor.vue";
import BreadcrumbComponent from "~/components/shared/BreadcrumbComponent.vue";
import { home } from '~/composables/useBreadcrumb.js';

const active = ref(0);

const items = ref([
{ label: "Templates", route: "/templates" },
{ label: "Create new template", route: "/templates/create" },
]);

const isFirstNextEnabled = ref(false);
</script>

<style scoped>
.p-stepper {
  flex-basis: 50rem;
}

</style>
