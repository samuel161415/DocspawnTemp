import { ref } from 'vue';

export const useSettingItems = () => {
    const settingItems = ref([
      {
        title:'General',
        icon:'pi pi-user',
        route:'/',
        isHovered:false,
        subitems:[
          {
            title: "My profile",
            icon: "pi pi-calendar",
            route: "/settings",
            isHovered: false,
            subitems: [],
            componentId:"my-profile",
            nestedMenuVisible: false
          
          },
          {
            title: "Language & Region",
            icon: "pi pi-language",
            route: "/settings",
            isHovered: false,
            subitems: [],
            componentId:"language-region",
            nestedMenuVisible: false
          
          },
          {
            title: "Time & date format",
            icon: "pi pi-clock",
            route: "/settings",
            isHovered: false,
            subitems: [],
            componentId:"time-date-format",
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
            title: "Info",
            icon: "pi pi-info-circle",
            route: "/settings",
            isHovered: false,
            subitems: [],
            componentId:"info",
            nestedMenuVisible: false
          
          },
          {
            title: 'Members',
            icon: "pi pi-users",
            route: "/workspace",
            componentId: "members",
            isHovered: false,
            subitems: [
              {
                title: "Users",
                icon: "pi pi-user",
                route: "/workspace",
                componentId: "user-roles",
                isHovered: false
              },
              {
                title: "User groups",
                icon: "pi pi-user",
                route: "/list",
                componentId: "user-groups",
                isHovered: false
              },
            ],
            nestedMenuVisible: false
          },
          {
            title: 'Field options',
            icon: "pi pi-table",
            route: "/workspace_management",
            isHovered: false,
            componentId:"field-options",
            subitems:[
              {
                title: "Time & Date",
                icon: "pi pi-clock",
                route: "/workspace",
                componentId: "user-roles",
                isHovered: false
              },
              {
                title: "Checkboxes",
                icon: "pi pi-check-square",
                route: "/workspace",
                componentId: "user-roles",
                isHovered: false
              },
            ],
            nestedMenuVisible: false
          }
        ]
      },
      {
        title: "Lists",
        icon: "pi pi-list",
        route: "/list",
        isHovered: false,
        subitems: []
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
            title: "Users",
            icon: "pi pi-user",
            route: "/user_management",
            componentId: "users",
            isHovered: false,
            nestedMenuVisible: false,
          },
          {
            title: "User groups",
            icon: "pi pi-users",
            route: "/user_management",
            isHovered: false,
            componentId: "user-groups",
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
        title:"Meta admin",
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