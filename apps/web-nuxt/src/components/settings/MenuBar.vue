<template>

    <div class=" bg-white mb-0 border-l border-surface-100">
        <div class=" flex flex-col justify-between  h-full overflow-y-scroll w-60 py-6">
            <ul class="mt-2 ">
                
                <li 
                    v-for="items in settingItems" :key="items.title" 
                    class="cursor-pointer flex flex-col mt-2  w-full mr-4 ">
                    <div :key="items.title" class="  flex px-2 py-3  ml-1 hover:bg-surface-100 "
                        :class="{ 'bg-primaryBlue': baseRoute === items.route }" 
                        @click="navigate('settings' + items.route)"
                     >

                        <span class=" text-lg font-medium ml-2 "
                            :class="{ 'text-surface-600': items.isHovered || baseRoute === items.route, 'text-gray-500': !items.isHovered }">{{
                            items.title }}
                        </span>
                    </div>
                   <ul >
                    <li v-for="subItem in items.subitems" >
                        <div class="border-l ml-8">

                            <div 
                                :key="subItem.title"
                                class=" py-2 space-y-2 pl-2 hover:bg-surface-100 hover:border-l hover:border-surface-400"
                                @click="handleDisplaynestedMenuVisible(subItem)" >
                                <p class="text-lg font-normal ml-2 text-gray-500">
                                    {{ subItem?.title }}
                                </p>
                            </div>
                            <ul>
                                <li v-if="subItem.nestedMenuVisible">
                                    <div  
                                        v-for="subSubItem in subItem.subitems"
                                        :key="subSubItem.title"
                                        class="ml-6 py-2 border-l pl-2 hover:bg-surface-100 hover:border-l hover:border-surface-500"
                                        @click="handleSubSubItemClick(subSubItem)"  >
                                        <p class="text-lg font-normal ml-2 text-gray-500">
                                            {{ subSubItem?.title }}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
               
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
import { useSettingItems } from '../../services/menuItems';

const { settingItems } = useSettingItems();

const router = useRouter();

const baseRoute = ref(router.currentRoute.value.path);

const handleDisplaynestedMenuVisible = (item) => {

    item.nestedMenuVisible = !item.nestedMenuVisible;
    navigate('settings' + item.route);
};

const handleSubSubItemClick = (subSubItem) => {
    nextTick(() => {
            const element = document.getElementById(subSubItem.componentId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
};

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
