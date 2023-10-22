import { notFound, redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth/next'
import superjson from 'superjson'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'

import EditMonographForm from '~/app/(monographs)/monographs/[id]/edit/form'

type EditMonographPageProps = {
  params: {
    [key: string]: string | string[] | undefined
  }
}

const EditMonographPage = async ({ params }: EditMonographPageProps) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/api/auth/signin')
  }

  if (session.user.role !== 'admin') {
    return redirect('/')
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

  const monograph = await ssg.monograph.find.fetch({
    id: id as string,
  })

  if (monograph === null) {
    return notFound()
  }

  return (
    <div className='min-w-2xl grid items-start gap-8'>
      <div className='flex justify-between'>
        <div className='grid gap-1'>
          <h1 className='scroll-m-20 text-2xl tracking-tight'>
            Editar monografía
          </h1>
        </div>
      </div>

      <EditMonographForm defaultValues={monograph} />
    </div>
  )
}

export default EditMonographPage
