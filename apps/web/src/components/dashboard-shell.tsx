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
    <div className={cn('grid items-start gap-8', className)} {...props}>
      {children}
    </div>
  )
}

export default DashboardShell
