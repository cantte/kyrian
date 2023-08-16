import { forwardRef, type TextareaHTMLAttributes } from 'react'

import { cn } from './lib/utils'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'ui-flex ui-h-20 ui-w-full ui-rounded-md ui-border ui-border-slate-300 ui-bg-transparent ui-px-3 ui-py-2 ui-text-sm placeholder:ui-text-slate-400 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-slate-400 focus:ui-ring-offset-2 disabled:ui-cursor-not-allowed disabled:ui-opacity-50 dark:ui-border-slate-700 dark:ui-text-slate-50 dark:focus:ui-ring-slate-400 dark:focus:ui-ring-offset-slate-900',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = '@kyrian/ui/textarea'

export { Textarea }
