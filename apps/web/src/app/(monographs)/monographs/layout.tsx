'use client'

import { type PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

import { Button, Toaster } from '@kyrian/ui'

const MonographsLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  return (
    <div className='app-flex app-min-h-screen app-flex-col app-space-y-6'>
      <header className='app-sticky app-bg-background app-top-0 app-z-40 app-border-b'>
        <div className='app-container app-flex app-h-16 app-items-center app-space-x-4'>
          <div className='flex items-center space-x-10'>
            <Button variant='ghost' onClick={() => router.back()}>
              <ChevronLeft className='app-mr-2 app-h-4 app-w-4' /> Volver
            </Button>
          </div>

          <span className='app-text-2xl app-font-bold'>CEDISJ</span>
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

export default MonographsLayout
