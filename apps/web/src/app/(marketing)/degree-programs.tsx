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
    <div className='mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3'>
      {degreePrograms.map((degreeProgram) => (
        <NextLink
          href={`/degree-programs/${degreeProgram.code}/view`}
          key={degreeProgram.code}
        >
          <div
            key={degreeProgram.code}
            className='bg-background relative overflow-hidden rounded-lg border p-2'
          >
            <div className='flex h-[180px] flex-col justify-between rounded-md p-6'>
              <div className='space-y-2'>
                <h3 className='font-bold'>{degreeProgram.name}</h3>

                <p className='text-muted-foreground text-sm'>
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
