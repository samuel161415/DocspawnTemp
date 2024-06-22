<template>
    <div class="">
        <div class="">
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
                            <img v-else :src="data[field]" alt="" class="w-[64px] h-[64px]">
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

                <Column  header-style="text-center" style="width: 5%">
                    <template #header>
                        <div class="flex justify-center  ">
                            <Button 
                                icon="pi pi-plus" 
                                severity="success" 
                                rounded 
                                outlined 
                                class="rounded-full"
                                @click="handleAdd"/>
                        </div>
                    </template>
                    <template #body="{ data }">
                        <div class="flex space-x-8">
                            <i class="pi pi-file-edit text-success text-lg custom-icon cursor-pointer" @click="handleEdit(data)"></i>
                        </div>
                    </template>
                </Column>
            </DataTable>

            <!-- Add -->
            <Dialog v-model:visible="openAddModal"  modal :style="{ width: '32rem' }">
                <template #header>
                    <p class="text-surface-700 font-poppins text-xl font-medium">Add checkboxes options</p>
                </template>
                <p class="text-surface-600 font-poppins text-lg font-normal">Type:</p>

                <div class="flex justify-between mt-4">
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
                    <p class="text-surface-600 font-poppins text-lg font-normal mb-4">Select option image to upload:</p>
                   
                    <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" />
                </div>
                <div class="flex justify-center mt-10">
                    <Button type="button" label="Upload" severity="success" class="w-32" @click="upload"></Button>
                </div>
            </Dialog>
            <Toast />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const openAddModal = ref(false);
const toast = useToast();
const fileupload = ref();

const upload = () => {
    onUpload()
    fileupload.value.upload();
};

const onUpload = () => {
    
    toast.add({ severity: 'success', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    openAddModal.value = false;
};

const checkboxData = ref([
    { design: '', checked: 'no', unchecked: 'yes' },
    { design: 'https://www.svgrepo.com/show/309415/checkbox-unchecked.svg', checked: 'no', unchecked: 'yes' },
    { design: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGkoye-JREbY97QiHfOgZXflotJi5numxwXA&s', checked: 'yes', unchecked: 'no' },
    
    
])

const handleEdit = (data) => {
    console.log(data);
};

const handleAdd = () => {
    openAddModal.value = true;
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