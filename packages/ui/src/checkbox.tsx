'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from './lib/utils'

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'ui-border-primary ui-ring-offset-background focus-visible:ui-ring-ring data-[state=checked]:ui-bg-primary data-[state=checked]:ui-text-primary-foreground ui-peer ui-h-4 ui-w-4 ui-shrink-0 ui-rounded-sm ui-border focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-offset-2 disabled:ui-cursor-not-allowed disabled:ui-opacity-50',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        'ui-flex ui-items-center ui-justify-center ui-text-current',
      )}
    >
      <Check className='ui-h-4 ui-w-4' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = '@kyrian/ui/checkbox'

export { Checkbox }
