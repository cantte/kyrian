import { type PropsWithChildren } from 'react'

const ResearchSeminarsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='app-container app-grid app-gap-12 app-grid-cols-1'>
      <main className='app-flex app-w-full app-flex-1 app-flex-col app-overflow-hidden'>
        {children}
      </main>
    </div>
  )
}

export default ResearchSeminarsLayout
