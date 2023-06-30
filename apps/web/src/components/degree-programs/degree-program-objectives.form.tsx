'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@kyrian/ui'

const dregreeProgramObjectiveSchema = z.object({
  content: z.string().max(255).nonempty(),
})

type DegreeProgramObjectiveFormValues = z.infer<
  typeof dregreeProgramObjectiveSchema
>

const useDegreeProgramObjectivesForm = () => {
  const form = useForm<DegreeProgramObjectiveFormValues>({
    resolver: zodResolver(dregreeProgramObjectiveSchema),
  })

  return form
}

const DegreeProgramObjectivesForm = () => {
  const form = useDegreeProgramObjectivesForm()

  const onSubmit: SubmitHandler<DegreeProgramObjectiveFormValues> = (
    values,
  ) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='content'>Objetivo</FormLabel>
              <FormControl>
                <Input id='content' type='text' {...field} />
              </FormControl>
              <FormDescription>
                El objetivo debe tener un máximo de 255 caracteres
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export { DegreeProgramObjectivesForm }
