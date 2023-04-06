import '@/base/styles/globals.css'
import '@kyrian/ui/styles.css'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { Inter } from '@next/font/google'
import { getServerSession } from 'next-auth/next'
import { getProviders, signIn } from 'next-auth/react'

import { authOptions } from '@kyrian/auth'
import { Button } from '@kyrian/ui'

const inter = Inter({ subsets: ['latin'] })

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
      <div className={inter.className}>
        <div className='grid h-screen place-items-center'>
          <div className='rounded-lg border border-slate-200 p-10'>
            <div className='flex flex-col items-center justify-center space-y-12 align-middle'>
              <div>
                <h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
                  Bienvenido
                </h1>

                <span className='text-center text-xl text-slate-700 dark:text-slate-400 [&:not(:first-child)]:mt-2'>
                  Para continuar, inicia sesión con tu cuenta.
                </span>
              </div>

              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    size='lg'
                    variant='outline'
                    onClick={() => void signIn(provider.id)}
                  >
                    Iniciar sesión con {provider.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } }
  }

  const providers = await getProviders()

  return {
    props: { providers: providers ?? [] },
  }
}
