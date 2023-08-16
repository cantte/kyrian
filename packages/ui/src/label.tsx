'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from './lib/utils'

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, forwardedRef) => (
  <LabelPrimitive.Root
    {...props}
    className={cn(
      'ui-text-sm ui-font-medium ui-leading-none peer-disabled:ui-cursor-not-allowed peer-disabled:ui-opacity-70',
      className,
    )}
    ref={forwardedRef}
  />
))

Label.displayName = '@kyrian/ui/label'

export { Label }
