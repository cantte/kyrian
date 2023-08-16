'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from './lib/utils'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className='ui-fixed ui-inset-0 ui-z-50 ui-flex ui-items-start ui-justify-center sm:ui-items-center'>
      {children}
    </div>
  </DialogPrimitive.Portal>
)
DialogPortal.displayName = '@kyrian/ui/dialog-portal'

const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'ui-bg-background/80 data-[state=closed]:ui-animate-out data-[state=closed]:ui-fade-out data-[state=open]:ui-fade-in ui-fixed ui-inset-0 ui-z-50 ui-backdrop-blur-sm ui-transition-all ui-duration-100',
      className,
    )}
    {...props}
    ref={ref}
  />
))
DialogOverlay.displayName = '@kyrian/ui/dialog-overlay'

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'ui-bg-background ui-animate-in data-[state=open]:ui-fade-in-90 data-[state=open]:ui-slide-in-from-bottom-10 sm:ui-zoom-in-90 data-[state=open]:sm:ui-slide-in-from-bottom-0 ui-fixed ui-z-50 ui-grid ui-w-full ui-gap-4 ui-rounded-b-lg ui-border ui-p-6 ui-shadow-lg sm:ui-max-w-lg sm:ui-rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className='ui-ring-offset-background focus:ui-ring-ring data-[state=open]:ui-bg-accent data-[state=open]:ui-text-muted-foreground ui-absolute ui-right-4 ui-top-4 ui-rounded-sm ui-opacity-70 ui-transition-opacity hover:ui-opacity-100 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-offset-2 disabled:ui-pointer-events-none'>
        <X className='ui-h-4 ui-w-4' />
        <span className='sr-only'>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = '@kyrian/ui/dialog-content'

const DialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ui-flex ui-flex-col ui-space-y-1.5 ui-text-center sm:ui-text-left',
      className,
    )}
    {...props}
  />
)
DialogHeader.displayName = '@kyrian/ui/dialog-header'

const DialogFooter = ({
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
DialogFooter.displayName = '@kyrian/ui/dialog-footer'

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'ui-text-lg ui-font-semibold ui-leading-none ui-tracking-tight',
      className,
    )}
    {...props}
  />
))
DialogTitle.displayName = '@kyrian/ui/dialog-title'

const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('ui-text-muted-foreground ui-text-sm', className)}
    {...props}
  />
))
DialogDescription.displayName = '@kyrian/ui/dialog-description'

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
