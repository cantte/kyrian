import '@/base/styles/globals.css'
import '@kyrian/ui/styles.css'
import { type ReactNode } from 'react'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='en'
      className={`bg-white font-sans text-slate-900 antialiased ${inter.variable}`}
    >
      <head />
      <body className='min-h-screen'>{children}</body>
    </html>
  )
}
