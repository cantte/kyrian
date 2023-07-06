import { Suspense, type FC } from 'react'

import { Skeleton } from '@kyrian/ui'

import DegreeProgramsSection from '~/app/(marketing)/degree-programs'
import EventsSection from '~/app/(marketing)/events'

const DegreeProgramsFallback: FC = () => {
  return (
    <div className='app-mx-auto app-grid app-justify-center app-gap-4 sm:app-grid-cols-2 md:app-max-w-[64rem] md:app-grid-cols-3'>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className='app-w-full app-h-[180px]' />
      ))}
    </div>
  )
}

const EventsFallback: FC = () => {
  return (
    <div className='app-mx-auto md:app-max-w-[64rem]'>
      <Skeleton className='app-w-full app-h-[180px]' />
    </div>
  )
}

const IndexPage = () => {
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

        <Suspense fallback={<DegreeProgramsFallback />}>
          <DegreeProgramsSection />
        </Suspense>
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

        <Suspense fallback={<EventsFallback />}>
          <EventsSection />
        </Suspense>
      </section>
    </>
  )
}

export default IndexPage
