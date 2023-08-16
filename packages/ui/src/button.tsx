import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './lib/utils'

export const buttonVariants = cva(
  'ui-inline-flex ui-items-center ui-justify-center ui-rounded-md ui-text-sm ui-font-medium ui-ring-offset-background ui-transition-colors focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-ring focus-visible:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50',
  {
    variants: {
      variant: {
        default:
          'ui-bg-primary ui-text-primary-foreground hover:ui-bg-primary/90',
        destructive:
          'ui-bg-destructive ui-text-destructive-foreground hover:ui-bg-destructive/90',
        outline:
          'ui-border ui-border-input ui-bg-background hover:ui-bg-accent hover:ui-text-accent-foreground',
        secondary:
          'ui-bg-secondary ui-text-secondary-foreground hover:ui-bg-secondary/80',
        ghost: 'hover:ui-bg-accent hover:ui-text-accent-foreground',
        link: 'ui-text-primary ui-underline-offset-4 hover:ui-underline',
      },
      size: {
        default: 'ui-h-10 ui-px-4 ui-py-2',
        sm: 'ui-h-9 ui-rounded-md ui-px-3',
        lg: 'ui-h-11 ui-rounded-md ui-px-8',
        icon: 'ui-h-10 ui-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)

Button.displayName = '@kyrian/ui/button'

export { Button }
