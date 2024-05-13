<template>
  <div class="h-full">
    <p class="font-semibold text-surface-600 text-2xl mb-5 flex text-center justify-center">Template editor </p>
    <div class="flex justify-center items-center gap-3">
      <button
        class="flex flex-col w-[100px] h-[70px] justify-center items-center gap-2 bg-stone-100 hover:shadow-lg rounded-xl"
      >
        <i class="pi pi-user"></i>
        Form Fields
      </button>
      <button
        class="flex flex-col items-center gap-2 bg-stone-100 hover:shadow-lg w-[100px] h-[70px] justify-center rounded-xl"
      >
        <i class="pi pi-image"></i>
        Image
      </button>
      <button
        class="flex flex-col items-center gap-2 bg-stone-100 hover:shadow-lg w-[100px] h-[70px] justify-center rounded-xl"
      >
        <i class="pi pi-pencil"></i>
        Text
      </button>
      <button
        class="flex flex-col items-center gap-2 bg-stone-100 hover:shadow-lg w-[100px] h-[70px] justify-center rounded-xl"
      >
        <i class="pi pi-clock"></i>
        Timestamp
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
