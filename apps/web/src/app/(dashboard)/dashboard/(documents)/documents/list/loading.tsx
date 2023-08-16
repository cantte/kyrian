import { Skeleton } from '@kyrian/ui'

const LoadingDocumentsListPage = () => {
  return (
    <div className='grid w-full gap-6 px-2 py-2'>
      <div className='flex w-full flex-row items-center justify-between space-x-4'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
      </div>
      <Skeleton className='h-20 w-full' />
      <Skeleton className='h-20 w-full' />
    </div>
  )
}

export default LoadingDocumentsListPage
