<template>

    <div class="z-auto sticky bg-white mb-0">
        <div class=" flex flex-col justify-between  h-full overflow-y-scroll w-60 py-6">
            <ul class="mt-2">
                
                <li v-for="subItem in subItems" :key="subItem.title" class="cursor-pointer flex flex-col mt-7 ml-1 w-full py-4 pr-1 mr-4">
                    <div :key="subItem.title" class=" rounded-md flex px-4 py-2"
                        :class="{ 'bg-primaryBlue': baseRoute === subItem.route }" 
                        @click="navigate('settings' + subItem.route)"
                        @mouseenter="setSubIsHovered(subItem, true)" 
                        @mouseleave="setSubIsHovered(subItem, false)">

                        <i style="font-size: 1rem" class="space-y-2 "
                            :class="['pi pi-cog', 'mr-2', { 'text-primaryBlue': subItem.isHovered || baseRoute === subItem.route, 'text-gray-500': !subItem.isHovered }]">
                        </i>

                        <span class=" text-base font-medium ml-2 "
                            :class="{ 'text-primaryBlue': subItem.isHovered || baseRoute === subItem.route, 'text-gray-500': !subItem.isHovered }">{{
                            subItem.title }}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useSubItems } from '../../services/menuItems';

const { subItems } = useSubItems();

const router = useRouter();

const baseRoute = ref(router.currentRoute.value.path);

const settingHovered = ref(false);

const setSubIsHovered = (subItem, val) => {
  subItem.isHovered = val;
};

const openSubMenu = ref(false);

const navigate = (route) => {
 
 router.currentRoute.value.path = '/';

 router.push(route);
 baseRoute.value = route;
};

</script>
