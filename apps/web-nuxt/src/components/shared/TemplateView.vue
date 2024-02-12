<template>
  <div class="bg-white mt-8 w-full min-h-20 p-5 rounded-lg">
    <div class="flex w-full items-center justify-between">
      <h2 class="text-xl font-semibold">Templates</h2>
      <SelectButton
        v-model="show"
        :options="options"
        optionLabel="value"
        dataKey="value"
        aria-labelledby="custom"
      >
        <template #option="slotProps">
          <i :class="slotProps.option.icon"></i>
        </template>
      </SelectButton>
    </div>
    <div
      :class="
        show.value === 'list'
          ? 'grid-cols-1 gap-5 p-5 '
          : 'grid grid-cols-2 gap-5 p-5 '
      "
    >
      <div
        class="flex flex-col mb-5"
        v-for="template in templates"
        :key="template.id"
      >
        <h1 class="font-bold text-xl mb-5">{{ template.name }}</h1>
        <p class="text-stone-500">Document created {{ template.docCreated }}</p>
        <p class="text-stone-500">Created on {{ template.createdOn }}</p>
        <p class="text-stone-500">Modified on {{ template.modifiedOn }}</p>
        <div class="felx items-center mt-3">
          <Button
            severity="primary"
            class="bg-primaryBlue mr-5 w-[70px] text-white"
            label="Edit"
          />
          <Button
            severity="secondary"
            outlined
            class="w-[70px] text-primaryBlue border-primaryBlue"
            label="Delete"
          />
        </div>
        <div class="flex items-center gap-5 mt-5">
          <img
            alt="document"
            :src="sampleDoc"
            class="w-[120px] h-[150px] rounded-lg shadow-lg"
          />
          <div
            class="w-[120px] h-[150px] grid place-items-center border-[1px] rounded-lg"
          >
            <div class="flex flex-col items-center">
              <Button
                icon="pi pi-pencil"
                severity="secondary"
                style="color: #009ee2"
                text
                rounded
                aria-label="pencil"
              />
              <p class="text-primaryBlue font-semibold">Fill up a form</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import sampleDoc from "../../assets/sample/sampleDoc.png";

const props = defineProps({
  templates: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const show = ref("grid");
const options = ref([
  { icon: "pi pi-th-large", value: "grid" },
  { icon: "pi pi-list", value: "list" },
]);
</script>

<style lang="scss" scoped></style>
