'use client'

import { type FC } from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type z } from 'zod'

import { newDegreeProgramObjectiveSchema } from '@kyrian/api/src/schemas/degree-program'
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

export type DegreeProgramObjectiveFormValues = z.infer<
  typeof newDegreeProgramObjectiveSchema
>

const useDegreeProgramObjectivesForm = () => {
  const params = useParams()

  const { code } = params as { code: string }

  return useForm<DegreeProgramObjectiveFormValues>({
    resolver: zodResolver(newDegreeProgramObjectiveSchema),
    defaultValues: {
      degreeProgramCode: code,
    },
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
