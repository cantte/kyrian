import { type ComponentType } from 'react'
import { type Column } from '@tanstack/react-table'
import { CheckIcon, PlusCircle } from 'lucide-react'

import {
  Badge,
  Button,
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from '@kyrian/ui'

type MonographsDataTableFacetedFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: ComponentType<{ className?: string }>
  }[]
}

const MonographsDataTableFacetedFilter = <TData, TValue>({
  column,
  title,
  options,
}: MonographsDataTableFacetedFilterProps<TData, TValue>) => {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='app-h-8 app-border-dashed'
        >
          <PlusCircle className='app-mr-2 app-h-4 app-w-4' />
          {title}

          {selectedValues?.size > 0 && (
            <>
              <Separator orientation='vertical' className='app-mx-2 app-h-4' />
              <Badge
                variant='secondary'
                className='app-rounded-sm app-px-1 app-font-normal lg:app-hidden'
              >
                {selectedValues.size}
              </Badge>

              <div className='app-hidden app-space-x-1 lg:app-flex'>
                {selectedValues.size > 2 ? (
                  <Badge
                    variant='secondary'
                    className='app-rounded-sm app-px-1 app-font-normal'
                  >
                    {selectedValues.size} seleccionados
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='app-rounded-sm app-px-1 app-font-normal'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='app-w-[200px] app-p-0' align='start'>
        <Command>
          <CommandInput placeholder={`Filtrar por ${title}`} />
          <CommandList>
            <CommandEmpty>No hay resultados.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      )
                    }}
                  >
                    <div
                      className={cn(
                        'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    {option.icon && (
                      <option.icon className='text-muted-foreground mr-2 h-4 w-4' />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className='ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs'>
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className='justify-center text-center'
                  >
                    Limpiar
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default MonographsDataTableFacetedFilter
