import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth'
import superjson from 'superjson'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'
import { Card, CardDescription, CardHeader, CardTitle } from '@kyrian/ui'

const ResearchSeminarsPage = async () => {
  const session = await getServerSession(authOptions)

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma: prisma,
    },
    transformer: superjson,
  })

  const researchSeminars = await ssg.researchSeminar.info.fetch()

  return (
    <div className='app-grid app-items-start app-gap-8 app-min-w-2xl'>
      <div className='app-flex app-justify-between'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-scroll-m-20 app-text-4xl app-font-extrabold app-tracking-tight lg:app-text-5xl'>
            Semilleros de investigación
          </h1>
        </div>
      </div>

      {researchSeminars.length > 0 ? (
        <ul className='app-grid app-gap-6 app-w-full px-2 py-2'>
          {researchSeminars.map((researchSeminar, id) => {
            return (
              <li key={id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{researchSeminar.name}</CardTitle>
                    <CardDescription className='app-flex app-flex-1 app-flex-row'>
                      {researchSeminar.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className='app-flex app-flex-col app-items-center app-justify-center app-w-full app-h-full'>
          <h1 className='app-text-4xl app-font-extrabold app-tracking-tight lg:app-text-5xl'>
            No hay semilleros de investigación cargados
          </h1>
        </div>
      )}
    </div>
  )
}

export default ResearchSeminarsPage
