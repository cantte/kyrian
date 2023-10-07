'use client'

import NextLink from 'next/link'
import { type Event } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Edit } from 'lucide-react'

import {
  Badge,
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kyrian/ui'

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
      const topic = row.original.topic

      return (
        <Badge variant='secondary'>
          {topic !== null ? topic : 'Sin temática'}
        </Badge>
      )
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
              <NextLink href={`/events/${id}/edit`}>
                <Button variant='outline' size='icon'>
                  <Edit className='hover:text-foreground/80 h-4 w-4 cursor-pointer' />
                </Button>
              </NextLink>
            </TooltipTrigger>
            <TooltipContent>
              <span>Editar evento</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
]
