'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn } from './lib/utils'

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'focus:ui-bg-accent data-[state=open]:ui-bg-accent ui-flex ui-cursor-default ui-select-none ui-items-center ui-rounded-sm ui-px-2 ui-py-1.5 ui-text-sm ui-outline-none',
      inset && 'ui-pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className='ui-ml-auto ui-h-4 ui-w-4' />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = '@kyrian/ui/dropdown-menu-sub-trigger'

const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'ui-bg-popover ui-text-popover-foreground ui-animate-in data-[side=bottom]:ui-slide-in-from-top-1 data-[side=left]:ui-slide-in-from-right-1 data-[side=right]:ui-slide-in-from-left-1 data-[side=top]:ui-slide-in-from-bottom-1 ui-z-50 ui-min-w-[8rem] ui-overflow-hidden ui-rounded-md ui-border ui-p-1 ui-shadow-md',
      className,
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName = '@kyrian/ui/dropdown-menu-sub-content'

const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'ui-bg-popover ui-text-popover-foreground ui-animate-in data-[side=bottom]:ui-slide-in-from-top-2 data-[side=left]:ui-slide-in-from-right-2 data-[side=right]:ui-slide-in-from-left-2 data-[side=top]:ui-slide-in-from-bottom-2 ui-z-50 ui-min-w-[8rem] ui-overflow-hidden ui-rounded-md ui-border ui-p-1 ui-shadow-md',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = '@kyrian/ui/dropdown-menu-content'

const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'focus:ui-bg-accent focus:ui-text-accent-foreground ui-relative ui-flex ui-cursor-default ui-select-none ui-items-center ui-rounded-sm ui-px-2 ui-py-1.5 ui-text-sm ui-outline-none ui-transition-colors data-[disabled]:ui-pointer-events-none data-[disabled]:ui-opacity-50',
      inset && 'ui-pl-8',
      className,
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = '@kyrian/ui/dropdown-menu-item'

const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'focus:ui-bg-accent focus:ui-text-accent-foreground ui-relative ui-flex ui-cursor-default ui-select-none ui-items-center ui-rounded-sm ui-py-1.5 ui-pl-8 ui-pr-2 ui-text-sm ui-outline-none ui-transition-colors data-[disabled]:ui-pointer-events-none data-[disabled]:ui-opacity-50',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className='ui-absolute ui-left-2 ui-flex ui-h-3.5 ui-w-3.5 ui-items-center ui-justify-center'>
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className='ui-h-4 ui-w-4' />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = '@kyrian/ui/dropdown-menu-checkbox-item'

const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'focus:ui-bg-accent focus:ui-text-accent-foreground ui-relative ui-flex ui-cursor-default ui-select-none ui-items-center ui-rounded-sm ui-py-1.5 ui-pl-8 ui-pr-2 ui-text-sm ui-outline-none ui-transition-colors data-[disabled]:ui-pointer-events-none data-[disabled]:ui-opacity-50',
      className,
    )}
    {...props}
  >
    <span className='ui-absolute ui-left-2 ui-flex ui-h-3.5 ui-w-3.5 ui-items-center ui-justify-center'>
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className='ui-h-2 ui-w-2 ui-fill-current' />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = '@kyrian/ui/dropdown-menu-radio-item'

const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'ui-px-2 ui-py-1.5 ui-text-sm ui-font-semibold',
      inset && 'ui-pl-8',
      className,
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = '@kyrian/ui/drropdown-menu-label'

const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('ui-bg-muted ui--mx-1 ui-my-1 ui-h-px', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = '@kyrian/ui/dropdown-menu-separator'

const DropdownMenuShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ui-ml-auto ui-text-xs ui-tracking-widest ui-opacity-60',
        className,
      )}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = 'dropdown-menu-shortcut'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
