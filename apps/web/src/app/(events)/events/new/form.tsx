'use client'

import { useCallback, useState } from 'react'
import {
  type NextComponentType,
  type NextPage,
  type NextPageContext,
} from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
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

  const [file, setFile] = useState<File | null>(null)
  const [missingFile, setMissingFile] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const toast = useToast()
  const { mutateAsync: createEvent, isLoading: isCreatingEvent } =
    api.event.create.useMutation()
  const { mutateAsync: uploadEvent, isLoading: isUploadingEventImage } =
    api.event.upload.useMutation()

  const onSubmit: SubmitHandler<EventFormValues> = async (values) => {
    if (file === null) {
      setMissingFile(true)
      return
    }

    const event = await createEvent(values)

    const url = await uploadEvent({
      id: event.id,
      title: event.title,
    })

    setIsUploading(true)

    await fetch(url, {
      method: 'PUT',
      body: file,
    })

    setIsUploading(false)

    reset()
    toast.toast({
      title: 'Evento creado',
      description: 'El evento se ha creado exitosamente',
    })
    setFile(null)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return
    }

    setFile(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 5, // 5 MB
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
  })

  const disabled =
    isCreatingEvent || isSubmitting || isUploadingEventImage || isUploading

  return (
    <form className='grid w-full gap-6 px-2' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid w-full items-center gap-1.5' {...getRootProps()}>
        <Label
          htmlFor='file'
          className='flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-5 text-slate-500'
        >
          <span className='flex items-center gap-1.5'>
            <Upload size={24} />
            <span className='text-sm font-medium text-slate-600'>
              {file !== null
                ? file.name
                : 'Arrastra un archivo o haz clic aquí'}
            </span>
          </span>

          <span className='pt-2 text-xs text-slate-400'>
            {isDragActive
              ? 'Suelta el archivo aquí'
              : 'Solo se permiten archivos de hasta 5MB'}
          </span>
        </Label>

        <input {...getInputProps()} />

        {missingFile && file === null && (
          <p className='text-sm text-red-500'>Debes seleccionar un archivo</p>
        )}
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='title'>Título</Label>
        <Input type='text' id='title' {...register('title')} />

        {errors.title !== undefined ? (
          <p className='text-sm text-red-500'>{errors.title.message}</p>
        ) : (
          <p className='text-sm text-slate-500'>Digite el título del evento</p>
        )}
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='description'>Descripción</Label>
        <Textarea id='description' {...register('description')} />

        {errors.description !== undefined ? (
          <p className='text-sm text-red-500'>{errors.description.message}</p>
        ) : (
          <p className='text-sm text-slate-500'>
            Digite la descripción del evento
          </p>
        )}
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='place'>Lugar</Label>
        <Input type='text' id='place' {...register('place')} />

        {errors.place !== undefined ? (
          <p className='text-sm text-red-500'>{errors.place.message}</p>
        ) : (
          <p className='text-sm text-slate-500'>Digite el lugar del evento</p>
        )}
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='topic'>Temática</Label>
        <Input type='text' id='topic' {...register('topic')} />

        {errors.topic !== undefined ? (
          <p className='text-sm text-red-500'>{errors.topic.message}</p>
        ) : (
          <p className='text-sm text-slate-500'>
            Digite la temática del evento
          </p>
        )}
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='date'>Fecha del evento</Label>
        <Input
          id='date'
          type='datetime-local'
          placeholder='Fecha del evento'
          {...register('date')}
        />

        {errors.date !== undefined ? (
          <p className='text-sm text-red-500'>{errors.date.message}</p>
        ) : (
          <p className='text-sm text-slate-500'>Digite la fecha del evento</p>
        )}
      </div>

      <Button type='submit' disabled={disabled}>
        {disabled && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
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
