import assert from 'assert'
import React from 'react'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'

import DashboardNav from '~/components/nav'
import { dashboardConfig } from '~/config/dashboard'

const DashboardSidebar = async () => {
  const session = await getServerSession(authOptions)
  const role = session?.user.role

  const sidebar = dashboardConfig.sidebarNav.filter((item) => {
    if (item.roles === undefined) {
      return true
    }

    if (item.roles.length > 0 && role === undefined) {
      return false
    }

    assert.ok(role !== undefined)

    return item.roles.includes(role)
  })

  return <DashboardNav items={sidebar} />
}

export default DashboardSidebar
