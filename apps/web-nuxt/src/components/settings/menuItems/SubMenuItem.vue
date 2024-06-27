<template>
    <ul>
        <li v-for="subItem in props.subitems" >
            <div @click="navigateToComponent('settings' + subItem.route, subItem )" class="ml-6" :key="subItem.title">
                <div class="flex py-2 pl-2 hover:bg-surface-100 items-center  font-poppins" @click="toggleVisible(subItem)">
                    <!-- <i style="font-size: 0.9rem" :class="[subItem.icon, ' py-1 ', currentTitle === subItem.title ? 'text-primaryBlue ': 'text-gray-500']"></i> -->
                    <font-awesome-icon v-if=" currentTitle === subItem.title " :icon="fal[subItem.fontawesome]" size="sm" style="color: #009EE2;" class="py-1 w-5" /> 
                    <font-awesome-icon v-else :icon="fal[subItem.fontawesome]" size="sm" style="color: #6b7280;" class="py-1 w-5" /> 

                    <p class="text-base font-normal ml-3 text-gray-500"
                        :class="{ 'text-primaryBlue ': currentTitle === subItem.title }" >
                        {{ subItem.title }}
                    </p>
                </div>

                <ul v-if="subItem.nestedMenuVisible">
                    <li v-if="subItem.nestedMenuVisible">
                        <div  
                            v-for="(subSubItem, index) in subItem.subitems"
                            :key="subSubItem.title"
                            class="flex ml-6 py-2 pl-2 hover:bg-surface-100 font-poppins"
                            @click="navigateToSubComponent(subSubItem.componentId, subSubItem.title, index)">
                            <!-- <i style="font-size: 0.9rem" :class="[subSubItem?.icon, 'py-1 ml-1 text-gray-500', currentSubTitle === subSubItem.title ? 'text-primaryBlue ': 'text-gray-500']"></i> -->
                            <font-awesome-icon v-if="currentSubTitle === subSubItem.title" :icon="fal[subSubItem.fontawesome]" size="sm" style="color: #009EE2;" class="py-1 w-5" />
                            <font-awesome-icon v-else :icon="fal[subSubItem.fontawesome]" size="sm" style="color: #6b7280;" class="py-1 w-5" />
                            <p class="text-base font-normal ml-2 text-gray-500"
                                :class="{'text-primaryBlue ': currentSubTitle === subSubItem.title}">
                                {{ subSubItem?.title }}
                            </p>
                        </div>
                    </li> 
                </ul>
            </div>
        </li>
    </ul>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { fal } from '@fortawesome/pro-light-svg-icons';

  const router = useRouter();

  const props = defineProps({
    subitems: {
        type: Object,
        required: false
    }
  });

  const settingsBaseRoute = ref(router.currentRoute.value.path);
  const currentId = ref(null);
  const currentTitle = ref(null);
  const currentSubTitle = ref(null);

  onMounted(() => {
    router.afterEach((to, from) => {
        settingsBaseRoute.value = to.path;
    });
  });

  const toggleVisible = (subItem) => {
    subItem.nestedMenuVisible = !subItem.nestedMenuVisible;
  };

  const navigateToComponent = (route, subItem) => {

    if (subItem.subitems.length === 0) {
        window.location.hash = subItem.componentId;
    }
    currentTitle.value = subItem.title;
    router.currentRoute.value.path = '/';
    router.push(route);
    settingsBaseRoute.value = route;
  
}
                                                                                                                                                                  
const navigateToSubComponent = (id, title, index) => {

    currentSubTitle.value = title;
    window.location.hash = id;  

}
  </script>