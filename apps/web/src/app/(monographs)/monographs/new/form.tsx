'use client'

import { useCallback, useState } from 'react'
import {
  type NextComponentType,
  type NextPage,
  type NextPageContext,
} from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Monograph } from '@prisma/client'
import { Loader2, Plus, Upload, XCircle } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type z } from 'zod'

import { newMonographSchema } from '@kyrian/api/schemas'
import {
  Badge,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from '@kyrian/ui'

import { api } from '~/utils/api'
import NewAuthorModal, {
  type NewAuthor,
} from '~/app/(monographs)/monographs/new/new-author.modal'

type NewMonographValues = Omit<Monograph, 'createdAt'>

export type MonographFormProps = {
  defaultValues?: Partial<NewMonographValues>
}

type MonographFormValues = z.infer<typeof newMonographSchema>

const MonographForm: NextPage<MonographFormProps> = ({ defaultValues }) => {
  const { title, authorId } = defaultValues ?? {}
  const { data: degreePrograms, isLoading: isLoadingDegreePrograms } =
    api.degreeProgram.getNameAndCode.useQuery()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MonographFormValues>({
    resolver: zodResolver(newMonographSchema),
    defaultValues: {
      title: title,
      authorId: authorId ?? undefined,
      authors: [],
    },
  })

  const [file, setFile] = useState<File | null>(null)
  const [missingFile, setMissingFile] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const { mutateAsync: createMonograph, isLoading: isCreatingMonograph } =
    api.monograph.create.useMutation()
  const { mutateAsync: uploadMonograph, isLoading: isUploadingMonograph } =
    api.monograph.upload.useMutation()

  const toast = useToast()

  const onSubmit: SubmitHandler<MonographFormValues> = async (values) => {
    try {
      if (file === null) {
        setMissingFile(true)
        return
      }

      const monograph = await createMonograph(values)

      const url = await uploadMonograph({
        title: monograph.title,
        id: monograph.id,
      })

      setIsUploading(true)

      await fetch(url, {
        method: 'PUT',
        body: file,
      })

      setIsUploading(false)

      toast.toast({
        title: 'Monografía registrada',
        description: 'La monografía ha sido registrada con éxito',
      })

      reset()
      setFile(null)
    } catch (e) {
      const message = (e as Error).message ?? 'Ocurrió un error inesperado'
      toast.toast({
        title: 'Ha ocurrido un error',
        description: message,
        variant: 'destructive',
      })
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 25, // 25 MB
    accept: {
      'application/pdf': ['.pdf'],
    },
  })

  const authors = watch('authors')
  const [isOpenNewAuthorModal, setIsOpenNewAuthorModal] = useState(false)
  const closeNewAuthorModal = () => setIsOpenNewAuthorModal(false)
  const onSubmitNewAuthorModal = (values: NewAuthor) => {
    console.log(values)
    setValue('authors', [...authors, values])
    closeNewAuthorModal()
  }

  const removeAuthor = (index: number) => {
    setValue(
      'authors',
      authors.filter((_, i) => i !== index),
    )
  }

  return (
    <div className='grid grid-flow-row-dense grid-cols-1 gap-6 overflow-visible md:grid-cols-4'>
      <div className='md:col-span-1 md:col-start-4'>
        <NewAuthorModal
          isOpen={isOpenNewAuthorModal}
          onClose={closeNewAuthorModal}
          onSubmit={onSubmitNewAuthorModal}
        />

        <div className='items-center justify-between space-y-2 md:flex md:space-y-0'>
          <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
            Autores
          </h3>

          <Button type='button' onClick={() => setIsOpenNewAuthorModal(true)}>
            <span className='flex items-center gap-1.5'>
              <Plus size={16} />
              <span className='font-medium'>Nuevo autor</span>
            </span>
          </Button>
        </div>

        <ul className='my-6 [&>li]:mt-2'>
          {authors.map((author, index) => (
            <li key={index}>
              <Badge>
                {author.id !== undefined && author.id.length > 0
                  ? `${author.id}, `
                  : ''}
                {author.name}
                <span
                  className='ml-1 text-xs font-medium'
                  onClick={() => {
                    removeAuthor(index)
                  }}
                >
                  <XCircle size={14} />
                </span>
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <form
        className='grid w-full gap-6 overflow-visible px-2 md:col-span-3 md:col-start-1'
        onSubmit={handleSubmit(onSubmit)}
      >
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
                : 'Solo se permiten archivos PDF de hasta 25MB'}
            </span>
          </Label>

          <input {...getInputProps()} />

          {missingFile && file === null && (
            <p className='text-sm text-red-500'>Debes seleccionar un archivo</p>
          )}
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='title'>Título</Label>
          <Input
            id='title'
            type='text'
            placeholder='Título'
            {...register('title')}
          />

          {errors.title !== undefined ? (
            <p className='text-sm text-red-500'>{errors.title.message}</p>
          ) : (
            <p className='text-sm text-slate-500'>
              Digite el título de la monografía
            </p>
          )}
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='publicationDate'>Fecha de publicación</Label>
          <Input
            id='publicationDate'
            type='date'
            placeholder='Fecha de publicación'
            {...register('publicationDate')}
          />

          {errors.publicationDate !== undefined ? (
            <p className='text-sm text-red-500'>
              {errors.publicationDate.message}
            </p>
          ) : (
            <p className='text-sm text-slate-500'>
              Digite la fecha de publicación de la monografía
            </p>
          )}
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='degreeProgramId'>Programa académico</Label>
          <Select
            onValueChange={(value: string) =>
              setValue('degreeProgramId', value)
            }
            {...register('degreeProgramId')}
          >
            <SelectTrigger>
              <SelectValue placeholder='Programa académico' />
            </SelectTrigger>

            <SelectContent>
              {isLoadingDegreePrograms && (
                <SelectItem value='Loading'>
                  <div className='flex flex-row items-center'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />{' '}
                    <span>Cargando programas académicos...</span>
                  </div>
                </SelectItem>
              )}

              {!isLoadingDegreePrograms &&
                degreePrograms !== undefined &&
                degreePrograms.length === 0 && (
                  <SelectItem value='' disabled>
                    No hay programas académicos registrados
                  </SelectItem>
                )}

              {!isLoadingDegreePrograms &&
                degreePrograms !== undefined &&
                degreePrograms.length > 0 && (
                  <>
                    {degreePrograms?.map((degreeProgram) => (
                      <SelectItem
                        value={degreeProgram.code}
                        key={degreeProgram.code}
                      >
                        {degreeProgram.code}, {degreeProgram.name}
                      </SelectItem>
                    ))}
                  </>
                )}
            </SelectContent>
          </Select>

          {errors.degreeProgramId !== undefined ? (
            <p className='text-sm text-red-500'>
              {errors.degreeProgramId.message}
            </p>
          ) : (
            <p className='text-sm text-slate-500'>
              Seleccione el programa académico al que pertenece la monografía
            </p>
          )}
        </div>

        <Button
          type='submit'
          disabled={isCreatingMonograph || isUploadingMonograph || isUploading}
        >
          {(isCreatingMonograph || isUploadingMonograph || isUploading) && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          )}
          Registrar
        </Button>
      </form>
    </div>
  )
}

export default api.withTRPC(MonographForm) as NextComponentType<
  NextPageContext,
  unknown,
  MonographFormProps
>
