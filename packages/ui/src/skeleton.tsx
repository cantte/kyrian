import { type FC, type HTMLAttributes } from 'react'

import { cn } from './lib/utils'

type Props = HTMLAttributes<HTMLDivElement>

const Skeleton: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn('ui-bg-muted ui-animate-pulse ui-rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
