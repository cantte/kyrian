'use client'

import { useState } from 'react'
import { type NextPage } from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2, Plus, XCircle } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type z } from 'zod'

import { type RouterOutputs } from '@kyrian/api'
import { updateMonographSchema } from '@kyrian/api/src/schemas/monograph'
import {
  Badge,
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from '@kyrian/ui'

import { api } from '~/utils/api'
import { type MonographFormProps } from '~/app/(monographs)/monographs/new/form'
import NewAuthorModal, {
  type NewAuthor,
} from '~/app/(monographs)/monographs/new/new-author.modal'

type Monograph = RouterOutputs['monograph']['find']
type EditMonographFormValues = z.infer<typeof updateMonographSchema>

export type EditMonographFormProps = {
  defaultValues: Monograph | EditMonographFormValues
}

const EditMonographForm: NextPage<MonographFormProps> = ({ defaultValues }) => {
  const { data: degreePrograms, isLoading: isLoadingDegreePrograms } =
    api.degreeProgram.getNameAndCode.useQuery()

  const form = useForm<EditMonographFormValues>({
    resolver: zodResolver(updateMonographSchema),
    defaultValues: {
      ...defaultValues,
      degreeProgramId: defaultValues?.degreeProgramId ?? '',
    },
  })

  const { handleSubmit, watch, setValue } = form

  const { mutate: updateMonograph, isLoading: isUpdatingMonograph } =
    api.monograph.edit.useMutation()

  const { toast } = useToast()

  const onSubmit: SubmitHandler<EditMonographFormValues> = (values) => {
    updateMonograph(values, {
      onSuccess: () => {
        toast({
          title: 'Monografía actualizada',
        })
      },
      onError: () => {
        toast({
          title: 'Error al actualizar la monografía',
          variant: 'destructive',
        })
      },
    })
  }

  const authors = watch('authors')
  const [isOpenNewAuthorModal, setIsOpenNewAuthorModal] = useState(false)
  const closeNewAuthorModal = () => setIsOpenNewAuthorModal(false)
  const onSubmitNewAuthorModal = (values: NewAuthor) => {
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

        <div className='items-center justify-between space-y-1'>
          <h3 className='text-xl tracking-tight'>Autores</h3>

          <Button
            className='w-full'
            size='sm'
            variant='outline'
            type='button'
            onClick={() => setIsOpenNewAuthorModal(true)}
          >
            <span className='flex items-center gap-1.5'>
              <Plus size={16} />
              <span className='font-medium'>Agregar autor</span>
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

      <Form {...form}>
        <form
          className='grid w-full gap-6 overflow-visible px-2 md:col-span-3 md:col-start-1'
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='title'>Título</FormLabel>
                <FormControl>
                  <Input id='title' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='publicationDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel htmlFor='publicationDate'>
                  Fecha de publicación
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        className='pl-3 text-left font-normal'
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='degreeProgramId'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='degreeProgramId'>
                  Programa académico
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Programa académico' />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isUpdatingMonograph}>
            {isUpdatingMonograph && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            )}
            Actualizar
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default api.withTRPC(
  EditMonographForm,
) as NextPage<EditMonographFormProps>
