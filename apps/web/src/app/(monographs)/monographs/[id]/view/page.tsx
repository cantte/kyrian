import { notFound, redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth/next'
import superjson from 'superjson'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'

import MonographView from './view'

type ViewMonographPageProps = {
  params: { [key: string]: string | string[] | undefined }
}

const ViewMonographPage = async ({ params }: ViewMonographPageProps) => {
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

  const { id } = params

  const dowloadUrl = await ssg.monograph.downloadUrl.fetch({
    id: id as string,
  })

  if (dowloadUrl === null) {
    return notFound()
  }

  return (
    <div className='h-screen'>
      <MonographView url={dowloadUrl} />
    </div>
  )
}

export default ViewMonographPage
