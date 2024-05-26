<template>
     <Dialog v-model:visible="visible" :draggable="false" modal :style="{ width: '35rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <template #header>
            <p class="text-2xl">
                <span class="font-bold"> 
                    Group creation
                </span> 
            </p>
        </template>
        <div class="flex flex-col gap-6">
            <Panel header="General information">
                <div class="flex flex-col gap-4">
                    <label for="groupname"><span><i class="pi pi-users mr-1"></i></span>Group name <span class="text-error">*</span></label>
                    <InputText class="w-full" id="groupname" v-model="groupName" aria-describedby="groupname-help" />
                </div>
            </Panel>
            <Panel header="Users">
                <div class="flex flex-col gap-3">
                    <p class="font-semibold">
                        <span><i class="pi pi-users mr-1"></i></span> Members <span class="text-error">*</span>
                    </p>
                    <MultiSelect v-model="selectedUsers" display="chip" :options="props.users" :optionLabel="optionLabelGetter" filter :filterFields="['firstName', 'lastName']"
                        placeholder="Select users" :maxSelectedLabels="5" class="w-full" />
                </div>
            </Panel>
            <Panel header="Template permissions">
                <div class="flex flex-col gap-3">
                    <p class="font-semibold">
                        <span><i class="pi pi-file mr-1"></i></span> Users who can fill the following templates:
                    </p>
                    <div class="flex flex-col gap-2">
                        <MultiSelect v-model="selectedTemplateFills" display="chip" :options="props.templates" optionLabel="name" filter
                            placeholder="Choose templates" :maxSelectedLabels="5" class="w-full" />
                    </div>

                    <p class="font-semibold mt-3">
                        <span><i class="pi pi-file-edit mr-1"></i></span> Users who can select the following templates:
                    </p>
                    <div class="flex flex-col gap-2">
                        <MultiSelect v-model="selectedTemplateEdits" display="chip" :options="props.templates" optionLabel="name" filter
                            placeholder="Choose templates" :maxSelectedLabels="5" class="w-full" />
                    </div>
                </div>
            </Panel>
        </div>
        <template #footer>
            <div class="w-full"><Button class="w-full" label="Save changes" @click="handleCreateGroup" /></div>
        </template>

    </Dialog>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits()

const props = defineProps({
    users: {
        type:Object,
        required:true   
    },
    templates: {
        type:Object,
        required:true
    }
})

const selectedTemplateFills = ref([]);
const selectedTemplateEdits = ref([]);
const selectedUsers = ref([]);
const groupName = ref('');
const optionLabelGetter = (option) => `${option.firstName} ${option.lastName}`;

const handleCreateGroup = () =>{
//   
}
</script>