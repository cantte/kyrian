'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from './lib/utils'

const Progress = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'ui-relative ui-h-4 ui-w-full ui-overflow-hidden ui-rounded-full ui-bg-slate-200 dark:ui-bg-slate-800',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className='ui-h-full ui-w-full ui-flex-1 ui-bg-slate-900 ui-transition-all dark:ui-bg-slate-400'
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = '@kyrian/ui/progress'

export { Progress }
