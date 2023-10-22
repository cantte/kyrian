import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'

import NewEventForm from '~/app/(events)/events/new/form'

const NewEventPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/api/auth/signin')
  }

  if (session.user.role !== 'admin') {
    return redirect('/')
  }

  return (
    <div className='min-w-2xl grid items-start gap-8'>
      <div className='flex justify-between'>
        <div className='grid gap-1'>
          <h1 className='font-heading text-3xl md:text-4xl'>
            Registro de eventos
          </h1>
        </div>
      </div>

      <NewEventForm defaultValues={{ userId: session.user.id }} />
    </div>
  )
}

export default NewEventPage
