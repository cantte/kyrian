import { Suspense, type PropsWithChildren } from 'react'

import { Skeleton } from '@kyrian/ui'

import MainNav from '~/components/main-nav'
import SiteFooter from '~/components/site-footer'
import AccountNav from '~/app/(marketing)/account-nav'
import { marketingConfig } from '~/config/marketing'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='app-flex app-min-h-screen app-flex-col app-space-y-6'>
      <header className='app-sticky app-bg-background app-top-0 app-z-40 app-border-b'>
        <div className='app-container app-flex app-h-16 app-items-center app-space-x-4 app-justify-between'>
          <MainNav items={marketingConfig.mainNav} />
          <Suspense fallback={<Skeleton className='app-h-8 app-w-24' />}>
            <AccountNav />
          </Suspense>
        </div>
      </header>

      <main className='app-flex-1'>{children}</main>

      <SiteFooter className='app-py-4' />
    </div>
  )
}

export default RootLayout
