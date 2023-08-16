import '@kyrian/ui/styles.css'
import '@kyrian/web/styles/globals.css'

import { type ReactNode } from 'react'
import { Inter } from 'next/font/google'

import { Toaster } from '@kyrian/ui'

import ThemeProvider from '~/components/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

interface RootLayoutProps {
  children: ReactNode
}

export const metadata = {
  title: 'Kyrian',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' className={`font-sans antialiased ${inter.variable}`}>
      <head />
      <body className='bg-background min-h-screen'>
        <ThemeProvider attribute='app-theme' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
