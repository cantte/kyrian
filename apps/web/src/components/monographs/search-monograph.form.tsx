'use client'

import {
  type NextComponentType,
  type NextPage,
  type NextPageContext,
} from 'next'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { searchByTitleSchema } from '@kyrian/api/schemas'
import { Input } from '@kyrian/ui'

import { api, type RouterInputs } from '~/utils/api'

type SearchMonographFormProps = NonNullable<unknown>

type SearchMonographFormValues = RouterInputs['monograph']['byTitle']

const SearchMonographForm: NextPage<SearchMonographFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchMonographFormValues>({
    resolver: zodResolver(searchByTitleSchema),
  })

  const router = useRouter()
  const onSubmit = (values: SearchMonographFormValues) => {
    router.push(`/monographs/search?title=${values.title}`)
  }

  return (
    <form
      className='app-grid app-gap-6 app-w-full px-2 py-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='app-grid app-w-full app-items-center app-gap-1.5'>
        <Input
          id='title'
          type='text'
          {...register('title')}
          className='app-w-full app-text-base app-h-12'
        />

        {errors.title && (
          <span className='app-text-sm app-text-slate-500'>
            {errors.title.message}
          </span>
        )}
      </div>
    </form>
  )
}

export default api.withTRPC(SearchMonographForm) as NextComponentType<
  NextPageContext,
  unknown,
  SearchMonographFormProps
>
