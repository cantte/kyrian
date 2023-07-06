import { type FC } from 'react'
import NextLink from 'next/link'
import { createServerSideHelpers } from '@trpc/react-query/server'

import { appRouter } from '@kyrian/api'
import { prisma } from '@kyrian/db'
import { Badge } from '@kyrian/ui'

const DegreeProgramsSection: FC = async () => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: null,
      prisma: prisma,
    },
  })

  const degreePrograms = await ssg.degreeProgram.info.fetch()

  return (
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
  )
}

export default DegreeProgramsSection
