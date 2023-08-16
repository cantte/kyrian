'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from './lib/utils'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitive.Trigger
    ref={forwardedRef}
    className={cn(
      'ui-border-input ui-ring-offset-background placeholder:ui-text-muted-foreground focus:ui-ring-ring ui-flex ui-h-10 ui-w-full ui-items-center ui-justify-between ui-rounded-md ui-border ui-bg-transparent ui-px-3 ui-py-2 ui-text-sm focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-offset-2 disabled:ui-cursor-not-allowed disabled:ui-opacity-50',
      className,
    )}
    {...props}
  >
    {props.children}
    <ChevronDown className='ui-h-4 ui-w-4 ui-opacity-50' />
  </SelectPrimitive.Trigger>
))

SelectTrigger.displayName = '@kyrian/ui/select-trigger'

const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, forwardedRef) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={forwardedRef}
      className={cn(
        'ui-bg-popover ui-text-popover-foreground ui-animate-in ui-fade-in-80 ui-relative ui-z-50 ui-min-w-[8rem] ui-overflow-hidden ui-rounded-md ui-border ui-shadow-md',
        position === 'popper' && 'ui-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'ui-p-1',
          position === 'popper' &&
            'ui-h-[var(--radix-select-trigger-height)] ui-w-full ui-min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))

SelectContent.displayName = '@kyrian/ui/select-content'

const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitive.Label
    ref={forwardedRef}
    className={cn(
      'ui-py-1.5 ui-pl-8 ui-pr-2 ui-text-sm ui-font-semibold',
      className,
    )}
    {...props}
  />
))

SelectLabel.displayName = '@kyrian/ui/select-label'

const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, forwardedRef) => (
  <SelectPrimitive.Item
    ref={forwardedRef}
    className={cn(
      'focus:ui-bg-accent focus:ui-text-accent-foreground ui-relative ui-flex ui-w-full ui-cursor-default ui-select-none ui-items-center ui-rounded-sm ui-py-1.5 ui-pl-8 ui-pr-2 ui-text-sm ui-outline-none data-[disabled]:ui-pointer-events-none data-[disabled]:ui-opacity-50',
      className,
    )}
    {...props}
  >
    <span className='ui-absolute ui-left-2 ui-flex ui-h-3.5 ui-w-3.5 ui-items-center ui-justify-center'>
      <SelectPrimitive.ItemIndicator>
        <Check className='ui-h-4 ui-w-4' />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))

SelectItem.displayName = '@kyrian/ui/select-item'

const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitive.Separator
    ref={forwardedRef}
    className={cn('ui-bg-muted ui--mx-1 ui-my-1 ui-h-px', className)}
    {...props}
  />
))

SelectSeparator.displayName = '@kyrian/ui/select-separator'

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}
