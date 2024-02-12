<template>
  <div :style="{ width: menuWidth, transition: 'width 200ms ease-in-out' }" class="flex flex-col h-full"
    @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="overflow-y-auto w-full">
      <ul class="list-none px-3 pt-1 m-0 w-full overflow-hidden">
        <li @click="toggleMenuState" class="rounded-lg w-full cursor-pointer p-3">
          <i style="font-size: 1.2rem" class="pi pi-align-left mr-2"></i>
          <!-- <span v-if="menu === 'large'" class="font-medium">Toggle</span> -->
        </li>
        <li v-for="item in menuItems" :key="item.title" :class="itemClass(item.route)"
          :style="{ width: menuWidth, transition: 'opacity 500ms ease-in-out' }"
          class="rounded-lg w-full cursor-pointer p-3">
          <div @click="navigate(item.route)">
            <i style="font-size: 1.2rem" :class="item.icon + ' mr-2'"></i>
            <span v-if="menu === 'large'" class="font-medium">{{
              item.title
            }}</span>
          </div>
        </li>
        <div v-if="menuWidth === '230px'">
          <li v-if="menuWidth === '230px'" v-ripple v-styleclass="{
            selector: '@next',
            enterClass: 'hidden',
            enterActiveClass: 'slidedown',
            leaveToClass: 'hidden',
            leaveActiveClass: 'slideup',
          }" aria-haspopup="true" aria-controls="overlay_menu"
            class="flex p-3 items-center w-full cursor-pointer rounded-lg">
            <i style="font-size: 1.2rem" class="pi pi-cog mr-2"></i>
            <span v-if="menu === 'large'" class="font-medium">Settings</span>
            <i v-if="menu === 'large'" style="font-size: 1.2rem" class="pi pi-chevron-down ml-auto mr-3"></i>
          </li>
          <ul :class="`list-none py-0 ml-5 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all duration-200 ease-in-out ${menu === 'small' && 'hidden'
            } `">
            <li v-for="subItem in subItems" :key="subItem.title">
              <a v-ripple @click="navigate(subItem.route)" class="flex items-center cursor-pointer py-3 rounded-md">
                <i style="font-size: 1.2rem" :class="subItem.icon + ' mr-2'"></i>
                <span v-if="menu === 'large'" class="font-medium">{{
                  subItem.title
                }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div v-else style="position: relative">
          <li v-ripple @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
            class="flex p-3 items-center w-full cursor-pointer rounded-lg">
            <i style="font-size: 1.2rem" class="pi pi-cog mr-1"></i>
            <i class="pi pi-chevron-right ml-auto"></i>
          </li>
          <Menu v-if="menu === 'small' && menuWidth === '60px'" ref="submenu" style="
              left: 60px;
              box-shadow: none;
              border: none;
              border-top-left-radius: 0%;
              border-bottom-left-radius: 0%;
              position: absolute;
              top: 266px;
            " id="overlay_menu" class="shadow-none" :model="subItems" :popup="true">
            <template #item="{ item, props }">
              <a @click="props.action" v-bind="props.action" class="w-full">
                <i style="font-size: 1.2rem" :class="item.icon + ' mr-2'"></i>
                <span class="font-medium">{{ item.title }}</span>
              </a>
            </template>
          </Menu>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const submenu = ref();
const router = useRouter();
const route = useRoute();
const menu = ref("float");
const prevMenuState = ref("float");
const toggle = (event) => {
  if (menu.value === "small") {
    submenu?.value?.toggle(event);
  }
};

const toggleMenuState = () => {
  if (menu.value === "large" && prevMenuState.value === "float") {
    menu.value = "small";
    prevMenuState.value = "";
  } else {
    switch (menu.value) {
      case "small":
        menu.value = "large";
        break;
      case "large":
        menu.value = "float";
        break;
      case "float":
        menu.value = "small";
        break;
      default:
        menu.value = "small";
    }
  }
};

const handleMouseEnter = () => {
  if (menu.value === "float") {
    prevMenuState.value = menu.value;
    menu.value = "large";
  }
};

const handleMouseLeave = () => {
  if (prevMenuState.value === "float") {
    menu.value = "float";
  }
};

const itemClass = (itemRoute) => [
  route.path === itemRoute ? "bg-[#009ee21a]" : "",
];

const navigate = (route) => {
  router.push(route);
};
const menuWidth = computed(() => {
  return menu.value === "small" || menu.value === "float" ? "60px" : "230px";
});
const menuItems = ref([
  { title: "Home", icon: "pi pi-home", route: "/" },
  { title: "Templates", icon: "pi pi-file-edit", route: "/templates" },
  {
    title: "Documents Library",
    icon: "pi pi-server",
    route: "/document-library",
  },
  { title: "Data Library", icon: "pi pi-chart-bar", route: "/data-library" },
]);
const subItems = [
  {
    title: "List",
    icon: "pi pi-list",
    route: "/",
    command: () => {
      router.push("/");
    },
  },
  {
    title: "Field formats",
    icon: "pi pi-home",
    route: "/",
    command: () => {
      router.push("/");
    },
  },
  {
    title: "Archive",
    icon: "pi pi-sliders-h",
    route: "/",
    command: () => {
      router.push("/");
    },
  },
  {
    title: "User",
    icon: "pi pi-user",
    route: "/",
    command: () => {
      router.push("/");
    },
  },
];
</script>

<style>
/* styling */
.custom-menu-position {
  position: absolute;
  top: 50px;
  left: 100px !important;
  background: red;
  /* Additional styling */
}
</style>
