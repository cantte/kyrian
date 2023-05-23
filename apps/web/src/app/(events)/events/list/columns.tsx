'use client'

import { type Event } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'

import { Badge } from '@kyrian/ui'

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: 'title',
    header: 'Título',
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => {
      const date = row.getValue('date')
      return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(date as Date)
    },
  },
  {
    accessorKey: 'place',
    header: 'Lugar',
  },
  {
    accessorKey: 'topic',
    header: 'Tema',
    cell: ({ row }) => {
      const topic = row.getValue('topic')

      return (
        <Badge variant='secondary'>
          {topic !== null ? topic : 'Sin temática'}
        </Badge>
      )
    },
  },
]
