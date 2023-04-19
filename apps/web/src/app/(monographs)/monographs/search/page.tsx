import NextLink from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { Link } from 'lucide-react'
import { getServerSession } from 'next-auth/next'
import superjson from 'superjson'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@kyrian/ui'

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

  const { title } = searchParams
  const monographs = await ssg.monograph.byTitle.fetch({
    title: title as string,
  })

  return (
    <>
      <ul className='app-grid app-gap-3 app-w-full px-2 py-2'>
        {monographs.map((monograph) => (
          <li key={monograph.id}>
            <Card>
              <CardHeader>
                <CardTitle>{monograph.title}</CardTitle>
                <CardDescription>
                  Publicado el{' '}
                  {Intl.DateTimeFormat('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(monograph.publicationDate)}
                </CardDescription>
              </CardHeader>

              <CardFooter className='app-flex app-justify-end md:app-justify-start'>
                <NextLink href={monograph.downloadUrl} target='_blank' passHref>
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
  )
}

export default SearchMonographsPage
