import * as assert from 'assert'
import { type PropsWithChildren } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'
import { Button } from '@kyrian/ui'

import MainNav from '~/components/main-nav'
import DashboardNav from '~/components/nav'
import UserAccountNav from '~/components/user-account-nav'
import { dashboardConfig } from '~/config/dashboard'

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/api/auth/signin')
  }

  if (!session.user) {
    return redirect('/api/auth/signin')
  }

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

  const sidebar = dashboardConfig.sidebarNav.filter((item) => {
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
    <div className='app-flex app-min-h-screen app-flex-col app-space-y-6'>
      <header className='app-sticky app-bg-background app-top-0 app-z-40 app-border-b'>
        <div className='app-container app-flex app-h-16 app-items-center app-justify-between'>
          <MainNav items={menu} />
          <nav>
            {session ? (
              <UserAccountNav
                user={{
                  name: session.user.name,
                  image: session.user.image,
                  email: session.user.email,
                }}
              />
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

      <div className='app-container app-grid app-flex-1 app-gap-12 md:app-grid-cols-[200px_1fr]'>
        <aside className='app-hidden app-w-[250px] app-flex-col md:app-flex'>
          <DashboardNav items={sidebar} />
        </aside>
        <main className='app-flex app-w-full app-flex-1 app-flex-col app-overflow-hidden app-pl-4'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
