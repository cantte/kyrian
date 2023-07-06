import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'

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
    <section className='app-items-center app-gap-6'>
      <div className='app-mx-auto app-flex app-flex-col app-items-start app-gap-4'>
        <h1 className='app-font-heading app-text-3xl md:app-text-4xl'>
          Ingresa el título a buscar
        </h1>

        <SearchMonographForm />
      </div>
    </section>
  )
}

export default DashboardMainPage
