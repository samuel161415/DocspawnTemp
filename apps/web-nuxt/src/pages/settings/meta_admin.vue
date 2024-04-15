<template>
    <div class="h-full w-full bg-stone-100 overflow-scroll">
        <div class="px-8 py-5 rounded-r-md bg-white overflow-scroll h-full">
            <BreadcrumbComponent :home="home" :items="items" />
            <Microservices />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import Microservices from '../../components/settings/metaAdmin/Microservices.vue';
import BreadcrumbComponent from '../../components/shared/BreadcrumbComponent.vue';
import { home } from '~/composables/useBreadcrumb.js'

const router = useRouter();

const items = ref([{ label: "Settings", route: "/settings" }, { label: "Meta Admin", route: "/settings/meta_admin" }]);

</script>