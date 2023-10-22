import { type PropsWithChildren } from 'react'

const ProtocolsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex flex-1 overflow-hidden'>
      <main className='flex-1 overflow-y-auto px-6'>{children}</main>
    </div>
  )
}

export default ProtocolsLayout
