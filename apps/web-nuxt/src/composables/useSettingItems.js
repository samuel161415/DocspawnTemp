import { ref } from 'vue'

export function useSettingItems() {
  const settingItems = ref([
    {
      title: 'General settings',
      translationKey: 'general_settings',
      icon: 'pi pi-user',
      route: '/settings',
      isHovered: false,
      subitems: [
        {
          title: 'My profile',
          translationKey: 'my_profile',
          icon: 'pi pi-calendar',
          fontawesome: 'faUserVneck',
          route: '/#my-profile',
          isHovered: false,
          subitems: [],
          componentId: 'my-profile',
          nestedMenuVisible: false,

        },
        {
          title: 'Language & Region',
          translationKey: 'language_region',
          icon: 'pi pi-language',
          fontawesome: 'faLanguage',
          route: '#language-region',
          isHovered: false,
          subitems: [],
          componentId: 'language-region',
          nestedMenuVisible: false,

        },
        {
          title: 'Time & date format',
          translationKey: 'time_date_format',
          icon: 'pi pi-clock',
          fontawesome: 'faCalendar',
          route: '/#time-date-format',
          isHovered: false,
          subitems: [],
          componentId: 'time-date-format',
          nestedMenuVisible: false,
        },

      ],
    },
    {
      title: 'Workspace',
      translationKey: 'workspace',
      icon: 'pi pi-home',
      route: '/settings/workspace',
      isHovered: false,
      subitems: [
        {
          title: 'Info',
          translationKey: 'info',
          icon: 'pi pi-info-circle',
          fontawesome: 'faCircleInfo',
          route: '/#info',
          isHovered: false,
          subitems: [],
          componentId: 'info',
          nestedMenuVisible: false,
        },
        {
          title: 'User administration',
          translationKey: 'user_administration',
          icon: 'pi pi-users',
          fontawesome: 'faUsers',
          route: '#members',
          componentId: 'members',
          isHovered: false,
          subitems: [
            {
              title: 'User directory',
              translationKey: 'user_directory',
              icon: 'pi pi-user',
              fontawesome: 'faUser',
              route: '/#users',
              componentId: 'users',
              isHovered: false,
              subitems: [],
            },
            {
              title: 'Group directory',
              translationKey: 'group_directory',
              icon: 'pi pi-user',
              fontawesome: 'faUser',
              route: '#user-groups',
              componentId: 'user-groups',
              isHovered: false,
              subitems: [],
            },
          ],
          nestedMenuVisible: false,
        },
        {
          title: 'Formatting options',
          translationKey: 'formatting_options',
          icon: 'pi pi-table',
          fontawesome: 'faSwatchbook',
          route: '/#field-options',
          isHovered: false,
          componentId: 'field-options',
          subitems: [
            {
              title: 'Time',
              translationKey: 'time',
              icon: 'pi pi-clock',
              fontawesome: 'faTimer',
              route: '#time',
              componentId: 'time',
              isHovered: false,
              subitems: [],
            },
            {
              title: 'Date',
              translationKey: 'date',
              icon: 'pi pi-calendar',
              fontawesome: 'faCalendar',
              route: '/#date',
              componentId: 'date',
              isHovered: false,
              subitems: [],
            },
            {
              title: 'Checkboxes',
              translationKey: 'checkboxes',
              icon: 'pi pi-check-square',
              fontawesome: 'faSquareCheck',
              route: '#checkbox-formats',
              componentId: 'checkbox-formats',
              isHovered: false,
              subitems: [],
            },
          ],
          nestedMenuVisible: false,
        },
        {
          title: 'Billing',
          translationKey: 'billing',
          icon: 'pi pi-credit-card',
          fontawesome: 'faMoneyBill',
          route: '/#billing',
          isHovered: false,
          componentId: 'billing',
          subitems: [],
          nestedMenuVisible: false,
        },
      ],
    },
    {
      title: 'Element Libraries',
      translationKey: 'element_libraries',
      icon: 'pi pi-users',
      fontawesome: 'faCalendar',
      route: '/settings/element_libraries',
      isHovered: false,
      subitems: [
        {
          title: 'Lists',
          translationKey: 'lists',
          icon: 'pi pi-user',
          fontawesome: 'faList',
          route: '/#lists',
          componentId: 'lists',
          isHovered: false,
          subitems: [],
          nestedMenuVisible: false,
        },
        {
          title: 'Databases',
          translationKey: 'databases',
          icon: 'pi pi-users',
          fontawesome: 'faDatabase',
          route: '#databases',
          isHovered: false,
          componentId: 'databases',
          subitems: [],
          nestedMenuVisible: false,
        },
        {
          title: 'Integrations',
          translationKey: 'integrations',
          icon: 'pi pi-link',
          fontawesome: 'faLinkSimple',
          route: '#integration',
          isHovered: false,
          componentId: 'integration',
          subitems: [],
          nestedMenuVisible: false,
        },
        {
          title: 'Snippers',
          translationKey: 'snippers',
          icon: 'pi pi-link',
          fontawesome: 'faLinkSimple',
          route: '#snippers',
          isHovered: false,
          componentId: 'snippers',
          subitems: [],
          nestedMenuVisible: false,
        },
        {
          title: 'Form Elements',
          translationKey: 'form_elements',
          icon: 'pi pi-link',
          fontawesome: 'faLinkSimple',
          route: '#form_elements',
          isHovered: false,
          componentId: 'form_elements',
          subitems: [],
          nestedMenuVisible: false,
        },
        {
          title: 'Image Library',
          translationKey: 'image_library',
          icon: 'pi pi-link',
          fontawesome: 'faLinkSimple',
          route: '#image_library',
          isHovered: false,
          componentId: 'image_library',
          subitems: [],
          nestedMenuVisible: false,
        },
        {
          title: 'Check Boxes',
          translationKey: 'check_boxes',
          icon: 'pi pi-link',
          fontawesome: 'faLinkSimple',
          route: '#check_boxes',
          isHovered: false,
          componentId: 'check_boxes',
          subitems: [],
          nestedMenuVisible: false,
        },
      ],
    },

  ])

  return { settingItems }
}
