<template>
    <ul>
        <li v-for="subItem in props.subitems" >
            <div class="ml-6" :key="subItem.title">
                <div class="flex py-2 pl-2 hover:bg-surface-100 items-center font-poppins" @click="navigateToComponent('settings' + subItem.route, subItem )">
                    <font-awesome-icon v-if=" props.currentTitle === subItem.title " :icon="fal[subItem.fontawesome]" size="sm" style="color: #009EE2;" class="py-1 w-5" /> 
                    <font-awesome-icon v-else :icon="fal[subItem.fontawesome]" size="sm" style="color: #6b7280;" class="py-1 w-5" /> 

                    <p class="text-base font-normal ml-3 text-gray-500"
                        :class="{ 'text-primaryBlue ': props.currentTitle === subItem.title }" >
                        {{ subItem.title }}
                    </p>
                </div>

                <ul v-if="subItem.nestedMenuVisible">
                    <li v-if="subItem.nestedMenuVisible">
                        <div  
                            v-for="(subSubItem, index) in subItem.subitems"
                            :key="subSubItem.title"
                            class="flex ml-6 py-2 pl-2 hover:bg-surface-100 font-poppins"
                            @click="navigateToComponent('settings' + subSubItem.route, subSubItem)">
                            <font-awesome-icon v-if="props.currentTitle === subSubItem.title" :icon="fal[subSubItem.fontawesome]" size="sm" style="color: #009EE2;" class="py-1 w-5" />
                            <font-awesome-icon v-else :icon="fal[subSubItem.fontawesome]" size="sm" style="color: #6b7280;" class="py-1 w-5" />
                            <p class="text-base font-normal ml-2 text-gray-500"
                                :class="{'text-primaryBlue ': props.currentTitle === subSubItem.title}">
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
  const settingsBaseRoute = ref(router.currentRoute.value.path);
//   const currentTitle = ref(null);
  const emit = defineEmits();

  const props = defineProps({
    subitems: {
        type: Object,
        required: true
    },
    currentTitle: {
        type: String,
        required: true
    }
  });

  onMounted(() => {
    router.afterEach((to, from) => {
        settingsBaseRoute.value = to.path;
    });
  });

  const toggleVisible = (subItem) => {
    subItem.nestedMenuVisible = !subItem.nestedMenuVisible;
  };

  const navigateToComponent = (route, subItem) => {
    subItem.nestedMenuVisible = !subItem.nestedMenuVisible;

    if (subItem.subitems.length === 0) {
        window.location.hash = subItem.componentId;
    }
    router.currentRoute.value.path = '/';
    router.push(route);
    settingsBaseRoute.value = route;
    // emit currentTitle to parent component
    emit('handleCurrentTitle', subItem.title);
    
    return;
}
                                                                                                                                                                  
const navigateToSubComponent = (route, subItem) => {
    // currentSubTitle.value = title;
    props.currentTitle = subItem.title;
    window.location.hash = subItem.componentId; 
    emit('currentTitle', subItem.title); 
}

</script>