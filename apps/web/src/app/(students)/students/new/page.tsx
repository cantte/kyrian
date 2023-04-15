import { redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth/next'
import superjson from 'superjson'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'

import StudentForm from '~/components/students/student.form'

export const metadata = {
  title: 'Kyrian',
}

const RegisterNewStudentPage = async () => {
  const session = await getServerSession(authOptions)

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma: prisma,
    },
    transformer: superjson,
  })

  const student = await ssg.student.byUser.fetch()

  if (student !== null) {
    return redirect('/')
  }

  return (
    <div className='app-grid app-items-start app-gap-8 app-max-w-2xl'>
      <div className='app-flex app-justify-between'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-text-2xl app-font-bold app-tracking-wide app-text-slate-900'>
            Registro de estudiantes
          </h1>
        </div>
      </div>
      <StudentForm
        defaultValues={{
          name: session?.user?.name ?? undefined,
          email: session?.user?.email ?? undefined,
          userId: session?.user?.id ?? undefined,
        }}
      />
    </div>
  )
}

export default RegisterNewStudentPage
