'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'

import { cn } from './lib/utils'

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn('ui-grid ui-gap-2', className)}
    {...props}
    ref={ref}
  />
))
RadioGroup.displayName = '@kyrian/ui/radio-group'

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'text:ui-fill-slate-50 ui-h-4 ui-w-4 ui-rounded-full ui-border ui-border-slate-300 ui-text-slate-900 hover:ui-border-slate-400 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-slate-400 focus:ui-ring-offset-2 disabled:ui-cursor-not-allowed disabled:ui-opacity-50 dark:ui-border-slate-700 dark:ui-text-slate-100 dark:hover:ui-text-slate-900 dark:focus:ui-ring-slate-400 dark:focus:ui-ring-offset-slate-900',
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className='ui-flex ui-items-center ui-justify-center'>
      <Circle className='ui-h-2.5 ui-w-2.5 ui-fill-slate-900 dark:ui-fill-slate-50' />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = '@kyrian/ui/radio-group-item'

export { RadioGroup, RadioGroupItem }
