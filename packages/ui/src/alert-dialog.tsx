'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { buttonVariants } from './button'
import { cn } from './lib/utils'

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = ({
  className,
  children,
  ...props
}: AlertDialogPrimitive.AlertDialogPortalProps) => (
  <AlertDialogPrimitive.Portal className={cn(className)} {...props}>
    <div className='ui-fixed ui-inset-0 ui-z-50 ui-flex ui-items-end ui-justify-center sm:ui-items-center'>
      {children}
    </div>
  </AlertDialogPrimitive.Portal>
)
AlertDialogPortal.displayName = '@kyrian/ui/alert-dialog-portal'

const AlertDialogOverlay = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'ui-bg-background/80 ui-animate-in ui-fade-in ui-fixed ui-inset-0 ui-z-50 ui-backdrop-blur-sm ui-transition-opacity',
      className,
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = '@kyrian/ui/alert-dialog-overlay'

const AlertDialogContent = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'ui-bg-background ui-animate-in ui-fade-in-90 ui-slide-in-from-bottom-10 sm:ui-zoom-in-90 sm:ui-slide-in-from-bottom-0 ui-fixed ui-z-50 ui-grid ui-w-full ui-max-w-lg ui-scale-100 ui-gap-4 ui-border ui-p-6 ui-opacity-100 ui-shadow-lg sm:ui-rounded-lg md:ui-w-full',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = '@kyrian/ui/alert-dialog-content'

const AlertDialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ui-flex ui-flex-col ui-space-y-2 ui-text-center sm:ui-text-left',
      className,
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = '@kyrian/ui/alert-dialog-header'

const AlertDialogFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ui-flex ui-flex-col-reverse sm:ui-flex-row sm:ui-justify-end sm:ui-space-x-2',
      className,
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = '@kyrian/ui/alert-dialog-footer'

const AlertDialogTitle = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      'ui-text-lg ui-font-semibold',
      'dark:ui-text-slate-50',
      className,
    )}
    {...props}
  />
))
AlertDialogTitle.displayName = '@kyrian/ui/alert-dialog-title'

const AlertDialogDescription = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('ui-text-muted-foreground ui-text-sm', className)}
    {...props}
  />
))
AlertDialogDescription.displayName = '@kyrian/ui/alert-dialog-description'

const AlertDialogAction = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Action>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = '@kyrian/ui/alert-dialog-action'

const AlertDialogCancel = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Cancel>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: 'outline' }), className)}
    {...props}
  />
))
AlertDialogCancel.displayName = '@kyrian/ui/alert-dialog-cancel'

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
