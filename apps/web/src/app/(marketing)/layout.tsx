import * as assert from 'assert'
import { type PropsWithChildren } from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'
import { Button } from '@kyrian/ui'

import MainNav from '~/components/main-nav'
import { dashboardConfig } from '~/config/dashboard'

const RootLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions)

  const role = session?.user.role
  const menu = dashboardConfig.mainNav.filter((item) => {
    if (item.roles === undefined) {
      return true
    }

    if (item.roles.length > 0 && role === undefined) {
      return false
    }

    assert.ok(role !== undefined)

    return item.roles.includes(role)
  })

  return (
    <div className='app-flex app-min-h-screen app-flex-col'>
      <header className='app-container app-sticky app-top-0 app-z-40'>
        <div className='app-flex app-h-16 app-items-center app-justify-between app-border-b app-border-b-slate-200 app-py-4 dark:app-border-b-slate-500'>
          <MainNav items={menu} />
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
      <main className='app-flex-1'>{children}</main>
    </div>
  )
}

export default RootLayout
