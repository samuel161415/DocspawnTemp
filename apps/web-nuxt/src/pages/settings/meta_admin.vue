<template>
    <div class="h-full w-full bg-stone-100 overflow-scroll">
        <div class="px-8 py-5 shadow rounded-md bg-white overflow-scroll h-full">
            <Breadcrumb class="border-none rounded-none" :home="home" :model="items">
                <template #item="{ item, props }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a :href="href" v-bind="props.action" @click="navigate">
                            <span class="text-color" :class="[item.icon]"></span>
                            <span class=" text-lg text-primary-500 dark:text-primary-400 font-normal">{{ item.label }}</span>
                        </a>
                    </router-link>

                    <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                        <span class="text-surface-700 dark:text-surface-0/80">{{
                            item.label}}
                        </span>
                    </a>
                </template>
            </Breadcrumb>
            <Microservices />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import Microservices from '../../components/settings/metaAdmin/Microservices.vue';

const router = useRouter();

const home = ref({
    icon: "pi pi-home",
    route: "/",
});

const items = ref([{ label: "Settings", route: "/settings" }, { label: "Meta Admin", route: "/settings/meta_admin" }]);

</script>