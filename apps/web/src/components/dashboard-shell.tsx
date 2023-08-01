'use client'

import { type FC, type HTMLAttributes, type PropsWithChildren } from 'react'

import { cn } from '@kyrian/ui'

type DashboardShellProps = HTMLAttributes<HTMLDivElement>
const DashboardShell: FC<PropsWithChildren<DashboardShellProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('app-grid app-items-start app-gap-8', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default DashboardShell
