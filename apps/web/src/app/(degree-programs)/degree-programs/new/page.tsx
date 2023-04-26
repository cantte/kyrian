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

  return (
    <div className='app-grid app-items-start app-gap-8 app-max-w-2xl'>
      <div className='app-flex app-justify-between'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-text-2xl app-font-bold app-tracking-wide app-text-slate-900'>
            Registro de programas de grado
          </h1>
        </div>
      </div>

      <DegreeProgramForm />
    </div>
  )
}

export default RegisterNewDegreeProgramPage
