'use client'

import { useCallback, useState } from 'react'
import {
  type NextComponentType,
  type NextPage,
  type NextPageContext,
} from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { DocumentType } from '@prisma/client'
import { Loader2, Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type z } from 'zod'

import { newDocumentSchema } from '@kyrian/api/schemas'
import {
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

type NewDocumentFormValues = z.infer<typeof newDocumentSchema>

type NewDocumentFormProps = {
  defaultValues?: Partial<NewDocumentFormValues>
}

export const documentTypes: Record<DocumentType, string> = {
  [DocumentType.StrategicPlan]: 'Plan estratégico',
  [DocumentType.Protocol]: 'Protocolo',
  [DocumentType.Format]: 'Formato',
  [DocumentType.Agreement]: 'Acuerdo',
  [DocumentType.Standard]: 'Acta',
  [DocumentType.Book]: 'Libro',
  [DocumentType.Article]: 'Publicación',
}

const NewDocumentForm: NextPage<NewDocumentFormProps> = ({ defaultValues }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<NewDocumentFormValues>({
    resolver: zodResolver(newDocumentSchema),
    defaultValues,
  })

  const [file, setFile] = useState<File | null>(null)
  const [missingFile, setMissingFile] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const { mutateAsync: createDocument, isLoading: isCreatingDocument } =
    api.document.create.useMutation()
  const { mutateAsync: uploadDocument, isLoading: isUploadingDocument } =
    api.document.upload.useMutation()

  const toast = useToast()

  const onSubmit: SubmitHandler<NewDocumentFormValues> = async (values) => {
    if (file === null) {
      setMissingFile(true)
      return
    }

    const document = await createDocument(values)

    const url = await uploadDocument({
      id: document.id,
      name: document.name,
    })

    setIsUploading(true)

    await fetch(url, {
      method: 'PUT',
      body: file,
    })

    setIsUploading(false)

    toast.toast({
      title: 'Documento registrado',
      description: 'El documento ha sido registrado exitosamente',
    })

    reset()
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
    maxSize: 1024 * 1024 * 20, // 20 MB
    accept: {
      'application/pdf': ['.pdf'],
    },
  })

  return (
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
              : 'Solo se permiten archivos PDF de hasta 20MB'}
          </span>
        </Label>

        <input {...getInputProps()} />

        {missingFile && file === null && (
          <p className='text-sm text-red-500'>Debes seleccionar un archivo</p>
        )}
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='name'>Nombre</Label>
        <Input
          id='name'
          type='text'
          placeholder='Nombre del documento'
          {...register('name')}
        />

        {errors.name !== undefined ? (
          <p className='text-sm text-red-500'>{errors.name.message}</p>
        ) : null}
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='type'>Tipo</Label>
        <Select
          onValueChange={(value) => {
            setValue('type', value as DocumentType)
          }}
          {...register('type')}
        >
          <SelectTrigger>
            <SelectValue placeholder='Selecciona un tipo' />
          </SelectTrigger>

          <SelectContent>
            {Object.entries(documentTypes).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type='submit'
        disabled={isCreatingDocument || isUploading || isUploadingDocument}
      >
        {(isCreatingDocument || isUploading || isUploadingDocument) && (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        )}
        Registrar
      </Button>
    </form>
  )
}

export default api.withTRPC(NewDocumentForm) as NextComponentType<
  NextPageContext,
  unknown,
  NewDocumentFormProps
>
