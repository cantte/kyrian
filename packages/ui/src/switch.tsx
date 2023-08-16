'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from './lib/utils'

const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'ui-peer ui-inline-flex ui-h-[24px] ui-w-[44px] ui-shrink-0 ui-cursor-pointer ui-items-center ui-rounded-full ui-border-2 ui-border-transparent ui-transition-colors focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-slate-400 focus:ui-ring-offset-2 disabled:ui-cursor-not-allowed disabled:ui-opacity-50 data-[state=checked]:ui-bg-slate-900 data-[state=unchecked]:ui-bg-slate-200 dark:focus:ui-ring-slate-400 dark:focus:ui-ring-offset-slate-900 dark:data-[state=checked]:ui-bg-slate-400 dark:data-[state=unchecked]:ui-bg-slate-700',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'ui-pointer-events-none ui-block ui-h-5 ui-w-5 ui-rounded-full ui-bg-white ui-shadow-lg ui-ring-0 ui-transition-transform data-[state=checked]:ui-translate-x-5 data-[state=unchecked]:ui-translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = '@kyrian/ui/switch'

export { Switch }
