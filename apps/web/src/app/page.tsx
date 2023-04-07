'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '@kyrian/ui'

import { api } from '~/utils/api'

const Web = () => {
  const { data: message } = api.auth.getSecretMessage.useQuery()
  const { data: session } = api.auth.getSession.useQuery()

  return (
    <div className='mx-auto my-7 max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Web - Secret message is: {message}
      </h1>

      {session !== null && (
        <div className='mt-4'>
          <h2 className='mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700'>
            Your current session
          </h2>
          <div className='my-2'>
            <pre className='relative rounded bg-slate-100 py-[0.2rem] px-[0.3rem] font-mono text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400'>
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className='my-2'></div>

      <div className='grid grid-cols-1 gap-6'>
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
            <AvatarImage src={'https://github.com/shadcn.png'} alt='@shadcn' />
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

        <div>
          <Dialog>
            <DialogTrigger>Open dialog</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Accordion type='single' collapsible className='w-[450px]'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. Its animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <AlertDialog>
            <AlertDialogTrigger>Open alert dialog</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>Open menu trigger</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <div className='flex items-center space-x-2'>
            <Switch id='airplane-mode' />
            <Label htmlFor='airplane-mode'>Airplane Mode</Label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Web
