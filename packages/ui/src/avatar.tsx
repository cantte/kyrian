'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from './lib/utils'

const Avatar = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, forwardedRef) => (
  <AvatarPrimitive.Root
    ref={forwardedRef}
    className={cn(
      'ui-relative ui-flex ui-h-10 ui-w-10 ui-shrink-0 ui-overflow-hidden ui-rounded-full',
      className,
    )}
    {...props}
  />
))

Avatar.displayName = '@kyrian/ui/avatar'

const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, forwardedRef) => (
  <AvatarPrimitive.Image
    ref={forwardedRef}
    className={cn('ui-aspect-square ui-h-full ui-w-full', className)}
    {...props}
  />
))

AvatarImage.displayName = '@kyrian/ui/avatar-image'

const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, forwardedRef) => (
  <AvatarPrimitive.Fallback
    ref={forwardedRef}
    className={cn(
      'ui-bg-muted ui-flex ui-h-full ui-w-full ui-items-center ui-justify-center ui-rounded-full',
      className,
    )}
    {...props}
  />
))

AvatarFallback.displayName = '@kyrian/ui/avatar-fallback'

export { Avatar, AvatarImage, AvatarFallback }
