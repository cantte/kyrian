import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'

import DashboardHeader from '~/components/dashboard-header'
import DashboardShell from '~/components/dashboard-shell'
import SearchMonographForm from '~/components/monographs/search-monograph.form'

const DashboardMainPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/api/auth/signin')
  }

  if (!session.user) {
    return redirect('/api/auth/signin')
  }

  return (
    <DashboardShell>
      <DashboardHeader heading='Búsqueda de monografías' />

      <SearchMonographForm />
    </DashboardShell>
  )
}

export default DashboardMainPage
