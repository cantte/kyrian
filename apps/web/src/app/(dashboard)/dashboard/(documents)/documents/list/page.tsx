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
import { columns } from '~/app/(dashboard)/dashboard/(documents)/documents/list/columns'
import DocumentsDataTable from '~/app/(dashboard)/dashboard/(documents)/documents/list/data-table'

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
          <Button className='mt-4 md:mt-0'>Crear documento</Button>
        </NextLink>
      </DashboardHeader>

      <DocumentsDataTable columns={columns} data={documents} />
    </DashboardShell>
  )
}

export default DocumentsPage
