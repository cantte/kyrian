import { type FC, type HTMLAttributes } from 'react'

import { cn } from './lib/utils'

type Props = HTMLAttributes<HTMLDivElement>

const Skeleton: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'h-5 w-2/5 animate-pulse rounded-lg bg-slate-100',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
