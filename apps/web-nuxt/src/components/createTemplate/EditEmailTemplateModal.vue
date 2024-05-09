<template>
    <Dialog v-model:visible="visible" modal :draggable="false" :style="{ width: '65rem' }">
        <template #header>
            <p class="text-xl text-surface-600 font-poppins font-medium  ml-4">Edit the template for admin</p>
        </template>

        <div class="mx-4">
            <p class="text-lg text-surface-500 font-poppins mb-4 -mt-1">Send via email to DocSpawn user</p>
            <p class="text-lg text-surface-500 font-poppins mb-1 ">Subject</p>
            <div class="mb-5">
                <InputText type="text" v-model="subject" class="w-full" />
            </div>
            <div class="mb-4">
                <p class="text-lg text-surface-500 font-poppins mb-1">Email body</p>
                <Editor v-model="value" headerStyle="borderRadius: 20px" editorStyle="height: 320px; borderRadius: 2px" />
            </div>
            <div class="mb-7">
                <p class="text-lg text-surface-500 font-poppins mb-2 ">Attachment</p>
                <FileUpload mode="basic" name="demo[]" url="/api/upload" accept=".pdf,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :maxFileSize="1000000" @upload="onUpload" />
            </div>
        </div>

        <template #footer>
            <div class="flex justify-end mt-5">
                <Button label="Cancel" outlined class="border-primaryBlue mr-4 px-4" @click="visible = false" />
                <Button label="Save" class="bg-primaryBlue px-6" @click="visible = false" />
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import Editor from 'primevue/editor';
import FileUpload from 'primevue/fileupload';

const visible = ref(false);
const value = ref('');
const subject = ref('');

</script>