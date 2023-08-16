import NextLink from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth/next'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'
import { Button } from '@kyrian/ui'

import DashboardHeader from '~/components/dashboard-header'
import DashboardShell from '~/components/dashboard-shell'
import { columns } from '~/app/(dashboard)/dashboard/(monographs)/monographs/list/columns'
import MonographsDataTable from '~/app/(dashboard)/dashboard/(monographs)/monographs/list/data-table'

const MonographsPage = async () => {
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

  const monographs = await ssg.monograph.list.fetch()
  const degreePrograms = await ssg.degreeProgram.getNameAndCode.fetch()

  return (
    <DashboardShell>
      <DashboardHeader heading='Monografias'>
        <NextLink href='/monographs/new' passHref>
          <Button className='mt-4 md:mt-0'>Crear monografia</Button>
        </NextLink>
      </DashboardHeader>

      <MonographsDataTable
        columns={columns}
        data={monographs}
        degreePrograms={degreePrograms}
      />
    </DashboardShell>
  )
}

export default MonographsPage
