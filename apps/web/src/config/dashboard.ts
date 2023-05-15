import { type DashboardConfig } from '~/types'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Añadir monografia',
      href: '/monographs/new',
    },
    {
      title: 'Agregar programa académico',
      href: '/degree-programs/new',
    },
    {
      title: 'Configuraciones',
      href: '/settings',
      disabled: true,
    },
  ],
}
