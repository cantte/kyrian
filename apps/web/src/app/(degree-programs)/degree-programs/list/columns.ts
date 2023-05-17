import { type DegreeProgram } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'

export const columns = (): ColumnDef<DegreeProgram>[] => {
  return [
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
  ]
}
