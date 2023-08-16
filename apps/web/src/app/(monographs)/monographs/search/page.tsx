import NextLink from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { BookTemplate, Link } from 'lucide-react'
import { getServerSession } from 'next-auth/next'
import superjson from 'superjson'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@kyrian/ui'

import SearchMonographForm from '~/components/monographs/search-monograph.form'

type SearchMonographsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const SearchMonographsPage = async ({
  searchParams,
}: SearchMonographsPageProps) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/api/auth/signin')
  }

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma: prisma,
    },
    transformer: superjson,
  })

  const { title, degreePrograms } = searchParams

  if (
    title === undefined ||
    title.length === 0 ||
    (title as string).trim().length === 0
  ) {
    return redirect('/')
  }

  const monographs = await ssg.monograph.byTitle.fetch({
    title: title as string,
    degreePrograms:
      degreePrograms !== undefined && (degreePrograms as string).length > 0
        ? (degreePrograms as string).split(',')
        : undefined,
  })

  return (
    <>
      {monographs.length > 0 ? (
        <>
          <div className='my-2 px-2'>
            <SearchMonographForm />
          </div>

          <ul className='grid w-full gap-3 px-2 py-2'>
            {monographs.map((monograph) => (
              <li key={monograph.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{monograph.title}</CardTitle>
                    <CardDescription className='flex flex-1 flex-row'>
                      Publicado el{' '}
                      {Intl.DateTimeFormat('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(monograph.publicationDate)}
                      {monograph.degreeProgram !== null && (
                        <Badge className='ml-2' variant='outline'>
                          {monograph.degreeProgram.name}
                        </Badge>
                      )}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className='flex justify-end md:justify-start'>
                    <NextLink
                      href={`/monographs/${monograph.id}/view`}
                      passHref
                    >
                      <Button>
                        <Link className='mr-2 h-4 w-4' /> Ver{' '}
                      </Button>
                    </NextLink>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className='grid gap-6 px-2'>
          <BookTemplate className='m-auto h-32 w-32 text-slate-600' />
          <div>
            <p className='text-center text-lg text-slate-400'>
              No se encontraron monografías
            </p>

            <p className='text-center text-sm text-slate-400'>
              Intenta con otro término de búsqueda
            </p>
          </div>

          <SearchMonographForm />
        </div>
      )}
    </>
  )
}

export default SearchMonographsPage
