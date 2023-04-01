import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kyrian/ui'

export default function Web() {
  return (
    <div className='m-10 px-10'>
      <h1>Web</h1>

      <div className='my-2'></div>

      <div className='grid grid-cols-1 gap-4'>
        <div>
          <Button>Default</Button>
        </div>

        <div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' placeholder='Email' />
          </div>
        </div>

        <div>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Accept terms and conditions
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
