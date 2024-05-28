<template>
    <div class="h-full w-full bg-white overflow-scroll no-scrollbar rounded-lg ml-4">
        <div class="px-8 py-8 overflow-scroll h-full">
            <div class="py-2 mr-12 ml-3">
                <p class="font-semibold text-surface-600 text-2xl mb-5">Microservice</p>
            </div>
            <Microservices />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import Microservices from '../../components/settings/metaAdmin/Microservices.vue';

const router = useRouter();

</script>