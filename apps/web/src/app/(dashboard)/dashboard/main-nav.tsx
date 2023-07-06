import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@kyrian/auth";
import { dashboardConfig } from "~/config/dashboard";
import assert from "assert";
import MainNav from "~/components/main-nav";
import { redirect } from "next/navigation";

const DashboardMainNav = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/api/auth/signin')
  }

  if (!session.user) {
    return redirect('/api/auth/signin')
  }

  const role = session?.user.role
  const menu = dashboardConfig.mainNav.filter((item) => {
    if (item.roles === undefined) {
      return true
    }

    if (item.roles.length > 0 && role === undefined) {
      return false
    }

    assert.ok(role !== undefined)

    return item.roles.includes(role)
  })

  return (
    <MainNav items={menu}/>
  );
};

export default DashboardMainNav;
