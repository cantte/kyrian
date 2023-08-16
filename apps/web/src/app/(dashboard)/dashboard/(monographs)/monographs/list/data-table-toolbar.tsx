'use client'

import { type Table } from '@tanstack/react-table'
import { XCircle } from 'lucide-react'

import { type RouterOutputs } from '@kyrian/api'
import { Button, Input } from '@kyrian/ui'

import MonographsDataTableFacetedFilter from '~/app/(dashboard)/dashboard/(monographs)/monographs/list/data-table-faceted-filter'

type MonographsDataTableToolbarProps<TData> = {
  table: Table<TData>

  degreePrograms: RouterOutputs['degreeProgram']['getNameAndCode']
}

const MonographsDataTableToolbar = <TData,>({
  table,
  degreePrograms,
}: MonographsDataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0

  const options = degreePrograms.map((degreeProgram) => ({
    label: degreeProgram.name,
    value: degreeProgram.name,
  }))

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Buscar por título'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(e) => {
            table.getColumn('title')?.setFilterValue(e.target.value)
          }}
          className='h-8 w-[150px] lg:w-[250px]'
        />

        {table.getColumn('degreeProgram') && (
          <MonographsDataTableFacetedFilter
            column={table.getColumn('degreeProgram')}
            title='Programa'
            options={options}
          />
        )}

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Limpiar filtros
            <XCircle className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  )
}

export default MonographsDataTableToolbar
