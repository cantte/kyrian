import NextLink from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'
import { Button } from '@kyrian/ui'

import DashboardHeader from '~/components/dashboard-header'
import DashboardShell from '~/components/dashboard-shell'
import GenericDataTable from '~/components/table/generic-data-table'
import { columns } from '~/app/(dashboard)/dashboard/(documents)/documents/list/columns'

const DocumentsPage = async () => {
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

  const documents = await ssg.document.list.fetch()

  return (
    <DashboardShell>
      <DashboardHeader heading='Documentos'>
        <NextLink href='/dashboard/documents/new' passHref>
          <Button className='app-mt-4 md:app-mt-0'>Crear documento</Button>
        </NextLink>
      </DashboardHeader>

      <GenericDataTable columns={columns} data={documents} />
    </DashboardShell>
  )
}

export default DocumentsPage
