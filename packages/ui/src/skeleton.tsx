import { type FC, type HTMLAttributes } from 'react'

import { cn } from './lib/utils'

type Props = HTMLAttributes<HTMLDivElement>

const Skeleton: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn('bg-muted animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
