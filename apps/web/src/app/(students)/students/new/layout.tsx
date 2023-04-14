import { type PropsWithChildren } from 'react'

const StudentLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='app-mx-auto app-flex app-flex-col app-space-y-6'>
      <header className='app-container app-sticky app-top-0 app-z-40 app-bg-white'>
        <div className='app-flex app-h-16 app-items-center app-justify-between app-border-b app-border-b-slate-200 app-py-4'>
          <span className='app-text-2xl app-font-bold'>Kyrian</span>
        </div>
      </header>

      <div className='app-container app-grid app-gap-12 app-grid-cols-1'>
        <main className='app-flex app-w-full app-flex-1 app-flex-col app-overflow-hidden'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default StudentLayout
