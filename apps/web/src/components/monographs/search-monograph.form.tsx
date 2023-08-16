'use client'

import {
  type NextComponentType,
  type NextPage,
  type NextPageContext,
} from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookMarked, Filter, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { searchByTitleSchema } from '@kyrian/api/schemas'
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
} from '@kyrian/ui'

import { api, type RouterInputs } from '~/utils/api'

type SearchMonographFormProps = NonNullable<unknown>

type SearchMonographFormValues = RouterInputs['monograph']['byTitle']

const SearchMonographForm: NextPage<SearchMonographFormProps> = () => {
  const { data: degreePrograms } = api.degreeProgram.getNameAndCode.useQuery()

  const params = useSearchParams()
  const degreeProgramsParam =
    params !== null ? params.get('degreePrograms') : null
  const titleParam = params !== null ? params.get('title') : null

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SearchMonographFormValues>({
    resolver: zodResolver(searchByTitleSchema),
    defaultValues: {
      title: titleParam !== null ? titleParam : '',
      degreePrograms:
        degreeProgramsParam !== null && degreeProgramsParam.length > 0
          ? degreeProgramsParam.split(',')
          : [],
    },
  })

  const router = useRouter()
  const onSubmit = (values: SearchMonographFormValues) => {
    const query = new URLSearchParams(
      values as unknown as Record<string, string>,
    ).toString()

    router.push(`/monographs/search?${query}`)
  }

  const selectedDegreePrograms = watch('degreePrograms')

  return (
    <form className='grid w-full gap-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid w-full items-center gap-3'>
        <div className='flex w-full flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0'>
          <Input
            id='title'
            type='text'
            placeholder='Ingresa el título de tu monografía a buscar'
            {...register('title')}
            className='h-12 w-full text-base'
          />

          <Button type='submit'>
            <Search className='mr-2 h-4 w-4' /> Buscar
          </Button>
        </div>

        {errors.title && (
          <span className='text-sm text-red-500'>{errors.title.message}</span>
        )}

        <div className='flex flex-1 items-center space-x-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type='button' variant='outline'>
                <Filter className='mr-2 h-4 w-4' /> Filtrar
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel className='flex flex-1 items-center'>
                  <BookMarked className='mr-2 h-4 w-4' />
                  <span>Programa académico</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {degreePrograms !== undefined &&
                  degreePrograms.map((degreeProgram) => (
                    <DropdownMenuCheckboxItem
                      key={degreeProgram.code}
                      checked={watch('degreePrograms')?.includes(
                        degreeProgram.code,
                      )}
                      onCheckedChange={(checked) => {
                        const oldDegreePrograms = watch('degreePrograms') ?? []
                        let newDegreePrograms: string[]
                        if (checked) {
                          newDegreePrograms = [
                            ...oldDegreePrograms,
                            degreeProgram.code,
                          ]
                        } else {
                          newDegreePrograms = oldDegreePrograms.filter(
                            (code) => code !== degreeProgram.code,
                          )
                        }

                        setValue('degreePrograms', newDegreePrograms)
                      }}
                    >
                      {degreeProgram.name}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {selectedDegreePrograms !== undefined &&
            selectedDegreePrograms.length > 0 && (
              <div>
                <span className='text-sm text-slate-500'>
                  Programas académicos:{' '}
                  {degreePrograms
                    ?.filter(
                      (degreeProgram) =>
                        watch('degreePrograms')?.includes(degreeProgram.code),
                    )
                    .map((degreeProgram) => (
                      <Badge
                        key={degreeProgram.code}
                        variant='secondary'
                        className='mr-1'
                      >
                        {degreeProgram.name}
                      </Badge>
                    ))}
                </span>
              </div>
            )}
        </div>
      </div>
    </form>
  )
}

export default api.withTRPC(SearchMonographForm) as NextComponentType<
  NextPageContext,
  unknown,
  SearchMonographFormProps
>
