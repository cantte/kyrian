import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from './lib/utils'

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'ui-bg-card ui-text-card-foreground ui-rounded-lg ui-border ui-shadow-sm',
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = '@kyrian/ui/card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('ui-flex ui-flex-col ui-space-y-1.5 ui-p-6', className)}
      {...props}
    />
  ),
)
CardHeader.displayName = '@kyrian/ui/card-header'

const CardTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'ui-text-lg ui-font-semibold ui-leading-none ui-tracking-tight',
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = '@kyrian/ui/card-title'

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('ui-text-muted-foreground ui-text-sm', className)}
    {...props}
  />
))
CardDescription.displayName = '@kyrian/ui/card-description'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('ui-p-6 ui-pt-0', className)} {...props} />
  ),
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('ui-flex ui-items-center ui-p-6 ui-pt-0', className)}
      {...props}
    />
  ),
)
CardFooter.displayName = '@kyrian/ui/card-footer'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
