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
    <div className='app-grid app-items-start app-gap-8 app-min-w-2xl'>
      <div className='app-flex app-justify-between'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-scroll-m-20 app-text-4xl app-font-extrabold app-tracking-tight lg:app-text-5xl'>
            Programa académico de {degreeProgram.name}
          </h1>
        </div>
      </div>

      <div className='app-grid app-grid-flow-row-dense app-gap-6 app-grid-cols-1 md:app-grid-cols-4 app-overflow-visible'>
        <div className='app-col-span-4 md:app-col-span-1 app-overflow-visible'>
          <Card>
            <CardHeader>
              <CardTitle>Información general</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='app-flex app-flex-col app-space-y-2'>
                <p className='app-leading-7 [&:not(:first-child)]:app-mt-6'>
                  Título otorgado: {degreeProgram.degree}
                </p>

                <p className='app-leading-7'>
                  Metología: {degreeProgram.modality}
                </p>

                <p className='app-leading-7'>
                  Duración: {degreeProgram.duration} semestres
                </p>

                <p className='app-leading-7'>
                  Créditos: {degreeProgram.credits}
                </p>

                {degreeProgram.studentQuota !== null && (
                  <p className='app-leading-7'>
                    Cupo: {degreeProgram.studentQuota}
                  </p>
                )}

                <p className='app-leading-7'>
                  Lugar: {degreeProgram.city}, {degreeProgram.state}
                </p>

                <p className='app-leading-7'>Teléfono: {degreeProgram.phone}</p>

                <p className='app-leading-7'>
                  Correo electrónico: {degreeProgram.email}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='app-col-span-4 md:app-col-span-3 app-overflow-visible'>
          <Tabs className='app-overflow-scroll md:app-overflow-auto app-w-full'>
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
                  <p className='app-leading-7 app-pt-6'>
                    {degreeProgram.history}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='mission'>
              <Card>
                <CardContent>
                  <p className='app-leading-7 app-pt-6'>
                    {degreeProgram.mission}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='vision'>
              <Card>
                <CardContent>
                  <p className='app-leading-7 app-pt-6'>
                    {degreeProgram.vision}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='objetives'>
              <Card>
                <CardContent>
                  <ul className='app-list-disc app-list-inside app-leading-7 app-pt-6'>
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
                  <ul className='app-list-disc app-list-inside app-leading-7 app-pt-6'>
                    {degreeProgram.profiles.map((profile) => (
                      <li key={profile.id}>
                        <span className='app-font-bold'>{profile.title}</span>
                        <p className='app-leading-7'>{profile.description}</p>
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
