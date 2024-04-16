<template>
    <div class="h-full w-full bg-stone-100 overflow-scroll">
        <div class="px-8 py-5 rounded-r-md bg-white overflow-scroll h-full">
            <div class="mt-5 mr-12 ml-3">
                <p class="font-semibold text-surface-700 text-xl mb-5">Microservice</p>
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