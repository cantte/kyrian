'use client'

import { type FC } from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type z } from 'zod'

import { newDegreeProgramProfileSchema } from '@kyrian/api/src/schemas/degree-program'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@kyrian/ui'

export type DegreeProgramProfileFormValues = z.infer<
  typeof newDegreeProgramProfileSchema
>

export const useDegreeProgramProfileForm = () => {
  const params = useParams()

  const { code } = params as { code: string }

  return useForm<DegreeProgramProfileFormValues>({
    resolver: zodResolver(newDegreeProgramProfileSchema),
    defaultValues: {
      degreeProgramCode: code,
    },
  })
}

type DegreeProgramProfileFormProps = {
  onSubmit: SubmitHandler<DegreeProgramProfileFormValues>
}

const DegreeProgramProfileForm: FC<DegreeProgramProfileFormProps> = ({
  onSubmit: onSubmitForm,
}) => {
  const form = useDegreeProgramProfileForm()

  const onSubmit: SubmitHandler<DegreeProgramProfileFormValues> = (values) => {
    onSubmitForm(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='app-grid app-space-y-4'
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
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='description'>Descripción</FormLabel>
              <FormControl>
                <Textarea id='description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Agregar</Button>
      </form>
    </Form>
  )
}

export default DegreeProgramProfileForm
