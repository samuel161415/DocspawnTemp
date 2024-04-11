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
            icon: "pi pi-calendar",
            route: "/settings",
            isHovered: false,
            subitems: [],
            nestedMenuVisible: false
          
          },
          {
            title: "Dark mode",
            icon: "pi pi-moon",
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
            icon: "pi pi-users",
            route: "/workspace",
            componentId: "members",
            isHovered: false,
            subitems: [
              {
                title: "User groups",
                icon: "pi pi-user",
                route: "/list",
                componentId: "user-groups",
                isHovered: false
              },
              {
                title: "User roles",
                icon: "pi pi-user",
                route: "/workspace",
                componentId: "user-roles",
                isHovered: false
              },
            ],
            nestedMenuVisible: false
          },
          {
            title: 'Workspace management',
            icon: "pi pi-table",
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
            icon: "pi pi-bars",
            route: "/list",
            isHovered: false,
            nestedMenuVisible: false,
            componentId: "sublists",
            subitems:[]
          },
          {
            title: "Associative lists",
            icon: "pi pi-sort-amount-up-alt",
            route: "/list",
            isHovered: false,
            nestedMenuVisible: false,
            componentId: "associative-lists",
            subitems:[]
          }
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
            icon: "pi pi-clock",
            componentId: "date-formats",
            route: "/field_formats",
            isHovered: false,
            nestedMenuVisible: false,
            subitems:[]
          },
          {
            title: "Checkboxes ",
            icon: "pi pi-check-square",
            route: "/field_formats",
            componentId: "checkbox-formats",
            isHovered: false,
            nestedMenuVisible: false,
            subitems:[]
          },
        ]
      },
      {
        title: "User management",
        icon: "pi pi-users",
        route: "/user_management",
        isHovered: false,
        subitems: [
          {
            title: "User groups",
            icon: "pi pi-users",
            route: "/user_management",
            isHovered: false,
            componentId: "user-groups",
            nestedMenuVisible: false,
          },
          {
            title: "User roles",
            icon: "pi pi-user",
            route: "/user_management",
            componentId: "archive2",
            isHovered: false,
            nestedMenuVisible: false,
          },     
        ]
      },
      {
        title: "Billings",
        icon: "pi pi-credit-card",
        route: "/billings",
        isHovered: false,
        subitems:[]
      },
      {
        title: "Integrations",
        icon: "pi pi-link",
        route: "/integration",
        isHovered: false,
        subitems:[]
      },
      {
        title:"Meta Admin",
        icon:"",
        route:'/meta_admin',
        isHovered:false,
        subitems:[
          {
            title: "Microservice",
            icon: "pi pi-compass",
            route: "/meta_admin",
            isHovered: false,
            componentId: "micro-services",
            nestedMenuVisible: false,
          },
        ]
      }
     
    ]);
  
    return { settingItems };
  };