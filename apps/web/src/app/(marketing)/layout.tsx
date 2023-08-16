import { Suspense, type PropsWithChildren } from 'react'

import { Skeleton } from '@kyrian/ui'

import MainNav from '~/components/main-nav'
import SiteFooter from '~/components/site-footer'
import AccountNav from '~/app/(marketing)/account-nav'
import { marketingConfig } from '~/config/marketing'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex min-h-screen flex-col space-y-6'>
      <header className='bg-background sticky top-0 z-40 border-b'>
        <div className='container flex h-16 items-center justify-between space-x-4'>
          <MainNav items={marketingConfig.mainNav} />
          <Suspense fallback={<Skeleton className='h-8 w-24' />}>
            <AccountNav />
          </Suspense>
        </div>
      </header>

      <main className='flex-1'>{children}</main>

      <SiteFooter className='py-4' />
    </div>
  )
}

export default RootLayout
