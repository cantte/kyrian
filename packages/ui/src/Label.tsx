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
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    )}
    ref={forwardedRef}
  />
))

Label.displayName = '@kyrian/ui/Label'

export default Label
