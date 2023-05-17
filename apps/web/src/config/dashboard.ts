import { type DashboardConfig } from '~/types'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Añadir monografia',
      href: '/monographs/new',
      roles: ['admin'],
    },
    {
      title: 'Ver programas académicos',
      href: '/degree-programs/list',
      roles: ['admin'],
    },
    {
      title: 'Ver eventos',
      href: '/events/list',
      roles: ['admin'],
    },
  ],
}
