<template>
  <div class=" w-full bg-secondary overflow-y-scroll no-scrollbar">
      <div class="px-8 py-7 flex flex-col gap-2 bg-white ">
          <BreadcrumbComponent :home="home" :items="items" />

          <div class="w-full mt-5 flex items-center justify-between  rounded-lg border-none ml-2 ">

              <Stepper>
                  <StepperPanel header="General information">
                      <template #content="{ nextCallback }">
                          <div class="flex justify-center mt-6">
                              <GeneralInfo />
                          </div>
                          <div class="flex pt-4 justify-end mt-24">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" class="bg-primaryBlue px-5"/>
                          </div>
                      </template>
                  </StepperPanel>
                  <StepperPanel header="Template editor">
                      <template #content="{ prevCallback, nextCallback }">
                          <div class="flex mx-6 mt-5">
                              <TemplateEditor />
                          </div>
                          <div class="flex pt-4 justify-between mt-24 mx-6">
                              <Button label="Back" outlined icon="pi pi-arrow-left" class="bg-primaryBlue mr-4 px-5"
                                  @click="prevCallback" />
                              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" class="bg-primaryBlue px-5"/>
                          </div>
                      </template>
                  </StepperPanel>
                  <StepperPanel header="Form editor">
                      <template #content="{ prevCallback, nextCallback }">
                          <div class="mx-10 mt-5">
                              <FormEditor />
                          </div>
                          <div class="flex pt-4 justify-between mb-14 mx-10">
                              <Button label="Back" outlined icon="pi pi-arrow-left" class="bg-primaryBlue mr-4 px-5"
                                  @click="prevCallback" />
                              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" class="bg-primaryBlue px-5"/>
                          </div>
                      </template>
                  </StepperPanel>
                  <StepperPanel header="Delivery options">
                      <template #content="{ prevCallback }">
                          <div class="flex mx-10 mt-7">
                              <DeliveryOptions />
                          </div>
                          <div class="flex pt-4 justify-content-start mb-5 mx-10">
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
import GeneralInfo from "../../components/createTemplate/GeneralInfo.vue";
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
</script>

<style scoped>
.p-stepper {
  flex-basis: 50rem;
}
</style>
