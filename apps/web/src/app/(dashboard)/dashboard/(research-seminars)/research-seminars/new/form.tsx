'use client'

import { useState, type ComponentType } from 'react'
import { type NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2, Plus } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type z from 'zod'

import { newResearchSeminarSchema } from '@kyrian/api/src/schemas/research-seminar'
import {
  Button,
  Calendar,
  Checkbox,
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
  Textarea,
  useToast,
} from '@kyrian/ui'

import { api } from '~/utils/api'
import AddStudentModal, {
  type AddStudent,
} from '~/app/(dashboard)/dashboard/(research-seminars)/research-seminars/new/add-student.modal'

type NewResearchSeminarFormValues = z.infer<typeof newResearchSeminarSchema>

type NewResearchSeminarFormProps = NonNullable<unknown>

const NewResearchSeminarForm: NextPage<NewResearchSeminarFormProps> = () => {
  const form = useForm<NewResearchSeminarFormValues>({
    resolver: zodResolver(newResearchSeminarSchema),
  })

  const { handleSubmit, watch } = form

  const toast = useToast()
  const router = useRouter()
  const { mutate, isLoading } = api.researchSeminar.create.useMutation({
    onSuccess: () => {
      toast.toast({
        title: 'Semillero de investigación creado',
        description:
          'El semillero de investigación ha sido creado exitosamente',
      })
      router.replace('/dashboard/research-seminars/list')
    },
    onError: (error) => {
      toast.toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const onSubmit: SubmitHandler<NewResearchSeminarFormValues> = (values) => {
    mutate(values)
  }

  const students = watch('students')
  const [isOpenAddStudentModal, setIsOpenAddStudentModal] = useState(false)
  const closeAddStudentModal = () => setIsOpenAddStudentModal(false)
  const onStudentSubmit = (student: AddStudent) => {
    const students = form.getValues('students')
    const studentExists = students?.find(({ id }) => id === student.id)

    if (!studentExists) {
      form.setValue('students', (students ?? []).concat(student))
    }

    closeAddStudentModal()
  }

  return (
    <Form {...form}>
      <AddStudentModal
        isOpen={isOpenAddStudentModal}
        onClose={closeAddStudentModal}
        onSubmit={onStudentSubmit}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid w-full gap-6 px-2 py-2'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='name'>Nombre</FormLabel>
              <FormControl>
                <Input id='name' type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid w-full gap-1.5 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='creation'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel htmlFor='creation'>Creación</FormLabel>
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
        </div>

        <div>
          <FormField
            control={form.control}
            name='isActive'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                <FormControl>
                  <Checkbox
                    id='isActive'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='leading-none'>
                  <FormLabel htmlFor='expiration'>¿Está activo?</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel htmlFor='description'>Descripción</FormLabel>
                <FormControl>
                  <Textarea id='description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='space-y-2'>
          <div className='items-center justify-between space-y-2 md:flex md:space-y-0'>
            <p className='text-xl font-semibold tracking-tight'>Estudiantes</p>

            <Button
              type='button'
              variant='outline'
              size='sm'
              className='text-sm'
              onClick={() => setIsOpenAddStudentModal(true)}
            >
              <span className='flex items-center gap-1.5'>
                <Plus size={16} />
                <span>Agregar estudiante</span>
              </span>
            </Button>
          </div>

          {students === undefined || students.length === 0 ? (
            <p className='text-muted-foreground'>
              No hay estudiantes seleccionados
            </p>
          ) : (
            <div className='grid grid-cols-1 gap-2'>
              {students.map((student) => (
                <div
                  key={student.id}
                  className='flex items-center justify-between gap-2'
                >
                  <p className='text-sm'>
                    {student.id}, {student.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button type='submit' disabled={isLoading}>
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Registrar
        </Button>
      </form>
    </Form>
  )
}

export default api.withTRPC(
  NewResearchSeminarForm,
) as ComponentType<NewResearchSeminarFormProps>
