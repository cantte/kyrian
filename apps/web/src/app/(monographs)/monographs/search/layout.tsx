import { type PropsWithChildren } from 'react'
import NextLink from 'next/link'
import { ChevronLeft } from 'lucide-react'

import { Button, Toaster } from '@kyrian/ui'

const MonographLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='app-mx-auto app-flex app-flex-col app-space-y-6'>
      <header className='app-container app-sticky app-top-0 app-z-40'>
        <div className='app-flex app-h-16 app-items-center app-border-b app-border-b-slate-200 app-py-4 app-space-x-4 dark:app-border-b-slate-500'>
          <div className='flex items-center space-x-10'>
            <NextLink href='/'>
              <Button variant='ghost'>
                <ChevronLeft className='app-mr-2 app-h-4 app-w-4' /> Volver
              </Button>
            </NextLink>
          </div>

          <span className='app-text-2xl app-font-bold'>
            CEDISJ - Resultados de la búsqueda
          </span>
        </div>
      </header>

      <div className='app-container app-grid app-gap-12 app-grid-cols-1'>
        <main className='app-flex app-w-full app-flex-1 app-flex-col app-overflow-hidden'>
          {children}
        </main>
      </div>

      <Toaster />
    </div>
  )
}

export default MonographLayout
