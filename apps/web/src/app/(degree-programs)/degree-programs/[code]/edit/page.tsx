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
    <div className='app-grid app-items-start app-gap-8 app-min-w-2xl'>
      <div className='app-flex app-justify-between'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-scroll-m-20 app-text-4xl app-font-extrabold app-tracking-tight lg:app-text-5xl'>
            Editar programa académico de {degreeProgram.name}
          </h1>
        </div>
      </div>

      <EditDegreeProgramForm degreeProgram={degreeProgram} />
    </div>
  )
}

export default EditDegreeProgramPage
