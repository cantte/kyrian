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
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
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
    className={cn('aspect-square h-full w-full', className)}
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
      'bg-muted flex h-full w-full items-center justify-center rounded-full',
      className,
    )}
    {...props}
  />
))

AvatarFallback.displayName = '@kyrian/ui/avatar-fallback'

export { Avatar, AvatarImage, AvatarFallback }
