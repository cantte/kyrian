import NextLink from 'next/link'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth'
import superjson from 'superjson'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@kyrian/ui'

const StategicPlanPage = async () => {
  const session = await getServerSession(authOptions)

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma: prisma,
    },
    transformer: superjson,
  })

  const strategicPlans = await ssg.document.byType.fetch({
    type: 'StrategicPlan',
  })

  return (
    <div className='app-grid app-items-start app-gap-8 app-min-w-2xl'>
      <div className='app-flex app-justify-between'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-scroll-m-20 app-text-4xl app-font-extrabold app-tracking-tight lg:app-text-5xl'>
            Planes estrategicos
          </h1>
        </div>
      </div>
      {strategicPlans.length > 0 ? (
        <ul className='app-grid app-gap-6 app-w-full px-2 py-2'>
          {strategicPlans.map((strategicPlan) => (
            <li key={strategicPlan.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{strategicPlan.name}</CardTitle>
                  <CardDescription className='app-flex app-flex-1 app-flex-row'>
                    Cargado el{' '}
                    {Intl.DateTimeFormat('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(strategicPlan.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <NextLink href={strategicPlan.url} target='_blank'>
                    <Button>Ver formato</Button>
                  </NextLink>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <div className='app-grid app-gap-6 app-w-full px-2 py-2'>
          <p>No hay planes estrategicos registrados</p>
        </div>
      )}
    </div>
  )
}

export default StategicPlanPage
