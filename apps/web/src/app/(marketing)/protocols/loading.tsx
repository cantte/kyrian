import { Skeleton } from '@kyrian/ui'

const LoadingProtocolsPage = () => {
  return (
    <div className='app-grid app-gap-6 app-w-full px-2 py-2'>
      <Skeleton className='h-20 w-full' />
      <Skeleton className='h-20 w-full' />
      <Skeleton className='h-20 w-full' />
    </div>
  )
}

export default LoadingProtocolsPage
