<template>
    <div class="mt-20">
        <p class="text-surface-600 font-poppins text-xl font-medium mb-1" >Checkbox formats</p>
        <div class="">
            <div class="flex justify-between items-center mb-8">
                <p class="text-surface-500 font-poppins text-lg mb-2">Customize the format and design of elements within DocSpawn. </p>
                <Button 
                    icon="pi pi-plus"
                    label="Add checkbox option"
                    severity="success" 
                    outlined 
                    class="rounded-lg text-success border-success hover:bg-green-50"
                    @click="handleAdd"/>
                  
            </div>
            <DataTable 
                striped-rows 
                show-gridlines 
                :value="checkboxData" 
                :rows="10"
                tableStyle="min-width: 50rem; border-radius:20%;"
                class="rounded-md p-datatable-header p-datatable-wrapper"
                >
                <!-- DataTable content -->
                <template #empty>
                    <p class="flex text-center">No data</p>
                </template>

                <Column field="design" header="Design" :headerStyle="{ height: '4.5rem' }">
                    <template #body="{ data, field }">
                        <div class="flex items-center space-x-4">
                         
                            <p v-if="data[field] === ''" class="font-poppins">(empty)</p>
                            <img v-else :src="data[field]" alt="" class="w-[32px] h-[32px]">
                        </div>
                    </template>
                </Column>
                <Column field="checked" header="Checked" :headerStyle="{ height: '4.5rem' }">
                    <template #body="{ data, field }">
                        <div class="flex items-center space-x-4">
                            <p class="font-poppins">{{data[field]}}</p>
                        </div>
                    </template>
                </Column>

                <Column field="unchecked" header="Unchecked" :headerStyle="{ height: '4.5rem' }">
                    <template #body="{ data, field }">
                        <div class="flex items-center space-x-4">
                            <p class="font-poppins">{{data[field]}}</p>
                        </div>
                    </template>
                </Column>

                <Column field="active" header="Active" :headerStyle="{ height: '4.5rem' }">
                    <template #body="{ data, field }">
                        <div class="flex items-center space-x-4">
                            <p class="font-poppins">{{data[field]}}</p>
                        </div>
                    </template>
                </Column>

                <Column field="action" header="Action"  header-style="text-center" style="width: 5%">
                   
                    <template #body="{ data }">
                        <div class="flex pl-3">
                            <i class="pi pi-pencil text-success text-lg custom-icon cursor-pointer" @click="handleEdit(data)"></i>
                        </div>
                    </template>
                </Column>
            </DataTable>

            <!-- Add -->
            <Dialog v-model:visible="openAddModal"  modal :style="{ width: '40rem' }">
                <template #header>
                    <p class="text-surface-700 font-poppins text-xl font-medium">Add checkboxes options</p>
                </template>
                <p class="text-surface-600 font-poppins text-lg font-normal">Type:</p>

                <div class="flex space-x-24 mt-4">
                    <div class="flex items-center">
                        <RadioButton v-model="checked" inputId="checked" name="checked" value="checked" />
                        <label for="checked" class=" text-lg font-poppins text-surface-600">Checked</label>
                    </div>

                    <div class="flex items-center">
                        <RadioButton v-model="unchecked" inputId="unchecked" name="unchecked" value="unchecked" />
                        <label for="unchecked" class="text-lg font-poppins text-surface-600">Unchecked</label>
                    </div>

                </div>

                <div class="mt-7">
                    <p class="text-surface-600 font-poppins text-lg font-normal mb-2">Select option image to upload</p>
                    <p class="text-surface-600 font-poppins text-lg font-normal mb-6">Accepted image formats: transparent PNG files, 64x64px</p>
                    <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/png" :maxFileSize="1000000" @upload="onUpload" />
                    
                    <div class="flex justify-center items-center mt-5"
                        @dragover.prevent="handleDragOver()"
                        @dragenter.prevent=" handleDragEnter()"
                        @dragleave.prevent="handleDragLeave()"
                        @drop.prevent="handleFileDrop($event)">
                        <div  class="flex justify-center items-center border-dashed border-2 w-96 mb-6 border-gray-400 flex-col h-[300px] md:h-[155px] sm:items-center px-4 py-2 gap-2 rounded-lg bg-surface-50">
                            <font-awesome-icon :icon="fad.faUpload" size="2xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; width: 40px; height: 30px;" />
                            <p class="text-primaryBlue font-bold font-poppins text-lg text-center mt-2">Drop your data here</p>
                            <!-- <p class="text-black font-poppins text-base text-center">Supported file formats: .png, .jpg</p> -->
                        </div>
                    </div>
                </div>
                <div class="flex justify-center mt-10">
                    <Button type="button" label="Upload" severity="success" class="w-32" @click="upload"></Button>
                </div>
            </Dialog>
            <!-- <Toast /> -->
            <Toast position="top-right">
                <template #message="slotProps">
                    <div class="flex  items-start space-x-2">
                        <div class="mt-1">
                            <font-awesome-icon :icon="fal.faFileCircleXmark" size="lg" style="color: #c8432f;" />
                        </div>
                        <div class="">
                            <div class="font-bold text-lg font-poppins text-error ">{{ slotProps.message.summary }}</div>
                            <div class="font-normal text-base font-poppins text-error">{{ slotProps.message.detail }}</div>
                        </div>
                        
                    </div>
                </template>
            </Toast>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';


