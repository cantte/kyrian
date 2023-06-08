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
          <div className='app-my-2 app-px-2'>
            <SearchMonographForm />
          </div>

          <ul className='app-grid app-gap-3 app-w-full px-2 py-2'>
            {monographs.map((monograph) => (
              <li key={monograph.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{monograph.title}</CardTitle>
                    <CardDescription className='app-flex app-flex-1 app-flex-row'>
                      Publicado el{' '}
                      {Intl.DateTimeFormat('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(monograph.publicationDate)}
                      {monograph.degreeProgram !== null && (
                        <Badge className='app-ml-2' variant='outline'>
                          {monograph.degreeProgram.name}
                        </Badge>
                      )}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className='app-flex app-justify-end md:app-justify-start'>
                    <NextLink
                      href={`/monographs/${monograph.id}/view`}
                      passHref
                    >
                      <Button>
                        <Link className='app-mr-2 app-h-4 app-w-4' /> Ver{' '}
                      </Button>
                    </NextLink>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className='app-grid app-gap-6 app-px-2'>
          <BookTemplate className='app-m-auto app-h-32 app-w-32 app-text-slate-600' />
          <div>
            <p className='app-text-lg app-text-center app-text-slate-400'>
              No se encontraron monografías
            </p>

            <p className='app-text-sm app-text-center app-text-slate-400'>
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
