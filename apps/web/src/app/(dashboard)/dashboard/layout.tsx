import { Suspense, type PropsWithChildren } from 'react'

import { Skeleton } from '@kyrian/ui'

import DashboardMainNav from '~/app/(dashboard)/dashboard/main-nav'
import DashboardSidebar from '~/app/(dashboard)/dashboard/sidebar'
import AccountNav from '~/app/(marketing)/account-nav'

const DashboardSidebarFallback = () => {
  return (
    <div className='grid w-full gap-6 px-2 py-2'>
      <div className='flex w-full flex-col items-center justify-between space-y-4'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
      </div>
    </div>
  )
}

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='bg-background sticky top-0 z-40 border-b'>
        <div className='container flex h-16 items-center justify-between'>
          <Suspense fallback={<Skeleton className='h-8 w-24' />}>
            <DashboardMainNav />
          </Suspense>
          <Suspense fallback={<Skeleton className='h-8 w-24' />}>
            <AccountNav />
          </Suspense>
        </div>
      </header>

      <div className='grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='sticky top-0 hidden h-screen w-[250px] flex-col border border-t-0 border-l-neutral-50 p-2 md:flex'>
          <Suspense fallback={<DashboardSidebarFallback />}>
            <DashboardSidebar />
          </Suspense>
        </aside>
        <main className='flex-grow overflow-auto p-6'>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
