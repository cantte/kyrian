import '@/base/styles/globals.css'
import '@kyrian/ui/styles.css'

import { type ReactNode } from 'react'
import { Inter } from 'next/font/google'

import ThemeProvider from '~/components/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

interface RootLayoutProps {
  children: ReactNode
}

export const metadata = {
  title: 'Kyrian',
  favicon: '/favicon.ico',
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='en'
      className={`app-font-sans app-antialiased ${inter.variable}`}
    >
      <head />
      <body className='app-min-h-screen app-bg-background'>
        <ThemeProvider attribute='app-theme' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
