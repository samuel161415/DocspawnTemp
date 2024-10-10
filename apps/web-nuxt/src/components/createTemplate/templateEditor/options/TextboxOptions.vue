<template>
  <div class="flex items-center gap-2 my-4">
    <Checkbox />
    <p class="text-md">
      Set text box to full page
    </p>
  </div>
  <div class="flex flex-col gap-4 my-2">
    <p class="text-lg text-surface-500 font-normal">
      Order text boxes
    </p>
    <div v-tooltip="'Bring the selected object forward one level so it\'s hidden behind fewer objects.'" class="flex gap-2 items-center cursor-pointer ">
      <font-awesome-icon icon="fa-duotone fa-solid fa-bring-forward" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
      <p>
        Bring forward
      </p>
    </div>
    <div v-tooltip="'Send the selected object back one level so its hidden behind more objects.'" class="flex gap-2 items-center cursor-pointer">
      <font-awesome-icon icon="fa-duotone fa-solid fa-send-backward" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
      <p> Send backward</p>
    </div>
    <div v-tooltip="'Bring the selected object in front of all other objects.'" class="flex gap-2 items-center cursor-pointer">
      <font-awesome-icon icon="fa-duotone fa-solid fa-bring-front" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
      <p> Bring to front</p>
    </div>
    <div v-tooltip="'Send the selected object behind all other objects.'" class="flex gap-2 items-center cursor-pointer">
      <font-awesome-icon icon="fa-duotone fa-solid fa-send-back" size="xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee299; --fa-secondary-opacity: 0.6;" />
      <p>Send to back</p>
    </div>
  </div>
</template>

<script setup>
</script>
