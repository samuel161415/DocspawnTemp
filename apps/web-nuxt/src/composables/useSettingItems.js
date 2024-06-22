import { ref } from 'vue'

export function useSettingItems() {
  const settingItems = ref([
    {
      title: 'General',
      icon: 'pi pi-user',
      route: '/',
      isHovered: false,
      subitems: [
        {
          title: 'Time zone',
          icon: 'pi pi-calendar',
          route: '/settings',
          isHovered: false,
          subitems: [],
          nestedMenuVisible: false,

        },
        {
          title: 'Dark mode',
          icon: 'pi pi-moon',
          route: '/settings',
          isHovered: false,
          subitems: [],
          nestedMenuVisible: false,

        },
      ],
    },
    {
      title: 'Workspace',
      icon: 'pi pi-home',
      route: '/workspace',
      isHovered: false,
      subitems: [
        {
          title: 'Members',
          icon: 'pi pi-users',
          route: '/workspace',
          componentId: 'members',
          isHovered: false,
          subitems: [
            {
              title: 'Users',
              icon: 'pi pi-user',
              route: '/workspace',
              componentId: 'user-roles',
              isHovered: false,
            },
            {
              title: 'User groups',
              icon: 'pi pi-user',
              route: '/list',
              componentId: 'user-groups',
              isHovered: false,
            },
          ],
          nestedMenuVisible: false,
        },
        {
          title: 'Workspace management',
          icon: 'pi pi-table',
          route: '/workspace_management',
          isHovered: false,
          subitems: [],
          nestedMenuVisible: false,
        },
      ],
    },
    // {
    //   title: 'Lists',
    //   icon: 'pi pi-list',
    //   route: '/list',
    //   isHovered: false,
    //   subitems: [],
    // },
    {
      title: 'Data',
      icon: 'pi pi-home',
      route: '/data',
      isHovered: false,
      subitems: [
        {
          title: 'Lists',
          icon: 'pi pi-list',
          componentId: 'list',
          route: '/data',
          isHovered: false,
          nestedMenuVisible: false,
          subitems: [],
        },
        {
          title: 'Data sources ',
          icon: 'pi pi-check-square',
          route: '/data',
          componentId: 'data-sources',
          isHovered: false,
          nestedMenuVisible: false,
          subitems: [],
        },
      ],
    },
    {
      title: 'Formatting options',
      icon: 'pi pi-home',
      route: '/field_formats',
      isHovered: false,
      subitems: [
        {
          title: 'Time & Date',
          icon: 'pi pi-clock',
          componentId: 'date-formats',
          route: '/field_formats',
          isHovered: false,
          nestedMenuVisible: false,
          subitems: [],
        },
        {
          title: 'Checkboxes ',
          icon: 'pi pi-check-square',
          route: '/field_formats',
          componentId: 'checkbox-formats',
          isHovered: false,
          nestedMenuVisible: false,
          subitems: [],
        },
      ],
    },
    {
      title: 'User management',
      icon: 'pi pi-users',
      route: '/user_management',
      isHovered: false,
      subitems: [
        {
          title: 'Users',
          icon: 'pi pi-user',
          route: '/user_management',
          componentId: 'users',
          isHovered: false,
          nestedMenuVisible: false,
        },
        {
          title: 'User groups',
          icon: 'pi pi-users',
          route: '/user_management',
          isHovered: false,
          componentId: 'user-groups',
          nestedMenuVisible: false,
        },

      ],
    },
    {
      title: 'Billings',
      icon: 'pi pi-credit-card',
      route: '/billings',
      isHovered: false,
      subitems: [],
    },
    {
      title: 'Integrations',
      icon: 'pi pi-link',
      route: '/integration',
      isHovered: false,
      subitems: [],
    },
    {
      title: 'Meta admin',
      icon: '',
      route: '/meta_admin',
      isHovered: false,
      subitems: [
        {
          title: 'Microservice',
          icon: 'pi pi-compass',
          route: '/meta_admin',
          isHovered: false,
          componentId: 'micro-services',
          nestedMenuVisible: false,
        },
      ],
    },

  ])

  return { settingItems }
}
