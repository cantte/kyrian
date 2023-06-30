import NextLink from 'next/link'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth/next'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'
import { Badge, Separator } from '@kyrian/ui'

const IndexPage = async () => {
  const session = await getServerSession(authOptions)

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma: prisma,
    },
  })

  const degreePrograms = await ssg.degreeProgram.info.fetch()
  const events = await ssg.event.list.fetch()

  return (
    <>
      <section className='app-space-y-6 app-pb-8 app-pt-6 md:app-pb-12 md:app-pt-10 lg:app-py-32 app-relative'>
        <div className='app-container app-flex app-max-w-[64rem] app-flex-col app-items-center app-gap-4 app-text-center'>
          <h1 className='app-font-heading app-text-3xl sm:app-text-5xl md:app-text-6xl lg:app-text-7xl'>
            CEDISJ
          </h1>
          <p className='app-max-w-[100rem] app-leading-normal app-text-muted-foreground sm:app-text-xl sm:app-leading-8'>
            Bienvenidos al Centro de Documentación e Investigación Socio
            Jurídica (CEDISJ), un espacio multidisciplinario que une las áreas
            del derecho, la sociología y la psicología. Nuestro centro es un
            referente en la investigación y el análisis de temas sociales y
            jurídicos, abordando problemáticas contemporáneas desde diferentes
            perspectivas.
          </p>
        </div>
      </section>

      <section
        id='degree-programs'
        className='app-container app-space-y-6 app-bg-slate-50 app-py-8 dark:app-bg-transparent md:app-py-12 lg:app-py-24'
      >
        <div className='app-mx-auto app-flex app-max-w-[58rem] app-flex-col app-items-center app-space-y-4 app-text-center'>
          <h2 className='app-font-heading app-text-3xl app-leading-[1.1] sm:app-text-3xl md:app-text-6xl'>
            Programas académicos
          </h2>

          <p className='text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7'></p>
        </div>

        <div className='app-mx-auto app-grid app-justify-center app-gap-4 sm:app-grid-cols-2 md:app-max-w-[64rem] md:app-grid-cols-3'>
          {degreePrograms.map((degreeProgram) => (
            <NextLink
              href={`/degree-programs/${degreeProgram.code}/view`}
              key={degreeProgram.code}
            >
              <div
                key={degreeProgram.code}
                className='app-relative app-overflow-hidden app-rounded-lg app-border app-bg-background app-p-2'
              >
                <div className='app-flex app-h-[180px] app-flex-col app-justify-between app-rounded-md app-p-6'>
                  <div className='app-space-y-2'>
                    <h3 className='app-font-bold'>{degreeProgram.name}</h3>

                    <p className='app-text-sm app-text-muted-foreground'>
                      Modalidad: {degreeProgram.modality}
                    </p>

                    <Badge>{degreeProgram.degree}</Badge>
                  </div>
                </div>
              </div>
            </NextLink>
          ))}
        </div>
      </section>

      <section
        id='events'
        className='app-container app-space-y-6 app-py-8 md:app-py-12 lg:app-py-24'
      >
        <div className='app-mx-auto app-flex app-max-w-[58rem] app-flex-col app-items-center app-space-y-4 app-text-center'>
          <h2 className='app-font-heading app-text-3xl app-leading-[1.1] sm:app-text-3xl md:app-text-6xl'>
            Próximos eventos
          </h2>

          <p className='text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7'>
            Mantente al tanto de los próximos eventos que se realizarán en el
            CEDISJ.
          </p>
        </div>

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
      </section>
    </>
  )
}

export default IndexPage
