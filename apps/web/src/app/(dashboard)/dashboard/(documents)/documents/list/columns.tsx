'use client'

import NextLink from 'next/link'
import { type ColumnDef } from '@tanstack/react-table'
import { Edit } from 'lucide-react'

import { type RouterOutputs } from '@kyrian/api'
import {
  Badge,
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kyrian/ui'

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
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NextLink href={`/dashboard/documents/${id}/edit`}>
                <Button variant='outline' size='icon'>
                  <Edit className='hover:text-foreground/80 h-4 w-4 cursor-pointer' />
                </Button>
              </NextLink>
            </TooltipTrigger>
            <TooltipContent>
              <span>Editar documento</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
]
