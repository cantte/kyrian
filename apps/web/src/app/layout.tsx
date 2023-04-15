import '@/base/styles/globals.css'
import '@kyrian/ui/styles.css'
import { type ReactNode } from 'react'
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='en'
      className={`app-bg-white app-font-sans app-text-slate-900 app-antialiased ${inter.variable}`}
    >
      <head />
      <body className='app-min-h-screen'>{children}</body>
    </html>
  )
}
