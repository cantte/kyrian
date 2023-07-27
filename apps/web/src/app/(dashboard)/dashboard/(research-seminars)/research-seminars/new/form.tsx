'use client'

import { type ComponentType } from 'react'
import { type NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
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

type NewResearchSeminarFormValues = z.infer<typeof newResearchSeminarSchema>

type NewResearchSeminarFormProps = NonNullable<unknown>

const NewResearchSeminarForm: NextPage<NewResearchSeminarFormProps> = () => {
  const form = useForm<NewResearchSeminarFormValues>({
    resolver: zodResolver(newResearchSeminarSchema),
  })

  const { handleSubmit } = form

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

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='app-grid app-gap-6 app-w-full px-2 py-2'
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

        <div className='app-grid app-w-full app-gap-1.5 md:app-grid-cols-2'>
          <FormField
            control={form.control}
            name='creation'
            render={({ field }) => (
              <FormItem className='app-flex app-flex-col'>
                <FormLabel htmlFor='creation'>Creación</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        className='app-pl-3 app-text-left app-font-normal'
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                        <CalendarIcon className='app-ml-auto app-h-4 app-w-4 app-opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='app-w-auto app-p-0' align='start'>
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
            name='expiration'
            render={({ field }) => (
              <FormItem className='app-flex app-flex-col'>
                <FormLabel htmlFor='expiration'>Vencimiento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        className='app-pl-3 app-text-left app-font-normal'
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                        <CalendarIcon className='app-ml-auto app-h-4 app-w-4 app-opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='app-w-auto app-p-0' align='start'>
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
              <FormItem className='app-flex app-flex-row app-items-start app-space-x-3 app-space-y-0'>
                <FormControl>
                  <Checkbox
                    id='isActive'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='app-leading-none'>
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
