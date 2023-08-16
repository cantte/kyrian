import { type PropsWithChildren } from 'react'

const FormatsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='container grid grid-cols-1 gap-12'>
      <main className='flex w-full flex-1 flex-col overflow-hidden'>
        {children}
      </main>
    </div>
  )
}

export default FormatsLayout
