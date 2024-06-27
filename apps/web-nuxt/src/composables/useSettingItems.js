import { ref } from 'vue';

export const useSettingItems = () => {
    const settingItems = ref([
      {
        title:'General settings',
        icon:'pi pi-user',
        route:'/',
        isHovered:false,
        subitems:[
          {
            title: "My profile",
            icon: "pi pi-calendar",
            fontawesome: "faUserVneck",
            route: "#my-profile",
            isHovered: false,
            subitems: [],
            componentId:"my-profile",
            nestedMenuVisible: false
          
          },
          {
            title: "Language & Region",
            icon: "pi pi-language",
            fontawesome: "faLanguage",
            route: "#language-region",
            isHovered: false,
            subitems: [],
            componentId:"language-region",
            nestedMenuVisible: false
          
          },
          {
            title: "Time & date format",
            icon: "pi pi-clock",
            fontawesome: "faCalendar",
            route: "/#time-date-format",
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
            fontawesome: "faCircleInfo",
            route: "/workspace#info",
            isHovered: false,
            subitems: [],
            componentId:"info",
            nestedMenuVisible: false
          
          },
          {
            title: 'Members',
            icon: "pi pi-users",
            fontawesome: "faUsers",
            route: "/workspace#members",
            componentId: "members",
            isHovered: false,
            subitems: [
              {
                title: "Users",
                icon: "pi pi-user",
                fontawesome: "faUser",
                route: "/workspace#users",
                componentId: "users",
                isHovered: false
              },
              {
                title: "User groups",
                icon: "pi pi-user",
                fontawesome: "faUser",
                route: "/workspace#user-groups",
                componentId: "user-groups",
                isHovered: false
              },
            ],
            nestedMenuVisible: false
          },
          {
            title: 'Custom formatting',
            icon: "pi pi-table",
            fontawesome: "faSwatchbook",
            route: "/workspace#field-options",
            isHovered: false,
            componentId:"field-options",
            subitems:[
              {
                title: "Time",
                icon: "pi pi-clock",
                fontawesome: "faTimer",
                route: "/workspace#time",
                componentId: "time",
                isHovered: false
              },
              {
                title: "Date",
                icon: "pi pi-calendar",
                fontawesome: "faCalendar",
                route: "/workspace#date",
                componentId: "date",
                isHovered: false
              },
              {
                title: "Checkboxes",
                icon: "pi pi-check-square",
                fontawesome: "faSquareCheck",
                route: "/workspace#checkbox-formats",
                componentId: "checkbox-formats",
                isHovered: false,
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
      // {
      //   title: "User management",
      //   icon: "pi pi-users",
      //   fontawesome: "faCalendar",
      //   route: "/user_management",
      //   isHovered: false,
      //   subitems: [
      //     {
      //       title: "Users",
      //       icon: "pi pi-user",
      //       fontawesome: "faCalendar",
      //       route: "/user_management",
      //       componentId: "users",
      //       isHovered: false,
      //       nestedMenuVisible: false,
      //     },
      //     {
      //       title: "User groups",
      //       icon: "pi pi-users",
      //       fontawesome: "faCalendar",
      //       route: "/user_management",
      //       isHovered: false,
      //       componentId: "user-groups",
      //       nestedMenuVisible: false,
      //     },
               
      //   ]
      // },
      {
        title: "Billings",
        icon: "pi pi-credit-card",
        fontawesome: "faCalendar",
        route: "/billings",
        isHovered: false,
        subitems:[]
      },
      {
        title: "Integrations",
        icon: "pi pi-link",
        fontawesome: "faCalendar",
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
            fontawesome: "faCalendar",
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