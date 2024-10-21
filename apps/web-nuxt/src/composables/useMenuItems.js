import { ref } from 'vue'

export function useMenuItems() {
  const menuItems = ref([
    {
      title: 'Home',
      icon: 'pi pi-home',
      route: '/',
      isHovered: false,
    },
    {
      title: 'Templates',
      icon: 'pi pi-file-edit',
      route: '/templates',
      isHovered: false,
    },
    {
      title: 'Documents library',
      icon: 'pi pi-server',
      route: '/document-library',
      isHovered: false,
    },
    {
      title: 'Data library',
      icon: 'pi pi-chart-bar',
      route: '/data-library',
      isHovered: false,
    },
    {
      title: 'Image library',
      icon: 'pi pi-images',
      route: '/image-library',
      isHovered: false,
    },
    {
      title: 'Snippet library',
      icon: 'pi pi-images',
      route: '/snippet-library',
      isHovered: false,
    },
    {
      title: 'Settings',
      icon: 'pi pi-cog',
      route: '/settings',
      isHovered: false,
    },
  ])

  return { menuItems }
}
