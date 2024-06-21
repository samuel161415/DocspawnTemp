
<template>
    <Dialog v-model:visible="visible" :draggable="false" modal header="Edit Profile" :style="{ width: '55rem' }">
        <template #header>
            <div class="inline-flex align-items-center justify-content-center gap-2">
                <span class="text-lg text-surface-600 font-poppins font-normal"></span>
            </div>
        </template>
        
        <div class="flex justify-center items-center space-x-8">
            <div class="flex flex-col">
                <img class="w-80 h-[30rem] flex justify-center mt-2 mr-6" :src="props.template.image"/>
            </div>
            
            <div class="flex flex-col space-y-4 mt-4">
 
                <p class="text-lg text-surface-500 font-poppins font-normal"> <span class="font-semibold mr-2">Template name</span>  {{ props.template.name }}</p>
                <p class="text-lg text-surface-500 font-poppins font-normal"> <span class="font-semibold mr-2">Date created</span>  {{ props.template.createdOn }}</p>
                <p class="text-lg text-surface-500 font-poppins font-normal"> <span class="font-semibold mr-2">Date modified</span> {{ props.template.modifiedOn }}</p>
                <p class="text-lg text-surface-500 font-poppins font-normal"> <span class="font-semibold mr-2">Total document created</span> {{ props.template.docCreated }}</p>
                <p class="text-lg text-surface-500 font-poppins font-normal"> <span class="font-semibold mr-2">Time saved</span> {{ props.template.timeSaved }} hrs</p>
                
            </div>
        </div>
        
    </Dialog>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
const emit = defineEmits()

const visible = ref(false);

const props = defineProps({
  template: {
    type: Array,
    required: true,
    default: () => {},
  },
});

const clickCount = ref(0);

onMounted(() => {

    const closeOnOutsideClick = (event) => {

        if (clickCount.value > 0) {
            emit('outsideClick', false); 
        }
        clickCount.value += 1
    };

    document.body.addEventListener('click', closeOnOutsideClick);

    onBeforeUnmount(() => {
        document.body.removeEventListener('click', closeOnOutsideClick);
    });

});

</script>
