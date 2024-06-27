<template>
    <div class="rounded-lg bg-white mb-0 border-r border-surface-100">
        <h2 class="font-semibold text-surface-600 text-2xl pl-11 pt-10 pb-2">Settings</h2>
          
        <div class="flex flex-col justify-between  h-full overflow-y-scroll w-64 pb-5 no-scrollbar">
            <ul class="mb-24">   
                <li 
                    v-for="items in settingItems" :key="items.title" 
                    class="cursor-pointer flex flex-col mt-2  w-full mr-4 ">
                    <div 
                        :key="items.title" 
                        class="flex px-1 py-3 ml-1"
                        :class="{ 'hover:bg-surface-100 ': settingsBaseRoute !== '/settings' + items.route, 'text-primaryBlue ': settingsBaseRoute === '/settings' + items.route }" 
                        @click="navigate('settings' + items.route)">

                        <span class="text-lg font-normal ml-2 font-poppins"
                        :class="{ 'text-surface-600': items.isHovered, 'text-primaryBlue': settingsBaseRoute === '/settings' + items.route, 'text-gray-500': !items.isHovered }"
                        >{{
                            items.title }}
                        </span>
                    </div>
                   <div class="mt-1">
                       <SubMenuItem :subitems="items.subitems" />
                </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { useSettingItems }  from '../../composables/useSettingItems';
import SubMenuItem from "./menuItems/SubMenuItem.vue";

const { settingItems } = useSettingItems();

const router = useRouter();

const settingsBaseRoute = ref(router.currentRoute.value.path);

onMounted(() => {
  router.afterEach((to, from) => {
    settingsBaseRoute.value = to.path;
  });
});

const navigate = (route) => {

router.currentRoute.value.path = '/';

 router.push(route);
 settingsBaseRoute.value = route;
};

</script>
