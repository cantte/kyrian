'use client'

import NextLink from 'next/link'
import { type ColumnDef } from '@tanstack/react-table'
import { Edit, Eye } from 'lucide-react'

import { type RouterOutputs } from '@kyrian/api'
import {
  Badge,
  Button,
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
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id

      return (
        <div className='flex flex-row items-center justify-center space-x-4'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NextLink href={`/monographs/${id}/view`}>
                  <Button variant='outline' size='icon'>
                    <Eye className='hover:text-foreground/80 h-5 w-5 cursor-pointer' />
                  </Button>
                </NextLink>
              </TooltipTrigger>
              <TooltipContent>
                <span>Ver monografía</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NextLink href={`/monographs/${id}/edit`}>
                  <Button variant='outline' size='icon'>
                    <Edit className='hover:text-foreground/80 h-4 w-4 cursor-pointer' />
                  </Button>
                </NextLink>
              </TooltipTrigger>
              <TooltipContent>
                <span>Editar monografía</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
  },
]
