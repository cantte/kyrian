'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { cn } from './lib/utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('ui-border-b', className)}
    {...props}
  />
))
AccordionItem.displayName = '@kyrian/ui/AccordionItem'

const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'ui-flex ui-flex-1 ui-items-center ui-justify-between ui-py-4 ui-font-medium ui-transition-all hover:ui-underline [&[data-state=open]>svg]:ui-rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className='ui-h-4 ui-w-4 ui-transition-transform ui-duration-200' />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = '@kyrian/ui/AccordionTrigger'

const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'data-[state=closed]:ui-animate-accordion-up data-[state=open]:ui-animate-accordion-down ui-overflow-hidden ui-text-sm ui-transition-all',
      className,
    )}
    {...props}
  >
    <div className='ui-pb-4 ui-pt-0'>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = '@kyrian/ui/AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
