import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'

import DashboardHeader from '~/components/dashboard-header'
import DashboardShell from '~/components/dashboard-shell'
import NewResearchSeminarForm from '~/app/(dashboard)/dashboard/(research-seminars)/research-seminars/new/form'

const NewResearchSeminarPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/api/auth/signin')
  }

  if (session.user.role !== 'admin') {
    return redirect('/')
  }

  return (
    <DashboardShell>
      <DashboardHeader heading='Registro de semilleros de investigación' />

      <NewResearchSeminarForm />
    </DashboardShell>
  )
}

export default NewResearchSeminarPage
