'use client'

import { type HTMLAttributes } from 'react'
import Link from 'next/link'

import { cn } from '@kyrian/ui'

const SiteFooter = ({ className }: HTMLAttributes<HTMLElement>) => {
  return (
    <footer className={cn(className)}>
      <div className='app-container app-flex app-flex-col app-items-start app-justify-between app-gap-4 app-py-10 md:app-min-h-24 md:app-flex-row md:app-py-0'>
        <div className='app-flex app-flex-col app-items-center app-gap-4 app-px-8 md:app-flex-row md:app-gap-2 md:app-px-0'>
          <Link
            href='/'
            className='app-hidden app-items-center app-space-x-2 md:app-flex'
          >
            <span className='app-hidden app-font-bold sm:app-inline-block app-text-primary'>
              CEDISJ
            </span>
          </Link>

          <p className='app-text-center app-text-sm app-leading-loose md:app-text-left'>
            Hecho por{' '}
            <a
              href='https://github.com/arkews'
              target='_blank'
              rel='noreferrer'
              className='app-font-medium app-underline app-underline-offset-4'
            >
              arkews
            </a>
          </p>
        </div>

        <div className='app-flex app-flex-col app-gap-4 app-px-8 md:app-gap-2 md:app-px-0'>
          <h3 className='app-text-center app-font-medium app-leading-loose md:app-text-left'>
            Centro de Documentación e Investigación Socio Jurídica
          </h3>

          <p className='app-text-sm app-leading-loose md:app-text-left app-font-medium'>
            Teléfono: 5-847188
          </p>
          <p className='app-text-sm app-leading-loose md:app-text-left app-font-medium'>
            Email: cedisj@unicesar.edu.co
          </p>
          <p className='app-text-sm app-leading-loose md:app-text-left app-font-medium'>
            Dirección: Universidad Popular del Cesar - Sede Sabanas - Oficina
            102D
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
