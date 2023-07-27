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
      roles: ['admin'],
    },
    {
      title: 'Programas académicos',
      href: '/dashboard/degree-programs/list',
      icon: 'degreePrograms',
      roles: ['admin'],
    },
    {
      title: 'Eventos',
      href: '/dashboard/events/list',
      icon: 'events',
      roles: ['admin'],
    },
    {
      title: 'Documentos',
      href: '/dashboard/documents/list',
      icon: 'documents',
      roles: ['admin'],
    },
    {
      title: 'Semilleros de investigacion',
      href: '/dashboard/research-seminars/list',
      icon: 'researchSeminars',
      roles: ['admin'],
    },
  ],
}
