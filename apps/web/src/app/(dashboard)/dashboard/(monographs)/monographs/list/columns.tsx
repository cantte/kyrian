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
      const date: Date = row.getValue('publicationDate')

      return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(date)
    },
  },
  {
    accessorKey: 'degreeProgram.name',
    id: 'degreeProgram',
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
        <div className='flex'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NextLink href={`/monographs/${id}/view`}>
                  <Eye className='hover:text-foreground/80 h-6 w-6 cursor-pointer' />
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
