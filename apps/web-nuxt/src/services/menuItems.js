import { ref } from 'vue';


export const useMenuItems = () => {
  const menuItems = ref([
    {
      title: "Home",
      icon: "pi pi-home",
      route: "/",
      isHovered: false
    },
    {
        title: "Templates",
        icon: "pi pi-file-edit",
        route: "/templates",
        isHovered: false
      },
      {
        title: "Documents Library",
        icon: "pi pi-server",
        route: "/document-library",
        isHovered: false
      },
      {
        title: "Data Library",
        icon: "pi pi-chart-bar",
        route: "/data-library",
        isHovered: false
      },
      {
        title: "Settings",
        icon: "pi pi-cog",
        route: "/settings",
        isHovered: false
      }
  ]);

  return { menuItems };
};

export const useSettingItems = () => {
    const settingItems = ref([
      {
        title: "List",
        icon: "pi pi-list",
        route: "/list",
        isHovered: false,
        subitems: [
          {
            title: "List 1",
            icon: "pi pi-list",
            route: "/list",
            isHovered: false
          },
          {
            title: "List 2",
            icon: "pi pi-list",
            route: "/list",
            isHovered: false
          }
        ]
      },
      {
        title: "Field formats",
        icon: "pi pi-home",
        route: "/field-formats",
        isHovered: false,
        subitems: [
          {
            title: "Date formats",
            icon: "pi pi-list",
            route: "/field-formats/date_formats",
            isHovered: false
          },
          {
            title: "list formats",
            icon: "pi pi-list",
            route: "/field-formats/list_formats",
            isHovered: false
          },
          {
            title: "Checkbox formats ",
            icon: "pi pi-list",
            route: "/field-formats/checkbox_formats",
            isHovered: false
          },
        ]
      },
      {
        title: "Archive",
        icon: "pi pi-sliders-h",
        route: "/archive",
        isHovered: false,
        subitems: [
          {
            title: "Archive 1",
            icon: "pi pi-list",
            route: "/archive",
            isHovered: false
          },
          {
            title: "Archive 2",
            icon: "pi pi-list",
            route: "/archive",
            isHovered: false
          },     
        ]
      },
      {
        title: "User",
        icon: "pi pi-users",
        route: "/users",
        isHovered: false,
        subitems:[]
      },
     
    ]);
  
    return { settingItems };
  };