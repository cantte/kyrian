'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from './lib/utils'

const Tabs = TabsPrimitive.Root

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'ui-bg-muted ui-text-muted-foreground ui-inline-flex ui-h-10 ui-items-center ui-justify-center ui-rounded-md ui-p-1',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = '@kyrian/ui/tabs-list'

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'ui-ring-offset-background focus-visible:ui-ring-ring data-[state=active]:ui-bg-background data-[state=active]:ui-text-foreground ui-inline-flex ui-items-center ui-justify-center ui-whitespace-nowrap ui-rounded-sm ui-px-3 ui-py-1.5 ui-text-sm ui-font-medium ui-transition-all focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50 data-[state=active]:ui-shadow-sm',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = '@kyrian/ui/tabs-trigger'

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ui-ring-offset-background focus-visible:ui-ring-ring ui-mt-2 focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-offset-2',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = '@kyrian/ui/tabs-content'

export { Tabs, TabsList, TabsTrigger, TabsContent }
