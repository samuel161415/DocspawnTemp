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
            title: 'User administration',
            icon: "pi pi-users",
            fontawesome: "faUsers",
            route: "/workspace#members",
            componentId: "members",
            isHovered: false,
            subitems: [
              {
                title: "User directory",
                icon: "pi pi-user",
                fontawesome: "faUser",
                route: "/workspace#users",
                componentId: "users",
                isHovered: false,
                subitems: [],
              },
              {
                title: "Group directory",
                icon: "pi pi-user",
                fontawesome: "faUser",
                route: "/workspace#user-groups",
                componentId: "user-groups",
                isHovered: false,
                subitems: [],
              },
            ],
            nestedMenuVisible: false
          },
          {
            title: 'Formatting options',
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
                isHovered: false,
                subitems: [],
              },
              {
                title: "Date",
                icon: "pi pi-calendar",
                fontawesome: "faCalendar",
                route: "/workspace#date",
                componentId: "date",
                isHovered: false,
                subitems: [],
              },
              {
                title: "Checkboxes",
                icon: "pi pi-check-square",
                fontawesome: "faSquareCheck",
                route: "/workspace#checkbox-formats",
                componentId: "checkbox-formats",
                isHovered: false,
                subitems: [],
              },
            ],
            nestedMenuVisible: false
          },
          {
            title: 'Billing',
            icon: "pi pi-credit-card",
            fontawesome: "faMoneyBill",
            route: "/workspace#billing",
            isHovered: false,
            componentId:"billing",
            subitems: [],
            nestedMenuVisible: false
          }
        ]
      },
      // {
      //   title: "Lists",
      //   icon: "pi pi-list",
      //   route: "/list",
      //   isHovered: false,
      //   subitems: []
      // },
      {
        title: "Data sources",
        icon: "pi pi-users",
        fontawesome: "faCalendar",
        route: "/data_source",
        isHovered: false,
        subitems: [
          {
            title: "Lists",
            icon: "pi pi-user",
            fontawesome: "faList",
            route: "/data_source#lists",
            componentId: "lists",
            isHovered: false,
            subitems:[],
            nestedMenuVisible: false,
          },
          {
            title: "Databases",
            icon: "pi pi-users",
            fontawesome: "faDatabase",
            route: "/data_source#databases",
            isHovered: false,
            componentId: "databases",
            subitems:[],
            nestedMenuVisible: false,
          },
          {
            title: "Integrations",
            icon: "pi pi-link",
            fontawesome: "faLinkSimple",
            route: "/data_source#integration",
            isHovered: false,
            componentId: "integration",
            subitems:[],
            nestedMenuVisible: false,
          },   
        ]
      },
     
    ]);
  
    return { settingItems };
  };