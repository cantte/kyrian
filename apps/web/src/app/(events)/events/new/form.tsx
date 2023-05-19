'use client'

import {
  type NextComponentType,
  type NextPage,
  type NextPageContext,
} from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type z } from 'zod'

import { newEventSchema } from '@kyrian/api/src/schemas/event'
import { Button, Input, Label, Textarea, useToast } from '@kyrian/ui'

import { api } from '~/utils/api'

type EventFormValues = z.infer<typeof newEventSchema>

type NewEventFormProps = {
  defaultValues?: Partial<EventFormValues>
}

const NewEventForm: NextPage<NewEventFormProps> = ({ defaultValues }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(newEventSchema),
    defaultValues,
  })

  const toast = useToast()
  const { mutate, isLoading } = api.event.create.useMutation({
    onSuccess: () => {
      reset()
      toast.toast({
        title: 'Evento creado',
        description: 'El evento se ha creado exitosamente',
      })
    },
    onError: (error) => {
      toast.toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const onSubmit: SubmitHandler<EventFormValues> = (values) => {
    mutate(values)
  }

  return (
    <form
      className='app-grid app-gap-6 app-w-full px-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='title'>Título</Label>
        <Input type='text' id='title' {...register('title')} />

        {errors.title !== undefined ? (
          <p className='app-text-sm app-text-red-500'>{errors.title.message}</p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Digite el título del evento
          </p>
        )}
      </div>

      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='description'>Descripción</Label>
        <Textarea id='description' {...register('description')} />

        {errors.description !== undefined ? (
          <p className='app-text-sm app-text-red-500'>
            {errors.description.message}
          </p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Digite la descripción del evento
          </p>
        )}
      </div>

      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='place'>Lugar</Label>
        <Input type='text' id='place' {...register('place')} />

        {errors.place !== undefined ? (
          <p className='app-text-sm app-text-red-500'>{errors.place.message}</p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Digite el lugar del evento
          </p>
        )}
      </div>

      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='date'>Fecha del evento</Label>
        <Input
          id='date'
          type='datetime-local'
          placeholder='Fecha del evento'
          {...register('date')}
        />

        {errors.date !== undefined ? (
          <p className='app-text-sm app-text-red-500'>{errors.date.message}</p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Digite la fecha del evento
          </p>
        )}
      </div>

      <Button type='submit' disabled={isLoading || isSubmitting}>
        Registrar
      </Button>
    </form>
  )
}

export default api.withTRPC(NewEventForm) as NextComponentType<
  NextPageContext,
  unknown,
  NewEventFormProps
>
