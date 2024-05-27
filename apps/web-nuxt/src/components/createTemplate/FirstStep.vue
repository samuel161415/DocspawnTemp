<template>
    <div class="flex justify-center items-center mt-2">
        <div class="border rounded-lg px-12 py-7">
            <p class="font-semibold text-surface-600 text-2xl my-7 flex text-center justify-center">How do you want to proceed?</p>
            <div class="flex w-[50rem] h-[40rem] space-x-4">
                <!-- left -->
                <div class="flex justify-center items-center w-1/2 h-11/12 border rounded-lg transition-transform duration-300 hover:scale-x-105 hover:border-primaryBlue hover:border-2 cursor-pointer" @click="handleTemplateChoice()">
                    <p class="font-normal text-surface-500 text-xl mb-5 flex text-center justify-center font-poppins px-4">Create my own template</p>
                </div>

                <!-- right -->
                <div class="flex justify-center items-center w-1/2 h-11/12 border rounded-lg bg-surface-50 relative">
                    <p class="font-normal text-surface-400 text-xl mb-5 flex text-center justify-center font-poppins px-4">Select model from the template library</p>
                    <!-- <div class="absolute bottom-0 right-0 h-16 w-3/4 bg-primaryBlue text-white flex items-center justify-center transform -rotate-45 origin-bottom-left">
                        <span class="text-2xl font-bold whitespace-nowrap">Coming Soon</span>
                    </div> -->
                    <!-- <div class="absolute bottom-6 right-10 bg-primaryBlue h-10 text-white text-lg font-bold  px-3 transform translate-x-1/2 -translate-y-1/2 -rotate-45">
                        Coming soon
                    </div> -->
                </div>
            </div>
        </div>
     
    </div>
</template>
<script setup>
import { ref } from 'vue';

const emit = defineEmits();

const handleTemplateChoice = () => {
    emit('updateCreateNewTemplate', true);
}
</script>
