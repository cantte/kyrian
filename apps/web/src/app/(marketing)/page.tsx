import { redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth/next'
import superjson from 'superjson'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'

const IndexPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/api/auth/signin')
  }

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
    },
    transformer: superjson,
  })

  const secretMessage = await ssg.auth.getSecretMessage.fetch()

  return (
    <>
      <section className='app-container app-grid app-items-center app-justify-center app-gap-6 app-pt-6 app-pb-8 md:app-pt-10 md:app-pb-12 lg:app-pt-16 lg:app-pb-24'>
        <div className='app-mx-auto app-flex app-flex-col app-items-start app-gap-4 lg:app-w-[52rem]'>
          <h1 className='app-text-3xl app-font-bold app-leading-[1.1] app-tracking-tighter sm:app-text-5xl md:app-text-6xl'>
            Sitio en construcción
          </h1>
          <p className='app-max-w-[42rem] app-leading-normal app-text-slate-700 sm:app-text-xl sm:app-leading-8'>
            Este sitio está en construcción. Tu mensaje secreto es{' '}
            {secretMessage}
          </p>
        </div>
      </section>
    </>
  )
}

export default IndexPage
