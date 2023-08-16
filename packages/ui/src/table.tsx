import {
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react'

import { cn } from './lib/utils'

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className='ui-w-full ui-overflow-auto'>
      <table
        ref={ref}
        className={cn('ui-w-full ui-caption-bottom ui-text-sm', className)}
        {...props}
      />
    </div>
  ),
)
Table.displayName = '@kyrian/ui/Table'

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:ui-border-b', className)} {...props} />
))
TableHeader.displayName = '@kyrian/ui/TableHeader'

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:ui-border-0', className)}
    {...props}
  />
))
TableBody.displayName = '@kyrian/ui/TableBody'

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'ui-bg-primary ui-text-primary-foreground ui-font-medium',
      className,
    )}
    {...props}
  />
))
TableFooter.displayName = '@kyrian/ui/TableFooter'

const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'hover:ui-bg-muted/50 data-[state=selected]:ui-bg-muted ui-border-b ui-transition-colors',
      className,
    )}
    {...props}
  />
))
TableRow.displayName = '@kyrian/ui/TableRow'

const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'ui-text-muted-foreground ui-h-12 ui-px-4 ui-text-left ui-align-middle ui-font-medium [&:has([role=checkbox])]:ui-pr-0',
      className,
    )}
    {...props}
  />
))
TableHead.displayName = '@kyrian/ui/TableHead'

const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'ui-p-4 ui-align-middle [&:has([role=checkbox])]:ui-pr-0',
      className,
    )}
    {...props}
  />
))
TableCell.displayName = '@kyrian/ui/TableCell'

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('ui-text-muted-foreground ui-mt-4 ui-text-sm', className)}
    {...props}
  />
))
TableCaption.displayName = '@kyrian/ui/TableCaption'

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
}
