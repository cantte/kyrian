import { type DashboardConfig } from '~/types'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Añadir monografia',
      href: '/monographs/new',
    },
    {
      title: 'Configuraciones',
      href: '/settings',
      disabled: true,
    },
  ],
}
