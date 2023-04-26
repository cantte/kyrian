'use client'

import { useCallback, useState } from 'react'
import {
  type NextComponentType,
  type NextPage,
  type NextPageContext,
} from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { type DegreeProgram } from '@prisma/client'
import { Loader2, Upload } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type z } from 'zod'

import { newDegreeProgramSchema } from '@kyrian/api/schemas'
import { Button, Input, Label, useToast } from '@kyrian/ui'

import { api } from '~/utils/api'

export type DegreeProgramFormProps = NonNullable<unknown>

type DegreeProgramFormValues = z.infer<typeof newDegreeProgramSchema>

const DegreeProgramForm: NextPage<DegreeProgramFormProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DegreeProgramFormValues>({
    resolver: zodResolver(newDegreeProgramSchema),
  })

  const toast = useToast()
  const { mutate, isLoading } = api.degreeProgram.create.useMutation({
    onSuccess: () => {
      toast.toast({
        title: 'Programa de grado creado',
        description: 'El programa de grado ha sido creado exitosamente',
      })
    },
  })

  const onSubmit: SubmitHandler<DegreeProgramFormValues> = async (values) => {
    mutate(values)
  }

  return (
    <form
      className='app-grid app-gap-6 app-w-full px-2 py-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='title'>Código</Label>
        <Input id='code' type='text' {...register('code')} />

        {errors.code !== undefined ? (
          <p className='app-text-sm app-text-red-500'>{errors.code.message}</p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Digite el código del programa de grado
          </p>
        )}
      </div>

      <Button type='submit' disabled={isLoading}>
        {isLoading && (
          <Loader2 className='app-mr-2 app-h-4 app-w-4 app-animate-spin' />
        )}
        Registrar
      </Button>
    </form>
  )
}

export default api.withTRPC(DegreeProgramForm) as NextComponentType<
  NextPageContext,
  unknown,
  DegreeProgramFormProps
>
