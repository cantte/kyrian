import { type DashboardConfig } from '~/types'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Monografias',
      href: '/dashboard/monographs/list',
      roles: ['admin'],
    },
    {
      title: 'Programas académicos',
      href: '/dashboard/degree-programs/list',
      roles: ['admin'],
    },
    {
      title: 'Eventos',
      href: '/dashboard/events/list',
      roles: ['admin'],
    },
  ],
  sidebarNav: [
    {
      title: 'Monografías',
      href: '/dashboard/monographs/list',
      icon: 'monographs',
    },
    {
      title: 'Programas académicos',
      href: '/dashboard/degree-programs/list',
      icon: 'degreePrograms',
    },
    {
      title: 'Eventos',
      href: '/dashboard/events/list',
      icon: 'events',
    },
    {
      title: 'Añadir documentos',
      href: '/dashboard/documents/new',
      icon: 'documents',
    },
  ],
}
