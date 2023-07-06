import { type FC } from 'react'
import { createServerSideHelpers } from '@trpc/react-query/server'

import { appRouter } from '@kyrian/api'
import { prisma } from '@kyrian/db'
import { Badge, Separator } from '@kyrian/ui'

const EventsSection: FC = async () => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: null,
      prisma: prisma,
    },
  })

  const events = await ssg.event.list.fetch()

  return (
    <>
      <div className='app-mx-auto app-grid app-justify-center app-gap-4 md:app-max-w-[64rem]'>
        {events.length === 0 && (
          <div className='app-flex app-flex-col app-items-center app-justify-center app-text-center app-p-6 app-bg-background app-text-muted-foreground'>
            <h3 className='app-font-bold app-text-4xl'>No hay eventos</h3>

            <p className='text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7'>
              Pronto habrá más eventos
            </p>
          </div>
        )}
        {events.map((event) => (
          <div
            key={event.id}
            className='app-relative app-overflow-hidden app-rounded-lg app-border app-bg-background app-p-2 md:app-min-w-[42rem] md:app-max-w-[64rem]'
          >
            <div className='app-flex app-min-h-[180px] app-flex-row app-rounded-md app-p-6 app-space-x-2'>
              <div className='app-space-y-1 app-w-[100px]'>
                <h3 className='app-font-bold app-text-4xl'>
                  {Intl.DateTimeFormat('es-CO', {
                    day: 'numeric',
                  }).format(event.date)}
                </h3>

                <p className='app-text-sm app-text-muted-foreground'>
                  {Intl.DateTimeFormat('es-CO', {
                    month: 'long',
                  }).format(event.date)}
                </p>

                <p className='app-text-sm app-text-muted-foreground'>
                  {Intl.DateTimeFormat('es-CO', {
                    year: 'numeric',
                  }).format(event.date)}
                </p>

                <p className='app-text-sm app-text-muted-foreground'>
                  {Intl.DateTimeFormat('es-CO', {
                    hour: 'numeric',
                    minute: 'numeric',
                  }).format(event.date)}
                </p>
              </div>

              <div className='app-space-y-2 app-w-full'>
                <Badge>{event.topic}</Badge>
                <h3 className='app-font-bold app-text-4xl'>{event.title}</h3>

                <p className='app-text-sm app-text-muted-foreground'>
                  {event.description}
                </p>

                <Separator />

                <p className='app-text-sm app-text-muted-foreground'>
                  Lugar: {event.place}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default EventsSection
