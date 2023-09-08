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
    <nav className='grid items-start gap-2'>
      {items.map((item, index) => {
        const Icon = Icons[item.icon || 'arrowRight']
        return (
          item.href && (
            <Link key={index} href={item.disabled ? '/' : item.href}>
              <span
                className={cn(
                  'hover:bg-accent hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                  path === item.href ? 'bg-accent' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80',
                )}
              >
                <Icon className='mr-2 h-4 w-4' />
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
