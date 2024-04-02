<template>
  <div class="mt-4 ">
    <h1>Upload image</h1>
    <input
      class="border border-gray-300 p-1 mt-2 w-full text-sm"
      type="file"
      @change="getFile"
    />
    <img v-if="fileUrl" id="output" accept="image/*" class="mt-5 object-cover" :src="fileUrl" :style="{ height: 'auto', width: '100%' }" />
  </div>
</template>
<!-- @change="{ (e) => selectedImage = e.target.files[0] }" -->

<script setup>
const fileUrl = ref()
function getFile(e) {
  // const reader = new FileReader()
  // reader.onload = function () {
  //   fileUrl.value = reader.result
  // }
  // reader.readAsDataURL(e.target.files[0])
  const file = e.target.files[0]
  fileUrl.value = URL.createObjectURL(file)
}
</script>

<style>
.super{

}
</style>
