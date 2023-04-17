'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  type NextComponentType,
  type NextPage,
  type NextPageContext,
} from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Monograph } from '@prisma/client'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type z } from 'zod'

import { newMonographSchema } from '@kyrian/api/schemas'
import { Button, Input, Label } from '@kyrian/ui'

import { api } from '~/utils/api'

type NewMonographValues = Omit<Monograph, 'createdAt'>

export type MonographFormProps = {
  defaultValues?: Partial<NewMonographValues>
}

type MonographFormValues = z.infer<typeof newMonographSchema>

const MonographForm: NextPage<MonographFormProps> = ({ defaultValues }) => {
  const { title, authorId } = defaultValues ?? {}

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MonographFormValues>({
    resolver: zodResolver(newMonographSchema),
    defaultValues: {
      title: title,
      authorId: authorId,
    },
  })

  const [file, setFile] = useState<File | null>(null)
  const [missingFile, setMissingFile] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const onFileChange = (event: FormEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget
    if (files !== null) {
      setFile(files[0])
    }
  }

  useEffect(() => {
    console.log(file?.name)
  }, [file])

  const { mutateAsync: createMonograph } = api.monograph.create.useMutation()
  const { mutateAsync: uploadMonograph } = api.monograph.upload.useMutation()
  const onSubmit: SubmitHandler<MonographFormValues> = async (values) => {
    if (file === null) {
      setMissingFile(true)
      return
    }

    const monograph = await createMonograph(values)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { url, fields }: { url: string; fields: any } =
      (await uploadMonograph({
        title: monograph.title,
      })) as any

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = {
      ...fields,
      'Content-Type': file.type,
      file,
    }
    const formData = new FormData()
    for (const name in data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
      formData.append(name, data[name])
    }
    await fetch(url, {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <form
      className='app-grid app-gap-6 app-w-full px-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label
          htmlFor='file'
          className='app-text-slate-500 app-flex app-h-32 app-w-full app-flex-col app-items-center app-justify-center app-rounded-lg app-border-2 app-border-dashed app-border-slate-200 app-p-5'
        >
          <span className='app-flex app-items-center app-gap-1.5'>
            <svg
              className='app-h-6 app-w-6 app-text-slate-400'
              stroke='currentColor'
              fill='none'
              viewBox='0 0 48 48'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 6v36m24-36v36M6 18h36M6 30h36'
              />
            </svg>
            <span className='app-font-medium app-text-sm app-text-slate-600'>
              {file !== null
                ? file.name
                : 'Arrastra un archivo o haz clic aquí'}
            </span>
          </span>
        </Label>

        <input
          ref={fileRef}
          id='file'
          type='file'
          accept='application/pdf'
          className='app-hidden'
          onChange={onFileChange}
        />

        {missingFile && file === null ? (
          <p className='app-text-sm app-text-red-500'>
            Debes seleccionar un archivo
          </p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Solo se permiten archivos PDF
          </p>
        )}
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

      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='publicationDate'>Fecha de publicación</Label>
        <Input
          id='publicationDate'
          type='date'
          placeholder='Fecha de publicación'
          {...register('publicationDate')}
        />

        {errors.publicationDate !== undefined ? (
          <p className='app-text-sm app-text-red-500'>
            {errors.publicationDate.message}
          </p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Digite la fecha de publicación de la monografía
          </p>
        )}
      </div>

      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='authorId'>Identificación del autor</Label>
        <Input id='authorId' type='text' {...register('authorId')} />

        {errors.publicationDate !== undefined ? (
          <p className='app-text-sm app-text-red-500'>
            {errors.publicationDate.message}
          </p>
        ) : (
          <p className='app-text-sm app-text-slate-500'>
            Digite la identificación del autor de la monografía
          </p>
        )}
      </div>

      <Button type='submit'>Registrar</Button>
    </form>
  )
}

export default api.withTRPC(MonographForm) as NextComponentType<
  NextPageContext,
  unknown,
  MonographFormProps
>
