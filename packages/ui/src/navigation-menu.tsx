'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'

import { cn } from './lib/utils'

const NavigationMenu = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Root>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'ui-relative ui-z-10 ui-flex ui-flex-1 ui-items-center ui-justify-center',
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = '@kyrian/ui/navigation-menu'

const NavigationMenuList = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.List>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'ui-group ui-flex ui-flex-1 ui-list-none ui-items-center ui-justify-center',
      className,
    )}
    {...props}
  />
))
NavigationMenuList.displayName = '@kyrian/ui/navigation-menu-list'

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  'ui-inline-flex ui-items-center ui-justify-center ui-rounded-md ui-text-sm ui-font-medium ui-transition-colors focus:ui-outline-none focus:ui-bg-slate-100 disabled:ui-opacity-50 dark:focus:ui-bg-slate-800 disabled:ui-pointer-events-none ui-bg-transparent hover:ui-bg-slate-100 dark:hover:ui-bg-slate-800 dark:ui-text-slate-100 dark:hover:ui-text-slate-100 data-[state=open]:ui-bg-slate-50 dark:data-[state=open]:ui-bg-slate-800 data-[active]:ui-bg-slate-50 dark:data-[active]:ui-bg-slate-800 ui-h-10 ui-py-2 ui-px-4 ui-group ui-w-max',
)

const NavigationMenuTrigger = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'ui-group', className)}
    {...props}
  >
    {children}{' '}
    <ChevronDown
      className='ui-relative ui-top-[1px] ui-ml-1 ui-h-3 ui-w-3 ui-transition ui-duration-200 group-data-[state=open]:ui-rotate-180'
      aria-hidden='true'
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = '@kyrian/ui/navigation-menu-trigger'

const NavigationMenuContent = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'data-[motion^=from-]:ui-animate-in data-[motion^=to-]:ui-animate-out data-[motion^=from-]:ui-fade-in data-[motion^=to-]:ui-fade-out data-[motion=to-start]:ui-slide-out-to-left-52 data-[motion=to-end]:ui-slide-out-to-right-52 data-[motion=from-start]:ui-slide-in-from-left-52 data-[motion=from-end]:ui-slide-in-from-right-52 ui-left-0 ui-top-0 ui-w-full md:ui-absolute md:ui-w-auto ',
      className,
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = '@kyrian/ui/navigation-menu-content'

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      'ui-absolute ui-left-0 ui-top-full ui-flex ui-justify-center',
    )}
  >
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'ui-origin-top-center data-[state=open]:ui-animate-in data-[state=closed]:ui-animate-out data-[state=open]:ui-zoom-in-90 data-[state=closed]:ui-zoom-out-95 ui-relative ui-mt-1.5 ui-h-[var(--radix-navigation-menu-viewport-height)] ui-w-full ui-overflow-hidden ui-rounded-md ui-border ui-border-slate-200 ui-bg-white ui-shadow-lg dark:ui-border-slate-700 dark:ui-bg-slate-800 md:ui-w-[var(--radix-navigation-menu-viewport-width)]',
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName = '@kyrian/ui/navigation-menu-viewport'

const NavigationMenuIndicator = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'data-[state=visible]:ui-animate-in data-[state=hidden]:ui-animate-out data-[state=visible]:ui-fade-in data-[state=hidden]:ui-fade-out ui-top-full ui-z-[1] ui-flex ui-h-1.5 ui-items-end ui-justify-center ui-overflow-hidden',
      className,
    )}
    {...props}
  >
    <div className='ui-relative ui-top-[60%] ui-h-2 ui-w-2 ui-rotate-45 ui-rounded-tl-sm ui-bg-slate-200 ui-shadow-md dark:ui-bg-slate-800' />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName = '@kyrian/ui/navigation-menu-indicator'

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
