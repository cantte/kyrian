import { type FC } from 'react'
import { notFound } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'

import { appRouter } from '@kyrian/api'
import { prisma } from '@kyrian/db'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@kyrian/ui'

type ViewDegreeProgramPageProps = {
  params: { [key: string]: string | string[] | undefined }
}

const ViewDegreeProgramPage: FC<ViewDegreeProgramPageProps> = async ({
  params,
}) => {
  const { code } = params

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: null,
      prisma: prisma,
    },
  })

  const degreeProgram = await ssg.degreeProgram.read.fetch({
    code: code as string,
  })

  if (degreeProgram === null) {
    return notFound()
  }

  return (
    <div className='min-w-2xl grid items-start gap-8'>
      <div className='flex justify-between'>
        <div className='grid gap-1'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Programa académico de {degreeProgram.name}
          </h1>
        </div>
      </div>

      <div className='grid grid-flow-row-dense grid-cols-1 gap-6 overflow-visible md:grid-cols-4'>
        <div className='col-span-4 overflow-visible md:col-span-1'>
          <Card>
            <CardHeader>
              <CardTitle>Información general</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col space-y-2'>
                <p className='leading-7 [&:not(:first-child)]:mt-6'>
                  Título otorgado: {degreeProgram.degree}
                </p>

                <p className='leading-7'>Metología: {degreeProgram.modality}</p>

                <p className='leading-7'>
                  Duración: {degreeProgram.duration} semestres
                </p>

                <p className='leading-7'>Créditos: {degreeProgram.credits}</p>

                {degreeProgram.studentQuota !== null && (
                  <p className='leading-7'>
                    Cupo: {degreeProgram.studentQuota}
                  </p>
                )}

                <p className='leading-7'>
                  Lugar: {degreeProgram.city}, {degreeProgram.state}
                </p>

                <p className='leading-7'>Teléfono: {degreeProgram.phone}</p>

                <p className='leading-7'>
                  Correo electrónico: {degreeProgram.email}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='col-span-4 overflow-visible md:col-span-3'>
          <Tabs className='w-full overflow-scroll md:overflow-auto'>
            <TabsList>
              <TabsTrigger
                value='history'
                disabled={degreeProgram.history === null}
              >
                Historia
              </TabsTrigger>
              <TabsTrigger
                value='mission'
                disabled={degreeProgram.mission === null}
              >
                Misión
              </TabsTrigger>
              <TabsTrigger
                value='vision'
                disabled={degreeProgram.vision === null}
              >
                Visión
              </TabsTrigger>
              <TabsTrigger
                value='objetives'
                disabled={degreeProgram.objectives.length === 0}
              >
                Objetivos
              </TabsTrigger>
              <TabsTrigger
                value='profiles'
                disabled={degreeProgram.profiles.length === 0}
              >
                Perfiles
              </TabsTrigger>
              <TabsTrigger
                value='curricular-structure'
                disabled={degreeProgram.curricularStructure === null}
              >
                Estructura curricular
              </TabsTrigger>
            </TabsList>

            <TabsContent value='history'>
              <Card>
                <CardContent>
                  <p className='pt-6 leading-7'>{degreeProgram.history}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='mission'>
              <Card>
                <CardContent>
                  <p className='pt-6 leading-7'>{degreeProgram.mission}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='vision'>
              <Card>
                <CardContent>
                  <p className='pt-6 leading-7'>{degreeProgram.vision}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='objetives'>
              <Card>
                <CardContent>
                  <ul className='list-inside list-disc pt-6 leading-7'>
                    {degreeProgram.objectives.map((objective) => (
                      <li key={objective.id}>{objective.description}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='profiles'>
              <Card>
                <CardContent>
                  <ul className='list-inside list-disc pt-6 leading-7'>
                    {degreeProgram.profiles.map((profile) => (
                      <li key={profile.id}>
                        <span className='font-bold'>{profile.title}</span>
                        <p className='leading-7'>{profile.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ViewDegreeProgramPage
