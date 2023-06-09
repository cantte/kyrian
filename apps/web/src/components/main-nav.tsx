'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { cn } from '@kyrian/ui'

import { Icons } from '~/components/icons'
import { type MainNavItem } from '~/types'

type Props = {
  items?: MainNavItem[]
  children?: ReactNode
}

const MainNav = ({ items }: Props) => {
  const segment = useSelectedLayoutSegment()

  return (
    <div className='app-flex app-gap-6 md:app-gap-10'>
      <Link
        href='/'
        className='app-hidden app-items-center app-space-x-2 md:app-flex'
      >
        <Icons.cedisj className='app-w-12 app-h-12' />
        <span className='app-hidden app-font-bold sm:app-inline-block app-text-primary'>
          CEDISJ
        </span>
      </Link>
      {items?.length ? (
        <nav className='app-hidden app-gap-6 md:app-flex'>
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'app-flex app-items-center app-text-lg app-font-medium app-transition-colors hover:app-text-foreground/80 sm:app-text-sm',
                item.href.startsWith(`/${segment}`)
                  ? 'app-text-foreground'
                  : 'app-text-foreground/60',
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
