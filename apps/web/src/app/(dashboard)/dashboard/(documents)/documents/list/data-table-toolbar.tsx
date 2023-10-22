'use client'

import { type Table } from '@tanstack/react-table'
import { XCircle } from 'lucide-react'

import { Button, Input } from '@kyrian/ui'

import DocumentDataTableFacetedFilter from '~/app/(dashboard)/dashboard/(documents)/documents/list/data-table-faceted-filter'

type DocumentsDataTableToolbarProps<TData> = {
  table: Table<TData>
}

const DocumentsDataTableToolbar = <TData,>({
  table,
}: DocumentsDataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0

  const options = [
    { label: 'Plan estratégico', value: 'StrategicPlan' },
    { label: 'Protocolo', value: 'Protocol' },
    { label: 'Formato', value: 'Format' },
    { label: 'Acuerdo', value: 'Agreement' },
    { label: 'Acta', value: 'Standard' },
    { label: 'Libro', value: 'Book' },
    { label: 'Publicación', value: 'Article' },
  ]

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Buscar por nombre'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(e) => {
            table.getColumn('name')?.setFilterValue(e.target.value)
          }}
          className='h-8 w-[150px] lg:w-[250px]'
        />

        {table.getColumn('type') && (
          <DocumentDataTableFacetedFilter
            column={table.getColumn('type')}
            title='Tipo'
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

export default DocumentsDataTableToolbar
