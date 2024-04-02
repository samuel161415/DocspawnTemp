<template>
  <div class="min-h-full flex-1 w-72  mb-12">
    <div class="bg-gray-200 p-12 rounded-md min-h-full">
      <p class="text-3xl text-gray-700">
        PDF Template
      </p>
      <p class="mt-2 text-md">
        Pdf will be shown here...
      </p>
    </div>
    <div class="h-12 border border-blue-300 flex items-center justify-between px-3 mt-2 mb-3 rounded-md bg-blue-50 ">
      <p class="">
        Total Pages: <span class="text-primaryBlue">13</span>
      </p>
      <div class="flex items-center gap-3 ">
        <div class="flex gap-1 mr-2 ">
          <Button icon="pi pi-caret-up cursor-pointer" class="w-8 h-8" /> <Button icon="pi pi-caret-down cursor-pointer" class="w-8 h-8" />
        </div>
        <p>Current page: <span class="text-primaryBlue">1</span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Number,
    required: true,
  },
})
</script>

  <style lang="scss" scoped></style>
