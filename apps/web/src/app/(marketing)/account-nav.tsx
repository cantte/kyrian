import { type FC } from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@kyrian/auth'
import { Button } from '@kyrian/ui'

import UserAccountNav from '~/components/user-account-nav'

const AccountNav: FC = async () => {
  const session = await getServerSession(authOptions)

  return (
    <nav>
      {session ? (
        <UserAccountNav
          user={{
            name: session.user.name,
            image: session.user.image,
            email: session.user.email,
          }}
        />
      ) : (
        <Link href='/auth/signin'>
          <Button size='sm' className='px-4'>
            Iniciar sesión
          </Button>
        </Link>
      )}
    </nav>
  )
}

export default AccountNav
