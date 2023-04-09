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
    <div className='flex gap-6 md:gap-10'>
      {items?.length ? (
        <nav className='hidden gap-6 md:flex'>
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center text-lg font-semibold text-slate-600 sm:text-sm',
                item.href.startsWith(`/${segment}`) && 'text-slate-900',
                item.disabled && 'cursor-not-allowed opacity-80',
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
