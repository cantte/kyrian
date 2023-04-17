import '@/base/styles/globals.css'
import { authOptions } from '@kyrian/auth'
import { Button } from '@kyrian/ui'

import '@kyrian/ui/styles.css'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { Inter } from "next/font/google"
import { getServerSession } from 'next-auth/next'
import { getProviders, signIn } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className='app-mx-auto app-max-w-screen-2xl app-px-4 sm:app-px-6 lg:app-px-8'>
      <div className={inter.className}>
        <div className='app-grid app-h-screen app-place-items-center'>
          <div className='app-rounded-lg app-border app-border-slate-200 app-p-10'>
            <div className='app-flex app-flex-col app-items-center app-justify-center app-space-y-12 app-align-middle'>
              <div>
                <h1 className='app-scroll-m-20 app-text-center app-text-4xl app-font-extrabold app-tracking-tight lg:app-text-5xl'>
                  Bienvenido
                </h1>

                <span className='app-text-center app-text-xl app-text-slate-700 dark:app-text-slate-400 [&:not(:first-child)]:app-mt-2'>
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
