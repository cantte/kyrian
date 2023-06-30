import { type PropsWithChildren } from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'
import { Button } from '@kyrian/ui'

import MainNav from '~/components/main-nav'
import SiteFooter from '~/components/site-footer'
import UserAccountNav from '~/components/user-account-nav'
import { marketingConfig } from '~/config/marketing'

const RootLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions)

  return (
    <div className='app-flex app-min-h-screen app-flex-col app-space-y-6'>
      <header className='app-sticky app-bg-background app-top-0 app-z-40 app-border-b'>
        <div className='app-container app-flex app-h-16 app-items-center app-space-x-4 app-justify-between'>
          <MainNav items={marketingConfig.mainNav} />
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

      <main className='app-flex-1'>{children}</main>

      <SiteFooter className='app-py-4' />
    </div>
  )
}

export default RootLayout
