import { type ReactNode } from 'react'

type DashboardHeaderProps = {
  heading: string
  text?: string
  children?: ReactNode
}

const DashboardHeader = ({ heading, text, children }: DashboardHeaderProps) => {
  return (
    <div className='app-flex app-items-center app-justify-between md:app-flex-row app-flex-col'>
      <div className='app-grid app-gap-1'>
        <h1 className='app-font-heading app-text-3xl md:app-text-4xl'>
          {heading}
        </h1>
        {text && (
          <p className='app-text-lg app-text-muted-foreground'>{text}</p>
        )}
      </div>
      {children}
    </div>
  )
}

export default DashboardHeader
