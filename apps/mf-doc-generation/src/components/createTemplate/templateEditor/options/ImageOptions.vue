<template>
  <div class="mt-4 ">
    <h1>Upload image</h1>
    <input
      class="border border-gray-300 p-1 mt-2 w-full text-sm"
      type="file"
      @change="getFile"
    />
    <img v-if="fileUrl" id="output" accept="image/*" class="mt-5 object-cover h-auto w-full" :src="fileUrl" />
  </div>
</template>

<script setup>
const fileUrl = ref()
function getFile(e) {
  const file = e.target.files[0]
  fileUrl.value = URL.createObjectURL(file)
}
</script>
