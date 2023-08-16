import { Suspense, type FC } from 'react'

import { Skeleton } from '@kyrian/ui'

import DegreeProgramsSection from '~/app/(marketing)/degree-programs'
import EventsSection from '~/app/(marketing)/events'

const DegreeProgramsFallback: FC = () => {
  return (
    <div className='mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3'>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className='h-[180px] w-full' />
      ))}
    </div>
  )
}

const EventsFallback: FC = () => {
  return (
    <div className='mx-auto md:max-w-[64rem]'>
      <Skeleton className='h-[180px] w-full' />
    </div>
  )
}

const IndexPage = () => {
  return (
    <>
      <section className='relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
        <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
          <h1 className='font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
            CEDISJ
          </h1>
          <p className='text-muted-foreground max-w-[100rem] leading-normal sm:text-xl sm:leading-8'>
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
        className='container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24'
      >
        <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
          <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
            Programas académicos
          </h2>

          <p className='text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7'></p>
        </div>

        <Suspense fallback={<DegreeProgramsFallback />}>
          <DegreeProgramsSection />
        </Suspense>
      </section>

      <section
        id='events'
        className='container space-y-6 py-8 md:py-12 lg:py-24'
      >
        <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
          <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
            Próximos eventos
          </h2>

          <p className='text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7'>
            Mantente al tanto de los próximos eventos que se realizarán en el
            CEDISJ.
          </p>
        </div>

        <Suspense fallback={<EventsFallback />}>
          <EventsSection />
        </Suspense>
      </section>
    </>
  )
}

export default IndexPage
