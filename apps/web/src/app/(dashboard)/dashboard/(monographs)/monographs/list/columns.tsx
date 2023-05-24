'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { type RouterOutputs } from '@kyrian/api'
import { Badge } from '@kyrian/ui'

type MonographOutput = RouterOutputs['monograph']['list'][number]

export const columns: ColumnDef<MonographOutput>[] = [
  {
    accessorKey: 'title',
    header: 'Título',
  },
  {
    accessorKey: 'publicationDate',
    header: 'Fecha de publicación',
    cell: ({ row }) => {
      const date = row.getValue('publicationDate')
      return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date as Date)
    },
  },
  {
    accessorKey: 'degreeProgram.name',
    header: 'Programa',
    cell: ({ row }) => {
      const degreeProgram = row.original.degreeProgram

      return (
        <Badge>
          {degreeProgram !== null ? degreeProgram.name : 'Sin programa'}
        </Badge>
      )
    },
  },
]
