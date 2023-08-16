import { type FC } from 'react'
import { notFound } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth/next'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'

import EditDegreeProgramForm from '~/app/(degree-programs)/degree-programs/[code]/edit/form'

type EditDegreeProgramPageProps = {
  params: { [key: string]: string | string[] | undefined }
}
const EditDegreeProgramPage: FC<EditDegreeProgramPageProps> = async ({
  params,
}) => {
  const { code } = params

  const session = await getServerSession(authOptions)

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: session,
      prisma: prisma,
    },
  })

  const degreeProgram = await ssg.degreeProgram.read.fetch({
    code: code as string,
  })

  if (degreeProgram === null) {
    return notFound()
  }

  return (
    <div className='min-w-2xl grid items-start gap-8'>
      <div className='flex justify-between'>
        <div className='grid gap-1'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Editar programa académico de {degreeProgram.name}
          </h1>
        </div>
      </div>

      <EditDegreeProgramForm degreeProgram={degreeProgram} />
    </div>
  )
}

export default EditDegreeProgramPage
