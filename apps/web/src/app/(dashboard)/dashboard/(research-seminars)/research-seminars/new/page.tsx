import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'

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
    <div className='app-grid app-items-start app-gap-8 app-min-w-2xl'>
      <div className='app-flex app-justify-between'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-scroll-m-20 app-text-4xl app-font-extrabold app-tracking-tight lg:app-text-5xl'>
            Registro de semilleros de investigación
          </h1>
        </div>
      </div>

      <NewResearchSeminarForm />
    </div>
  )
}

export default NewResearchSeminarPage
