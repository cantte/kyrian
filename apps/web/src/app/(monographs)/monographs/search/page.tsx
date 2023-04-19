import { redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth/next'
import superjson from 'superjson'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'

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
      <ul>
        {monographs.map((monograph) => (
          <li key={monograph.id}>{monograph.title}</li>
        ))}
      </ul>
    </>
  )
}

export default SearchMonographsPage
