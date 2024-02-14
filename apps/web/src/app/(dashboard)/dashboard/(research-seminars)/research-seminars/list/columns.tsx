'use client'

import NextLink from 'next/link'
import { type ColumnDef } from '@tanstack/react-table'
import { Edit } from 'lucide-react'

import { type RouterOutputs } from '@kyrian/api'
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kyrian/ui'

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
    accessorKey: 'isResearchGroup',
    header: 'Grupo de investigación',
    cell: ({ row }) => {
      const isResearchGroup = row.original.isResearchGroup

      return isResearchGroup ? 'Sí' : 'No'
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
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NextLink href={`/dashboard/research-seminars/${id}/edit`}>
                <Button variant='outline' size='icon'>
                  <Edit className='hover:text-foreground/80 h-4 w-4 cursor-pointer' />
                </Button>
              </NextLink>
            </TooltipTrigger>
            <TooltipContent>
              <span>Editar semillero de investigación</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
]
