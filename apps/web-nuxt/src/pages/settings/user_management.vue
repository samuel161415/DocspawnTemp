<template>
        
    <div class="ml-4 w-full overflow-scroll no-scrollbar rounded-lg">
        <div class="rounded-lg bg-white py-5 px-8 ">
            <div class="">
                <p class="font-semibold text-surface-700 text-xl mb-5 ">User management</p>
                <!-- User's view -->
                <Users />
            
                <UserGroups />
            </div>
        </div>

    <!-- Confirm Dialog -->
    <ConfirmDialog :draggable="false" :pt="{
            root: { class: 'w-auto' },
    }"></ConfirmDialog>
    </div>

</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserGroups from "~/components/settings/userManagement/user_groups.vue";
import Users from "~/components/settings/userManagement/users.vue";

const router = useRouter();

</script>
