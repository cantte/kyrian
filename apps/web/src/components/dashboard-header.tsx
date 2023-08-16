import { type ReactNode } from 'react'

type DashboardHeaderProps = {
  heading: string
  text?: string
  children?: ReactNode
}

const DashboardHeader = ({ heading, text, children }: DashboardHeaderProps) => {
  return (
    <div className='flex flex-col items-center justify-between md:flex-row'>
      <div className='grid gap-1'>
        <h1 className='font-heading text-3xl md:text-4xl'>{heading}</h1>
        {text && <p className='text-muted-foreground text-lg'>{text}</p>}
      </div>
      {children}
    </div>
  )
}

export default DashboardHeader
