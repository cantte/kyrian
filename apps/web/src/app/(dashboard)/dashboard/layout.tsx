import { type PropsWithChildren, Suspense } from 'react'
import { Skeleton } from '@kyrian/ui'
import AccountNav from "~/app/(marketing)/account-nav";
import DashboardMainNav from "~/app/(dashboard)/dashboard/main-nav";
import DashboardSidebar from "~/app/(dashboard)/dashboard/sidebar";

const DashboardSidebarFallback = () => {
  return (
    <div className='app-grid app-gap-6 app-w-full px-2 py-2'>
      <div className='app-flex app-flex-col app-space-y-4 app-items-center app-justify-between app-w-full'>
        <Skeleton className='app-h-10 app-w-full'/>
        <Skeleton className='app-h-10 app-w-full'/>
        <Skeleton className='app-h-10 app-w-full'/>
      </div>
    </div>
  )
}

const DashboardLayout = ({children}: PropsWithChildren) => {
  return (
    <div className='app-flex app-min-h-screen app-flex-col app-space-y-6'>
      <header
        className='app-sticky app-bg-background app-top-0 app-z-40 app-border-b'>
        <div
          className='app-container app-flex app-h-16 app-items-center app-justify-between'>
          <Suspense fallback={<Skeleton className="app-h-8 app-w-24"/>}>
            <DashboardMainNav/>
          </Suspense>
          <Suspense fallback={<Skeleton className="app-h-8 app-w-24"/>}>
            <AccountNav/>
          </Suspense>
        </div>
      </header>

      <div
        className='app-container app-grid app-flex-1 app-gap-12 md:app-grid-cols-[200px_1fr]'>
        <aside className='app-hidden app-w-[250px] app-flex-col md:app-flex'>
          <Suspense fallback={<DashboardSidebarFallback/>}>
            <DashboardSidebar/>
          </Suspense>
        </aside>
        <main
          className='app-flex app-w-full app-flex-1 app-flex-col app-overflow-hidden app-pl-4'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
