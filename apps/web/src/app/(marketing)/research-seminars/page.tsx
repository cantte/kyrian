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
    <div className='min-w-2xl grid items-start gap-8'>
      <div className='flex justify-between'>
        <div className='grid gap-1'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Semilleros de investigación
          </h1>
        </div>
      </div>

      {researchSeminars.length > 0 ? (
        <ul className='grid w-full gap-6 px-2 py-2'>
          {researchSeminars.map((researchSeminar, id) => {
            return (
              <li key={id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{researchSeminar.name}</CardTitle>
                    <CardDescription className='flex flex-1 flex-row'>
                      {researchSeminar.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
            No hay semilleros de investigación cargados
          </h1>
        </div>
      )}
    </div>
  )
}

export default ResearchSeminarsPage
