'use client'

import {
  type NextComponentType,
  type NextPage,
  type NextPageContext,
} from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
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
    formState: { errors, isSubmitting },
  } = useForm<DegreeProgramFormValues>({
    resolver: zodResolver(newDegreeProgramSchema),
    defaultValues: {
      isActive: true,
      state: 'Cesar',
      city: 'Valledupar',
      modality: 'Presencial',
    },
  })

  const toast = useToast()
  const { mutate, isLoading } = api.degreeProgram.create.useMutation({
    onSuccess: () => {
      toast.toast({
        title: 'Programa de grado creado',
        description: 'El programa de grado ha sido creado exitosamente',
      })
      reset()
    },
  })

  const onSubmit: SubmitHandler<DegreeProgramFormValues> = (values) => {
    mutate(values)
  }

  return (
    <form
      className='grid w-full gap-6 px-2 py-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='title'>Código</Label>
        <Input id='code' type='text' {...register('code')} />

        {errors.code !== undefined ? (
          <p className='text-sm text-red-500'>{errors.code.message}</p>
        ) : (
          <p className='text-sm text-slate-500'>
            Digite el código SNIES del programa de grado
          </p>
        )}
      </div>

      <div className='grid w-full items-center gap-1.5 md:grid-cols-2'>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='name'>Nombre</Label>
          <Input id='name' type='text' {...register('name')} />

          {errors.name !== undefined ? (
            <p className='text-sm text-red-500'>{errors.name.message}</p>
          ) : (
            <p className='text-sm text-slate-500'>
              Digite el nombre del programa de grado
            </p>
          )}
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='degree'>Títulación</Label>
          <Input id='degree' type='text' {...register('degree')} />

          {errors.degree !== undefined ? (
            <p className='text-sm text-red-500'>{errors.degree.message}</p>
          ) : (
            <p className='text-sm text-slate-500'>
              Digite la títulación del programa de grado
            </p>
          )}
        </div>
      </div>

      <div className='grid w-full items-center gap-1.5 md:grid-cols-2'>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='state'>Departamento</Label>
          <Input id='state' type='text' {...register('state')} />

          {errors.state !== undefined ? (
            <p className='text-sm text-red-500'>{errors.state.message}</p>
          ) : (
            <p className='text-sm text-slate-500'>
              Digite el departamento del programa de grado
            </p>
          )}
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='city'>Ciudad</Label>
          <Input id='city' type='text' {...register('city')} />

          {errors.city !== undefined ? (
            <p className='text-sm text-red-500'>{errors.city.message}</p>
          ) : (
            <p className='text-sm text-slate-500'>
              Digite la ciudad del programa de grado
            </p>
          )}
        </div>
      </div>

      <div className='grid w-full items-center gap-1.5 md:grid-cols-2'>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='credits'>Número de creditos</Label>
          <Input id='credits' type='number' {...register('credits')} />

          {errors.credits !== undefined ? (
            <p className='text-sm text-red-500'>{errors.credits.message}</p>
          ) : (
            <p className='text-sm text-slate-500'>
              Digite el número de creditos del programa de grado
            </p>
          )}
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='duration'>Duración (semestres)</Label>
          <Input id='duration' type='text' {...register('duration')} />

          {errors.duration !== undefined ? (
            <p className='text-sm text-red-500'>{errors.duration.message}</p>
          ) : (
            <p className='text-sm text-slate-500'>
              Digite la duración del programa de grado
            </p>
          )}
        </div>
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='modality'>Modalidad</Label>
        <Input id='modality' type='text' {...register('modality')} />

        {errors.modality !== undefined ? (
          <p className='text-sm text-red-500'>{errors.modality.message}</p>
        ) : (
          <p className='text-sm text-slate-500'>
            Digite la modalidad del programa de grado
          </p>
        )}
      </div>

      <div className='grid w-full items-center gap-1.5 md:grid-cols-2'>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='phone'>Teléfono</Label>
          <Input id='phone' type='text' {...register('phone')} />

          {errors.phone !== undefined ? (
            <p className='text-sm text-red-500'>{errors.phone.message}</p>
          ) : (
            <p className='text-sm text-slate-500'>
              Digite el teléfono del programa de grado
            </p>
          )}
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type='email' {...register('email')} />

          {errors.email !== undefined ? (
            <p className='text-sm text-red-500'>{errors.email.message}</p>
          ) : (
            <p className='text-sm text-slate-500'>
              Digite el email del programa de grado
            </p>
          )}
        </div>
      </div>

      <Button type='submit' disabled={isLoading || isSubmitting}>
        {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
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
