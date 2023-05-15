'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { cn } from '@kyrian/ui'

import { type MainNavItem } from '~/types'

type Props = {
  items?: MainNavItem[]
  children?: ReactNode
}

const MainNav = ({ items }: Props) => {
  const segment = useSelectedLayoutSegment()

  return (
    <div className='app-flex app-gap-6 md:app-gap-10'>
      {items?.length ? (
        <nav className='app-hidden app-gap-6 md:app-flex app-text-sm app-font-medium'>
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'app-transition-colors app-text-foreground/60',
                item.href.startsWith(`/${segment}`) && 'text-slate-900',
                item.disabled && 'app-cursor-not-allowed app-opacity-80',
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  )
}

export default MainNav
