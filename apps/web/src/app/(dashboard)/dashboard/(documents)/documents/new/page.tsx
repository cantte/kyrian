import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'

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
    <div className='app-grid app-items-start app-gap-8 app-min-w-2xl'>
      <div className='app-flex app-justify-between'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-scroll-m-20 app-text-4xl app-font-extrabold app-tracking-tight lg:app-text-5xl'>
            Cargue de documentos
          </h1>
        </div>
      </div>

      <NewDocumentForm defaultValues={{ userId: session.user.id }} />
    </div>
  )
}

export default NewDocumentPage
