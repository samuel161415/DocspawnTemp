import { ref } from 'vue';

export const useSettingItems = () => {
  const settingItems = ref([
    {
      title:'General settings',
      icon:'pi pi-user',
      route:'/settings',
      isHovered:false,
      subitems:[
        {
          title: "My profile",
          icon: "pi pi-calendar",
          fontawesome: "faUserVneck",
          route: "/#my-profile",
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
      route: '/settings/workspace',
      isHovered: false,
      subitems: [
        {
          title: "Info",
          icon: "pi pi-info-circle",
          fontawesome: "faCircleInfo",
          route: "/#info",
          isHovered: false,
          subitems: [],
          componentId:"info",
          nestedMenuVisible: false
        },
        {
          title: 'User administration',
          icon: "pi pi-users",
          fontawesome: "faUsers",
          route: "#members",
          componentId: "members",
          isHovered: false,
          subitems: [
            {
              title: "User directory",
              icon: "pi pi-user",
              fontawesome: "faUser",
              route: "/#users",
              componentId: "users",
              isHovered: false,
              subitems: [],
            },
            {
              title: "Group directory",
              icon: "pi pi-user",
              fontawesome: "faUser",
              route: "#user-groups",
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
          route: "/#field-options",
          isHovered: false,
          componentId:"field-options",
          subitems:[
            {
              title: "Time",
              icon: "pi pi-clock",
              fontawesome: "faTimer",
              route: "#time",
              componentId: "time",
              isHovered: false,
              subitems: [],
            },
            {
              title: "Date",
              icon: "pi pi-calendar",
              fontawesome: "faCalendar",
              route: "/#date",
              componentId: "date",
              isHovered: false,
              subitems: [],
            },
            {
              title: "Checkboxes",
              icon: "pi pi-check-square",
              fontawesome: "faSquareCheck",
              route: "#checkbox-formats",
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
          route: "/#billing",
          isHovered: false,
          componentId:"billing",
          subitems: [],
          nestedMenuVisible: false
        }
      ]
    },
    {
      title: "Data sources",
      icon: "pi pi-users",
      fontawesome: "faCalendar",
      route: "/settings/data_source",
      isHovered: false,
      subitems: [
        {
          title: "Lists",
          icon: "pi pi-user",
          fontawesome: "faList",
          route: "/#lists",
          componentId: "lists",
          isHovered: false,
          subitems:[],
          nestedMenuVisible: false,
        },
        {
          title: "Databases",
          icon: "pi pi-users",
          fontawesome: "faDatabase",
          route: "#databases",
          isHovered: false,
          componentId: "databases",
          subitems:[],
          nestedMenuVisible: false,
        },
        {
          title: "Integrations",
          icon: "pi pi-link",
          fontawesome: "faLinkSimple",
          route: "#integration",
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