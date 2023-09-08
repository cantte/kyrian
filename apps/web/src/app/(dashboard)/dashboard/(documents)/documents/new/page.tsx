import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'

import DashboardHeader from '~/components/dashboard-header'
import DashboardShell from '~/components/dashboard-shell'
import NewDocumentForm from '~/app/(dashboard)/dashboard/(documents)/documents/new/form'

const NewDocumentPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/api/auth/signin')
  }

  if (session.user.role !== 'admin') {
    return redirect('/')
  }

  return (
    <DashboardShell>
      <DashboardHeader heading='Cargue de documentos' />

      <NewDocumentForm defaultValues={{ userId: session.user.id }} />
    </DashboardShell>
  )
}

export default NewDocumentPage
