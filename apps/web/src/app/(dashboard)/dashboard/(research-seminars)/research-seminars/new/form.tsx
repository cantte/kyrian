'use client'

import { type ComponentType } from 'react'
import { type NextPage } from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type z from 'zod'

import { newResearchSeminarSchema } from '@kyrian/api/src/schemas/research-seminar'
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  useToast,
} from '@kyrian/ui'

import { api } from '~/utils/api'

type NewResearchSeminarFormValues = z.infer<typeof newResearchSeminarSchema>

type NewResearchSeminarFormProps = NonNullable<unknown>

const NewResearchSeminarForm: NextPage<NewResearchSeminarFormProps> = () => {
  const form = useForm<NewResearchSeminarFormValues>({
    resolver: zodResolver(newResearchSeminarSchema),
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = form

  const toast = useToast()
  const { mutate, isLoading } = api.researchSeminar.create.useMutation({
    onSuccess: () => {
      toast.toast({
        title: 'Semillero de investigación creado',
        description:
          'El semillero de investigación ha sido creado exitosamente',
      })
      reset()
    },
  })

  const onSubmit: SubmitHandler<NewResearchSeminarFormValues> = (values) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='app-grid app-gap-6 app-w-full px-2 py-2'
      >
        <div className='app-grid app-w-full app-items-center app-align-middle app-gap-1.5 md:app-grid-cols-2'>
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

          <FormField
            control={form.control}
            name='creation'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='creation'>Creación</FormLabel>
                <FormControl>
                  <Input id='creation' type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='app-grid app-w-full app-items-center app-align-middle app-gap-1.5 md:app-grid-cols-2'>
          <FormField
            control={form.control}
            name='expiration'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='expiration'>Vencimiento</FormLabel>
                <FormControl>
                  <Input id='expiration' type='date' {...field} />
                </FormControl>
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
              <FormItem className='app-flex app-flex-row app-items-start app-space-x-3 app-space-y-0'>
                <FormControl>
                  <Checkbox
                    id='isActive'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='app-space-y-1 app-leading-none'>
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
              <FormItem className='app-col-span-2'>
                <FormLabel htmlFor='description'>Descripción</FormLabel>
                <FormControl>
                  <Textarea id='description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' disabled={isLoading}>
          {isLoading && (
            <Loader2 className='app-mr-2 app-h-4 app-w-4 app-animate-spin' />
          )}
          Registrar
        </Button>
      </form>
    </Form>
  )
}

export default api.withTRPC(
  NewResearchSeminarForm,
) as ComponentType<NewResearchSeminarFormProps>
