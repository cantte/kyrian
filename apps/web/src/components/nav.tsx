'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@kyrian/ui'

import { Icons } from '~/components/icons'
import { type SidebarNavItem } from '~/types'

type DashboardNavProps = {
  items: SidebarNavItem[]
}

const DashboardNav = ({ items }: DashboardNavProps) => {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className='app-grid app-items-start app-gap-2'>
      {items.map((item, index) => {
        const Icon = Icons[item.icon || 'arrowRight']
        return (
          item.href && (
            <Link key={index} href={item.disabled ? '/' : item.href}>
              <span
                className={cn(
                  'hover:app-bg-accent hover:app-text-accent-foreground app-group app-flex app-items-center app-rounded-md app-px-3 app-py-2 app-text-sm app-font-medium',
                  path === item.href ? 'app-bg-accent' : 'app-transparent',
                  item.disabled && 'app-cursor-not-allowed app-opacity-80',
                )}
              >
                <Icon className='app-mr-2 app-h-4 app-w-4' />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}

export default DashboardNav
