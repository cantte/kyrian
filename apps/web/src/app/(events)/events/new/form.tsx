'use client'

import {
  type NextComponentType,
  type NextPage,
  type NextPageContext,
} from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { newEventSchema } from '@kyrian/api/src/schemas/event'

import { api } from '~/utils/api'

type EventFormValues = z.infer<typeof newEventSchema>

type NewEventFormProps = {
  defaultValues?: Partial<EventFormValues>
}

const NewEventForm: NextPage<NewEventFormProps> = ({ defaultValues }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(newEventSchema),
    defaultValues,
  })

  const { mutate, isLoading } = api.event.create.useMutation()

  return <form className='app-grid app-gap-6 app-w-full px-2'></form>
}

export default api.withTRPC(NewEventForm) as NextComponentType<
  NextPageContext,
  unknown,
  NewEventFormProps
>
