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
        title:'Settings',
        icon:'pi pi-user',
        route:'/account',
        isHovered:false,
        subitems:[
          {
            title: "Time zone",
            icon: "pi pi-list",
            route: "/general",
            isHovered: false,
            subitems: [],
            nestedMenuVisible: false
          
          },
          {
            title: "Dark mode",
            icon: "pi pi-list",
            route: "/general",
            isHovered: false,
            subitems: [],
            nestedMenuVisible: false
          
          }
        ]
      },
      {
        title: 'Workspace',
        icon: 'pi pi-home',
        route: '/workspace',
        isHovered: false,
        subitems: [
          {
            title: 'Members',
            icon: "pi pi-list",
            route: "/members",
            isHovered: false,
            subitems: [
              {
                title: "User groups",
                icon: "pi pi-list",
                route: "/list",
                isHovered: false
              },
              {
                title: "User roles",
                icon: "pi pi-list",
                route: "/list",
                isHovered: false
              },
              {
                title: "Billing",
                icon: "pi pi-list",
                route: "/list",
                isHovered: false
              },
            ],
            nestedMenuVisible: false
          },
          {
            title: 'Workspace management',
            icon: "pi pi-list",
            route: "/workspace_management",
            isHovered: false,
            subitems:[],
            nestedMenuVisible: false
          }
        ]
      },
      {
        title: "Lists",
        icon: "pi pi-list",
        route: "/list",
        isHovered: false,
        subitems: [
          {
            title: "Lists",
            icon: "pi pi-list",
            route: "/list",
            isHovered: false,
            nestedMenuVisible: false,
            subitems:[]
          },
          {
            title: "Sublists",
            icon: "pi pi-list",
            route: "/list",
            isHovered: false,
            nestedMenuVisible: false,
            subitems:[]
          },
          {
            title: "Associative lists",
            icon: "pi pi-list",
            route: "/list",
            isHovered: false,
            nestedMenuVisible: false,
            subitems:[]
          }
        ]
      },
      {
        title: "User management",
        icon: "pi pi-sliders-h",
        route: "/archive",
        isHovered: false,
        subitems: [
          {
            title: "User groups",
            icon: "pi pi-list",
            route: "/archive",
            componentId: "archive1",
            isHovered: false,
            nestedMenuVisible: false,
          },
          {
            title: "User roles",
            icon: "pi pi-list",
            route: "/archive",
            componentId: "archive2",
            isHovered: false,
            nestedMenuVisible: false,
          },     
        ]
      },
      
      {
        title: "Formatting options",
        icon: "pi pi-home",
        route: "/field_formats",
        isHovered: false,
        subitems: [
          {
            title: "Time & Date",
            icon: "pi pi-list",
            componentId: "date-formats",
            route: "/field_formats",
            isHovered: false,
            nestedMenuVisible: false,
            subitems:[]
          },
          {
            title: "Checkboxes ",
            icon: "pi pi-list",
            route: "/field_formats",
            componentId: "checkbox-formats",
            isHovered: false,
            nestedMenuVisible: false,
            subitems:[]
          },
        ]
      },
      {
        title: "Integrations",
        icon: "pi pi-link",
        route: "/integrations",
        isHovered: false,
        subitems:[]
      },
     
    ]);
  
    return { settingItems };
  };