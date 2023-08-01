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
import GenericDataTable from '~/components/table/generic-data-table'
import { columns } from '~/app/(dashboard)/dashboard/(monographs)/monographs/list/columns'

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

  return (
    <DashboardShell>
      <DashboardHeader heading='Monografias'>
        <NextLink href='/monographs/new' passHref>
          <Button className='app-mt-4 md:app-mt-0'>Crear monografia</Button>
        </NextLink>
      </DashboardHeader>

      <GenericDataTable columns={columns} data={monographs} />
    </DashboardShell>
  )
}

export default MonographsPage
