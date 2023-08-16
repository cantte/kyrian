import { forwardRef, type InputHTMLAttributes } from 'react'

import { cn } from './lib/utils'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'ui-border-input ui-ring-offset-background placeholder:ui-text-muted-foreground focus-visible:ui-ring-ring ui-flex ui-h-10 ui-w-full ui-rounded-md ui-border ui-bg-transparent ui-px-3 ui-py-2 ui-text-sm file:ui-border-0 file:ui-bg-transparent file:ui-text-sm file:ui-font-medium focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-offset-2 disabled:ui-cursor-not-allowed disabled:ui-opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = '@kyrian/ui/input'

export { Input }
