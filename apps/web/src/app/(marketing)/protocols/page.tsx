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

const ProtocolsPage = async () => {
  const session = await getServerSession(authOptions)

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma: prisma,
    },
    transformer: superjson,
  })

  const protocols = await ssg.document.byType.fetch({
    type: 'Protocol',
  })

  return (
    <div className='min-w-2xl grid items-start gap-8'>
      <div className='flex justify-between'>
        <div className='grid gap-1'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Protocolos de CEDISJ
          </h1>
        </div>
      </div>
      {protocols.length > 0 ? (
        <ul className='grid w-full gap-6 px-2 py-2'>
          {protocols.map((protocol) => (
            <li key={protocol.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{protocol.name}</CardTitle>
                  <CardDescription className='flex flex-1 flex-row'>
                    Cargado el{' '}
                    {Intl.DateTimeFormat('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(protocol.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <NextLink href={protocol.url} target='_blank'>
                    <Button>Ver formato</Button>
                  </NextLink>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <div className='grid w-full gap-6 px-2 py-2'>
          <p>No hay protocolos registrados</p>
        </div>
      )}
    </div>
  )
}

export default ProtocolsPage
