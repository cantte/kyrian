'use client'

import { type NextComponentType, type NextPage } from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Monograph } from '@prisma/client'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type z } from 'zod'

import { newMonographSchema } from '@kyrian/api/schemas'
import { Input, Label } from '@kyrian/ui'

import { api } from '~/utils/api'

type NewMonographValues = Omit<Monograph, 'createdAt'>

export type MonographFormProps = {
  defaultValues?: Partial<NewMonographValues>
}

type MonographFormValues = z.infer<typeof newMonographSchema>

const MonographForm: NextPage<MonographFormProps> = ({ defaultValues }) => {
  const { title } = defaultValues ?? {}

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MonographFormValues>({
    resolver: zodResolver(newMonographSchema),
    defaultValues: {
      title: title,
    },
  })

  const { mutate } = api.monograph.create.useMutation()
  const onSubmit: SubmitHandler<MonographFormValues> = (values) => {
    mutate(values)
  }

  return (
    <form
      className='app-grid app-gap-6 app-w-full px-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* File input dropzone */}
      <div>
        <Label
          htmlFor='file'
          className='app-text-slate-500 app-flex app-h-32 app-w-full app-flex-col app-items-center app-justify-center app-rounded-lg app-border-2 app-border-dashed app-border-slate-200 app-p-5'
        >
          Arrastra y suelta un archivo aquí o haz clic para seleccionar un
          archivo
        </Label>

        <Input id='file' type='file' accept='pdf' className='app-hidden' />
      </div>
      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='title'>Título</Label>
        <Input
          id='title'
          type='text'
          placeholder='Título'
          {...register('title')}
        />

        {errors.title !== undefined ? (
          <p className='app-text-sm app-text-red-500'>{errors.title.message}</p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Digite el título de la monografía
          </p>
        )}
      </div>
    </form>
  )
}

export default api.withTRPC(MonographForm) as NextComponentType<
  any,
  any,
  MonographFormProps
>
