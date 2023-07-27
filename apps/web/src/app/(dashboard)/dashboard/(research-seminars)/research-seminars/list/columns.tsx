'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { type RouterOutputs } from '@kyrian/api'

type ResearchSeminarOutput = RouterOutputs['researchSeminar']['list'][number]

export const columns: ColumnDef<ResearchSeminarOutput>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'isActive',
    header: 'Activo',
    cell: ({ row }) => {
      const isActive = row.original.isActive

      return isActive ? 'Sí' : 'No'
    },
  },
  {
    accessorKey: 'creation',
    header: 'Fecha de creación',
    cell: ({ row }) => {
      const date: Date = row.getValue('creation')

      return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(date)
    },
  },
  {
    accessorKey: 'expiration',
    header: 'Fecha de expiración',
    cell: ({ row }) => {
      const date: Date = row.getValue('expiration')

      return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(date)
    },
  },
]
