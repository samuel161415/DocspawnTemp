<template>

    <div class=" bg-white mb-0 border-l border-surface-100">
        <div class=" flex flex-col justify-between  h-full overflow-y-scroll w-60 py-6">
            <ul class="mt-2 ">
                
                <li 
                    v-for="items in settingItems" :key="items.title" 
                    class="cursor-pointer flex flex-col mt-2  w-full mr-4 ">
                    <div :key="items.title" class=" rounded flex px-2 py-3  ml-1"
                        :class="{ 'bg-primaryBlue': baseRoute === items.route }" 
                        @click="navigate('settings' + items.route)"
                        @mouseenter="setSettingsIsHovered(items, true)" 
                        @mouseleave="setSettingsIsHovered(items, false)">

                        <span class=" text-base font-medium ml-2 "
                            :class="{ 'text-surface-600': items.isHovered || baseRoute === items.route, 'text-gray-500': !items.isHovered }">{{
                            items.title }}
                        </span>
                    </div>
                   <ul >
                    <li v-for="subItem in items.subitems">
                        <div 
                            :key="subItem.title"
                            class="ml-8 py-2 border-l pl-2 hover:bg-surface-100 hover:border-l hover:border-surface-500"
                            @click="navigate('settings' + subItem?.route)" >
                            <p class="text-base font-normal ml-2 text-gray-500">
                                {{ subItem?.title }}
                            </p>
                        </div>
                    </li>
                   </ul>
                </li>
            </ul>
        </div>
    </div>

</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useSettingItems } from '../../services/menuItems';

const { settingItems } = useSettingItems();

const router = useRouter();

const baseRoute = ref(router.currentRoute.value.path);

const setSettingsIsHovered = (items, val) => {
  items.isHovered = val;
};


const navigate = (route) => {
 
 router.currentRoute.value.path = '/';

 router.push(route);
 baseRoute.value = route;
};

</script>
