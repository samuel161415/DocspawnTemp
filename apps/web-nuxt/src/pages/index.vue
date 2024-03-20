<template>
  <div class="h-full w-full bg-stone-100">
    <div class="m-5 flex gap-3">
      <NuxtLink
        to="/datatable"
        class="py-3 px-5 shadow-md rounded-lg w-56 bg-white"
      >
        Data Table
      </NuxtLink>
      <div
        class="py-3 px-5 cursor-pointer shadow-md rounded-lg w-56 bg-white"
        @click="visible = true"
      >
        Tour
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '50rem', height: '30rem' }"
    :pt="{
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
  >
    <template #container="{ closeCallback }">
      <div
        class="bg-white h-full justify-between flex flex-col p-5 rounded-xl items-center"
      >
        <div class="flex justify-between w-full">
          <img src="../assets/Logo.png" class="w-40 h-auto" />

          <Button
            icon="pi pi-times"
            @click="closeCallback"
            severity="secondary"
            text
            rounded
            aria-label="Cancel"
          />
        </div>
        <div v-if="step === 1" class="flex h-full mt-10 flex-col items-center">
          <h1 class="text-4xl text-center mb-10 font-bold">
            How big is your company?
          </h1>

          <div class="flex flex-wrap max-w-[500px] gap-2 justify-center">
            <div v-for="item in step1Items" :key="item" class="mr-2">
              <Chip
                :label="item"
                class="rounded-lg bg-white border-[1px] py-1 cursor-pointer px-4"
              />
            </div>
          </div>
        </div>
        <div v-if="step === 2" class="flex h-full mt-10 flex-col items-center">
          <h1 class="text-4xl text-center mb-10 font-bold">
            How did you hear about us?
          </h1>

          <div class="flex flex-wrap max-w-[500px] gap-2 justify-center">
            <div v-for="item in step2Items" :key="item" class="mr-2">
              <Chip
                :label="item"
                class="rounded-lg bg-white border-[1px] py-1 cursor-pointer px-4"
              />
            </div>
          </div>
        </div>
        <div v-if="step === 3" class="flex h-full mt-10 flex-col items-center">
          <h1 class="text-4xl text-center mb-10 font-bold">
            How many people are you going to work with?
          </h1>

          <div class="flex flex-wrap max-w-[500px] gap-2 justify-center">
            <div v-for="item in step3Items" :key="item" class="mr-2">
              <Chip
                :label="item"
                class="rounded-lg bg-white border-[1px] py-1 cursor-pointer px-4"
              />
            </div>
          </div>
        </div>
        <div v-if="step === 4" class="flex h-full mt-10 flex-col items-center">
          <h1 class="text-4xl text-center mb-10 font-bold">
            One last thing, what name do you want to give to your work
            environment?
          </h1>
          <InputText type="text" placeholder="example" v-model="value" />
        </div>
        <ProgressBar :value="progress" class="w-full mb-4" />
        <div class="flex justify-between w-full">
          <Button
            outlined
            label="Back"
            @click="back"
            icon="pi pi-chevron-left"
          />
          <Button
            v-if="step === 4"
            label="Finish"
            @click="finish"
            severity="primary"
            class="bg-primaryBlue text-white"
            icon="pi pi-chevron-right"
            iconPos="right"
          />
          <Button
            v-else
            @click="next"
            label="Next"
            outlined
            icon="pi pi-chevron-right"
            iconPos="right"
          />
        </div>
      </div>
    </template>
  </Dialog>
  <Toast position="bottom-right" />
</template>
<script setup>
import { ref, watch } from "vue";
import ProgressBar from "primevue/progressbar";
import { useToast } from "primevue/usetoast";
import { step1Items, step2Items, step3Items } from "~/services/sampleData";

const visible = ref(false);
const toast = useToast();
const step = ref(1);
const value = ref(null);

watch(visible, (newValue) => {
  if (newValue) {
    step.value = 1;
    progress.value = calculateProgress(step.value);
  }
});

const finish = () => {
  toast.add({
    severity: "success",
    summary: "Done",
    detail: "Information saved Successfully",
    life: 3000,
  });
  visible.value = false;
};

const calculateProgress = (currentStep) => {
  return (currentStep / 4) * 100;
};
const progress = ref(calculateProgress(step.value));

const back = () => {
  if (step.value > 1) {
    step.value -= 1;
    progress.value = calculateProgress(step.value);
  }
};

const next = () => {
  if (step.value < 4) {
    step.value += 1;
    progress.value = calculateProgress(step.value);
  }
};
</script>

<style scoped>
.p-progressbar-label {
  display: none;
}
</style>
