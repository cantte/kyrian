'use client'

import { type FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@kyrian/ui'

const degreeProgramObjectiveSchema = z.object({
  description: z
    .string({
      required_error: 'El objetivo es requerido',
    })
    .max(255)
    .nonempty('El objetivo es requerido'),
})

export type DegreeProgramObjectiveFormValues = z.infer<
  typeof degreeProgramObjectiveSchema
>

const useDegreeProgramObjectivesForm = () => {
  return useForm<DegreeProgramObjectiveFormValues>({
    resolver: zodResolver(degreeProgramObjectiveSchema),
  })
}

type DegreeProgramObjectivesFormProps = {
  onSubmit: (values: DegreeProgramObjectiveFormValues) => void
}

const DegreeProgramObjectivesForm: FC<DegreeProgramObjectivesFormProps> = ({
  onSubmit: onSubmitForm,
}) => {
  const form = useDegreeProgramObjectivesForm()

  const onSubmit: SubmitHandler<DegreeProgramObjectiveFormValues> = (
    values,
  ) => {
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
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='description'>Objetivo</FormLabel>
              <FormControl>
                <Input id='description' type='text' {...field} />
              </FormControl>
              <FormDescription>
                El objetivo debe tener un máximo de 255 caracteres
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Agregar</Button>
      </form>
    </Form>
  )
}

export { DegreeProgramObjectivesForm }
