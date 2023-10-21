'use client'

import { type PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

import { Button, Toaster } from '@kyrian/ui'

const MonographsLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  return (
    <div className='flex h-screen flex-col space-y-6'>
      <header className='bg-background sticky top-0 z-40 border-b'>
        <div className='container flex h-16 items-center space-x-4'>
          <div className='flex items-center space-x-10'>
            <Button variant='ghost' onClick={() => router.back()}>
              <ChevronLeft className='mr-2 h-4 w-4' /> Volver
            </Button>
          </div>

          <span className='text-2xl font-bold'>CEDISJ</span>
        </div>
      </header>

      <div className='flex flex-1 overflow-hidden'>
        <main className='flex-1 overflow-y-auto px-6'>{children}</main>
      </div>

      <Toaster />
    </div>
  )
}

export default MonographsLayout
