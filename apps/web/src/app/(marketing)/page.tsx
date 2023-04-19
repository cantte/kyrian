import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'

import SearchMonographForm from '~/components/monographs/search-monograph.form'

const IndexPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/api/auth/signin')
  }

  return (
    <>
      <section className='app-container app-grid app-items-center app-justify-center app-gap-6 app-pt-6 app-pb-8 md:app-pt-10 md:app-pb-12 lg:app-pt-16 lg:app-pb-24'>
        <div className='app-mx-auto app-flex app-flex-col app-items-start app-gap-4 lg:app-w-[52rem]'>
          <h1 className='app-text-3xl app-font-bold app-leading-[1.1] app-tracking-tighter sm:app-text-5xl md:app-text-6xl app-text-center'>
            Ingresa el título a buscar
          </h1>

          <SearchMonographForm />
        </div>
      </section>
    </>
  )
}

export default IndexPage
