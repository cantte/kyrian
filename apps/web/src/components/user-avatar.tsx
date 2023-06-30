import { type User } from '@prisma/client'
import { type AvatarProps } from '@radix-ui/react-avatar'

import { Avatar, AvatarFallback, AvatarImage } from '@kyrian/ui'

import { Icons } from './icons'

type UserAvatarProps = AvatarProps & {
  user: Pick<User, 'name' | 'image'>
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage src={user.image} alt='Picture' />
      ) : (
        <AvatarFallback>
          <span className='app-sr-only'>{user.name}</span>
          <Icons.user className='app-w-4 app-h-4' />
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export default UserAvatar
