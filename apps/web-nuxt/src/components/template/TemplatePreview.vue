
<template>
    <Dialog v-model:visible="visible" :draggable="false" modal header="Edit Profile" :style="{ width: '30rem' }">
        <template #header>
            <div class="inline-flex align-items-center justify-content-center gap-2">
                
                <span class="text-lg text-surface-600 font-poppins font-normal"></span>
            </div>
        </template>
        
        <div class="flex flex-col p-4 ">
            <img class="w-full h-72 flex justify-center mt-4" :src="props.template.image"/>
            <p class="text-lg text-surface-500 font-poppins font-normal text-center">{{ props.template.name }}</p>
        </div>
        
    </Dialog>

</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
const visible = ref(false);

const toast = useToast();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const props = defineProps({
  template: {
    type: Array,
    required: true,
    default: () => {},
  },
});

</script>
