import { Skeleton } from '@kyrian/ui'

const AppLoading = () => {
  return (
    <div className='app-grid app-gap-6 app-w-full app-px-2 app-py-2'>
      <div className='app-flex app-flex-row app-space-x-4 app-items-center app-justify-between app-w-full'>
        <Skeleton className='app-h-10 app-w-full' />
        <Skeleton className='app-h-10 app-w-full' />
      </div>
      <Skeleton className='app-h-20 w-full' />
      <Skeleton className='app-h-20 w-full' />
    </div>
  )
}

export default AppLoading
