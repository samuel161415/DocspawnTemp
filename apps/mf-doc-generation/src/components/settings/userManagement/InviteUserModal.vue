<template>
    <!-- Invite users Dialog -->
    <Dialog v-model:visible="visible" :draggable="false" modal :style="{ width: '40rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">

        <template #header>
            <div class="flex flex-row gap-2">
                <i class="pi pi-users text-xl mt-0.5"></i>
                <p class="text-xl">
                    Invite people to Tec.Tech
                </p>
            </div>
        </template>
        <div class="flex flex-col">
            <label class="text-xl mb-2" for="inviteUsers">To:</label>
            <Chips input-id="inviteUsers" class="min-h-20" v-model="inviteUsersList">
                <template #chip="slotProps">
                    <div class="flex flex-row gap-2">
                        <i class="pi pi-user-plus" style="font-size: 14px;"></i>
                        <span>{{ slotProps.value }} </span>
                    </div>
                </template>
            </Chips>

            <div class="flex flex-row mt-5 font-normal items-center">
                <div class="cursor-pointer">
                    <p class="text-primaryBlue"><span><i class="pi pi-link mr-3" /></span>Copy invite link</p>
                </div>
                <Button class="ms-auto" label="Send" icon="pi pi-send" outlined />
            </div>

        </div>

    </Dialog>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits()

</script>