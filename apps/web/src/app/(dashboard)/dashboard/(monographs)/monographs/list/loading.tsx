import { Skeleton } from '@kyrian/ui'

import DashboardShell from '~/components/dashboard-shell'

const LoadingMonographsPage = () => {
  return (
    <DashboardShell>
      <div className='flex w-full flex-row items-center justify-between space-x-4'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
      </div>
      <Skeleton className='h-20 w-full' />
      <Skeleton className='h-20 w-full' />
    </DashboardShell>
  )
}

export default LoadingMonographsPage
