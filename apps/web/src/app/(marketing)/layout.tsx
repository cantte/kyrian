import { type PropsWithChildren } from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'
import { Button } from '@kyrian/ui'

import MainNav from '~/components/main-nav'
import { dashboardConfig } from '~/config/dashboard'

const RootLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions)

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='container sticky top-0 z-40 bg-white'>
        <div className='flex h-16 items-center justify-between border-b border-b-slate-200 py-4'>
          <MainNav items={dashboardConfig.mainNav} />
          <nav>
            {session ? (
              <Link href='/'>
                <Button size='sm' className='px-4'>
                  Inicio
                </Button>
              </Link>
            ) : (
              <Link href='/auth/signin'>
                <Button size='sm' className='px-4'>
                  Iniciar sesión
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className='flex-1'>{children}</main>
    </div>
  )
}

export default RootLayout
