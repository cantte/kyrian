import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './lib/utils'

const badgeVariants = cva(
  'ui-inline-flex ui-items-center ui-border ui-rounded-full ui-px-2.5 ui-py-0.5 ui-text-xs ui-font-semibold ui-transition-colors focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-ring focus:ui-ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'ui-bg-primary hover:ui-bg-primary/80 ui-border-transparent ui-text-primary-foreground',
        secondary:
          'ui-bg-secondary hover:ui-bg-secondary/80 ui-border-transparent ui-text-secondary-foreground',
        destructive:
          'ui-bg-destructive hover:ui-bg-destructive/80 ui-border-transparent ui-text-destructive-foreground',
        outline: 'ui-text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
