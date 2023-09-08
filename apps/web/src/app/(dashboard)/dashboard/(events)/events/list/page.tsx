import React from 'react'
import NextLink from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth/next'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'
import { Button } from '@kyrian/ui'

import DashboardHeader from '~/components/dashboard-header'
import DashboardShell from '~/components/dashboard-shell'
import GenericDataTable from '~/components/table/generic-data-table'
import { columns } from '~/app/(dashboard)/dashboard/(events)/events/list/columns'

const EventsPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect('/api/auth/signin')
  }

  if (session.user.role !== 'admin') {
    return redirect('/')
  }

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma: prisma,
    },
  })

  const events = await ssg.event.listAll.fetch()

  return (
    <DashboardShell>
      <DashboardHeader heading='Eventos'>
        <NextLink href='/events/new' passHref>
          <Button className='mt-4 md:mt-0'>Crear evento</Button>
        </NextLink>
      </DashboardHeader>

      <GenericDataTable columns={columns} data={events} />
    </DashboardShell>
  )
}

export default EventsPage
