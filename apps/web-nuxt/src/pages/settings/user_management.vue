<template>
    <div class="h-full w-full  flex overflow-scroll">
        
        <div class="px-8 py-5 rounded-r-md bg-white  w-full">
            <BreadcrumbComponent :home="home" :items="items" />
        </div>
    </div>

</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BreadcrumbComponent from "~/components/shared/BreadcrumbComponent.vue";
import { home } from '~/composables/useBreadcrumb.js'

const router = useRouter();

const items = ref([{ label: "Settings", route: "/settings" }, {label: "User", route: "/settings/user"}]);

</script>

