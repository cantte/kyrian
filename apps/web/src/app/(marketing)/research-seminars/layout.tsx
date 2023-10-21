import { type PropsWithChildren } from 'react'

const ResearchSeminarsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex flex-1 overflow-hidden'>
      <main className='flex-1 overflow-y-auto px-6'>{children}</main>
    </div>
  )
}

export default ResearchSeminarsLayout
