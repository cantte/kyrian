'use client'

import { type HTMLAttributes } from 'react'
import Link from 'next/link'

import { cn } from '@kyrian/ui'

const SiteFooter = ({ className }: HTMLAttributes<HTMLElement>) => {
  return (
    <footer className={cn(className)}>
      <div className='md:min-h-24 container flex flex-col items-start justify-between gap-4 py-10 md:flex-row md:py-0'>
        <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
          <Link href='/' className='hidden items-center space-x-2 md:flex'>
            <span className='text-primary hidden font-bold sm:inline-block'>
              CEDISJ
            </span>
          </Link>

          <p className='text-center text-sm leading-loose md:text-left'>
            Hecho por{' '}
            <a
              href='https://github.com/arkews'
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              arkews
            </a>
          </p>
        </div>

        <div className='flex flex-col gap-4 px-8 md:gap-2 md:px-0'>
          <h3 className='text-center font-medium leading-loose md:text-left'>
            Centro de Documentación e Investigación Socio Jurídica
          </h3>

          <p className='text-sm font-medium leading-loose md:text-left'>
            Teléfono: 5-847188
          </p>
          <p className='text-sm font-medium leading-loose md:text-left'>
            Email: cedisj@unicesar.edu.co
          </p>
          <p className='text-sm font-medium leading-loose md:text-left'>
            Dirección: Universidad Popular del Cesar - Sede Sabanas - Oficina
            102D
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
