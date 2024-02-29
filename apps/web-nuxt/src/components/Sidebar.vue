<template>
  <!-- side bar component -->
  <div class="z-auto sticky bg-white mb-0">

    <div class="z-50 fixed mt-14" :class="{ 'w-20': isCollapsed, 'w-60': !isCollapsed }">
      <button
        class="absolute justify-end z-10 top-18 -right-5 rounded-full w-12 h-12 text-center items-center bg-gray-50 p-3 shadow-xl hover:bg-primaryBlue hover:text-white"
        @click="toggleCollapse">
        <i style="font-size: 1.5rem" :class="{ 'pi pi-caret-right': isCollapsed, 'pi pi-caret-left': !isCollapsed, }"></i>
      </button>
    </div>

    <div class=" flex flex-col justify-between  h-full"
      :class="{ 'w-20 justify-center overflow-x-hidden': isCollapsed, 'w-60': !isCollapsed, 'py-6': true }">

      <ul class="mt-2">
        <!-- Logo -->
        <div class="mb-7 ml-3 " :class="{ 'flex justify-center items-center mt-2': isCollapsed }">
          <NuxtLink to="/">

            <img v-if="!isCollapsed" src="../assets/Logo.png" class="w-40 h-auto" />
            <img v-else src="../assets/LogoSquare.png" class=" w-14 h-10" />

          </NuxtLink>
        </div>
        <!-- menu Items -->
        <li v-for="item in menuItems" :key="item.title" class=" w-full cursor-pointer px-3 ml-2 "
          :class="{ '': isCollapsed, 'mb-2': !isCollapsed, 'border-l-2 text-primaryBlue border-primaryBlue': baseRoute === item.route }">

          <div :key="item.title" class="hover:bg-primaryBlue hover:text-white rounded-md flex text-center items-center"
            :class="{ 'flex-col text-center items-center py-2 mr-2 text-sm': isCollapsed, 'my-2 py-3 px-3': !isCollapsed, }"
            @click="navigate(item.route)" @mouseenter="setIsHovered(item, true)" @mouseleave="setIsHovered(item, false)">

            <i v-if="isCollapsed" style="font-size: 1.5rem" class="text-gray-500 text-center mb-2 py-3" :class="[
              item.icon, 'mr-2',
              {
                'text-white': item.isHovered,
                'text-primaryBlue': baseRoute === item.route,
                'text-gray-500': !item.isHovered
              }
            ]">
            </i>

            <i v-if="!isCollapsed" style="font-size: 1.4rem"
              :class="[item.icon, 'mr-2', { 'text-white': item.isHovered, 'text-primaryBlue': baseRoute === item.route, 'text-gray-500': !item.isHovered }]">
            </i>

            <span v-if="!isCollapsed" class=" text-lg font-medium text-gray-500 ml-2 " :class="{
              'text-white': item.isHovered,

              'text-primaryBlue text-lg': baseRoute === item.route,
              'text-gray-500': !item.isHovered
            }">
              {{ item.title }}
            </span>
          </div>
        </li>
      </ul>

      <ul>
        <!-- settings -->
        <li class="mt-7  cursor-pointer ml-2 mr-2 w-full  py-4">

          <hr class="text-gray-300 mx-4" />
          <div class="px-3" :class="{ 'border-l-2 text-primaryBlue border-primaryBlue': openSubMenu }">

            <div class="hover:bg-primaryBlue hover:text-white  rounded-md mt-2 flex  text-center items-center"
              :class="{ ' px-2  mr-2 text-sm': isCollapsed, ' py-3 px-3': !isCollapsed, 'text-primaryBlue': openSubMenu }"
              @mouseenter="settingHovered = true" @mouseleave="settingHovered = false" @click="toggle">

              <i v-if="isCollapsed" class="pi pi-cog cursor-pointer text-gray-500  text-center mb-2 py-3"
                style="font-size: 1.5rem" :class="{
                  'text-white': settingHovered,
                  'text-primaryBlue': openSubMenu,
                }"></i>

              <i v-if="!isCollapsed" style="font-size: 1.4rem" class="pi pi-cog text-gray-500 mr-2" :class="{
                'text-white': settingHovered,
                'text-primaryBlue': openSubMenu,
              }">
              </i>
              <span v-if="!isCollapsed" class=" text-lg font-medium text-gray-500 ml-2 " :class="{
                'text-white': settingHovered,
                'text-primaryBlue': openSubMenu,
              }">
                Settings
              </span>
            </div>
          </div>

        </li>

        <!-- avatar -->
        <div class="flex  mt-auto px-4 "
          :class="{ 'space-y-2 flex-col justify-center items-center': isCollapsed, 'space-x-2 ml-2': !isCollapsed }">

          <span class="relative inline-block">
            <img class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="" />
            <span class="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
          </span>

          <p v-if="!isCollapsed" class="text-gray-500 text-center pt-2" :class="{ 'ml-14': !isCollapsed }">John Doe</p>

        </div>
      </ul>
    </div>

    <!-- setting popup -->
    <OverlayPanel ref="op" style="height: 0px; width: 0; margin-left: 6px;" @hide="openSubMenu = false">

      <div class="pop_up absolute border border-gray-100 bg-white z-5  h-44 bottom-0 mb-5 p-4 rounded-sm w-60"
        :class="{ ' ml-8': isCollapsed, ' ml-48 ': !isCollapsed }">

        <ul class=" z-1">
          <li v-for="subItem in subItems" :key="subItem.title" class="rounded-lg cursor-pointer flex flex-col">
            <div :key="subItem.title" class=" rounded-md flex px-4 py-2"
              :class="{ 'bg-primaryBlue': baseRoute === subItem.route }" @click="navigate(subItem.route)"
              @mouseenter="setSubIsHovered(subItem, true)" @mouseleave="setSubIsHovered(subItem, false)">

              <i style="font-size: 1rem" class="space-y-2 "
                :class="['pi pi-cog', 'mr-2', { 'text-primaryBlue': subItem.isHovered || baseRoute === subItem.route, 'text-gray-500': !subItem.isHovered }]">
              </i>

              <span class=" text-base font-medium ml-2 "
                :class="{ 'text-primaryBlue': subItem.isHovered || baseRoute === subItem.route, 'text-gray-500': !subItem.isHovered }">{{
                  subItem.title }}</span>
            </div>
          </li>
        </ul>
      </div>
    </OverlayPanel>

  </div>
</template>
  

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useMenuItems, useSubItems } from '../services/menuItems';

const router = useRouter();

const baseRoute = ref(router.currentRoute.value.path);

const isCollapsed = ref(false);

const settingHovered = ref(false);

const op = ref();

const navigate = (route) => {

  router.push(route);
  baseRoute.value = route;
};

// nav bar items
const { menuItems } = useMenuItems();

const { subItems } = useSubItems();

//   mouse hover effect
const setIsHovered = (item, val) => {
  item.isHovered = val;
};

const setSubIsHovered = (subItem, val) => {

  subItem.isHovered = val;
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

// toggle the overlay panel
const toggle = (event) => {
  openSubMenu.value = !openSubMenu.value;
  op.value.toggle(event);
}

// toggle the side bar
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

</script>
  
<style scoped>
.pop_up {
  z-index: 10000 !important;

}
</style>