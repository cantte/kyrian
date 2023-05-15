import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'

import DegreeProgramForm from '~/components/degree-programs/degree-program.form'

const RegisterNewDegreeProgramPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/api/auth/signin')
  }

  if (session.user.role !== 'admin') {
    return redirect('/')
  }

  return (
    <div className='app-grid app-items-start app-gap-8 app-min-w-2xl'>
      <div className='app-flex app-justify-between'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-scroll-m-20 app-text-4xl app-font-extrabold app-tracking-tight lg:app-text-5xl'>
            Registro de programas de grado
          </h1>
        </div>
      </div>

      <DegreeProgramForm />
    </div>
  )
}

export default RegisterNewDegreeProgramPage
