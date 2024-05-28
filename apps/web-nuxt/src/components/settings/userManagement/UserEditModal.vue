<template>
    <Dialog v-model:visible="visible" :draggable="false" modal :style="{ width: '35rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <template #header>
            <p class="text-2xl">
                <span class="font-bold"> 
                    User edition
                </span>
            </p>
        </template>
        <div class="flex flex-col gap-6">
            <Panel header="General information">
                <div class="grid grid-rows-2 grid-cols-2 gap-4 gap-x-10">
                    <div class="flex flex-col gap-1">
                        <label for="username"><span><i class="pi pi-user mr-1"></i></span> First name <span class="text-error">*</span></label>
                        <InputText id="username" v-model="firstName" aria-describedby="username-help" :invalid="firstName === '' && isInvalid"/>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="username"><span><i class="pi pi-user mr-1"></i></span> Last name <span class="text-error">*</span></label>
                        <InputText id="username" v-model="lastName" aria-describedby="username-help" :invalid="isInvalid && lastName === ''"/>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="email"><span><i class="pi pi-envelope"></i></span> Email <span class="text-error">*</span></label>
                        <InputText id="email" v-model="email" aria-describedby="username-help" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="password"><span><i class="pi pi-unlock mr-1"></i></span> Password <span class="text-error">*</span></label>
                        <InputText id="password" type="password" v-model="password" aria-describedby="username-help" />
                    </div>
                </div>
            </Panel>
            <Panel header="Groups">
                <div class="flex flex-col gap-3">
                    <p class="text-lg font-semibold">
                        <span><i class="pi pi-users mr-1"></i></span> Belongs to:
                    </p>
                    <div class="flex flex-col gap-2">
                        <MultiSelect v-model="selectedGroups" display="chip" :options="groups" optionLabel="name" filter
                            placeholder="Choose groups" :maxSelectedLabels="5" class="w-full">
                        </MultiSelect>
                    </div>
                </div>
            </Panel>
            <Panel header="Settings">
                <div class="flex flex-col gap-5">
                    <div class="flex items-start">
                        <Checkbox v-model="isForcePassword" inputId="forcePassword" name="forcePassword" />
                        <label for="forcePassword" class="ml-2"> Force password change upon near connection </label>
                    </div>
                    <div class="flex flex-row gap-6">
                        <Button label="Freeze account" outlined severity="warning" @click="handleFreezeAccount()" class="ms-auto border-warning text-warning" />
                        <Button label="Delete account" severity="danger" outlined class="mr-auto" @click="handleDeleteAccount()" />
                    </div>
                </div>
            </Panel>
        </div>
        <template #footer>
            <div class="w-full mt-4"><Button class="w-full" label="Save changes" @click="handleEditUser" /></div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits()
const isInvalid = ref(false);

const props = defineProps({
    data: {
        type:Object,
        required:true
    },
    groupsData: {
        type:Object,
        required:true   
    }
})

const visible = ref(false);
const selectedGroups = ref([])
const isForcePassword = ref(false)
const firstName = ref('' || props.data.firstName)
const lastName = ref('' || props.data.lastName)
const email = ref('' || props.data.email)
const password = ref('' || props.data.password)

const groups = computed(() => {
    return props.groupsData.sort((a, b) => {
        if (selectedGroups.value.includes(a)) return -1
        if (selectedGroups.value.includes(b)) return 1
        return 0
  });
});

const handleFreezeAccount = () =>{
    emit('freezeAccount')
}

const handleDeleteAccount = () => {
    emit('deleteAccount', props.data.id)
}

const handleEditUser = () => {
    if(firstName.value === '' || lastName.value === '' || email.value === '' || password.value === ''){
        isInvalid.value = true;
    }
    else{
        emit('editUser', {id: props.data.id, firstName:firstName.value, lastName:lastName.value, email:email.value, password:password.value, groups:props.data.groups, isForcePassword:isForcePassword.value})
    }
}

</script>