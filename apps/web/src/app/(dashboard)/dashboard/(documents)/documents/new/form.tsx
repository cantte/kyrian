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

const documentTypes: Record<DocumentType, string> = {
  [DocumentType.StrategicPlan]: 'Plan estratégico',
  [DocumentType.Protocol]: 'Protocolo',
  [DocumentType.Format]: 'Formato',
  [DocumentType.Agreement]: 'Acuerdo',
  [DocumentType.Standard]: 'Acta',
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
      className='app-grid app-gap-6 app-w-full md:app-col-span-3 md:app-col-start-1 app-overflow-visible app-px-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className='app-grid app-w-full app-items-center app-gap-1.5'
        {...getRootProps()}
      >
        <Label
          htmlFor='file'
          className='app-text-slate-500 app-flex app-h-32 app-w-full app-flex-col app-items-center app-justify-center app-rounded-lg app-border-2 app-border-dashed app-border-slate-200 app-p-5 app-cursor-pointer'
        >
          <span className='app-flex app-items-center app-gap-1.5'>
            <Upload size={24} />
            <span className='app-font-medium app-text-sm app-text-slate-600'>
              {file !== null
                ? file.name
                : 'Arrastra un archivo o haz clic aquí'}
            </span>
          </span>

          <span className='app-text-xs app-text-slate-400 app-pt-2'>
            {isDragActive
              ? 'Suelta el archivo aquí'
              : 'Solo se permiten archivos PDF de hasta 20MB'}
          </span>
        </Label>

        <input {...getInputProps()} />

        {missingFile && file === null && (
          <p className='app-text-sm app-text-red-500'>
            Debes seleccionar un archivo
          </p>
        )}
      </div>

      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Label htmlFor='name'>Nombre</Label>
        <Input
          id='name'
          type='text'
          placeholder='Nombre del documento'
          {...register('name')}
        />

        {errors.name !== undefined ? (
          <p className='app-text-sm app-text-red-500'>{errors.name.message}</p>
        ) : null}
      </div>

      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
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
          <Loader2 className='app-mr-2 app-h-4 app-w-4 app-animate-spin' />
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
