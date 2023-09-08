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
    <div className='flex gap-6 md:gap-10'>
      <Link href='/' className='hidden items-center space-x-2 md:flex'>
        <Icons.cedisj className='h-12 w-12' />
        <span className='text-primary hidden font-bold sm:inline-block'>
          CEDISJ
        </span>
      </Link>
      {items?.length ? (
        <nav className='hidden gap-6 md:flex'>
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'hover:text-foreground/80 flex items-center text-lg font-medium transition-colors sm:text-sm',
                item.href.startsWith(`/${segment}`)
                  ? 'text-foreground'
                  : 'text-foreground/60',
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
