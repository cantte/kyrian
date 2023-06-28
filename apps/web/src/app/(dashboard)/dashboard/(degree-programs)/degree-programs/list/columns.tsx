'use client'

import NextLink from 'next/link'
import { type DegreeProgram } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Edit } from 'lucide-react'

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kyrian/ui'

export const columns: ColumnDef<DegreeProgram>[] = [
  {
    accessorKey: 'code',
    header: 'Código SNIES',
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'degree',
    header: 'Titulación',
  },
  {
    accessorKey: 'state',
    header: 'Departamento',
  },
  {
    accessorKey: 'city',
    header: 'Ciudad',
  },
  {
    accessorKey: 'credits',
    header: 'Número de créditos',
  },
  {
    accessorKey: 'duration',
    header: 'Duración (semestres)',
  },
  {
    accessorKey: 'modality',
    header: 'Modalidad',
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
  },
  {
    accessorKey: 'email',
    header: 'Correo electrónico',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const code = row.original.code

      return (
        <div className='app-flex'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NextLink href={`/degree-programs/${code}/edit`}>
                  <Button variant='outline' size='icon'>
                    <Edit className='app-h-4 app-w-4 app-cursor-pointer hover:app-text-foreground/80' />
                  </Button>
                </NextLink>
              </TooltipTrigger>
              <TooltipContent>Editar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
  },
]
