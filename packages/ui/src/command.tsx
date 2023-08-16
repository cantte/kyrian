'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'

import { Dialog, DialogContent } from './dialog'
import { cn } from './lib/utils'

const Command = forwardRef<
  ElementRef<typeof CommandPrimitive>,
  ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'ui-bg-popover ui-text-popover-foreground ui-flex ui-h-full ui-w-full ui-flex-col ui-overflow-hidden ui-rounded-md',
      className,
    )}
    {...props}
  />
))
Command.displayName = '@kyrian/ui/Command'

type CommandDialogProps = DialogProps
const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className='ui-overflow-hidden ui-p-0 ui-shadow-lg'>
        <Command className='[&_[cmdk-group-heading]]:ui-text-muted-foreground [&_[cmdk-group-heading]]:ui-px-2 [&_[cmdk-group-heading]]:ui-font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:ui-pt-0 [&_[cmdk-group]]:ui-px-2 [&_[cmdk-input-wrapper]_svg]:ui-h-5 [&_[cmdk-input-wrapper]_svg]:ui-w-5 [&_[cmdk-input]]:ui-h-12 [&_[cmdk-item]]:ui-px-2 [&_[cmdk-item]]:ui-py-3 [&_[cmdk-item]_svg]:ui-h-5 [&_[cmdk-item]_svg]:ui-w-5'>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className='ui-flex ui-items-center ui-border-b ui-px-3'
    cmdk-input-wrapper=''
  >
    <Search className='ui-mr-2 ui-h-4 ui-w-4 ui-shrink-0 ui-opacity-50' />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'placeholder:ui-text-muted-foreground ui-flex ui-h-11 ui-w-full ui-rounded-md ui-bg-transparent ui-py-3 ui-text-sm ui-outline-none disabled:ui-cursor-not-allowed disabled:ui-opacity-50',
        className,
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = '@kyrian/ui/CommandInput'

const CommandList = forwardRef<
  ElementRef<typeof CommandPrimitive.List>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      'ui-max-h-[300px] ui-overflow-y-auto ui-overflow-x-hidden',
      className,
    )}
    {...props}
  />
))
CommandList.displayName = '@kyrian/ui/CommandList'

const CommandEmpty = forwardRef<
  ElementRef<typeof CommandPrimitive.Empty>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className='ui-py-6 ui-text-center ui-text-sm'
    {...props}
  />
))
CommandEmpty.displayName = '@kyrian/ui/CommandEmpty'

const CommandGroup = forwardRef<
  ElementRef<typeof CommandPrimitive.Group>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'ui-text-foreground [&_[cmdk-group-heading]]:ui-text-muted-foreground ui-overflow-hidden ui-p-1 [&_[cmdk-group-heading]]:ui-px-2 [&_[cmdk-group-heading]]:ui-py-1.5 [&_[cmdk-group-heading]]:ui-text-xs [&_[cmdk-group-heading]]:ui-font-medium',
      className,
    )}
    {...props}
  />
))
CommandGroup.displayName = '@kyrian/ui/CommandGroup'

const CommandSeparator = forwardRef<
  ElementRef<typeof CommandPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('ui-bg-border ui--mx-1 ui-h-px', className)}
    {...props}
  />
))
CommandSeparator.displayName = '@kyrian/ui/CommandSeparator'

const CommandItem = forwardRef<
  ElementRef<typeof CommandPrimitive.Item>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'aria-selected:ui-bg-accent aria-selected:ui-text-accent-foreground ui-relative ui-flex ui-cursor-default ui-select-none ui-items-center ui-rounded-sm ui-px-2 ui-py-1.5 ui-text-sm ui-outline-none data-[disabled]:ui-pointer-events-none data-[disabled]:ui-opacity-50',
      className,
    )}
    {...props}
  />
))
CommandItem.displayName = '@kyrian/ui/CommandItem'

const CommandShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ui-text-muted-foreground ui-ml-auto ui-text-xs ui-tracking-widest',
        className,
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = '@kyrian/ui/CommandShortcut'

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
