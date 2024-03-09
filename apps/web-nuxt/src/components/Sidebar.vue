<template>
  <!-- side bar component -->
  <div 
    class="z-20 sticky bg-white mb-0  " 
    :style="{ width: menuWidth, transition: 'width 200ms ease-in-out' }">

    <div 
      class="z-50 fixed mt-10" 
      :class="{ 'w-16': isCollapsed, 'w-60': !isCollapsed }">
      <button
        class="absolute justify-center z-10 top-18 -right-5 rounded-full w-12 h-12 text-center items-center bg-gray-50 px-2 py-2 shadow-sm hover:bg-primaryBlue hover:text-white"
        @click="toggleCollapse">
        <i style="font-size: 1.5rem" :class="{ 'pi pi-caret-right': isCollapsed, 'pi pi-caret-left': !isCollapsed }"/>
      </button>
    </div>

    <div 
      class=" flex flex-col justify-between  h-full overflow-y-scroll overflow-x-hidden"
      :class="{ 'w-16 justify-center overflow-x-hidden': isCollapsed, 'w-60': !isCollapsed, 'py-4': true }">

      <ul class="mt-0">
        <!-- Logo -->
        <div class="mb-7 flex pl-3" >
          <NuxtLink to="/">
            <div class="flex">
              <img  src="../assets/icons/LogoMark.svg" class="w-12 h-auto " />
              <img v-if="!isCollapsed" src="../assets/icons/logotext.svg" class="w-36 ml-1 h-auto" />
            </div>
          </NuxtLink>
        </div>

        <!-- menu Items -->
        <li 
          v-for="item in menuItems" 
          :key="item.title" 
          class="w-full cursor-pointer ml-1"
          :class="{ 'border-l text-primaryBlue border-primaryBlue ': baseRoute === item.route }">

          <div 
            :key="item.title" 
            class="hover:bg-primaryBlue hover:text-white flex text-center items-center my-1 px-4 py-1"
            @click="navigate(item.route)" 
            
            @mouseenter="setIsHovered(item, true)" 
            @mouseleave="setIsHovered(item, false)">

            <i style="font-size: 1.2rem"
              :class="[
                item.icon, 
                'py-3',
                { 
                  'mr-2' : !isCollapsed, 
                  'text-center ml-1': isCollapsed,
                  'text-white': item.isHovered, 
                  'text-primaryBlue': baseRoute === item.route, 
                  'text-gray-500': !item.isHovered
                }]">
            </i>
               
            <span v-if="!isCollapsed " 
              class=" text-lg font-medium text-gray-500 ml-3" 
              :class="{
                'text-white': item.isHovered,
                'text-primaryBlue text-base': baseRoute === item.route,
                'text-gray-500': !item.isHovered
              }">
              {{ item.title }}
            </span>

            <div 
              v-if="isCollapsed && item.isHovered" 
              class="pop_up absolute  bg-white z-50 py-2 w-max px-3 rounded-md shadow-sm border border-surface-50"
              :style="{ marginLeft: '2rem', left: '50%'}">

              <p class="text-sm font-medium text-gray-600" >
                {{ item.title }}
              </p>
            </div>

          </div>
        </li>
      </ul>

      <ul>
        <!-- avatar -->
        <div 
          class="flex  mt-auto px-3 "
          :class="{ 'space-y-2 flex-col justify-center items-center': isCollapsed, 'space-x-2 ml-1': !isCollapsed }">

          <span class="relative inline-block">
            <img class="h-9 w-9 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="" />
            <span class="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
          </span>

          <p 
            v-if="!isCollapsed" 
            class="text-gray-500 text-center pt-2" 
            :class="{ 'ml-14': !isCollapsed }">
            John Doe
          </p>

        </div>
      </ul>
    </div>

  </div>
</template>
  

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useMenuItems } from '../services/menuItems';

const router = useRouter();

const baseRoute = ref(router.currentRoute.value.path);

const isCollapsed = ref(false);

const op = ref();

const navigate = (route) => {
 
  router.currentRoute.value.path = '/';

  router.push(route);
  baseRoute.value = route;
};


// nav bar items
const { menuItems } = useMenuItems();

//   mouse hover effect
const setIsHovered = (item, val) => {
  item.isHovered = val;
  op.value.toggle(event);
};


// check if the window is resized
const handleResize = () => {
  isCollapsed.value = window.innerWidth <= 768;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

const openSubMenu = ref(false);

// toggle the side bar
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

</script>
  
<style scoped>
.pop_up {
  z-index: 9999 !important;

}
</style>