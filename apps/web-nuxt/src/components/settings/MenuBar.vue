<template>
    <div class=" bg-white mb-0 border-l border-r border-surface-100">
        <div class="flex flex-col justify-between  h-full overflow-y-scroll w-64 py-5 no-scrollbar">
            <ul class="mb-24">   
                <li 
                    v-for="items in settingItems" :key="items.title" 
                    class="cursor-pointer flex flex-col mt-2  w-full mr-4 ">
                    <div :key="items.title" class="flex px-1 py-3  ml-1 hover:bg-surface-100 "
                        :class="{ 'bg-primaryBlue': baseRoute === items.route }" 
                        @click="navigate('settings' + items.route)">

                        <span class=" text-lg font-normal ml-2 "
                            :class="{ 'text-surface-600': items.isHovered || baseRoute === items.route, 'text-gray-500': !items.isHovered }">{{
                            items.title }}
                        </span>
                    </div>
                   <ul >
                    <li v-for="subItem in items.subitems" >
                        <SubMenuItem :subItem="subItem" />
                    </li>
                   </ul>
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

const baseRoute = ref(router.currentRoute.value.path);

onMounted(() => {
  router.afterEach((to, from) => {
    baseRoute.value = to.path;
  });
});

const navigate = (route) => {

router.currentRoute.value.path = '/';

 router.push(route);
 baseRoute.value = route;
};

</script>
