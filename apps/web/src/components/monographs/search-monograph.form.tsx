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
    <form
      className='app-grid app-gap-6 app-w-full'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='app-grid app-w-full app-items-center app-gap-3'>
        <div className='app-flex app-w-full md:app-items-center md:app-space-x-2 app-flex-col md:app-flex-row app-space-y-2 md:app-space-y-0'>
          <Input
            id='title'
            type='text'
            placeholder='Ingresa el título de tu monografía a buscar'
            {...register('title')}
            className='app-w-full app-text-base app-h-12'
          />

          <Button type='submit'>
            <Search className='app-mr-2 app-h-4 app-w-4' /> Buscar
          </Button>
        </div>

        {errors.title && (
          <span className='app-text-sm app-text-red-500'>
            {errors.title.message}
          </span>
        )}

        <div className='app-flex app-flex-1 app-space-x-4 app-items-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type='button' variant='outline'>
                <Filter className='app-mr-2 app-h-4 app-w-4' /> Filtrar
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel className='app-flex app-items-center app-flex-1'>
                  <BookMarked className='app-mr-2 app-h-4 app-w-4' />
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
                <span className='app-text-sm app-text-slate-500'>
                  Programas académicos:{' '}
                  {degreePrograms
                    ?.filter((degreeProgram) =>
                      watch('degreePrograms')?.includes(degreeProgram.code),
                    )
                    .map((degreeProgram) => (
                      <Badge
                        key={degreeProgram.code}
                        variant='secondary'
                        className='app-mr-1'
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
