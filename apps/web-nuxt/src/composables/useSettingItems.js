import { ref } from 'vue';

export const useSettingItems = () => {
    const settingItems = ref([
      {
        title:'Settings',
        icon:'pi pi-user',
        route:'/',
        isHovered:false,
        subitems:[
          {
            title: "Time zone",
            icon: "pi pi-list",
            route: "/settings",
            isHovered: false,
            subitems: [],
            nestedMenuVisible: false
          
          },
          {
            title: "Dark mode",
            icon: "pi pi-list",
            route: "/settings",
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
            route: "/workspace",
            componentId: "members",
            isHovered: false,
            subitems: [
              {
                title: "User groups",
                icon: "pi pi-list",
                route: "/list",
                componentId: "user-groups",
                isHovered: false
              },
              {
                title: "User roles",
                icon: "pi pi-list",
                route: "/workspace",
                componentId: "user-roles",
                isHovered: false
              },
              {
                title: "Billing",
                icon: "pi pi-list",
                route: "/workspace",
                componentId: "billing",
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
            componentId: "lists",
            subitems:[]
          },
          {
            title: "Sublists",
            icon: "pi pi-list",
            route: "/list",
            isHovered: false,
            nestedMenuVisible: false,
            componentId: "sublists",
            subitems:[]
          },
          {
            title: "Associative lists",
            icon: "pi pi-list",
            route: "/list",
            isHovered: false,
            nestedMenuVisible: false,
            componentId: "associative-lists",
            subitems:[]
          }
        ]
      },
      {
        title: "User management",
        icon: "pi pi-sliders-h",
        route: "/user_management",
        isHovered: false,
        subitems: [
          {
            title: "User groups",
            icon: "pi pi-list",
            route: "/user_management",
            isHovered: false,
            componentId: "user-groups",
            nestedMenuVisible: false,
          },
          {
            title: "User roles",
            icon: "pi pi-list",
            route: "/user_management",
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
        route: "/integration",
        isHovered: false,
        subitems:[]
      },
     
    ]);
  
    return { settingItems };
  };