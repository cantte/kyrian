import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'

import StudentForm from '~/components/students/student.form'

export const metadata = {
  title: 'Kyrian',
}

const RegisterNewStudentPage = async () => {
  const session = await getServerSession(authOptions)

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
