import { createServerSideHelpers } from '@trpc/react-query/server'

import { appRouter } from '@kyrian/api'
import { prisma } from '@kyrian/db'
import { Badge, Separator } from '@kyrian/ui'

const EventsSection = async () => {
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
      <div className='mx-auto grid justify-center gap-4 md:max-w-[64rem]'>
        {events.length === 0 && (
          <div className='bg-background text-muted-foreground flex flex-col items-center justify-center p-6 text-center'>
            <h3 className='text-4xl font-bold'>No hay eventos</h3>

            <p className='text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7'>
              Pronto habrá más eventos
            </p>
          </div>
        )}
        {events.map((event) => (
          <div
            key={event.id}
            className='bg-background relative overflow-hidden rounded-lg border p-2 md:min-w-[42rem] md:max-w-[64rem]'
          >
            <div className='flex min-h-[180px] flex-row items-center space-x-2 rounded-md p-6'>
              <img
                src={event.url}
                alt={event.title}
                className='mx-auto mr-4 h-24 w-24 rounded-full'
              />
              <div className='w-[100px] space-y-1'>
                <h3 className='text-4xl font-bold'>
                  {Intl.DateTimeFormat('es-CO', {
                    day: 'numeric',
                  }).format(event.date)}
                </h3>

                <p className='text-muted-foreground text-sm'>
                  {Intl.DateTimeFormat('es-CO', {
                    month: 'long',
                  }).format(event.date)}
                </p>

                <p className='text-muted-foreground text-sm'>
                  {Intl.DateTimeFormat('es-CO', {
                    year: 'numeric',
                  }).format(event.date)}
                </p>

                <p className='text-muted-foreground text-sm'>
                  {Intl.DateTimeFormat('es-CO', {
                    hour: 'numeric',
                    minute: 'numeric',
                  }).format(event.date)}
                </p>
              </div>

              <div className='w-full space-y-2'>
                <Badge>{event.topic}</Badge>
                <h3 className='text-4xl font-bold'>{event.title}</h3>

                <p className='text-muted-foreground text-sm'>
                  {event.description}
                </p>

                <Separator />

                <p className='text-muted-foreground text-sm'>
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
