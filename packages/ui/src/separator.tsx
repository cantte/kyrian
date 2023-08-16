'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from './lib/utils'

const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'ui-bg-slate-200 dark:ui-bg-slate-700',
        orientation === 'horizontal'
          ? 'ui-h-[1px] ui-w-full'
          : 'ui-h-full ui-w-[1px]',
        className,
      )}
      {...props}
    />
  ),
)
Separator.displayName = '@kyrian/ui/separator'

export { Separator }
