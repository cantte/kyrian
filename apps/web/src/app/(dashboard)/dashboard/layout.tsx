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
    <div className='flex h-screen flex-col'>
      <header className='bg-background border-b'>
        <div className='container flex h-16 items-center justify-between'>
          <Suspense fallback={<Skeleton className='h-8 w-24' />}>
            <DashboardMainNav />
          </Suspense>
          <Suspense fallback={<Skeleton className='h-8 w-24' />}>
            <AccountNav />
          </Suspense>
        </div>
      </header>

      <div className='flex flex-1 overflow-hidden'>
        <aside className='hidden overflow-y-auto border border-t-0 border-l-neutral-50 p-4 md:flex'>
          <Suspense fallback={<DashboardSidebarFallback />}>
            <DashboardSidebar />
          </Suspense>
        </aside>
        <main className='flex-1 overflow-y-auto p-6'>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
