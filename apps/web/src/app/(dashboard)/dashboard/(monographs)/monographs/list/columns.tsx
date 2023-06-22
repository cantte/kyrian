'use client'

import NextLink from 'next/link'
import { type ColumnDef } from '@tanstack/react-table'
import { Eye } from 'lucide-react'

import { type RouterOutputs } from '@kyrian/api'
import {
  Badge,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kyrian/ui'

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
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id

      return (
        <div className='app-flex'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NextLink href={`/monographs/${id}/view`}>
                  <Eye className='app-h-6 app-w-6 app-cursor-pointer hover:app-text-foreground/80' />
                </NextLink>
              </TooltipTrigger>
              <TooltipContent>
                <span>Ver monografía</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
  },
]
