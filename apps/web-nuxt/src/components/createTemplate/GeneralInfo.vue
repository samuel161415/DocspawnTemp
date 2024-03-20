<template>
  <div class="h-full">
    <Toast />
    <div >
      <Steps
        v-model:activeStep="active"
        :unstyled="false"
        :model="genInfoSteps"
      />
    </div>
    <div class="grid place-items-center w-full h-full">
      <div class="flex gap-5 items-center mt-5" v-if="active === 0">
        <div
          @click="selectOption('Form to Doc')"
          class="w-[250px] cursor-pointer hover:shadow-2xl h-[180px] p-5 grid place-items-center border-2 border-primaryBlue rounded-lg"
        >
          <div class="flex flex-col items-center justify-center gap-3">
            <p class="text-primaryBlue text-2xl font-bold">Form to Doc</p>
            <p class="text-primaryBlue text-center text-lg">
              Generate documents through form filling in DocSpawn
            </p>
          </div>
        </div>
        <div
          @click="selectOption('Table to doc')"
          class="w-[250px] cursor-pointer hover:shadow-2xl h-[180px] p-5 grid place-items-center border-2 border-primaryBlue rounded-lg"
        >
          <div class="flex flex-col items-center justify-center gap-3">
            <p class="text-primaryBlue text-2xl font-bold">Table to doc</p>
            <p class="text-primaryBlue text-center text-lg">
              Generate documents from external data sources in csv or xlsx
              format
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 gap-5 flex flex-col" v-if="active === 1">
        <InputText
          type="text"
          v-model="value"
          class="w-56"
          placeholder="e.g. invoice form"
        />
        <div class="flex gap-3 items-center">
          <Button
            :disabled="!value"
            label="CONTINUE"
            @click="active = 2"
            severity="primary"
            class="bg-primaryBlue w-32 text-white"
          />
          <Button
            label="Back"
            text
            outlined
            @click="active = 0"
            severity="secondary"
            class="w-32 text-primaryBlue"
          />
        </div>
      </div>
      <div class="mt-5 gap-5 flex flex-col" v-if="active === 2">
        <div
          class="bg-transparent max-w-[280px] text-primaryBlue] gap-3 flex-col rounded-lg border-2 border-dashed border-primaryBlue flex items-center justify-center"
        >
          <FileUpload
            name="demo[]"
            url="/api/upload"
            chooseLabel="Browse File"
            :showUploadButton="false"
            :showCancelButton="false"
            cancelLabel=""
            @upload="onAdvancedUpload"
            :multiple="true"
            accept="image/*, .csv, .xlsx"
            :maxFileSize="1000000"
          >
            <template #empty>
              <p>Drag and drop a PDF file here.</p>
            </template>
          </FileUpload>
        </div>
        <div class="flex gap-3 items-center">
          <Button
            :disabled="!value"
            label="CONTINUE"
            @click="active = selectedOption === 'Table to doc' ? 3 : 1"
            severity="primary"
            class="bg-primaryBlue w-32 text-white"
          />
          <Button
            label="Back"
            text
            outlined
            @click="active = 1"
            severity="secondary"
            class="w-32 text-primaryBlue"
          />
        </div>
      </div>
      <div class="flex gap-3 flex-col items-center" v-if="active === 3">
        <div
          class="bg-transparent max-w-[280px] text-primaryBlue] gap-3 flex-col rounded-lg border-2 border-dashed border-primaryBlue flex items-center justify-center"
        >
          <FileUpload
            name="demo[]"
            url="/api/upload"
            chooseLabel="Browse File"
            :showUploadButton="false"
            :showCancelButton="false"
            cancelLabel=""
            @upload="onAdvancedUpload"
            :multiple="true"
            accept="image/*, .csv, .xlsx"
            :maxFileSize="1000000"
          >
            <template #empty>
              <p>Drag and drop a CSV or XLSX file here.</p>
            </template>
          </FileUpload>
        </div>
        <div class="flex gap-3 items-center">
          <Button
            :disabled="!value"
            label="Save and Continue"
            @click="finishProcess"
            severity="primary"
            class="bg-primaryBlue w-48 text-white"
          />
          <Button
            label="Exit"
            text
            outlined
            @click="exitProcess"
            severity="secondary"
            class="w-32 text-primaryBlue"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const active = ref(0);
const selectedOption = ref(null);
const value = ref("");

const genInfoSteps = ref([
  { label: "Select use case:" },
  { label: "Enter template name:" },
  { label: "Upload Template background" },
]);

const stepInfo = ref({
  useCase: null,
  templateName: "",
  templateBackground: null,
  datasetFile: null,
});

watch(selectedOption, (newVal) => {
  if (newVal === "Table to doc") {
    genInfoSteps.value.push({
      label: "Upload Dataset File in CSV or XLSX format",
    });
  } else {
    genInfoSteps.value = genInfoSteps.value.slice(0, 3);
  }
});

const onAdvancedUpload = (event) => {
  const { files } = event;
  if (active.value === 2 && files.length > 0) {
    stepInfo.value.templateBackground = files[0].name;
    toast.add({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded: " + files[0].name,
      life: 3000,
    });
  }
};

function selectOption(option) {
  selectedOption.value = option;
  stepInfo.value.useCase = option;
  active.value = 1;
}

function finishProcess() {
  // Here you can handle the final step's action
 
  toast.add({
    severity: "success",
    summary: "Process Completed",
    detail: "All steps completed successfully.",
    life: 3000,
  });
  // Optionally reset or redirect
}

function exitProcess() {
  router.push("/templates"); // Adjust route as necessary
}
</script>

<style lang="scss" scoped>
/* Add any specific styles here */
</style>
