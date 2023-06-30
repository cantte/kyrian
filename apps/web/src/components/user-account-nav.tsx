'use client'

import { type HtmlHTMLAttributes } from 'react'
import Link from 'next/link'
import { type User } from 'next-auth'
import { signOut } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@kyrian/ui'

import UserAvatar from './user-avatar'

type UserAccountNavProps = HtmlHTMLAttributes<HTMLDivElement> & {
  user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav = ({ user }: UserAccountNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className='app-h-8 app-w-8'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <div className='app-flex app-items-center app-justify-start app-gap-2 app-p-2'>
          <div className='app-flex app-flex-col app-space-y-1 app-leading-none'>
            {user.name && <p className='app-font-medium'>{user.name}</p>}
            {user.email && (
              <p className='app-text-muted-foreground app-w-[200px] app-truncate app-text-sm'>
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/dashboard'>Panel</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/dashboard/monographs/list'>Monografias</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/dashboard/degree-programs/list'>
            Programas académicos
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer'
          onSelect={(event) => {
            event.preventDefault()
            void signOut({
              callbackUrl: `${window.location.origin}/auth/signin`,
            })
          }}
        >
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
