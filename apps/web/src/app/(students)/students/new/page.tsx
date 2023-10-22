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
    <div className='grid max-w-2xl items-start gap-8'>
      <div className='flex justify-between'>
        <div className='grid gap-1'>
          <h1 className='text-2xl font-bold tracking-wide text-slate-900'>
            Registro de estudiantes
          </h1>
        </div>
      </div>
      <StudentForm
        defaultValues={{
          name: session?.user?.name ?? '',
          email: session?.user?.email ?? '',
          userId: session?.user?.id ?? '',
        }}
      />
    </div>
  )
}

export default RegisterNewStudentPage