const openAddModal = ref(false);
const toast = useToast();
const fileupload = ref();
const fileTypeCheck = ref(false)

const upload = () => {
    onUpload()
    fileupload.value.upload();
};

const onUpload = () => {
    toast.add({ severity: 'success', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    openAddModal.value = false;
};

const checkboxData = ref([
    { design: '', checked: 'no', unchecked: 'yes', active: 'yes' },
    { design: 'https://www.svgrepo.com/show/309415/checkbox-unchecked.svg', checked: 'no', unchecked: 'yes', active: 'no' },
    { design: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGkoye-JREbY97QiHfOgZXflotJi5numxwXA&s', checked: 'yes', unchecked: 'no', active: 'yes' },  
])

const handleEdit = (data) => {
    console.log(data);
};

const handleAdd = () => {
    openAddModal.value = true;
};

const showError = () => {
    toast.add({ severity: 'error', summary: 'Invalid file format', detail: 'Please upload a .png file', life: 3000 });
};

const handleDragOver = () => {
  
};

const handleDragEnter = () => {

};

const handleDragLeave = () => {
  
};

const handleFileDrop = (event) => {
    const files = event.dataTransfer.files;
   
    if (!files[0]){
        showError();
    }
    else{

        const fileName = files[0].name;
        const fileType = fileName.split('.').pop();
        
        if (fileType === 'png') {
            fileTypeCheck.value = true;
            handleFileUpload(files); 
        } else {
            fileTypeCheck.value = false;
            showError();
        }
    }
};

const handleFileUpload = (files) => {
    // Add your file upload logic here
    // This function is assumed to handle the actual file upload process
};

</script>

<style scoped>

::v-deep .p-datatable-table > thead > tr:first-of-type > th:first-of-type  {
  border-radius: 0.5rem 0 0 0!important;
}

/* Top Right Would be: */
::v-deep .p-datatable-table > thead > tr:first-of-type > th:last-of-type {
    border-radius: 0 0.5rem 0 0 !important;
}

/* Bottom Left Would Be: */
::v-deep .p-datatable-table > tbody > tr:last-of-type > td:first-of-type {
    border-radius:  0  0  0 0.5rem!important;
}

/* Bottom Right Would Be: */
::v-deep .p-datatable-table > tbody > tr:last-of-type > td:last-of-type {
    border-radius:  0  0 0.5rem 0 !important;
}
</style>