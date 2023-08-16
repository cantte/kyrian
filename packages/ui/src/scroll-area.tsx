'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { cn } from './lib/utils'

const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('ui-relative ui-overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className='ui-h-full ui-w-full ui-rounded-[inherit]'>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = '@kyrian/ui/ScrollArea'

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'ui-flex ui-touch-none ui-select-none ui-transition-colors',
      orientation === 'vertical' &&
        'ui-h-full ui-w-2.5 ui-border-l ui-border-l-transparent ui-p-[1px]',
      orientation === 'horizontal' &&
        'ui-h-2.5 ui-border-t ui-border-t-transparent ui-p-[1px]',
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className='ui-bg-border ui-relative ui-flex-1 ui-rounded-full' />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = '@kyrian/ui/ScrollBar'

export { ScrollArea, ScrollBar }
