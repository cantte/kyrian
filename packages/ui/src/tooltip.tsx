'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from './lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = ({ ...props }) => <TooltipPrimitive.Root {...props} />
Tooltip.displayName = '@kyrian/ui/tooltip'

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'ui-bg-popover ui-text-popover-foreground ui-animate-in ui-fade-in-50 data-[side=bottom]:ui-slide-in-from-top-1 data-[side=left]:ui-slide-in-from-right-1 data-[side=right]:ui-slide-in-from-left-1 data-[side=top]:ui-slide-in-from-bottom-1 ui-z-50 ui-overflow-hidden ui-rounded-md ui-border ui-px-3 ui-py-1.5 ui-text-sm ui-shadow-md',
      className,
    )}
    {...props}
  />
))
TooltipContent.displayName = '@kyrian/ui/tooltip-content'

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
