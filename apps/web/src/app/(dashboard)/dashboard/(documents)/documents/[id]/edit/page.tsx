import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'

import PageUnderBuild from '~/components/feedback/page-under-build'

const EditDocumentsPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/api/auth/signin')
  }

  if (session.user.role !== 'admin') {
    return redirect('/')
  }

  return <PageUnderBuild />
}

export default EditDocumentsPage
