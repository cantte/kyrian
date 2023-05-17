import { redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth/next'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'

import { columns } from '~/app/(degree-programs)/degree-programs/list/columns'
import DegreeProgramsTable from '~/app/(degree-programs)/degree-programs/list/data-table'

const DegreeProgramsPage = async () => {
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
  })

  const degreePrograms = await ssg.degreeProgram.list.fetch()
  const tableColumns = columns()

  return (
    <div className='app-space-y-8 container mx-auto py-10'>
      <div className='app-flex app-justify-between'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-scroll-m-20 app-text-4xl app-font-extrabold app-tracking-tight lg:app-text-5xl'>
            Programas académicos
          </h1>
        </div>
      </div>

      <DegreeProgramsTable columns={tableColumns} data={degreePrograms} />
    </div>
  )
}

export default DegreeProgramsPage
