import { type MarketingConfig } from '~/types'

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: 'Programas',
      href: '#degree-programs',
    },
    {
      title: 'Repositorio',
      href: '/dashboard',
    },
    {
      title: 'Eventos',
      href: '#events',
    },
    {
      title: 'Formatos',
      href: '/formats',
    },
    {
      title: 'Protocolos',
      href: '#',
      disabled: true,
    },
    {
      title: 'Plan estratégico',
      href: '/strategic-plan',
    },
  ],
}
