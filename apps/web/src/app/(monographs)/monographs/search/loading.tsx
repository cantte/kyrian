import { Skeleton } from '@kyrian/ui'

const LoadingNewMonographsPage = () => {
  return (
    <div className='grid w-full gap-6 px-2 py-2'>
      <Skeleton className='h-20 w-full' />
      <Skeleton className='h-20 w-full' />
      <Skeleton className='h-20 w-full' />
    </div>
  )
}

export default LoadingNewMonographsPage
