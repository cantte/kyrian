import '@kyrian/ui/styles.css'
import { type FC, type PropsWithChildren } from 'react'
import { Inter } from '@next/font/google'

import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en'>
      <head />
      <body className={inter.className}>
        <main>
          <div className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
            <div className='pt-10 sm:pt-16 lg:pt-0 lg:pb-14'>
              <div className='mt-8'>{children}</div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
