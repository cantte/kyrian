'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { type RouterOutputs } from '@kyrian/api'
import { Badge } from '@kyrian/ui'

import { documentTypes } from '../new/form'

type DocumentOutput = RouterOutputs['document']['byType'][number]

export const columns: ColumnDef<DocumentOutput>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'createdAt',
    header: 'Fecha de creación',
    cell: ({ row }) => {
      const date = row.getValue('createdAt')
      return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date as Date)
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = row.original.type
      const typeName = documentTypes[type]

      return <Badge>{type !== null ? typeName : 'Sin tipo'}</Badge>
    },
  },
]
