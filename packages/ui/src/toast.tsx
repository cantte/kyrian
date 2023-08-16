import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactElement,
} from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

import { cn } from './lib/utils'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = forwardRef<
  ElementRef<typeof ToastPrimitives.Viewport>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'ui-fixed ui-top-0 ui-z-[100] ui-flex ui-max-h-screen ui-w-full ui-flex-col-reverse ui-p-4 sm:ui-bottom-0 sm:ui-right-0 sm:ui-top-auto sm:ui-flex-col md:ui-max-w-[420px]',
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = '@kyrian/ui/toast-viewport'

const toastVariants = cva(
  'data-[swipe=move]:ui-transition-none ui-grow-1 ui-group ui-relative ui-pointer-events-auto ui-flex ui-w-full ui-items-center ui-justify-between ui-space-x-4 ui-overflow-hidden ui-rounded-md ui-border ui-p-6 ui-pr-8 ui-shadow-lg ui-transition-all data-[swipe=move]:ui-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:ui-translate-x-0 data-[swipe=end]:ui-translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:ui-animate-in data-[state=closed]:ui-animate-out data-[swipe=end]:ui-animate-out data-[state=closed]:ui-fade-out-80 data-[state=open]:ui-slide-in-from-top-full data-[state=open]:sm:ui-slide-in-from-bottom-full ui-mt-4 data-[state=closed]:ui-slide-out-to-right-full dark:ui-border-slate-700 last:ui-mt-0 sm:last:ui-mt-4',
  {
    variants: {
      variant: {
        default:
          'ui-bg-white ui-border-slate-200 dark:ui-bg-slate-800 dark:ui-border-slate-700',
        destructive:
          'ui-group ui-destructive ui-bg-red-600 ui-text-white ui-border-red-600 dark:ui-border-red-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Toast = forwardRef<
  ElementRef<typeof ToastPrimitives.Root>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = '@kyrian/ui/toast'

const ToastAction = forwardRef<
  ElementRef<typeof ToastPrimitives.Action>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'ui-inline-flex ui-h-8 ui-shrink-0 ui-items-center ui-justify-center ui-rounded-md ui-border ui-border-slate-200 ui-bg-transparent ui-px-3 ui-text-sm ui-font-medium ui-transition-colors hover:ui-bg-slate-100 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-slate-400 focus:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50 group-[.destructive]:ui-border-red-100 group-[.destructive]:hover:ui-border-slate-50 group-[.destructive]:hover:ui-bg-red-100 group-[.destructive]:hover:ui-text-red-600 group-[.destructive]:focus:ui-ring-red-400 group-[.destructive]:focus:ui-ring-offset-red-600 dark:ui-border-slate-700 dark:ui-text-slate-100 dark:hover:ui-bg-slate-700 dark:hover:ui-text-slate-100 dark:focus:ui-ring-slate-400 dark:focus:ui-ring-offset-slate-900 dark:data-[state=open]:ui-bg-slate-800',
      className,
    )}
    {...props}
  />
))
ToastAction.displayName = '@kyrian/ui/toast-action'

const ToastClose = forwardRef<
  ElementRef<typeof ToastPrimitives.Close>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'ui-absolute ui-right-2 ui-top-2 ui-rounded-md ui-p-1 ui-text-slate-500 ui-opacity-0 ui-transition-opacity hover:ui-text-slate-900 focus:ui-opacity-100 focus:ui-outline-none focus:ui-ring-2 group-hover:ui-opacity-100 group-[.destructive]:ui-text-red-300 group-[.destructive]:hover:ui-text-red-50 group-[.destructive]:focus:ui-ring-red-400 group-[.destructive]:focus:ui-ring-offset-red-600 dark:hover:ui-text-slate-50',
      className,
    )}
    toast-close=''
    {...props}
  >
    <X className='ui-h-4 ui-w-4' />
  </ToastPrimitives.Close>
))
ToastClose.displayName = '@kyrian/ui/toast-close'

const ToastTitle = forwardRef<
  ElementRef<typeof ToastPrimitives.Title>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('ui-text-sm ui-font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = '@kyrian/ui/toast-title'

const ToastDescription = forwardRef<
  ElementRef<typeof ToastPrimitives.Description>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('ui-text-sm ui-opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = '@kyrian/ui/toast-description'

type ToastProps = ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
