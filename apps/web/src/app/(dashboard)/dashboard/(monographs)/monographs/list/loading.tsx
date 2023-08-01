import { Skeleton } from '@kyrian/ui'

import DashboardShell from '~/components/dashboard-shell'

const LoadingMonographsPage = () => {
  return (
    <DashboardShell>
      <div className='app-flex app-flex-row app-space-x-4 app-items-center app-justify-between app-w-full'>
        <Skeleton className='app-h-10 app-w-full' />
        <Skeleton className='app-h-10 app-w-full' />
      </div>
      <Skeleton className='h-20 w-full' />
      <Skeleton className='h-20 w-full' />
    </DashboardShell>
  )
}

export default LoadingMonographsPage
