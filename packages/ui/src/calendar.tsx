'use client'

import { type ComponentProps } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { buttonVariants } from './button'
import { cn } from './lib/utils'

export type CalendarProps = ComponentProps<typeof DayPicker>

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('ui-p-3', className)}
      classNames={{
        months:
          'ui-flex ui-flex-col sm:ui-flex-row ui-space-y-4 sm:ui-space-x-4 sm:ui-space-y-0',
        month: 'ui-space-y-4',
        caption:
          'ui-flex ui-justify-center ui-pt-1 ui-relative ui-items-center',
        caption_label: 'ui-text-sm ui-font-medium',
        nav: 'ui-space-x-1 ui-flex ui-items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'ui-h-7 ui-w-7 ui-bg-transparent ui-p-0 ui-opacity-50 hover:ui-opacity-100',
        ),
        nav_button_previous: 'ui-absolute ui-left-1',
        nav_button_next: 'ui-absolute ui-right-1',
        table: 'ui-w-full ui-border-collapse ui-space-y-1',
        head_row: 'ui-flex',
        head_cell:
          'ui-text-muted-foreground ui-rounded-md ui-w-9 ui-font-normal ui-text-[0.8rem]',
        row: 'ui-flex ui-w-full ui-mt-2',
        cell: 'ui-text-center ui-text-sm ui-p-0 ui-relative [&:has([aria-selected])]:ui-bg-accent first:[&:has([aria-selected])]:ui-rounded-l-md last:[&:has([aria-selected])]:ui-rounded-r-md focus-within:ui-relative focus-within:ui-z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'ui-h-9 ui-w-9 ui-p-0 ui-font-normal aria-selected:ui-opacity-100',
        ),
        day_selected:
          'ui-bg-primary ui-text-primary-foreground hover:ui-bg-primary hover:ui-text-primary-foreground focus:ui-bg-primary focus:ui-text-primary-foreground',
        day_today: 'ui-bg-accent ui-text-accent-foreground',
        day_outside: 'ui-text-muted-foreground ui-opacity-50',
        day_disabled: 'ui-text-muted-foreground ui-opacity-50',
        day_range_middle:
          'aria-selected:ui-bg-accent aria-selected:ui-text-accent-foreground',
        day_hidden: 'ui-invisible',
        ...classNames,
      }}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        IconLeft: ({ ...props }) => <ChevronLeft className='ui-h-4 ui-w-4' />,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        IconRight: ({ ...props }) => <ChevronRight className='ui-h-4 ui-w-4' />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = '@kyrian/ui/calendar'

export { Calendar }
