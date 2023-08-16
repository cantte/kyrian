'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn } from './lib/utils'

const MenubarMenu = MenubarPrimitive.Menu

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = forwardRef<
  ElementRef<typeof MenubarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      'ui-flex ui-h-10 ui-items-center ui-space-x-1 ui-rounded-md ui-border ui-border-slate-300 ui-bg-white ui-p-1 dark:ui-border-slate-700 dark:ui-bg-slate-800',
      className,
    )}
    {...props}
  />
))
Menubar.displayName = '@kyrian/ui/menubar'

const MenubarTrigger = forwardRef<
  ElementRef<typeof MenubarPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      'ui-flex ui-cursor-default ui-select-none ui-items-center ui-rounded-[0.2rem] ui-px-3 ui-py-1.5 ui-text-sm ui-font-medium ui-outline-none focus:ui-bg-slate-100 data-[state=open]:ui-bg-slate-100 dark:focus:ui-bg-slate-700 dark:data-[state=open]:ui-bg-slate-700',
      className,
    )}
    {...props}
  />
))
MenubarTrigger.displayName = '@kyrian/ui/menubar-trigger'

const MenubarSubTrigger = forwardRef<
  ElementRef<typeof MenubarPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'ui-flex ui-cursor-default ui-select-none ui-items-center ui-rounded-sm ui-px-2 ui-py-1.5 ui-text-sm ui-font-medium ui-outline-none focus:ui-bg-slate-100 data-[state=open]:ui-bg-slate-100 dark:focus:ui-bg-slate-700 dark:data-[state=open]:ui-bg-slate-700',
      inset && 'ui-pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className='ui-ml-auto ui-h-4 ui-w-4' />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = '@kyrian/ui/menubar-sub-trigger'

const MenubarSubContent = forwardRef<
  ElementRef<typeof MenubarPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      'ui-animate-in ui-slide-in-from-left-1 ui-z-50 ui-min-w-[8rem] ui-overflow-hidden ui-rounded-md ui-border ui-border-slate-100 ui-bg-white ui-p-1 ui-shadow-md dark:ui-border-slate-700 dark:ui-bg-slate-800',
      className,
    )}
    {...props}
  />
))
MenubarSubContent.displayName = '@kyrian/ui/menubar-sub-content'

const MenubarContent = forwardRef<
  ElementRef<typeof MenubarPrimitive.Content>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = 'start', alignOffset = -4, sideOffset = 8, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'ui-animate-in ui-slide-in-from-top-1 ui-z-50 ui-min-w-[12rem] ui-overflow-hidden ui-rounded-md ui-border ui-border-slate-100 ui-bg-white ui-p-1 ui-text-slate-700 ui-shadow-md dark:ui-border-slate-800 dark:ui-bg-slate-800 dark:ui-text-slate-400',
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
)
MenubarContent.displayName = '@kyrian/ui/menubar-content'

const MenubarItem = forwardRef<
  ElementRef<typeof MenubarPrimitive.Item>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'ui-relative ui-flex ui-cursor-default ui-select-none ui-items-center ui-rounded-sm ui-px-2 ui-py-1.5 ui-text-sm ui-font-medium ui-outline-none focus:ui-bg-slate-100 data-[disabled]:ui-pointer-events-none data-[disabled]:ui-opacity-50 dark:focus:ui-bg-slate-700',
      inset && 'ui-pl-8',
      className,
    )}
    {...props}
  />
))
MenubarItem.displayName = '@kyrian/ui/menubar-item'

const MenubarCheckboxItem = forwardRef<
  ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'ui-relative ui-flex ui-cursor-default ui-select-none ui-items-center ui-rounded-sm ui-py-1.5 ui-pl-8 ui-pr-2 ui-text-sm ui-font-medium ui-outline-none focus:ui-bg-slate-100 data-[disabled]:ui-pointer-events-none data-[disabled]:ui-opacity-50 dark:focus:ui-bg-slate-700',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className='ui-absolute ui-left-2 ui-flex ui-h-3.5 ui-w-3.5 ui-items-center ui-justify-center'>
      <MenubarPrimitive.ItemIndicator>
        <Check className='ui-h-4 ui-w-4' />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = '@kyrian/ui/menubar-checkbox-item'

const MenubarRadioItem = forwardRef<
  ElementRef<typeof MenubarPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      'ui-relative ui-flex ui-cursor-default ui-select-none ui-items-center ui-rounded-sm ui-py-1.5 ui-pl-8 ui-pr-2 ui-text-sm ui-font-medium ui-outline-none focus:ui-bg-slate-100 data-[disabled]:ui-pointer-events-none data-[disabled]:ui-opacity-50 dark:focus:ui-bg-slate-700',
      className,
    )}
    {...props}
  >
    <span className='ui-absolute ui-left-2 ui-flex ui-h-3.5 ui-w-3.5 ui-items-center ui-justify-center'>
      <MenubarPrimitive.ItemIndicator>
        <Circle className='ui-h-2 ui-w-2 ui-fill-current' />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = '@kyrian/ui/menubar-radio-item'

const MenubarLabel = forwardRef<
  ElementRef<typeof MenubarPrimitive.Label>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      'ui-px-2 ui-py-1.5 ui-text-sm ui-font-semibold ui-text-slate-900 dark:ui-text-slate-300',
      inset && 'ui-pl-8',
      className,
    )}
    {...props}
  />
))
MenubarLabel.displayName = '@kyrian/ui/menubar-label'

const MenubarSeparator = forwardRef<
  ElementRef<typeof MenubarPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn(
      'ui--mx-1 ui-my-1 ui-h-px ui-bg-slate-100 dark:ui-bg-slate-700',
      className,
    )}
    {...props}
  />
))
MenubarSeparator.displayName = '@kyrian/ui/menubar-separator'

const MenubarShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ui-ml-auto ui-text-xs ui-tracking-widest ui-text-slate-500',
        className,
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = '@kyrian/ui/menubar-shortcut'

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
